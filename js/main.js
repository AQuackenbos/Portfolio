var Portfolio = Ember.Application.create();

Portfolio.ApplicationView = Ember.View.extend({
	templateName: 'application'
});
Portfolio.ApplicationController = Ember.Controller.extend();

Portfolio.Router.reopen({
	location: 'history'
});


Portfolio.IndexView = Ember.View.extend({
	templateName: 'contributors'
});
Portfolio.IndexController = Ember.Controller.extend({
	test: 'test!'
});

Portfolio.Router.map(function(){

});