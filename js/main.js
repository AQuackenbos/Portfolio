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
		return Portfolio.Pages.allPages;
	},
	activate: function() {
		console.log('Index');
	},
	deactivate: function() {
		console.log('End Index');
	},
	renderTemplate: function() {
		this.render("index", {
			outlet: "indexnav",
			into: "application"
		});
	}
});

Portfolio.PageRoute = Ember.Route.extend({
	model: function(params) {
		if(params.page_id == 'undefined') return Portfolio.Pages.find('contact'); 
		return Portfolio.Pages.find(params.page_id);
	},
	setupController: function(controller, model) {
		controller.set('content',model);
	},
	activate: function() {
		console.log('Page');
	},
	deactivate: function() {
		console.log('End Page');
	}
});

//============ Views

Portfolio.IndexView = Ember.View.extend({
    didInsertElement: function(){
		$('#page-nav,#col-left').fadeOut('fast');
		Portfolio.indexSetup();
    }
});

Portfolio.PageView = Ember.View.extend({
    didInsertElement: function(){
		$('#page-nav,#col-left').fadeIn('fast');
        this.$().hide().fadeIn('slow');
    }
});

Portfolio.ItemView = Ember.View.extend({
	item: null,
	templateName: "item",
	previewClass: function() {
		return "item-preview "+item.previewClass;
	},
	click: function(e){
		//Stopgap until styles for mobile full descriptions exist
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

//============ Index Setup

Portfolio.indexSetup = function() {
	console.log('Setting up index page');
	
	/* Move circle to center */
	$('#center-name').center(false);
	
	/* "bounce" each link into position, sequentially maybe? */
	Portfolio.positionLinks(true);
	
	/* set up an animation behind each link maybe? */
		//@todo
	 
	/* set a resize listener to keep everything in place */
	$(window).on('resize',function() { 
		$('#center-name').center(false);
		Portfolio.positionLinks(false);
	});
}

Portfolio.positionLinks = function(animate){
	var radius = 90;

	var positionMultipliers = [
		[0,-1.5,-0.5,0],
		[1,-0.75,0,0],
		[1,0.75,0,-0.5],
		[0,1.5,-0.5,-0.5],
		[-1,0.75,-1,-0.5],
		[-1,-0.75,-1,0]
	];
	
	$('.center-link').each(function(index,element){
		$(element).center(false);
		
		var centerX = $(element).position().left + ($(element).outerWidth()/2);
		var centerY = $(element).position().top + ($(element).outerHeight()/2);
		
		var multipliers = positionMultipliers[index];
		
		var newX = centerX+(radius*multipliers[0])+($(element).outerWidth()*multipliers[2]);
		var newY = centerY+(radius*multipliers[1])+($(element).outerHeight()*multipliers[3]);
		
		if(animate)
		{
			$(element).delay(index*200).animate({
				'top': newY,
				'left': newX
			},
			500,
			'easeOutBack');
		}
		else
		{
			$(element).css({
				'top': newY,
				'left': newX
			});
		}
	});
}

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

//============ jQuery additional functions
jQuery.fn.center = function(parent) {
    if (parent) {
        parent = this.parent();
    } else {
        parent = window;
    }
    this.css({
        "position": "absolute",
        "top": ((($(parent).height() - this.outerHeight()) / 2) + $(parent).scrollTop() + "px"),
        "left": ((($(parent).width() - this.outerWidth()) / 2) + $(parent).scrollLeft() + "px")
    });
};