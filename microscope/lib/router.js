Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	waitOn: function () {
		return Meteor.subscribe('posts');
	}
});

Router.map(function () {

	this.route('postsList', {path: '/'});

	this.route('postPage', {
		path: '/posts/:_id',
		data: function () {
			return Posts.findOne(this.params._id)
		}
	});

	this.route('verifyEmail' ,{
		path: '/verify-email/:token',
		data: function () {
			return {token: this.params.token}
		},
		action: function () {
			console.log('waitOn')
			Accounts.verifyEmail( this.params.token, ( error ) =>{
				if ( error ) {
					console.log(error)
				} else {
					console.log('verify success')
				}
			});
			this.render();
		}
	})

});

Router.onBeforeAction('loading');