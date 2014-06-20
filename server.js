var express = require('express'),
	bodyParser = require('body-parser');
	
var app = express();

app.use(bodyParser());

app.use(express.static(__dirname + '/'));

var idSequence = 4;

var todos = [
	{"id": 1, "title": "Learn Ember.js", "isCompleted": true},
 	{"id": 2, "title": "...", "isCompleted": false},
 	{"id": 3, "title": "Profit!", "isCompleted": false}
];


app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
 });

app.get('/', function(req, res, next){
	//res.redirect('/employees');
	res.type('text/plain');
	//res.type('application/json');
	//res.type('application/xml');
	res.send(400, 'Nothing here')

});

app.post('/todos', addTodo);
app.get('/todos', findAll);
app.put('/tosos', function(){res.send(501)});//updateAll - 501 Not Implemented
app.delete('/todos', function(){res.send(501)});//deleteAll - 501 Not Implemented
app.post('/todos/:id', function(){res.send(405)});//405 Method Not Allowed
app.get('/todos/:id', findById);
app.put('/todos/:id', updateTodo);
app.delete('/todos/:id', deleteTodo);


app.listen(3000);
console.log('Listening on port 3000');


function addTodo(req, res){
	console.log("req: " + req.body);
	console.log("body: " + req);
	var conttyp = req.header('Content-Type');
	console.log('content-type' + conttyp);
	if(conttyp.indexOf('application/json') > -1){
		var todo = req.body.todo;
		console.log('Adding employee: ' + JSON.stringify(todo));
		todo.id = idSequence;
		idSequence++;
		todos.push(todo);
		//res.send(201, 'todo added');
		res.send({"todo": todo});//Ember take this object whith server data(Ej: Id) to replace the current one
	}else{
		res.send(501);
	}
}

function findAll(req, res){
	console.log('Retrieving all todos');
	var accept = req.header('Accept');
	if(accept.indexOf('json') > -1){
		console.log('returning json');
		var jsonTodo = {"todos": todos};
		res.json(jsonTodo);
	}else{
		res.send(406);//Not Acceptable. Only capable of generating content not acceptable according to the Accept headers
	}
}

function findById(req, res){
	var id = req.params.id;
	var accept = req.header('Accept');
    console.log('Retrieving todo: ' + id);
    var elemPos = indexOfTodo(id);
    if(elemPos >= 0){
    	if(accept == 'json'){
    		res.json({"todo": todos[elemPos]});
    	}else{
			res.send(406);//Not Acceptable. Only capable of generating content not acceptable according to the Accept headers
		}
    }else{
    	res.send(404, 'Todo not found'); //Or should be 204
    }
}

function updateTodo(req, res){
	var id = req.params.id;
	var todo = null;
	var conttyp = req.header('Content-Type');
	console.log('Updting todo: ' + id);
	var elemPos = indexOfTodo(id);
	console.log('Request: ' + req.body.todo);
	console.log("json.stringify" + JSON.stringify(req.body.todo));
	if(conttyp.indexOf('application/json') > -1){
		todo = req.body.todo;
		console.log("elementPosition : " + elemPos);
		if(elemPos >= 0){
			console.log('Updating todo' + todos[elemPos]);
	    	todos.splice(elemPos,1);
	    	todo.id = id;
	    	todos.push(todo);
	    	//res.send(201, 'todo updated');
	    	res.send({"todo": todo});//ember expects the json object as a response to PUT
	    }else{
	    	res.send(404, 'Todo not found'); //Or should be 204
	    }
	}else{
		res.send(501);
	}
}

function deleteTodo(req, res){
	var id = req.params.id;
    console.log('Deleting todo: ' + id);
    var elemPos = indexOfTodo(id);
	if(elemPos >= 0){
    	todos.splice(elemPos,1);
    	res.send(204, 'Succesully deleted');
    }else{
    	res.send(404, 'Todo not found'); //Or should be 204
    }
}

function indexOfTodo(id){
	console.log(id);
	for(var i = 0; i < todos.length; i++){
		console.log(i);
    	if(todos[i].id == id){
    		console.log("element found");
    		return i;
    	}
    }
    return -1;
}

