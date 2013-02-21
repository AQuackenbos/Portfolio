var Portfolio = Ember.Application.create();

Portfolio.ApplicationController = Ember.Controller.extend({
	test: "Test!"
});

Portfolio.Router.reopen({
	location: 'history'
});


Portfolio.IndexRoute = Ember.Route.extend({
	setupController: function(controller){
		controller.set('title',"Better title...");
	}
});

Portfolio.Router.map(function(){
	this.route('contributors');
	this.route('contributor', {path: '/contributors/:contributor_id'});
});

Portfolio.Contributor = Ember.Object.extend();
Portfolio.Contributor.reopenClass({
  allContributors: [],
  all: function(){
    this.allContributors = [];
    $.ajax({
      url: '/js/test.json',
      dataType: 'json',
      context: this,
      success: function(response){
        response.forEach(function(contributor){
          this.allContributors.addObject(Portfolio.Contributor.create(contributor))
        }, this)
      }
    })
    return this.allContributors;
  }
});

Portfolio.ContributorsRoute = Ember.Route.extend({
	model: function() {
		return Portfolio.Contributor.all();
	}
});