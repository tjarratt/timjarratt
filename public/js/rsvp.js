$.ready((function() {
  var container = $("div#rsvpContainer")
  var resize = function() {
    var height = $(window).height() - 83;
	container.css("height", (height < 410) ? 410 : height );
  };
  $(window).resize(resize);
  resize();

  function default_text_for_input(id) {
    return {
      rsvpcode: "...(SECRET CODE)...",
      nogoname: "Your Name"
    }[id];
  }

  function failure_handler() {
    $("div#dialog").dialog({
      modal: true,
      resizable: false,
      title: 'Whoops!'
    }).html("<p>Sorry, either you typed that wrong, or something's borked on the backend.</p><p>You can either try again, or email me at tjarratt@gmail.com</p>").show();;
  }

  function submit_rsvp() {
    $.ajax({
      type: 'post',
      url: '/submit/rsvp/' + $("input#rsvpcode").val(),
      success: function(response) {
        if (response == true) {
          $("div#dialog").dialog({
            modal: true,
            resizable: false,
            title: "Great!"
          }).html("Thanks for rsvping. We'll see you there!");
        }
        else {
          failure_handler();
        }
      },
      failure: failure_handler
    });
  }

  function submit_nogo() {
    $.ajax({
      type: 'post',
      url: '/submit/nogo/' + $("input#nogoname").val(),
      success: function(response) {
        if (response != true) {
          $("div#dialog").dialog({
            modal: true,
            resizable: false,
            title: "Oh noes!"
          }).html("Sorry you can't make it. We look forward to seeing you soon anyway!");

        }
        else {
          failure_handler();
        }
      },
      failure: failure_handler
    });
  }

  $("input#attend_button").click(function() {
    $("#preamble").hide();
    $("#rsvp_attend").toggleClass('hidden');
    $("div.rsvpBlock").css("height", "230px");
  });

  $("input#not_attend_button").click(function() {
    $("#preamble").hide();
    $("#rsvp_attend").html("");
    $("#rsvp_no_attend").toggleClass('hidden');
    $("input#nogoname").focus();
    $("div.rsvpBlock").css("height", "220px");
  });

  $("input").focus(function() {
    $(this).removeClass("inactive").val("");
  });
  $("input").blur(function() {
    if (this.value.length == 0) {
      $(this).addClass("inactive").val(default_text_for_input(this.id));
    }
  });

  $("input#rsvpcode").on("keypress", function(e) {
    if (e.keyCode == 13) {
      submit_rsvp();
    }
  });
  $("input#rsvpsubmit").on("click", submit_rsvp);

  $("input#nogoname").on("keypress", function(e) {
    if (e.keyCode == 13) {
      submit_nogo();
    }
  });
  $("input#nogosubmit").on("click", submit_nogo);
})());
