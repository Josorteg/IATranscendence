export class Ball{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
    setColor(color){
        this.color = color;
    }
    draw(ctx){
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 10, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }
    update(newX, newY){
        this.x = newX;
        this.y = newY;
    }
}
