window.isMobile = (/iPhone|iPod|iPad|Android|BlackBerry/).test(navigator.userAgent);

//============ Core Setup

var Portfolio = Ember.Application.create();
Portfolio.deferReadiness();

//============ Objects

Portfolio.Pages = Ember.Object.extend({});
Portfolio.Pages.reopenClass({
	allPages: [],
	find: function(page_id) {
		var returnPage = null;
		$(this.allPages).each(function(index,page)
		{
			if(page.id == page_id)
				returnPage = page;
		});
		
		return returnPage;
	}
});

//============ Controllers

Portfolio.ApplicationController = Ember.Controller.extend({
	leftImage: "left-image.jpg"
});



//============ Routes

Portfolio.ApplicationRoute = Ember.Route.extend({
	model: function() {
		return Portfolio.Pages.allPages;
	}
});

Portfolio.IndexRoute = Ember.Route.extend({
	model: function(params) {
		this.transitionTo('page',Portfolio.Pages.find('contact'));
	},
    renderTemplate: function() {
        this.render('page', {
            into: 'application'
        })
    }
});

Portfolio.PageRoute = Ember.Route.extend({
	model: function(params) {
		if(params.page_id == 'undefined') return Portfolio.Pages.find('contact'); 
		return Portfolio.Pages.find(params.page_id);
	},
	setupController: function(controller, model) {
		controller.set('content',model);
	}
});

//============ Views

Portfolio.FadeInView = Ember.View.extend({
    didInsertElement: function(){
        this.$().hide().fadeIn('slow');
    }
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

//============ Mapping and additional

if(navigator.appName != "Microsoft Internet Explorer")
{
	Portfolio.Router.reopen({
		location: 'history'
	});
}

Portfolio.Router.map(function(){
	this.resource('page',{path:'/:page_id'});
});

//============ Onload jQuery

$(function(){
	//Load Data
	Portfolio.Pages.allPages = [];

	$.ajax({
		url: 'data/data.json',
		dataType: 'json',
		success: function(r){
			Portfolio.Pages.allPages = r.data;
			Portfolio.advanceReadiness();
		}
	});
});
