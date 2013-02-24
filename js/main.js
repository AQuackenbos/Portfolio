$(function(){
	window.loadedData = {};

	$.ajax({
		url: 'data/data.json',
		dataType: 'json',
		success: function(r){
			window.loadedData = r.data;
		}
	});
});

var Portfolio = Ember.Application.create();

Portfolio.Pages = Ember.Object.extend({});
Portfolio.Pages.reopen({
	allPages: [],
	find: function(page_id) {
		return null;
	}
});

Portfolio.ApplicationController = Ember.Controller.extend({
	leftImage: "left-image.jpg"
});

Portfolio.IndexView =
Portfolio.AboutView = 
Portfolio.ContactView = 
Portfolio.SkillsView = 
Ember.View.extend({
	templateName: "general"
});

Ember.Route.reopen({
  model: function() {
		return Portfolio.Pages.find(this.routeName);
	if(this.routeName == 'index') return window.loadedData['about'];
    return window.loadedData[this.routeName];
  },
  setupController: function(controller, model) {
	controller.set('content',model);
  }
});

Portfolio.Router.reopen({
	location: 'history'
});

Portfolio.Router.map(function(){
	this.route('about');
	this.route('contact');
	this.route('skills');
});

