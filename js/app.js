function tplawesome(e,t){res=e;for(var n=0;n<t.length;n++){res=res.replace(/\{\{(.*?)\}\}/g,function(e,r){return t[n][r]})}return res};

function init() {
  gapi.client.setApiKey("AIzaSyBJaJ8ZlQ-YsEY5QyAeQR18BJZHrneCXJs");
  gapi.client.load("youtube", "v3", function() {
  });
};

//Call 1 for videos
$(function() {
  $("#form").on("submit", function(e) {
     e.preventDefault();

     var request = gapi.client.youtube.search.list({
          part: "snippet",
          type: "video",
          q: encodeURIComponent($("#search").val()).replace(/%20/g, "+"),
          maxResults: 5,
          order: "viewCount",
          publishedAfter: "2015-01-01T00:00:00Z"
     }); 

     request.execute(function(response) {
        var results = response.result;
        $("#yt-con").html("");
        $.each(results.items, function(index, item) {
          $.get("tpl/item.html", function(data) {
              $("#yt-con").append(tplawesome(data, [{"title":item.snippet.title, "videoid":item.id.videoId}]));
          });
        });
     });
  });
});

$(function() {
    $("#Mform").on("submit", function(e) {
       e.preventDefault();
  
       var request = gapi.client.youtube.search.list({
            part: "snippet",
            type: "video",
            q: encodeURIComponent($("#Msearch").val()).replace(/%20/g, "+"),
            maxResults: 5,
            order: "viewCount",
            publishedAfter: "2015-01-01T00:00:00Z"
       }); 
  
       request.execute(function(response) {
          var results = response.result;
          $("#music-con").html("");
          $.each(results.items, function(index, item) {
            $.get("tpl/item.html", function(data) {
                $("#music-con").append(tplawesome(data, [{"title":item.snippet.title, "videoid":item.id.videoId}]));
            });
          });
       });
    });
  });