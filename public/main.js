$(function() {
	$.get("/blog", function(response) {
			console.log("this is response.post", response);
		for (i = 0; i<response.length; i++) {
			var postTitle = $("<h3></h3>").text(response[i].title);
			var postBody = $("<h3></h3>").text(response[i].body);
			
			$("#message").append(postTitle, postBody);
		}
		
	});

	$("#postForm").submit(event => {
		event.preventDefault();

		var form = event.target;
		// var url = "/post";

		var formData = $(form).serialize();

		var title = $(form).find("input[name=title]");
		var body = $(form).find("textarea[name=body]");

		var titleVal = title.val();
		var bodyVal = body.val();


		var requestData = { 
			title: titleVal,
			body:  bodyVal
		};

		$.post("/post", requestData, function(response) {
			console.log(response);

			var postTitle = $("<h3></h3>").text(response.title);
			var postBody = $("<h3></h3>").text(response.body);

			$("#message").append(postTitle, postBody);
		});

		
	});
});