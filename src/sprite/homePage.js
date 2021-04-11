import imageLoader from "../util/imageLoadManager";
import homePageAnimainParam from "../animainParam/homePage/homePageAnimainParam";
import {plusAnimainByQuartEaseInOut,
    reduceAnimainByQuartEaseInOut}
    from '../manager/globalAnimationManager'
import Particle from "./particle";
export  default class HomePage {
   constructor(ctx) {
       this.ctx = ctx;
       this.homeSpV1 = null;
       this.homeSpV2 = null;
       this.homeSpV3 = null;
       this.homeSpV4 = null;
       this.homeSpV6 = null;
       this.particleSp = null;
       this.bounceSpring = 0.03;
       this.rockOneClickFlag = 0;
       this.rockOneAnimaFlag = 0;
       this.rockTwoClickFlag = 0;
       this.rockTwoAnimaFlag = 0;
       this.isBackMusic = false;
       this.showShadowFlag = 0;
       this.showAllSprite = 0;

       this.chckHeroAniParam = {
           checkAnimaFlag:0,

       }
       this.chckStorkeAniParam = {
           checkAnimaFlag:0,
           chckAnX:0,
       }
       this.stopUpdate = false;
       this.init();
   }
   init =()=>{
       let image1 = new Image();
       let image2 = new Image();
       let image3 = new Image();
       let image4 = new Image();
       let image6 = new Image();
       image1.src = imageLoader.homePageImage;
       image2.src = imageLoader.homePageImageV2;
       image3.src = imageLoader.homePageImageV3;
       image4.src = imageLoader.homePageImageV4;
       image6.src = imageLoader.homePageImageV6;
       this.homeSpV1 = image1;
       this.homeSpV2 = image2;
       this.homeSpV3 = image3;
       this.homeSpV4 = image4;
       window.homeSpV6 = image6;


       window.checkVecMap['goStart'] = {
           topLeftX:window.canvasWidth/6,topLeftY:0,
           topRightX:window.canvasWidth/1.2,topRightY:0,
           bottomLeftX:window.canvasWidth/6,bottomLeftY:window.canvasHeight/1.3,
           bottomRightX:window.canvasWidth/1.2,bottomRightY:window.canvasHeight/1.3
       }
       window.homeSpV4 = this.homeSpV4;
       this.initParticleLock = false;
       this.initParticle();

   }
   initParticle =()=>{
       let particleObj = new Particle(
           this.ctx,window.canvasWidth/1.15,window.canvasHeight/1.8);
       particleObj.allStop = false;
       this.particleSp = particleObj

   }
   drawTitle =(t)=>{
       let _scale = 1 + Math.sin(t * 0.01) * this.bounceSpring;
      this.ctx.save();
      this.ctx.translate(window.canvasWidth/2,window.canvasHeight/8
          -homePageAnimainParam.hideAllSpriteParam.anValue+homePageAnimainParam.showAllSpriteParam.anValue)
      this.ctx.rotate(-0 * Math.PI / 180)
      this.ctx.drawImage(this.homeSpV1,3,4,
           410,160,-250*_scale,-110
           ,550,220*_scale);
      this.ctx.restore();
   }
    drawGift = ()=>{
       this.ctx.drawImage(this.homeSpV2,800,950,
           200,200,window.canvasWidth/1.3
           +homePageAnimainParam.hideAllSpriteParam.anValue-homePageAnimainParam.showAllSpriteParam.anValue,
           window.canvasHeight/3
           ,200,200);
   }

