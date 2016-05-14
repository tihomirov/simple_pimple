Meteor.publish('posts', function (query) {
	return Posts.find(query || {});
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