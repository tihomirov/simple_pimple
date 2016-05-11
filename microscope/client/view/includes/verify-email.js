Template.verifyEmail.events({
	'click .resend-verification-link' ( event, template ) {
		Meteor.call( 'sendVerificationLink', ( error, response ) => {
			if ( error ) {
				console.log(error)
			} else {
				console.log('Resend with no error')
			}
		});
	}
});

Template.verifyEmail.helpers({
	message: function() {
		console.log('it\'s helper for verifyEmail')
		console.log(this)
	}
});