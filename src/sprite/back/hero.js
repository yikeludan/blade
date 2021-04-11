import Aram from "./aram";
import Monster from "./monster";
import imageLoader from "../util/imageLoadManager";
export  default class Hero {
    constructor(ctx,canvas) {
        this.ctx = ctx;
        this.canvas = canvas;
        this.heroSprite = null;
        this.angels = [60,180,300];
        this.radius =0 ;
        this.radSpeed = 1
        this.angelSpeed = 1;
        this.index = 3;
        this.ccy  =10;
        this.armsList = [];
        this.moList = [];
        this.lineList = [];
        this.init();

    }
    draw1 =()=> {
        if(this.lineList!=null&&this.lineList.length>=100){
            return;
        }
        this.ccy+=5;
        this.lineList.unshift(this.ccy);
        this.lineList.forEach((y)=>{
            this.ctx.save();
            this.ctx.beginPath();
            this.ctx.strokeStyle='white';

            this.ctx.lineWidth =2;
            this.ctx.moveTo(100, 30);
            this.ctx.lineTo(100,y);
            this.ctx.stroke();
            this.ctx.closePath();
            this.ctx.restore();
        })


    }
    init=()=>{
        let image = new Image();
       // console.log('image = '+imageLoader.heroImage)
        //image.src = imageLoader.heroImage;
        image.src = imageLoader.heroImage;
        this.heroSprite = image;
        this.armsInit();
        this.monsterInit();


    }
    armsInit=()=>{
        for(let i = 0;i<this.index;i++){
            let arms = new Aram(this.ctx,
                this.canvas,
                this.angels[i],this.angelSpeed);
            this.armsList.unshift(arms);
        }
    }
    monsterInit=()=>{
        let mo = new Monster(this.ctx,
            this.canvas,100,30,imageLoader.monsterImageList[0]);
        let mo1 = new Monster(this.ctx,
            this.canvas,200,30,imageLoader.monsterImageList[1]);
        mo1.angel = 30;

        mo.walkLock =true;
        mo.angel= 30;
        mo.poolIndex = 0;
        mo1.poolIndex = 1;
        this.moList.push(mo);
      //  this.moList.push(mo1);

    }
    armsDraw = (x,y)=>{
        for(let i = 0;i<this.index;i++){
            this.armsList[i].x = x;
            this.armsList[i].y = y;
            this.armsList[i].radius = this.radius;
            this.armsList[i].draw(i);
        }
    }
    monsterDraw = (t,aramList)=>{
        this.moList.forEach((monSter,index)=>{
            if(monSter.drawLock){
                //  this.moList.splice(index,1);//会造成闪屏
            }
            monSter.draw(t,aramList);
        })
    }
    heroDraw=(x,y)=>{
        this.ctx.save();
        this.ctx.globalAlpha=11
        this.ctx.drawImage(this.heroSprite,x,y,35,43);
        this.ctx.restore();
    }
    draw=(x,y,t)=>{
        this.radius +=this.radSpeed
        if(this.radius>=60){
            this.radSpeed = 0;
        }
        this.armsDraw(x,y);
        this.heroDraw(x,y);
    }
}
