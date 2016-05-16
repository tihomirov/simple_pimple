Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	notFoundTemplate: 'notFound',
	waitOn: function () {
		return [Meteor.subscribe('notifications')];
	}
});

Router.route('/users', {name: 'users'});

Router.route('/createPost', {
	name: 'createPost',
	disableProgress: true
});

Router.route('/posts/:_id', {
	name: 'postPage',
	data: function () {
		return Posts.findOne(this.params._id)
	},
	waitOn: function(){
		return [
			Meteor.subscribe('singlePost', this.params._id),
			Meteor.subscribe('comments', this.params._id)
		];
	}
});

Router.route('/posts/:_id/edit', {
	name: 'postEdit',
	data: function() { return Posts.findOne(this.params._id); },
	waitOn: function() {
		return Meteor.subscribe('singlePost', this.params._id);
	}
});

Router.route('verifyEmail', {
	path: '/verify-email/:token',
	data: function () {
		return this.params.token;
	}
});

PostsListController = RouteController.extend({
	template: 'postsList',
	increment: 5,
	limit: function() {
		return parseInt(this.params.postsLimit) || this.increment;
	},
	findOptions: function() {
		return {sort: {votes: -1}, limit: this.limit()};
	},
	subscriptions: function() {
		this.postsSub = Meteor.subscribe('posts', this.findOptions());
	},
	posts: function() {
		return Posts.find({}, this.findOptions());
	},
	data: function() {
		var hasMore = this.posts().fetch().length === this.limit();
		var nextPath = this.route.path({postsLimit: this.limit() + this.increment});
		return {
			posts: this.posts(),
			ready: this.postsSub.ready,
			nextPath: hasMore ? nextPath : null
		};
	}
});

Router.route('/:postsLimit?', {
	name: 'postsList',
	controller: PostsListController
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