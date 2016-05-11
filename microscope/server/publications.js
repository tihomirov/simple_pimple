Meteor.publish('posts', function(author) {
    var query = {};
    if(author) query.author = author;
    return Posts.find(query);
});