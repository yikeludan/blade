import imageLoader from "../util/imageLoadManager";
import Tween from "../util/tween";
export  default class Boss {
    constructor(ctx) {
        this.ctx = ctx;
        this.bossSprite = null;
        this.x = 0;
        this.y = 0;
        this.bossWalkAnVecParam = {
            checkAnimaFlag:0,
            anValue:0,
            start:0,
            begin:1,
            end:200,
            during:200,
        }
        this.init();
    }
    init=()=>{
        let image = new Image();
        image.src = imageLoader.bossImage;
        this.bossSprite = image;
    }
    clBossWalkAnValue = ()=>{
        if(this.bossWalkAnVecParam.anValue>=this.bossWalkAnVecParam.end){
            this.bossWalkAnVecParam.start = 0;
        }else {
            this.bossWalkAnVecParam.anValue  = Tween.Quart.easeInOut(
                this.bossWalkAnVecParam.start,
                this.bossWalkAnVecParam.begin,
                this.bossWalkAnVecParam.end,
                this.bossWalkAnVecParam.during);
            this.bossWalkAnVecParam.start++;

        }
    }
    drawBody = ()=>{
        this.ctx.drawImage(this.bossSprite,186,115,
            187,195,400,100-450+500
            ,290,300);
    }

    drawMonth = ()=>{
        this.ctx.drawImage(this.bossSprite,200,415,
            200,200,440,300-450+500
            ,220,200);
    }
    drawFoot =(t)=>{
        let _scale = 10 + Math.sin(t * 0.03) * 10;
        this.ctx.save();
        this.ctx.translate(440,210-450+500);
        this.ctx.rotate(-_scale * Math.PI / 180)

        this.ctx.drawImage(this.bossSprite,210,1,
            59,110,-80,-140
            ,90,140);

        this.ctx.restore();
    }
    drawArc =()=>{
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.fillStyle = 'red'
        this.ctx.arc(10,10,10,0,2*Math.PI)
        this.ctx.fill()
        this.ctx.closePath();
        this.ctx.restore();
    }
    draw = (t)=>{
        this.drawFoot(t);
        this.drawBody();
        this.drawMonth();
    }
}
