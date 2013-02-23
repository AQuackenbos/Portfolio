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

//Force all views to the general template
Portfolio.IndexView =
Portfolio.AboutView = 
Portfolio.ContactView = 
Portfolio.SkillsView = 
Ember.View.extend({
	templateName: "general"
});

Ember.Route.reopen({
  model: function() {
	if(this.routeName == 'index') return window.loadedData['about'];
    return window.loadedData[this.routeName];
  },
});

Portfolio.Router.reopen({
	location: 'history'
});

Portfolio.Router.map(function(){
	this.route('about');
	this.route('contact');
	this.route('skills');
});

