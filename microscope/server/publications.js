Meteor.publish('posts', function (options) {
	check(options, {
		sort: Object,
		limit: Number
	});
	return Posts.find({}, options);
});

Meteor.publish('comments', function (postId) {
	check(postId, String);
	return Comments.find({postId: postId});
});

Meteor.publish(null, function () {
	var projection = {
		username: 1,
		emails: 1,
		profile: 1
	};
	return Meteor.users.find({}, {fields: projection});
});

Meteor.publish('notifications', function() {
	return Notifications.find({authorId: this.userId, read: false});
});

Meteor.publish('singlePost', function(id) {
	check(id, String);
	return id && Posts.find(id);
});
