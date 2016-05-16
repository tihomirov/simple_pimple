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
	}
});

Template.postItem.events({
	'click .upvotable': function(e) {
		e.preventDefault();
		Meteor.call('upvote', this._id);
	}
});