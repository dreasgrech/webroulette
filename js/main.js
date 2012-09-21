$(function() {
	var API_KEY = 'AIzaSyC7nVXG_kZl74FvUuLKGAaAGd_7kzDZEW8',
    length = 3,
	viewport = function() {
        /*
        * http://andylangton.co.uk/articles/javascript/get-viewport-size-javascript/
        */
		var e = window,
		a = 'inner';

		if (!('innerWidth' in window)) {
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
		$.get("louie.php?length=" + length, function(phrase) {
			console.log(phrase);
			$.getJSON("https://www.googleapis.com/customsearch/v1?key=" + API_KEY + "&cx=013036536707430787589:_pqjad5hr1a&q=" + phrase + "&alt=json", function(data) {
				var randomLink;
                if (!data.items) {
                    return go();
                }

				randomLink = data.items[random(0, data.items.length - 1)].link;

				$("#frameviewer").attr("src", randomLink);
			});
		});
	};

	var frameHeight = viewport().height - parseInt($("#banner").outerHeight(), 10);
	$("#frameviewer").css("height", frameHeight);
	$("#banner").css('display', 'none').slideDown();
	$("#go").mousedown(function () { $(this).addClass('go_click');}).mouseup(function () { $(this).removeClass('go_click');}).click(function () {
        $(this).attr("value", "Take me somewhere else...");
        go();
    });
});

