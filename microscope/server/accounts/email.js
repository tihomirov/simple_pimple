Accounts.emailTemplates.siteName = "SimplePimple";
Accounts.emailTemplates.from     = "SimplePimple <assatihomirov93@gmail.com>";

Accounts.emailTemplates.verifyEmail = {
	subject() {
		return "[SimplePimple] Verify Your Email Address";
	},
	text( user, url ) {
		let emailAddress   = user.emails[0].address,
			urlWithoutHash = url.replace( '#/', '' ),
			supportEmail   = "assatihomirov93@gmail.com",
			emailBody      = `To verify your email address (${emailAddress}) visit the following link:\n\n${urlWithoutHash}\n\n If you did not request this verification, please ignore this email. If you feel something is wrong, please contact our support team: ${supportEmail}.`;

		return emailBody;
	}
};


Meteor.startup(() => {
	process.env.MAIL_URL = "smtp://assatihomirov93%40gmail.com:tihomirov93@smtp.gmail.com"
});