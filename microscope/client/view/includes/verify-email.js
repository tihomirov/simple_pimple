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