/**
 * 粒子类
 */
import util from "../util/util";
export default class Particle {
    constructor(ctx,x,y) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.gravity = .01
        this.particleList = [];
        this.allStop = true;
        this.length = 10;
        this.stopLength = 0
        this.endX = 1;
        this.endY = 1
        //this.init();
    }
    init = ()=>{
        for(let i = 0;i<this.length;i++){
            let vx = Math.random() * 10 - 5;
            let vy = Math.random() * 10 - 5;
            let r = util.randByMoreParam(20, 2, 1);
            let hue = util.randByMoreParam(90, 0, 1);
            let cx1 = util.randByMoreParam(window.canvasWidth, 2, 1);
            let cy1 = util.randByMoreParam(window.canvasHeight, 2, 1);
            let cx2 = util.randByMoreParam(window.canvasWidth, 2, 1);
            let cy2 = util.randByMoreParam(window.canvasHeight, 2, 1);
            let tSpeed = 0.015
            let par = {
                x:this.x, y:this.y, vx:vx, vy:vy, hue:hue,
                r:r, op:1, time:0, gx:0, gy:0,
                t:0, cx1:cx1, cy1:cy1, cx2:cx2,
                cy2:cy2, tSpeed:tSpeed,gravity:this.gravity
            }
            this.particleList.push(par);
        }
    }

    drawParticleList = ()=>{
        for(let i =0;i<this.particleList.length;i++){
            if(this.particleList[i].time>0.1){
                if(this.particleList[i].gx<=1){
                    this.stopLength+=1;
                    continue;
                }
                this.particleList[i].vx = 0;
                this.particleList[i].vy = 0;
                this.particleList[i].gx = this.particleList[i].x
                this.particleList[i].gy = this.particleList[i].y
                let temp = 1 - this.particleList[i].t;
                this.particleList[i].gx = this.particleList[i].x * temp * temp * temp + 3 * this.particleList[i].cx1 * this.particleList[i].t * temp * temp + 3 * this.particleList[i].cx2 * this.particleList[i].t * this.particleList[i].t * temp + this.endX * this.particleList[i].t * this.particleList[i].t * this.particleList[i].t;
                this.particleList[i].gy = this.particleList[i].y * temp * temp * temp + 3 * this.particleList[i].cy1 * this.particleList[i].t * temp * temp + 3 * this.particleList[i].cy2 * this.particleList[i].t * this.particleList[i].t * temp + this.endY * this.particleList[i].t * this.particleList[i].t * this.particleList[i].t;
                this.particleList[i].t+= this.particleList[i].tSpeed
            }else {
                this.particleList[i].gx = this.particleList[i].x
                this.particleList[i].gy = this.particleList[i].y
                this.particleList[i].time+=0.015
            }

            this.ctx.save();
            this.ctx.beginPath();
            this.ctx.arc(this.particleList[i].gx, this.particleList[i].gy, this.particleList[i].r, 0, 2 * Math.PI, false);
            this.ctx.fillStyle = "hsla(" + this.particleList[i].hue + ",100%,50%," + this.particleList[i].op + ")";
            this.ctx.fill();
            this.ctx.restore();

            this.particleList[i].x+=this.particleList[i].vx;
            this.particleList[i].y+=this.particleList[i].vy;
            this.particleList[i].vy+=this.particleList[i].gravity;
            this.particleList[i].hue-=0.5;
        }
    }
    isStop = ()=>{
        if(this.stopLength>=10){
            this.allStop = true;
        }
    }
    draw = ()=>{
        if(this.allStop){
            return;
        }
        this.isStop();
        this.drawParticleList();
    }
}
