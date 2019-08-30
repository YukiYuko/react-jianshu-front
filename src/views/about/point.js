class Round_item {
  index;
  x;
  y;
  r;
  color;
  ctx;
  constructor(index, x, y, ctx) {
    this.index = index;
    this.x = x;
    this.y = y;
    this.ctx = ctx;
    this.r = Math.random() * 20 + 1;
    const alpha = (Math.floor(Math.random() * 10) + 1) / 10 / 2;
    this.color = `rgba(0,0,0, ${alpha})`;
  }
  // 绘制
  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
    this.ctx.closePath();
    this.ctx.fillStyle = this.color;
    this.ctx.shadowBlur = this.r * 2;
    this.ctx.fill();
  }
  // 运动
  move(HEIGHT) {
    this.y -= 1;
    if (this.y <= -10) {
      this.y = HEIGHT + 10;
    }
    this.draw();
  }
}

export { Round_item };
