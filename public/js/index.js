var left = $("img#left_background");
var left2 = $("img#left_background2");

var right = $("img#right_background");
var right2 = $("img#right_background2");

$(window).scroll(function(e) {
  [left, left2, right, right2].forEach(function(element) {
    element.stop();
  });

  if (pxtoi(left2) > 110) {
    slide_left(left2);
  }
  else if (pxtoi(left) > 5) {
    slide_left(left);
    slide_left(left2);
  }

  if (pxtoi(right2) < 450) {
    slide_right(right2);
  }
  else if (pxtoi(right) < 565) {
    slide_right(right);
    slide_right(right2);
  }
});

function pxtoi(element) {
  return (element.css('left').replace('px', '') - 0);
}

function slide_left(element) {
  element.animate({left: '-=10'}, 100, "swing", function() {
    if (pxtoi(element) < 10) {
     element.css('left', '5px');
    }
  }.bind(element));
}

function slide_right(element) {
  element.animate({left: '+=10'}, 100, "swing", function() {
    console.log(element.css('left'));
    console.log(element.attr('id'));
    if (pxtoi(element) > 550) {
     element.css('left', '550px');
    }
  }.bind(element));
}

$("#curtainContent").css("visibility", "visible");
