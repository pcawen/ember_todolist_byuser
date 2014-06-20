//window.Todos = Ember.Application.create();
window.Todos = Ember.Application.create({
	LOG_TRANSITIONS: true,
	LOG_ACTIVE_GENERATION: true
});

//Todos.ApplicationAdapter = DS.RESTAdapter.extend({

 //overrides headers or define new ones
  /*headers: {
    "Content-Type": "paracausarerror",
    "Accept": "paracausarerror"
  }*/
//});

Todos.ApplicationAdapter = DS.FixtureAdapter.extend();
/*DS.RESTAdapter.reopen({
	host: 'http://localhost:3000'
});*/
