/*
 * Model Creation
 */
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/node', { server: { auto_reconnect: false }});

var CommentSchema = new mongoose.Schema({
  message: { type: String },
  created_at: { type: Date, default: Date.now }
});
mongoose.model('Comment', CommentSchema);
var Comment = mongoose.model('Comment');


/*
 * GET home page.
 */

exports.index = function(req, res) {
  Comment.find({}, function(err, comments) {
    res.render('index', {
      title: 'Medellin JS',
      comments: comments
    });
  });
};

/*
 * Add a Comment
 */
exports.comment = function(req, res) {
  var message = req.param('message');

  var comment = new Comment({
    message: message
  });

  comment.save(function() {
    res.redirect('/');
  });
}