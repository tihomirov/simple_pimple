Template.user.helpers({
	userEmail: function () {
		return this.emails[0].address;
	}
});