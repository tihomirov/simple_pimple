if (Posts.find().count() === 0 && Meteor.users.find().count() === 0) {
	var now = new Date().getTime();

	let user1 = {
		email: 'tom@gmail.com',
		username: 'tomColeman',
		password: '1',
		profile: {
			firstName: 'Tom',
			lastName: 'Coleman'
		}
	};

	let user2 = {
		email: 'sa@gmail.com',
		username: 'superAdmin',
		password: '1',
		profile: {
			firstName: 'Super',
			lastName: 'Admin'
		}
	};

	Accounts.createUser(user1);
	Accounts.createUser(user2);

	var tom = Meteor.users.findOne({username: 'tomColeman'});
	var sa = Meteor.users.findOne({username: 'superAdmin'});

	var telescopeId = Posts.insert({
		title: 'Introducing Telescope',
		authorId: sa._id,
		url: 'http://sachagreif.com/introducing-telescope/',
		submitted: now - 7 * 3600 * 1000
	});

	Comments.insert({
		postId: telescopeId,
		createdUser: {
			_id: sa._id,
			fullName: sa.profile.firstName + ' ' + sa.profile.lastName
		},
		submitted: now - 5 * 3600 * 1000,
		body: 'Interesting project Sacha, can I get involved?'
	});

	Comments.insert({
		postId: telescopeId,
		createdUser: {
			_id: tom._id,
			fullName: tom.profile.firstName + ' ' + tom.profile.lastName
		},
		submitted: now - 3 * 3600 * 1000,
		body: 'You sure can Tom!'
	});

	Posts.insert({
		title: 'Meteor',
		authorId: sa._id,
		url: 'http://meteor.com',
		submitted: now - 10 * 3600 * 1000
	});

	Posts.insert({
		title: 'The Meteor Book',
		authorId: tom._id,
		url: 'http://themeteorbook.com',
		submitted: now - 12 * 3600 * 1000
	});
}