Template.signIn.events({
	'click #login-button': function(e,t){
		var email = t.find('#login-email').value,
			password = t.find('#login-password').value;

		Meteor.loginWithPassword(email,password,function(err){
			console.log(err);
		});
	},
	'click .sign-up-button': function(){
		$("#myModal").modal('show');
	}
});