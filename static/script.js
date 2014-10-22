function background(height, width) {

  this.reset_background = function() {
    context.clearRect(0, 0, width, height);
    this.starzus = [];
    for (var i = 0; i < 50; i++) {
      var starzu = new star(height, width);
      this.starzus.push(starzu); 
      starzu.reset();
    }
  };

  this.draw_background = function() {
    context.clearRect(0, 0, width, height);
    for (var i = 0; i < this.starzus.length; i++) {
      this.starzus[i].fade();
      this.starzus[i].draw();
    }
  };

}


$(document).ready(function() {
  canvas = document.getElementById('background');
  context = canvas.getContext('2d');
  $canvas = $('#background');

  function draw_stuff() {
    var height = $(window).height(); 
    var width = $(window).width();
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

function star(height, width) {

  var COLOR = '255,82,82';

  this.settings = {
    life_time: 10000,
    x_speed: 5,
    y_speed: 2,
    max_radius: 14,
    ratio: 1,
    color1: '255,82,82',
    // color2: '77,101,181',
    color2: '34,34,52',
    // color2: '10,10,30',
    color3: '34,34,52'
    // color3: '10,10,30'
  };

  this.reset = function() {
    this.x = width * Math.random();
    this.y = height * Math.random();
    this.r = ((this.settings.max_radius - 1)*Math.random()) + 1;
    this.half_life = (this.settings.life_time / 60) * (this.r / this.settings.max_radius);
    this.ratio = Math.random() * this.half_life;
    this.color_stop = Math.random() * 0.2 + 0.4;
  };

  this.fade = function() {
    this.ratio += this.settings.ratio;
  };

  this.draw = function() {
    if (this.ratio <= 0 || this.ratio >= this.half_life) {
      this.settings.ratio *= -1; 
    } 
    if (this.ratio >= this.half_life) {
      this.reset();
    }
    var new_opacity = 1 - (this.ratio / this.half_life);    
    context.beginPath();
    context.arc(this.x, this.y, this.r, 0, Math.PI * 2, true);
    context.closePath();
    var r_new_opacity = this.r * new_opacity;
    r_new_opacity = r_new_opacity <= 0 ? 1 : r_new_opacity;
    var g = context.createRadialGradient(this.x, this.y, 0, this.x, this.y, r_new_opacity);
    g.addColorStop(0.0, 'rgba(' + this.settings.color1 + ',' + new_opacity + ')');
    g.addColorStop(this.color_stop, 'rgba(' + this.settings.color2 + ',' + (new_opacity * 0.6) + ')');
    g.addColorStop(1.0, 'rgba(' + this.settings.color3 + ',0)');
    context.fillStyle = g;
    context.fill();
  };

}
