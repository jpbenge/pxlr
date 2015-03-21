var pxlr = pxlr || {};

(function() {

	pxlr.initialize = function() {
		Parse.initialize("Vkpq2oBMIwW9UZNKC7allpH0r5opokYORviRnO8Z", "PJWGAxUyHLWHspauri9KVk9DhRuGo8D8AkptKvv5");
		if(!Parse.User.current()) {
			pxlr.Router.navigate('login', {trigger: true});
			var header = new pxlr.HeaderView();
      		$('#header-content').html(header.render().el);
		}
	};
})();

$(function() {
	pxlr.initialize();
});