Template.signUp.events({
	'click #register-btn': function (e, t) {
		var email = t.find('#email').value,
			username = t.find('#username').value,
			password = t.find('#password').value;

		Accounts.createUser({username: username, password: password, email: email}, function (err) {
			if (err) {
				console.log(err);
			} else {
				Meteor.call('sendVerificationLink', (error, response) => {
					if (error) {
						console.log(error)
					} else {
						console.log('Resend with no error')
					}
				});
			}
		});
	}
});