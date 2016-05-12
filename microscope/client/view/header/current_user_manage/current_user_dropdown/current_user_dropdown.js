Template.currentUserDropdown.events({
	'click .logout': () => {
		Meteor.logout();
	}
});
