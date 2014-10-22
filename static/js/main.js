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
    interval_id = setInterval(function() {
      back.draw_background();
    }, 60);
  }

  $(window).resize(function() {
    if (interval_id) {
      clearInterval(interval_id);
    }
    draw_stuff();  
  });

  draw_stuff();
});
