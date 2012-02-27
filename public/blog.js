$(document).ready(function() {
  $.ajax({
    type: 'get',
    url: '/blog/recent',
    success: function(response) {
      var container = $("#blogContainer");
      var template = $("script[name=entry]").html();
      response.forEach(function(entry) {
        console.log(entry);
        var locals = {
          title: entry.title,
          content: entry.content
        };
        container.append($(Mustache.to_html(template, locals)));
      });
    }
  });
});
