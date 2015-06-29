Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'laoding'
});

Router.route('/',{
  name: 'games',
  waitOn: function(){
    return [Meteor.subscribe('games'), Meteor.subscribe('teams')];
  }
});


//both should work
// Router.route('/teams', 'teams');
Router.route('/teams',{
  waitOn: function(){
    return Meteor.subscribe('teams');
  }
});


var requireLogin = function(){
  if(!Meteor.user()){
    if(Meteor.loggingIn()){
      this.render("loading");
    } else {
      this.render("accessDenied");
    }
  } else {
    this.next();
  }
}

Router.onBeforeAction(requireLogin);
