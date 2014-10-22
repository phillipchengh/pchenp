function background(height, width) {

  this.reset_background = function() {
    this.starzus = [];
    for (var i = 0; i < 25; i++) {
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

