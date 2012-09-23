$(function() {
	var getQueryString = function() {
		/* http://stackoverflow.com/a/647272/44084 */
		var result = {},
		queryString = location.search.substring(1),
		re = /([^&=]+)=([^&]*)/g,
		m;

		while (m = re.exec(queryString)) {
			result[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
		}

		return result;
	},
	apiKey = getQueryString()["key"],
	biasBox = $("#bias"),
	frameViewer = $("#frameviewer"),
	goButton = $("#go"),
	goButton_clickClass = 'go_click',
	searchEngine = '013036536707430787589:_pqjad5hr1a', // default search engine
	//searchEngine = '018213572811741326530:kpyusimayn8', // custom search engine (webroulette)
	length = 2,
	log = function(msg) {
		window.console && console.log && console.log(msg);
	},
	random = function(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	},
	handleUsageError = function(response) {
		if (!response.error) {
			return;
		}

		if (response.error.message && response.error.message === "Daily Limit Exceeded") {
            getNewApiKey(go);
			//alert("Sorry, but my daily limit for the Google Custom Search API has been exceeded.  So, try again tomorrow!\n\nOr, you can steal my code from https://github.com/dreasgrech/webroulette and use your own API key.");
		}

		return true;
	},
	go = function() {
		var bias = biasBox.val();
		$.get("louie.php?length=" + length + "&bias=" + bias + "&iesux=" + new Date().getTime(), function(phrase) {
			log(phrase);

			$.ajax({
				url: "https://www.googleapis.com/customsearch/v1?key=" + apiKey + "&cx=" + searchEngine + "&q=" + phrase + "&alt=json",
				dataType: "jsonp", /* http://blog.dreasgrech.com/2012/01/making-facebooks-graph-api-work-in.html */
				success: function(data) {
					var randomLink;
					if (typeof data === "string") { // For some reason, the data in Firefox is in string format, so I have to parse it with Crockford.
						data = JSON.parse(data);
					}

					if (handleUsageError(data)) {
						return;
					}

					if (!data.items) { // if no results were returned, just stop
						return;
					}

					goButton.attr("value", "Take me somewhere else...");

					//randomLink = data.items[random(0, data.items.length - 1)].link; // pick a random result
					randomLink = data.items[0].link; // take the first result from the search (I'm feeling lucky?)
					frameViewer.attr("src", randomLink);
				}
				/* Because of jsonp, jQuery encapsulates the response in it's
                * own function and thus the $.ajax{error} function is never
                * hit, so I removed it and moved error checking to the success
                * function
                */
			});
		});
	},
    getNewApiKey = function (callback) {
        $.get("louie.php?action=key", function (response) {
            apiKey = response;
            callback();
        });
    },
	frameHeight = $(window).height() - parseInt($("#banner").outerHeight(), 10) - 4; // not sure where this 4 is coming from but without the -4, I get a scrollbar which I don't want.

    if (!apiKey) {
        getNewApiKey(function () {
            goButton.removeAttr("disabled");
        });
    } else {
        goButton.removeAttr("disabled");
    }

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
	}).click(go);
});

