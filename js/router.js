Todos.Router.map(function() {
  this.resource('users', { path: '/' }, function(){
  	this.route('new');
    this.resource('user', { path: '/:user_id' });
  });
});

Todos.UsersIndexRoute = Ember.Route.extend({
  model: function() {
    return this.modelFor('users');
  }
});

Todos.UsersRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('user');
  }
});

/*Todos.UsersNewRoute = Ember.Route.extend({
   model: function() {
    return this.modelFor('users');
  }
});*/

