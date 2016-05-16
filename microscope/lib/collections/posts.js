Posts = new Mongo.Collection('posts');

Posts.allow({
	update: function (userId, post) {
		return ownsDocument(userId, post);
	},
	remove: function (userId, post) {
		return ownsDocument(userId, post);
	}
});

Posts.deny({
	update: function (userId, post, fieldNames) {
		return (_.without(fieldNames, 'url', 'title').length > 0);
	}
});

Meteor.methods({
	postInsert: function (postAttributes) {
		check(Meteor.userId(), String);
		check(postAttributes, {
			title: String,
			url: String
		});

		var postWithSameLink = Posts.findOne({url: postAttributes.url});
		if (postWithSameLink) {
			return {
				postExists: true,
				_id: postWithSameLink._id
			}
		}

		var user = Meteor.user();
		var post = _.extend(postAttributes, {
			authorId: user._id,
			submitted: new Date(),
			commentsCount: 0,
			upvoters: [],
			votes: 0
		});
		var postId = Posts.insert(post);
		return {
			_id: postId
		};
	},
	upvote: function(postId) {
		check(postId, String);
		var user = Meteor.user();
		if (!user)
			throw new Meteor.Error(401, "Надо залогиниться чтобы голосовать");
		var post = Posts.findOne(postId);
		if (_.include(post.upvoters, user._id))
			throw new Meteor.Error(422, 'Вы уже голосовали за этот пост');
		Posts.update({
			_id: postId,
			upvoters: {$ne: user._id}
		}, {
			$addToSet: {upvoters: user._id},
			$inc: {votes: 1}
		});
	}
});