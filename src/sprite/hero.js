import Aram from "./aram";
import Monster from "./monster";
import imageLoader from "../util/imageLoadManager";
import heroAnimainParam from "../animainParam/hero/heroAnimainParam";
import {
    plusAnimainByQuartEaseInOut,
    reduceAnimainByQuartEaseInOut,
    moveToVecByTween
} from "../manager/globalAnimationManager";
export  default class Hero {
    constructor(ctx,canvas) {
        this.ctx = ctx;
        this.canvas = canvas;
        this.heroSprite = null;
        this.angels = [0,60,120,180,240,300];
        this.radius =1 ;
        this.radSpeed = 1.5
        this.angelSpeed = window.heroAramSpeed;
        this.index = 6;
        this.ccy  =10;
        this.armsList = [];
        this.moList = [];
        this.lineList = [];
        this.x = 0;
        this.y = 0;
        this.lastT = 0
        this.brokenV1Flag = false;
        this.brokenV2Flag = true;
        this.brokenV3Flag = true;
        this.brokenV4Flag = true;

        this.heroSwitchVecList = [
            {px:320,py:350,tx:-72,ty:-95,sx:170,sy:190,angel:0},
            {px:700,py:620,tx:-62,ty:-80,sx:170,sy:190,angel:0},
            {px:460,py:750,tx:-80,ty:-120,sx:145,sy:200,angel:270}
        ];
        this.swtichLock = false;


        this.brokenParam = {
            angel:30,
            radius:80,
            angelSpeedNum:30,
            mx:0,
            my:80,
            index:12,
        }

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

    }
    armsDraw = (x,y)=>{
        if(window.stopAramUpdate){
            return
        }
        for(let i = 0;i<this.index;i++){
            this.armsList[i].x = this.x;
            this.armsList[i].y = this.y;
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
    homePageHeroAnY = (x,y)=>{
        if(window.stopUpdate){
            return;
        }
        if(window.checkMainHeroAniFlag == 1){
            plusAnimainByQuartEaseInOut(heroAnimainParam.initY,()=>{
                heroAnimainParam.initY.isLock = false;
            })

        }
        if(window.checkMainHeroAniFlag == 2){
            reduceAnimainByQuartEaseInOut(heroAnimainParam.initY,()=>{
                heroAnimainParam.initY.isLock = false;
            })

        }
        this.y-=heroAnimainParam.initY.anValue;
    }
    heroDraw=(x,y,t)=>{
        if(!window.hideBrokenSprte){
            return;
        }
        this.ctx.save();
        this.y = this.y-heroAnimainParam.tailY.anValue-heroAnimainParam.beginAttack.anValue
        if(window.nextSence){
            this.y =  window.initHeroVecY;
            this.x = window.initHeroVecX ;
        }else {
            window.initHeroVecY = this.y;
            window.initHeroVecX = this.x;
        }
        this.ctx.translate(this.x,this.y)
        this.ctx.scale(
            heroAnimainParam.scale.anValue+heroAnimainParam.broken.anValue,
            heroAnimainParam.scale.anValue+heroAnimainParam.broken.anValue);
        this.drawSwitchIndexHero(t);
        this.ctx.restore();
    }
    drawSwitchIndexHero = (t)=>{
        let _scale = 0;
        if(window.stopHeroScaleUpdate){
            _scale = 0;
        }else {
             _scale = 10 + Math.sin(t * 0.03) * 10;
        }
        //

        this.ctx.rotate(-(this.heroSwitchVecList[window.checkSwitchHeroAniFlag].angel+_scale) * Math.PI / 180);
        this.ctx.drawImage(window.homeSpV4,
            this.heroSwitchVecList[window.checkSwitchHeroAniFlag].px,
            this.heroSwitchVecList[window.checkSwitchHeroAniFlag].py,
            100,120,
            this.heroSwitchVecList[window.checkSwitchHeroAniFlag].tx,
            this.heroSwitchVecList[window.checkSwitchHeroAniFlag].ty,
            this.heroSwitchVecList[window.checkSwitchHeroAniFlag].sx,
            this.heroSwitchVecList[window.checkSwitchHeroAniFlag].sy);
    }
    clBrokenScaleAnValue = (t)=>{
        if(window.stopHeroScaleUpdate){
            return;
        }
        plusAnimainByQuartEaseInOut(heroAnimainParam.broken,()=>{
            window.stopHeroScaleUpdate = true;
            window.showBrokenSprte = true;
            window.hideBrokenSprte = false;
        })
    }
    switchFlashAnValue = ()=>{
        if(window.stopUpdate){
            return;
        }
        if(this.swtichLock){
            heroAnimainParam.flashScale.anValue = 0;
            heroAnimainParam.scale.anValue = 0;
            heroAnimainParam.globalAlpha.anValue = 0.1;
            this.swtichLock = false;
        }
        plusAnimainByQuartEaseInOut(heroAnimainParam.flashScale,()=>{
            heroAnimainParam.flashScale.isLock = false;
        })
        reduceAnimainByQuartEaseInOut(heroAnimainParam.globalAlpha,()=>{
           heroAnimainParam.globalAlpha.isLock = false;
        })
        plusAnimainByQuartEaseInOut(heroAnimainParam.scale,()=>{
           heroAnimainParam.scale.isLock = false;
        })


    }

    drawSwitchFlash =(t)=>{
        if(window.stopUpdate){
            return;
        }
        this.ctx.save();
        this.ctx.translate(this.x,this.y+10)
        this.ctx.globalAlpha = heroAnimainParam.globalAlpha.anValue
        this.ctx.scale(heroAnimainParam.flashScale.anValue,heroAnimainParam.flashScale.anValue);
        this.ctx.rotate(-90 * Math.PI / 180);
        this.ctx.drawImage(window.homeSpV4,10,420,
            100,180,-60,-100
            ,120,200);
        this.ctx.restore();
    }

    seedParam = (x,y)=>{

        this.x = x;
        this.y = y;
        this.radius +=window.aramsRadiuSpeed
        if(this.radius>=160){
            window.aramsRadiuSpeed  = 0;
        }
        if(this.radius<1&&!window.stopRadiusUpdate){
            window.aramsRadiuSpeed = 0;
            window.stopAramUpdate = true;
            window.stopHeroScaleUpdate = false;
            window.stopRadiusUpdate = true
        }
    }
    clHeroBrokenRidusAnValueV2 = (t)=>{
        if(this.brokenV2Flag){
            return
        }
        reduceAnimainByQuartEaseInOut(heroAnimainParam.brokenRidus,()=>{
            this.brokenV2Flag  = true;
            window.showBrokenSprte = false;
            window.hideBrokenSprte = true;
            this.brokenV3Flag = false;
            heroAnimainParam.brokenRidus.isLock = false;
        })

    }
    clHeroBrokenRidusAnValue=(t)=>{
        if(!window.showBrokenSprte){
            return;
        }
        if(this.brokenV1Flag){
            return;
        }
        plusAnimainByQuartEaseInOut(heroAnimainParam.brokenRidus,()=>{
            this.brokenV1Flag = true;
            this.brokenV2Flag = false;
            heroAnimainParam.brokenRidus.isLock = false;
        })

    }
    drawSpriteBroken = (t)=>{
        if(!window.showBrokenSprte){

            return;
        }


        for(let i = 0;i<12;i++){
            let lx = Math.sin(this.brokenParam.angel * Math.PI / 180)*this.brokenParam.radius;
            let ly = Math.cos(this.brokenParam.angel * Math.PI / 180)*this.brokenParam.radius;
            let x4 = Math.sin(this.brokenParam.angel * Math.PI / 180)*heroAnimainParam.brokenRidus.anValue;
            let y4 = Math.cos(this.brokenParam.angel * Math.PI / 180)*heroAnimainParam.brokenRidus.anValue;
            this.ctx.save();
            this.ctx.translate(this.x+x4,this.y+y4);
            this.ctx.beginPath();
            this.ctx.lineWidth = 0.5
            this.ctx.moveTo(this.brokenParam.mx, this.brokenParam.my);
            this.ctx.lineTo(0, 0);
            this.ctx.lineTo(lx, ly);
            this.ctx.strokeStyle = 'red'
            this.ctx.stroke();
            this.ctx.closePath();
            this.ctx.clip();
            this.ctx.rotate(-0 * Math.PI / 180);
            this.drawSwitchIndexHero(t);
            this.ctx.restore();
            this.brokenParam.mx = lx;
            this.brokenParam.my = ly;
            this.brokenParam.angel+=this.brokenParam.angelSpeedNum;
        }
    }

    drawTail =()=>{
        this.ctx.save();
        this.ctx.globalAlpha = heroAnimainParam.tailGla.anValue
        this.ctx.drawImage(window.homeSpV4,180,350,
            70,130,window.canvasWidth/2-80,window.canvasHeight/2+100-heroAnimainParam.tailY.anValue
            ,170,heroAnimainParam.tailHeight.anValue);
        this.ctx.restore();

    }
    clBeginAttackAnValue = (t)=>{
        if(this.brokenV4Flag){
            return;
        }
        plusAnimainByQuartEaseInOut(heroAnimainParam.beginAttack,()=>{
            this.brokenV4Flag = true;
            window.stopAramUpdate = false;
            this.radius = 160;
        })

    }
    clTailAnValue = (t) =>{
        if(this.brokenV3Flag){
            return
        }
        plusAnimainByQuartEaseInOut(heroAnimainParam.tailY,()=>{
            this.brokenV3Flag = true;
            window.stopHeroClAnValue = true;
            window.stopUpdate = true;
            window.beginAttack = true;
            heroAnimainParam.tailY.anValue = 0;
            this.brokenV4Flag = false;
        })
        plusAnimainByQuartEaseInOut(heroAnimainParam.tailHeight,()=>{

        })
        reduceAnimainByQuartEaseInOut(heroAnimainParam.tailGla,()=>{

        })


    }
    clNextSenceBeforeVec =()=>{
        if(window.nextSence){
            let x =  window.initHeroVecX + (window.canvasWidth/2 - window.initHeroVecX) * this.lastT;
            let y =  window.initHeroVecY + (window.canvasHeight/2 - window.initHeroVecY) * this.lastT;
            if(x === window.canvasWidth/2){
                window.gameOver =true;
            }
            this.lastT+=0.015;
            //this.x = x;
            //this.y = y;
            window.initHeroVecY = y;
            window.initHeroVecX = x;

        }
    }
    clcountNextSenceBefore = ()=>{
        if(window.nextSenceBefore){
            plusAnimainByQuartEaseInOut(heroAnimainParam.countNextSence,()=>{
                window.nextSence = true;
            })
        }

    }

    draw=(x,y,t)=>{
        this.seedParam(x,y);
        if(!window.stopHeroClAnValue){
            this.homePageHeroAnY();
            this.switchFlashAnValue();
            this.clBrokenScaleAnValue(t);
            this.clHeroBrokenRidusAnValue(t);
            this.clHeroBrokenRidusAnValueV2(2);
            this.clTailAnValue(t);
            this.drawSpriteBroken(t);
        }
        this.clNextSenceBeforeVec();
        this.clBeginAttackAnValue(t);
        this.armsDraw(this.x,this.y);
        this.heroDraw(this.x,this.y,t);
        if(!window.stopHeroClAnValue){
            this.drawSwitchFlash(t);
            this.drawTail();
        }

    }
}
