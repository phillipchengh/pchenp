$(document).ready(function() {
  canvas = document.getElementById('background');
  context = canvas.getContext('2d');
  $canvas = $('#background');

  function draw_stuff() {
    var height = $(window).height() - 20; 
    var width = $(window).width() - 20;
    $canvas.attr('height', height);
    $canvas.attr('width', width);
    var back = new background(height, width);
    back.reset_background();
    setInterval(function() {
      back.draw_background();
    }, 60);
  }

  $(window).resize(draw_stuff);

  draw_stuff();
});
