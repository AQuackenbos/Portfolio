window.isMobile = (/iPhone|iPod|iPad|Android|BlackBerry/).test(navigator.userAgent);

var Portfolio = Ember.Application.create();
Portfolio.deferReadiness();

$(function(){
	window.loadedData = {};

	$.ajax({
		url: 'data/data.json',
		dataType: 'json',
		success: function(r){
			window.loadedData = r.data;
			Portfolio.advanceReadiness();
		}
	});
});

Portfolio.Pages = Ember.Object.extend({});
Portfolio.Pages.reopenClass({
	allPages: [],
	find: function(page_id) {
		return null;
	}
});

Portfolio.ApplicationController = Ember.Controller.extend({
	leftImage: "left-image.jpg"
});


Portfolio.ItemView = Ember.View.extend({
	item: null,
	templateName: "item",
	click: function(e){
		if(window.isMobile || !this.item.description) {
			window.location.href = this.item.fallback;
			return;
		}
		
		e.preventDefault();
		this._openDescription();
	},
	_openDescription: function(){
		console.log("..opening description..");
	}
});

Portfolio.IndexView =
Portfolio.AboutView = 
Portfolio.ContactView = 
Portfolio.SkillsView = 
Ember.View.extend({
	templateName: "general",
    didInsertElement: function(){
        this.$().hide().fadeIn('slow');
    }
});

Ember.Route.reopen({
  model: function() {
	if(this.routeName == 'index') return window.loadedData['about'];
    return window.loadedData[this.routeName];
  },
  setupController: function(controller, model) {
	controller.set('content',model);
  }
});

if(navigator.appName != "Microsoft Internet Explorer")
{
	Portfolio.Router.reopen({
		location: 'history'
	});
}

Portfolio.Router.map(function(){
	this.route('about');
	this.route('contact');
	this.route('skills');
});

