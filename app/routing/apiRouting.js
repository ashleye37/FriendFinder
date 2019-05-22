// Pull in required dependencies
var path = require('path');

// Import the list of dog entries
var dogs = require('../data/friends.js');

// Export API routes
module.exports = function(app) {

	// List of dogs 
	app.get('/api/friends', function(req, res) {
		res.json(dogs);
	});

	// Add new friend entry
	app.post('/api/friends', function(req, res) {
		var userInput = req.body;

		var userSelections = userInput.scores;

		// Compute best dog match
		var matchName = '';
		var matchImg = '';
		var totalDifference = 10000; // Make the initial value big for comparison

		// Examine all existing dogs in the list
		for (var i = 0; i < dogs.length; i++) {

			// Compute differenes for each question
			var diff = 0;
			for (var j = 0; j < userSelections.length; j++) {
				diff += Math.abs(dogs[i].scores[j] - userSelections[j]);
      }
      
			if (diff < totalDifference) {
				totalDifference = diff;
				matchName = dogs[i].name;
				matchImg = dogs[i].photo;
			}
		}

		// Add new user
		dogs.push(userInput);

		// Send appropriate response
		res.json({status: 'OK', matchName: matchName, matchImg: matchImg});
	});
};