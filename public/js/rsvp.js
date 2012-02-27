$.ready((function() {
  function default_text_for_input(id) {
    return {
      rsvpcode: "...(SECRET CODE)...",
      nogoname: "Your Name"
    }[id];
  }

  function submit_rsvp() {
    $.ajax({
      type: 'post',
      url: '/submit/rsvp/' + $("input#rsvpcode").val(),
      success: function(response) {
        $("div#dialog").dialog({
          modal: true,
          resizable: false,
          title: "Great!"
        }).html("Thanks for rsvping. We'll see you there!");
      }
    });
  }

  function submit_nogo() {
    $.ajax({
      type: 'post',
      url: '/submit/nogo/' + $("input#nogoname").val(),
      success: function(response) {
        $("div#dialog").dialog({
          modal: true,
          resizable: false,
          title: "Oh noes!"
        }).html("Sorry you can't make it. We look forward to seeing you soon anyway!");
      }
    });
  }

  $("input#attend_button").click(function() {
    $("#preamble").hide();
    $("#rsvp_attend").toggleClass('hidden');
  });

  $("input#not_attend_button").click(function() {
    $("#preamble").hide();
    $("#rsvp_attend").html("");
    $("#rsvp_no_attend").toggleClass('hidden');
    $("input#nogoname").focus();
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
    else {
      console.log(e.keyCode);
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
