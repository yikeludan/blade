/**
 * 武器精灵类
 */
import imageLoader from "../util/imageLoadManager";
export  default class Aram {
    constructor(ctx,canvas,angel,angelSpeed) {
        this.ctx = ctx;
        this.AramSprite = null;
        this.angel = angel;
        this.radius = 0;
        this.angelSpeed = angelSpeed;
        this.x=0;
        this.y = 0;
        this.attackPoint = {x:0,y:0}
        this.init();

    }
    init=()=>{
        let image = new Image();
        image.src = imageLoader.aramImage;
        this.AramSprite = image;
    }

    drawDemo = (x,y)=>{

        let x11 = this.x+Math.sin(20 * Math.PI / 180)*85;
        let y11 = this.y+Math.cos(20 * Math.PI / 180)*85;
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.fillStyle = 'red'
        this.ctx.arc(x11,y11,2,0,2*Math.PI)
        this.ctx.fill()
        this.ctx.closePath();
        this.ctx.restore();
    }

    draw=(i)=>{
        let x1 = this.x+Math.sin(this.angel * Math.PI / 180)*this.radius;
        let y1 = this.y+Math.cos(this.angel * Math.PI / 180)*this.radius;

        this.angel+=this.angelSpeed;
       // this.drawDemo(x1+17,y1+22);
        this.ctx.save();
        this.ctx.translate(x1+17, y1+22);
        this.attackPoint.x = x1+17;
        this.attackPoint.y = y1+22;
        this.ctx.rotate(-(this.angel * Math.PI / 180));
        this.ctx.drawImage(this.AramSprite,-17, -7,35,15);
        this.ctx.restore();
    }
}
