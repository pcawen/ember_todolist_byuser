Todos.UsersNewController = Ember.ArrayController.extend({
	actions: {
		createUser: function(){
			console.log('create user func');
			var name = this.get('newName');
			//if(!name.trim()){return;}

			var user = this.store.createRecord('user',{
				name: name
			});

			this.set('newName', '');

			user.save();
		}
	}

});