    drawCron = (t)=>{
            //let _scale = 1 + Math.sin(t * 0.01) * 0.05;
            this.ctx.save();
            this.ctx.translate(window.canvasWidth/1.15
                +homePageAnimainParam.hideAllSpriteParam.anValue-homePageAnimainParam.showAllSpriteParam.anValue,
                window.canvasHeight/1.8)
            let scale = 1;
            if(window.clickGron){
                scale = 0.8
                this.initParticleLock = true;
                window.clickGron = false;
            }
            this.ctx.scale(scale,scale);
            this.ctx.drawImage(this.homeSpV2,800,1400,
            200,230,-100,-115
            ,200,230);
            this.ctx.restore();

        window.checkVecMap['goCron'] = {
            topLeftX:window.canvasWidth/1.15-50,topLeftY:window.canvasHeight/1.8-50,
            topRightX:window.canvasWidth/1.15+50,topRightY:window.canvasHeight/1.8-50,
            bottomLeftX:window.canvasWidth/1.15-50,bottomLeftY:window.canvasHeight/1.8+50,
            bottomRightX:window.canvasWidth/1.15+50,bottomRightY:window.canvasHeight/1.8+50
        }
    }
    drawRockOne = ()=>{
        if(this.rockOneAnimaFlag == 1){
            plusAnimainByQuartEaseInOut(homePageAnimainParam.rockOne,()=>{
                this.rockOneClickFlag = 1;
                this.showShadowFlag = 1;
                window.checkMainHeroAniFlag = 1;
                this.chckHeroAniParam.checkAnimaFlag = 1;
                homePageAnimainParam.rockOne.isLock = false;
            })

        }

        if(this.rockOneAnimaFlag == 2){
            reduceAnimainByQuartEaseInOut(homePageAnimainParam.rockOne,()=>{
                this.showShadowFlag = 0;
                this.rockOneClickFlag = 0;
                window.checkMainHeroAniFlag = 2;
                this.chckHeroAniParam.checkAnimaFlag = 2;
                homePageAnimainParam.rockOne.isLock = false;
            })

        }
        this.ctx.drawImage(this.homeSpV1,3,330,
            200,170,window.canvasWidth/6,
            (window.canvasHeight/1.15)-homePageAnimainParam.rockOne.anValue+
            homePageAnimainParam.hideAllSpriteParam.anValue-homePageAnimainParam.showAllSpriteParam.anValue
            ,350,350);
        this.ctx.drawImage(this.homeSpV4,700,620,
            100,120,window.canvasWidth/3.8,
            (window.canvasHeight/1.25)-homePageAnimainParam.rockOne.anValue+
            homePageAnimainParam.hideAllSpriteParam.anValue-homePageAnimainParam.showAllSpriteParam.anValue
            ,170,190);
        window.checkVecMap['rockOne'] = {
            topLeftX:window.canvasWidth/6,topLeftY:window.canvasHeight/1.15,
            topRightX:window.canvasWidth/2.2,topRightY:window.canvasHeight/1.15,
            bottomLeftX:window.canvasWidth/6,bottomLeftY:window.canvasHeight,
            bottomRightX:window.canvasWidth/2.2,bottomRightY:window.canvasHeight
        }
    }

    drawRockTwo = ()=>{
        if(this.rockTwoAnimaFlag == 1){
            plusAnimainByQuartEaseInOut(homePageAnimainParam.rockTwo,()=>{
                this.StartRockTwo = 0;
                this.rockTwoClickFlag = 1;
                homePageAnimainParam.rockTwo.isLock = false;

            })

        }

        if(this.rockTwoAnimaFlag == 2){
            reduceAnimainByQuartEaseInOut(homePageAnimainParam.rockTwo,()=>{
                this.StartRockTwo = 0;
                this.rockTwoClickFlag = 0;
                homePageAnimainParam.rockTwo.isLock = false;
            })

        }
        this.ctx.drawImage(this.homeSpV1,3,510,
            150,180,window.canvasWidth/1.8,
            (window.canvasHeight/1.15)-homePageAnimainParam.rockTwo.anValue+
                homePageAnimainParam.hideAllSpriteParam.anValue-homePageAnimainParam.showAllSpriteParam.anValue

            ,350,350);
        this.ctx.drawImage(this.homeSpV4,680,770,
            100,120,window.canvasWidth/1.5,
            (window.canvasHeight/1.25)-homePageAnimainParam.rockTwo.anValue+
            homePageAnimainParam.hideAllSpriteParam.anValue-homePageAnimainParam.showAllSpriteParam.anValue
            ,170,190);
        window.checkVecMap['rockTwo'] = {
            topLeftX:window.canvasWidth/1.7,topLeftY:window.canvasHeight/1.15,
            topRightX:window.canvasWidth/1.1,topRightY:window.canvasHeight/1.15,
            bottomLeftX:window.canvasWidth/1.7,bottomLeftY:window.canvasHeight,
            bottomRightX:window.canvasWidth/1.1,bottomRightY:window.canvasHeight
        }
    }



    drawCheckOne = ()=>{
        if(this.chckHeroAniParam.checkAnimaFlag == 1){
            reduceAnimainByQuartEaseInOut(homePageAnimainParam.sildeHero,()=>{
                homePageAnimainParam.sildeHero.isLock = false;
            })
        }

        if(this.chckHeroAniParam.checkAnimaFlag == 2){
            plusAnimainByQuartEaseInOut(homePageAnimainParam.sildeHero,()=>{
                homePageAnimainParam.sildeHero.isLock = false;
            })
        }
        this.ctx.save();
        this.ctx.drawImage(this.homeSpV3,570,212,
            101,104,window.canvasWidth/4.5-homePageAnimainParam.sildeHero.anValue,
            window.canvasHeight/1.7
            ,170,170);

        this.ctx.drawImage(this.homeSpV3,372,212,
            101,104,window.canvasWidth/2.25-homePageAnimainParam.sildeHero.anValue,
            window.canvasHeight/1.7
            ,170,170);
        this.ctx.drawImage(this.homeSpV3,470.6,212,
            101,104,window.canvasWidth/1.5-homePageAnimainParam.sildeHero.anValue,
            window.canvasHeight/1.7
            ,170,170);
        this.ctx.restore();
        this.collectCheckHeroVec();




    }

