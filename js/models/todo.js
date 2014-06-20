Todos.Todo = DS.Model.extend({
  title: DS.attr('string'),
  isCompleted: DS.attr('boolean'),
  user: DS.belongsTo('user', { async: true })
});

Todos.Todo.FIXTURES = [
 {
   id: 1,
   title: 'Learn',
   isCompleted: true
 },
 {
   id: 2,
   title: 'todo2',
   isCompleted: false
 },
 {
   id: 3,
   title: 'Profit!',
   isCompleted: false
 }
];