Template.currentUserManage.helpers({
	loginLabel: () => {
		if(Meteor.user()){
			return Meteor.user().profile.firstName + ' ' + Meteor.user().profile.lastName;
		} else {
			return 'Sign In'
		}
	}
});

Template.currentUserManage.events({
	'click .login .dropdown-toggle': (e) => {
		$('.dropdown.login').toggleClass('open');
	}
});

Meteor.startup(() => {
	$('body').on('click', (e) => {

		let ddMenu = $('.login.dropdown-menu');
		let clickOutDropdown = !ddMenu.is(e.target) && ddMenu.has(e.target).length === 0 && $('.open').has(e.target).length === 0;

		if(clickOutDropdown){
			$('.dropdown.login').removeClass('open');
		}
	})
});