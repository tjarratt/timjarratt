var left = $("img#left_background");
var left2 = $("img#left_background2");

var right = $("img#right_background");
var right2 = $("img#right_background2");

function slide_open() {
  left2.animate({left: '110px'}, 800, "linear", function() {
    left.animate({left: '5px'}, 500);
    left2.animate({left: '5px'}, 500);
  });

  right2.animate({left: '590px'}, 800, "linear", function() {
    right.animate({left: '710px'}, 500);
    right2.animate({left: '710px'}, 500);
  });
}

$("#curtains img").each(function(index, img) {
  console.log(index, img);
  img.onMouseDown = function(e) {
    console.log(e);
    e.preventDefault();
    return false;
  };
  img.onmousedown = img.onMouseDown;
});

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

  if (pxtoi(right2) < 590) {
    slide_right(right2);
  }
  else if (pxtoi(right) < 710) {
    slide_right(right);
    slide_right(right2);
  }
});

function pxtoi(element) {
  return (element.css('left').replace('px', '') - 0);
}

function slide_left(element, duration, callback) {
  duration = duration? duration : 100;
  element.animate({left: '-=10'}, duration, "swing", function() {
    if (pxtoi(element) < 10) {
      element.stop();
      element.animate({left: '5px'});
    }

    if (typeof callback == 'function') {
      callback();
    }
  }.bind(element));
}

function slide_right(element, duration, callback) {
  duration = duration? duration : 100;
  element.animate({left: '+=10'}, duration, "swing", function() {
    if (pxtoi(element) > 710) {
      element.stop();
      element.animate({left: '710px'});
    }

    if (typeof callback == 'function') {
      callback();
    }
  }.bind(element));
}

$("#curtainContent").css("visibility", "visible");
