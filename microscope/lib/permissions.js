ownsDocument = function (userId, doc) {
	return doc && doc.authorId === userId;
}