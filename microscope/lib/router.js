Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	notFoundTemplate: 'notFound',
	waitOn: function () {
		return [Meteor.subscribe('posts'), Meteor.subscribe('comments')];
	}
});

Router.route('/', {name: 'postsList'});
Router.route('/users', {name: 'users'});
Router.route('/createPost', {name: 'createPost'});
Router.route('/posts/:_id', {
	name: 'postPage',
	data: function () {
		return Posts.findOne(this.params._id)
	}
});
Router.route('/posts/:_id/edit', {
	name: 'postEdit',
	data: function() { return Posts.findOne(this.params._id); }
});
Router.route('verifyEmail', {
	path: '/verify-email/:token',
	data: function () {
		return this.params.token;
	}
});

Router.onBeforeAction('loading');
Router.onBeforeAction(requireLogin, {only: 'createPost'});
Router.before(function() {
	clearErrors();
	this.next();
});

function requireLogin() {
	if (!Meteor.user()) {
		if (Meteor.loggingIn()) {
			this.render(this.loadingTemplate);
		} else {
			this.render('accessDenied');
		}
	} else {
		this.next();
	}
}