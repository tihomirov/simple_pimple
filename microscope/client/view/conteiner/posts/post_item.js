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
	}
});