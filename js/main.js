var Portfolio = Ember.Application.create();

$.ajax({
	url: '/data/data.json',
	dataType: 'json',
	success: function(r){
		window.loadedData = r;
	}
});

Portfolio.ApplicationController = Ember.Controller.extend({
	links: [{id:'about',name:'About'},{id:'contact',name:'Contact'}]
});

Portfolio.Router.reopen({
	location: 'history'
});

Portfolio.Router.map(function(){
	this.route('about');
	this.route('contact');
});



/*
Portfolio.Page = Ember.Object.extend();
Portfolio.Page.reopenClass({
  allPages: [],
  all: function(){
	console.log('all called');
    this.allPages = [];
    $.ajax({
      url: '/data/pages.json',
      dataType: 'json',
      context: this,
      success: function(response){
        response.forEach(function(page){
          this.allPages.addObject(Portfolio.Page.create(page))
        }, this)
      }
    })
    return this.allPages;
  }
});
*/