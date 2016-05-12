Meteor.publish('posts', function (query) {
	return Posts.find(query || {});
});

Meteor.publish(null, function () {
	var projection = {
		username: 1,
		emails: 1
	};
	return Meteor.users.find({}, {fields: projection});
});