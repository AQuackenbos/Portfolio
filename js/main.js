(function(){
	window.Portfolio = {
		Models: {},
		Collections: {},
		Views: {},
		Router: {}
	};

	window.template = function(templateId) {
		return _.template($('#'+templateId).html());
	};

	Portfolio.Models.Page = Backbone.Model.extend({
		urlRoot: '/page'
	});

	Portfolio.Collections.Pages = Backbone.Collection.extends({
		model: Portfolio.Models.Page,
		url: '',
	});

})();