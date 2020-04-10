$(document).ready(
    function() {
        var totalCharacters = 280;
        $("#inputPost").keyup(function (event) {
            var inputText = event.target.value;
            $("#charRemaining").html(totalCharacters - inputText.length);
        }) ;

        function getComments() {			
            $.ajax({
                url: '/getComments/',
                type: 'GET',
                success: function (data) {
                    console.log(data)
					var posts = "";
 
                    for (var i = 0; i < data.length; i++) 
					{
 
                
                        posts += "<div class='row justify-content-md-center pt-4'>" +
                            "<div class='card col-md-6'><div class='row'>"
                            + "<div class='col-md-9'>"+ data[i].comment + "</div>" + "<div class='col-md-3'>" +
                            "<button type='button' name='delete " + data[i]._id + "' class='btn btn-danger'>" +
                            "Delete</button>" + "<button type='button' name='like " + data[i]._id + "' class='btn btn-primary'>Likes <span class='badge badge-light'>"+ data[i].up_votes +"</span>" +
                            "</button></div></div></div></div>";
                    }
                    $("#feedPosts").html(posts);
                }
            });
            
        }

    setInterval(getComments, 10000);

   
$("#postBtn").click(function (event){
	$.ajax({
		url: '/addComment',
		type: 'POST',
		data: {user_name:"Bert",comment:$('#inputPost').val()},
		success: function (data) {
			getComments();
		}
	});
});
 $("#feedPosts").click(function (event) {
			
            var targetArray = event.target.name.split(" ");
            
			if(targetArray[0] == "delete")
            {
                $.ajax({
                    url: '/removeComment/' + targetArray[1],
                    type: 'DELETE',
                    success: function(result) {
                        getComments();
                    }
                });
            }
			else if(targetArray[0] == "like")
            {								
                $.ajax({
                    url: '/upVotes/' + targetArray[1],
                    type: 'PUT',					
                    success: function(result) {
                        getComments();
                    }
                });
            }

        });


    })
 
