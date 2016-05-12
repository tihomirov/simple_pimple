Template.signUp.events({
	'submit form': (e) => {
		e.preventDefault();

		var user = {
			email: $(e.target).find('[name=email]').val(),
			username: $(e.target).find('[name=login]').val(),
			password: $(e.target).find('[name=password]').val(),
			profile: {
				firstName: $(e.target).find('[name=firstName]').val(),
				lastName: $(e.target).find('[name=lastName]').val()
			}
		};

		Accounts.createUser(user, function (err) {
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