    collectCheckHeroVec =()=>{
        window.checkVecMap['checkHeroOne'] = {
            topLeftX:window.canvasWidth/4.5,topLeftY:window.canvasHeight/1.7,
            topRightX:window.canvasWidth/2.5,topRightY:window.canvasHeight/1.7,
            bottomLeftX:window.canvasWidth/4.5,bottomLeftY:window.canvasHeight/1.5,
            bottomRightX:window.canvasWidth/2.5,bottomRightY:window.canvasHeight/1.5
        }

        window.checkVecMap['checkHeroTwo'] = {
            topLeftX:window.canvasWidth/2.25,topLeftY:window.canvasHeight/1.7,
            topRightX:window.canvasWidth/1.6,topRightY:window.canvasHeight/1.7,
            bottomLeftX:window.canvasWidth/2.25,bottomLeftY:window.canvasHeight/1.5,
            bottomRightX:window.canvasWidth/1.6,bottomRightY:window.canvasHeight/1.5
        }

        window.checkVecMap['checkHeroThree'] = {
            topLeftX:window.canvasWidth/1.5,topLeftY:window.canvasHeight/1.7,
            topRightX:window.canvasWidth/1.2,topRightY:window.canvasHeight/1.7,
            bottomLeftX:window.canvasWidth/1.5,bottomLeftY:window.canvasHeight/1.5,
            bottomRightX:window.canvasWidth/1.2,bottomRightY:window.canvasHeight/1.5
        }
    }


    drawShadowRect=()=>{
       this.ctx.save();
       this.ctx.globalAlpha= 0.5
       this.ctx.fillStyle = 'black';
       this.ctx.fillRect(1,1,window.canvasWidth,window.canvasHeight);
       this.ctx.restore();
    }
    drawCheckStoke = (t)=>{
       // let _scale = 1 + Math.sin(t * 0.01) * 0.01;
        let _scale = 1;

        if(this.chckStorkeAniParam.checkAnimaFlag == 0){
                this.chckStorkeAniParam.chckAnX=0;
                window.checkSwitchHeroAniFlag = 0;
        }
        if(this.chckStorkeAniParam.checkAnimaFlag == 1){
                this.chckStorkeAniParam.chckAnX=216;
                window.checkSwitchHeroAniFlag = 1;

        }
        if(this.chckStorkeAniParam.checkAnimaFlag == 2){
                this.chckStorkeAniParam.chckAnX=216*2;
                window.checkSwitchHeroAniFlag = 2;

        }
        this.ctx.save();
        this.ctx.lineWidth = 7;
        this.ctx.strokeStyle="#FE9600";
        this.ctx.translate(window.canvasWidth/4.8-homePageAnimainParam.sildeHero.anValue+this.chckStorkeAniParam.chckAnX+50,
            window.canvasHeight/1.73+50);
        this.ctx.scale(_scale,_scale)
        this.ctx.strokeRect(-50,-50
            ,200,200);
        this.ctx.restore();
    }


    drawArc =()=>{
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.fillStyle = 'red'
        this.ctx.arc(window.canvasWidth/6,window.canvasHeight/1.3,10,0,2*Math.PI)
        this.ctx.fill()
        this.ctx.closePath();
        this.ctx.restore();
    }

    clhideAniValue = ()=>{
        if(this.showAllSprite == 0){
            return;
        }
        if(this.showAllSprite == 1){
            plusAnimainByQuartEaseInOut(homePageAnimainParam.showAllSpriteParam,()=>{
                this.showAllSprite  = 2;
            })
        }

        if(this.showAllSprite  == 2){
            plusAnimainByQuartEaseInOut(homePageAnimainParam.hideAllSpriteParam,()=>{
                window.stopUpdate = true;
                window.aramsRadiuSpeed = -5;
            })

        }

    }


    drawPar = ()=>{
            if(this.initParticleLock){
                this.initParticleLock = false;
                this.particleSp.particleList = [];
                this.particleSp.stopLength = 0;
                this.particleSp.init();
                this.particleSp.allStop = false;
            }
            this.particleSp.draw();

    }

    drawBackMusic = ()=>{

    }

   draw =(t)=>{
       if(window.stopUpdate){
           return;
       }
       this.clhideAniValue();
       this.drawTitle(t);
       this.drawGift();
       this.drawCron(t);
       if(this.showShadowFlag == 1){
           this.drawShadowRect();
       }
       this.drawRockOne();
       this.drawRockTwo();
       this.drawCheckOne();
       this.drawCheckStoke(t);
       this.drawPar();

   }
}
