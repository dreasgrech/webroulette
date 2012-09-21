$(function() {
	var API_KEY = 'AIzaSyC7nVXG_kZl74FvUuLKGAaAGd_7kzDZEW8',
	biasBox = $("#bias"),
	frameViewer = $("#frameviewer"),
	goButton = $("#go"),
    goButton_clickClass = 'go_click',
	length = 2,
    log = function (msg) {
        window.console && console.log && console.log(msg);
    },
	viewport = function() {
		/*
        * http://andylangton.co.uk/articles/javascript/get-viewport-size-javascript/
        */
		var e = window,
		a = 'inner';

		if (! ('innerWidth' in window)) {
			a = 'client';
			e = document.documentElement || document.body;
		}

		return {
			width: e[a + 'Width'],
			height: e[a + 'Height']
		};
	},
	random = function(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	},
	go = function() {
		var bias = biasBox.val();
		goButton.attr("value", "Take me somewhere else...");
		$.get("louie.php?length=" + length + "&bias=" + bias + "&iesux=" + new Date().getTime(), function(phrase) {
			log(phrase);
			$.ajax({
				url: "https://www.googleapis.com/customsearch/v1?key=" + API_KEY + "&cx=013036536707430787589:_pqjad5hr1a&q=" + phrase + "&alt=json",
				success: function(data) {
					var randomLink;
					if (!data.items) { // if no results were returned, just try again
						return go();
					}

					//randomLink = data.items[random(0, data.items.length - 1)].link; // pick a random result
					randomLink = data.items[0].link; // take the first result from the search

					frameViewer.attr("src", randomLink);
				},
                error: function (data) {
                    var error = JSON.parse(data.responseText);
                    if (error && error.error && error.error.message && error.error.message === "Daily Limit Exceeded") {
                        alert("Sorry, but my daily limit for the Google Custom Search API has been exceeded.  So, try again tomorrow!");
                    }
                }
			});
		});
	},
	frameHeight = viewport().height - parseInt($("#banner").outerHeight(), 10);

	biasBox.keyup(function(event) {
		if (event.keyCode === 13) {
			go();
		}
	});

	frameViewer.css("height", frameHeight);
	goButton.mousedown(function() {
		$(this).addClass(goButton_clickClass);
	}).mouseup(function() {
		$(this).removeClass(goButton_clickClass);
	}).click(function() {
		go();
	});
});

