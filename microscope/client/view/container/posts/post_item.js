const POST_HEIGHT = 80;
let Positions = new Meteor.Collection(null);

Template.postItem.helpers({

	domain: function () {
		var a = document.createElement('a');
		a.href = this.url;
		return a.hostname;
	},

	ownPost: function () {
		return this.authorId == Meteor.userId();
	},

	authorName: function () {
		if(!this.authorId) return;

		var author = Meteor.users.findOne({_id: this.authorId});
		if(!author){
			throw 'Can\'n find author with _id ' + this.authorId
		}

		return author.profile.firstName + ' ' + author.profile.lastName;
	},
	upvotedClass: function() {
		var userId = Meteor.userId();
		if (userId && !_.include(this.upvoters, userId)) {
			return 'btn-primary upvotable';
		} else {
			return 'disabled';
		}
	},
	attributes: function() {
		var post = _.extend({}, Positions.findOne({postId: this._id}), this);
		var newPosition = post._rank * POST_HEIGHT;
		let attributes = {};

		if (_.isUndefined(post.position)) {
			attributes.class = 'post invisible';
		} else {
			var delta = post.position - newPosition;
			attributes.style = "top: " + delta + "px";
			if (delta === 0)
				attributes.class = "post animate"
		}

		Meteor.setTimeout(function() {
			Positions.upsert({postId: post._id}, {$set: {position: newPosition}})
		});
		return attributes;
	}
});

Template.postItem.events({
	'click .upvotable': function(e) {
		e.preventDefault();
		Meteor.call('upvote', this._id);
	}
});