function star(height, width) {

  this.settings = {
    life_time: 20000,
    x_speed: 5,
    y_speed: 2,
    max_radius: 20,
    ratio: 1,
    color1: '255,255,255',
    color2: '77,101,181',
    color3: '77,101,181'
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
