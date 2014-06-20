Todos.User = DS.Model.extend({
  name: DS.attr('string'),
  tasks: DS.hasMany('todo', { async: true })
});


Todos.User.FIXTURES = [
 {
   id: 1,
   name: 'Alice',
   tasks: [1, 2]
 },
 {
   id: 2,
   name: 'Bob',
   tasks: [3]
 }
];