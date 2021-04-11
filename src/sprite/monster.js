
/**
 * 怪物精灵类
 */
import Tween from "../util/tween";
import DropSprite from "./dropSprite";//随机掉落的精灵类
import util from "../util/util";
import {//怪物缓动动画 正弦二次方公式
    reduceAnimainByCubicEaseOut,
    plusAnimainByCubicEaseOut,
    plusAnimainByLiner,
    reduceAnimainByQuadEaseInOut
} from "../manager/globalAnimationManager";
import imageLoader from "../util/imageLoadManager";
import Particle from "./particle";//粒子类
export  default class Monster {
  constructor(ctx,canvas,x,y,imageName) {
      this.ctx = ctx;
      this.monsterSpriteV3 = null;
      this.monsterSpriteV2 = null;
      this.allStop = false;
      this.walkLock = false;
      this.x = x;
      this.y = y;
      this.isTrackAngel = false;
      this.isRotate = false;
      this.resultAngel = 0;
      this.angel = 0;
      this.radius = 5;
      this.bounceSpring = 0.05;
      this.sinT = 0.01;
      this.moType = 0;
      this.animain =null;
      this.isDead = true;
      this.monsterBodyParamList =[
          {
            px:300,
            py:230,
            sx:100,
            sy:73,
            width:200,
            height:143,
            crWidth: 90,
            crHeight:70,
            checkAnimaFlag:0,
            anValue:0,
            start:0,
            begin:1,
            end:100,
            during:40},
          {
            px:1350,
            py:170,
            sx:150,
            sy:210,
            width:120,
            height:153,
            crWidth: 60,
            crHeight:75,
            checkAnimaFlag:0,
            anValue:0,
            start:0,
            begin:1,
            end:100,
            during:40},
            { px:300,
              py:230,
              sx:100,
              sy:73,
              width:200,
              height:143,
              crWidth: 90,
              crHeight:70,
              checkAnimaFlag:0,
              anValue:0,
              start:0,
              begin:1,
              end:100,
              during:40},


      ]

      this.rigidBodyRadius = 17;
      this.bloodNum = 7;//怪物血量
      this.lockAramsIndex = null;//帧率太快只保证每把飞刀接触怪物一次

      this.drawLock = false;//是否渲染怪物
      this.deadDrawLock = false;
      this.deadLineAngelList= [0,60,200,300,130];

      this.t1 = 0;


      this.bloodNumVec = [
          {px:1590,py:947,cx:55,cy:55,vx:100,vy:500,sx:50,sy:50},//1
          {px:1340,py:1145,cx:51,cy:55,vx:100,vy:1200,sx:50,sy:50},//2
          {px:1547,py:1955,cx:55,cy:55,vx:100,vy:900,sx:50,sy:50},//3
          {px:1570,py:665,cx:55,cy:55,vx:100,vy:400,sx:50,sy:50},//4
          {px:1445,py:1860,cx:51,cy:55,vx:100,vy:1000,sx:50,sy:50},//5
          {px:1570,py:1766,cx:55,cy:55,vx:100,vy:800,sx:50,sy:50},//6
          {px:1567,py:1710,cx:55,cy:55,vx:100,vy:700,sx:50,sy:50},//7
          {px:1570,py:610,cx:55,cy:55,vx:100,vy:300,sx:50,sy:50},//8
      ]

      this.bloodNumVec1 = [
          {px:1590,py:947,cx:55,cy:55,vx:100,vy:500,sx:40,sy:40},//1
          {px:1340,py:1145,cx:51,cy:55,vx:100,vy:1200,sx:40,sy:40},//2
          {px:1547,py:1955,cx:55,cy:55,vx:100,vy:900,sx:40,sy:40},//3
          {px:1570,py:665,cx:55,cy:55,vx:100,vy:400,sx:40,sy:40},//4
          {px:1445,py:1860,cx:51,cy:55,vx:100,vy:1000,sx:40,sy:40},//5
          {px:1570,py:1766,cx:55,cy:55,vx:100,vy:800,sx:40,sy:40},//6
          {px:1567,py:1710,cx:55,cy:55,vx:100,vy:700,sx:40,sy:40},//7
          {px:1570,py:610,cx:55,cy:55,vx:100,vy:300,sx:40,sy:40},//8
      ]



      this.flashList = [
          {px:930,py:100,cx:320,cy:70,vx:100,vy:300,sx:320,sy:70,angel:0},
          {px:940,py:50,cx:320,cy:70,vx:100,vy:500,sx:320,sy:70,angel:0},
      ]

      this.armsSwitchVecList = [
          {px:690,py:470,cx:100,cy:50,tx:100,ty:300,sx:140,sy:80,angel:0},
          {px:446,py:470,cx:96, cy:40,tx:-45,ty:-35,sx:150,sy:70,angel:90},
          {px:605,py:780,cx:70, cy:110,tx:-80,ty:-70,sx:120,sy:160,angel:90}
      ];
      this.flashIndexV2 = 0;
      this.t1 = 0;
      this.brokenStoneParam = {
          angelList:[],
          radius : 1,
          numIndex:7,
          minAngel : 0,
          maxAngel :0,

      }




      this.brokenStoneAnVecRadiusListParam = [
          { anValue:0,
              start:0,
              begin:1,
              end:100,
              during:10,
              angel:0},
          { anValue:0,
              start:0,
              begin:1,
              end:90,
              during:10,angel:0},
          { anValue:0,
              start:0,
              begin:1,
              end:70,
              during:10,angel:0},

          { anValue:0,
              start:0,
              begin:1,
              end:80,
              during:10,angel:0},
          { anValue:0,
              start:0,
              begin:1,
              end:60,
              during:10,angel:0},
          { anValue:0,
              start:0,
              begin:1,
              end:85,
              during:10,angel:0},
          { anValue:0,
              start:0,
              begin:1,
              end:73,
              during:10,angel:0}
      ];
      this.moType_1 = 0;


      this.isShake = false;
      this.isDropArams = false;
      this.particleSp  = null;
      this.initParticleLock = false;
      this.initParm();
      this.init(imageName);
      this.initParticle();
  }

    initParticle =()=>{
        let particleObj = new Particle(
            this.ctx,this.x,this.y);
        particleObj.allStop = false;
        this.particleSp = particleObj
    }
    drawDemo2  = (t1)=>{
        let x = Math.pow(1 - t1, 2) * 91 + 2 * t1 * (1 - t1) * window.canvasWidth+200 + Math.pow(t1, 2) * 490
        let y = Math.pow(1 - t1, 2) * 1087 + 2 * t1 * (1 - t1) * 887 + Math.pow(t1, 2) * 620
        //let x = Math.pow(1 - t1, 2) * 200 + 2 * t1 * (1 - t1) * 400 + Math.pow(t1, 2) * window.testX
        //let y = Math.pow(1 - t1, 2) * 300 + 2 * t1 * (1 - t1) * 900 + Math.pow(t1, 2) * window.testY;


        if(x == window.testX&&y ==window.testY){
            console.log(1)
        }
        this.ctx.save();
        this.ctx.translate(x,y);
        this.ctx.drawImage(window.homeSpV4,
            this.armsSwitchVecList[window.checkSwitchHeroAniFlag].px,
            this.armsSwitchVecList[window.checkSwitchHeroAniFlag].py,
            this.armsSwitchVecList[window.checkSwitchHeroAniFlag].cx,
            this.armsSwitchVecList[window.checkSwitchHeroAniFlag].cy,
            -this.armsSwitchVecList[window.checkSwitchHeroAniFlag].sx/2,
            -this.armsSwitchVecList[window.checkSwitchHeroAniFlag].sy/2,
            this.armsSwitchVecList[window.checkSwitchHeroAniFlag].sx,
            this.armsSwitchVecList[window.checkSwitchHeroAniFlag].sy);
        this.ctx.restore();
    }

    init=(imageName)=>{
        let image = new Image();
        image.src = imageName;
        this.MonsterSprite = image;

        let moImageV2 = new Image();
        moImageV2.src = imageLoader.monsterImageV2;
        this.monsterSpriteV2 = moImageV2;
        let moImageV3 = new Image();
        moImageV3.src = imageLoader.monsterImageV3;
        this.monsterSpriteV3 = moImageV3;



        let deadImage = new Image();
        let deadLineImage = new Image();
        deadImage.src = imageLoader.deadArcImage;
        this.deadSprite = deadImage;
        deadLineImage.src = imageLoader.deadLineImage;
        this.deadLineSprite = deadLineImage;
        this.initBrokenStoreAngel();

    }
    initBrokenStoreAngel = ()=>{
        for(let i =0;i<this.brokenStoneParam.numIndex;i++){
            this.brokenStoneParam.minAngel = this.brokenStoneParam.maxAngel;
            this.brokenStoneParam.maxAngel = this.brokenStoneParam.maxAngel+60;
            let angle =util.random(this.brokenStoneParam.minAngel,this.brokenStoneParam.maxAngel);
            this.brokenStoneParam.angelList.push(angle)
            let end = util.random(100,200)
            let during = util.random(10,20);
            this.brokenStoneAnVecRadiusListParam[i].end = end;
            this.brokenStoneAnVecRadiusListParam[i].during = during;
            this.brokenStoneAnVecRadiusListParam[i].angel = angle;
        }
    }

    beAttack = (aramList)=>{
        aramList.forEach((knife,index)=>{
            let qx = 0;
            let qy = 0;
            if(knife.attackPoint.x>this.x
                &&knife.attackPoint.y<this.y){
                qx = knife.attackPoint.x-this.x;
                qy = this.y-knife.attackPoint.y;

            }
            if(knife.attackPoint.x<this.x
                &&knife.attackPoint.y<this.y){
                qx = this.x-knife.attackPoint.x;
                qy = this.y-knife.attackPoint.y;

            }
            if(knife.attackPoint.x<this.x
                &&knife.attackPoint.y>this.y){
                qx = this.x-knife.attackPoint.x;
                qy = knife.attackPoint.y-this.y;


            }
            if(knife.attackPoint.x>this.x
                &&knife.attackPoint.y>this.y){
                qx = knife.attackPoint.x-this.x;
                qy = knife.attackPoint.y-this.y;

            }
            let sqrtR =Math.sqrt(qx*qx+qy*qy);
            if(sqrtR<=75){
                if(this.monsterBodyParamList[this.moType].anValue==0){
                    this.playAttackMusic();
                    this.monsterBodyParamList[this.moType].checkAnimaFlag = 1;
                }

                this.bloodDown(knife,index);
            }



        });
    }

    playAttackMusic = ()=>{
        window.musicList[2].currentTime = 0;
        window.musicList[2].muted = false;
        window.musicList[2].volume = 0.5
        window.musicList[2].play();
    }
    bloodDown = (knife,index)=>{
        if(this.bloodNum == -1){
            this.deadDrawLock = true;

            this.initParticleLock = true;
            return;
        }
        if(this.lockAramsIndex == null){
            this.lockAramsIndex = index;
            this.bloodNum-=1;

        }else{
            if(this.lockAramsIndex != index){
                this.bloodNum-=1;
                this.lockAramsIndex = index;
            }
        }
    }




    drawRigidBodyArc = ()=>{
        this.ctx.beginPath();
        this.ctx.lineWidth = 2;
        this.ctx.strokeStyle = 'red';

        //this.ctx.globalAlpha=0;


        this.ctx.arc(this.x+this.rigidBodyRadius,
            this.y+this.rigidBodyRadius,
            this.rigidBodyRadius, 0, Math.PI * 2, false);
        this.ctx.stroke();





    }



    clMonsterAIByHero = ()=>{
          if(this.moType == 0){
              return;
          }

          if(!this.isTrackAngel){
              return;
          }
          let qy = window.initHeroVecY-this.y;
          let qx =window.initHeroVecX - this.x;
          let rid = Math.atan2(qy,qx);
          this.resultAngel = rid * 180 / Math.PI
          this.resultAngel -=90;
          this.resultAngel = -this.resultAngel;
          this.isTrackAngel = false;
          this.isRotate = true;
    }
    clRotateAngel = ()=>{
        if(!this.isRotate){
            return;
        }
        if(this.resultAngel<0){
            this.resultAngel = 360+this.resultAngel;
        }
        if(this.angel>=360){
            this.angel = 0;
        }

        let res = this.resultAngel - this.angel
        if(Math.abs(res)<10){
            this.isRotate = false;
            this.angel = this.resultAngel;
            this.animain.walk.during = util.random(70,120)
            this.animain.walk.isLock = false;
        }else {
            this.angel+=5;
        }


    }
    clwalkTime = ()=>{
      if(this.moType == 0){
          return;
      }
      plusAnimainByCubicEaseOut(this.animain.walk,()=>{
          this.isTrackAngel = true;
          this.animain.walk.anValue = 0;
      })
    }

    clwalk = ()=>{

        if(!this.walkLock){
            return;
        }
        this.x= this.x+Math.sin(this.angel * Math.PI / 180)*this.radius;
        this.y= this.y+Math.cos(this.angel * Math.PI / 180)*this.radius;
    }

    drawSprite = (t)=>{
        let _scale1 = 1 + Math.sin(t * this.sinT) * this.bounceSpring;

        this.ctx.save();
        this.ctx.translate(this.x,this.y);
        this.ctx.rotate(-this.angel * Math.PI / 180);
        let sprite = null;
        if(this.moType == 0){
            sprite = this.monsterSpriteV3;
        }
        if(this.moType == 1){
            sprite = this.monsterSpriteV2;
        }
        if(this.moType == 0){
            if(this.moType_1 == 0){
                this.ctx.drawImage(
                    sprite,
                    this.monsterBodyParamList[this.moType].px,
                    this.monsterBodyParamList[this.moType].py,
                    this.monsterBodyParamList[this.moType].sx,
                    this.monsterBodyParamList[this.moType].sy,
                    -this.monsterBodyParamList[this.moType].crWidth*_scale1,
                    -this.monsterBodyParamList[this.moType].crHeight
                    ,this.monsterBodyParamList[this.moType].width,
                    this.monsterBodyParamList[this.moType].height*_scale1);
            }
            if(this.moType_1 == 1){
                this.ctx.drawImage(
                    sprite,
                    this.monsterBodyParamList[this.moType].px,
                    this.monsterBodyParamList[this.moType].py+75,
                    this.monsterBodyParamList[this.moType].sx,
                    this.monsterBodyParamList[this.moType].sy,
                    -this.monsterBodyParamList[this.moType].crWidth*_scale1,
                    -this.monsterBodyParamList[this.moType].crHeight
                    ,this.monsterBodyParamList[this.moType].width,
                    this.monsterBodyParamList[this.moType].height*_scale1);
            }
        }else {
            this.ctx.drawImage(
                sprite,
                this.monsterBodyParamList[this.moType].px,
                this.monsterBodyParamList[this.moType].py,
                this.monsterBodyParamList[this.moType].sx,
                this.monsterBodyParamList[this.moType].sy,
                -this.monsterBodyParamList[this.moType].crWidth*_scale1,
                -this.monsterBodyParamList[this.moType].crHeight
                ,this.monsterBodyParamList[this.moType].width,
                this.monsterBodyParamList[this.moType].height*_scale1);
        }

        let bloodNum = this.bloodNum;
        if(bloodNum == -1){
            bloodNum = 0;
        }

        if(this.moType == 0){
            this.ctx.drawImage(this.monsterSpriteV2,
                this.bloodNumVec[bloodNum].px,
                this.bloodNumVec[bloodNum].py,
                this.bloodNumVec[bloodNum].cx,
                this.bloodNumVec[bloodNum].cy,
                -(this.bloodNumVec[bloodNum].sx/2*_scale1),
                -(this.bloodNumVec[bloodNum].sy/2)
                ,this.bloodNumVec[bloodNum].sx,
                this.bloodNumVec[bloodNum].sy*_scale1);
        }
        if(this.moType == 1){
            this.ctx.drawImage(this.monsterSpriteV2,
                this.bloodNumVec1[bloodNum].px,
                this.bloodNumVec1[bloodNum].py,
                this.bloodNumVec1[bloodNum].cx,
                this.bloodNumVec1[bloodNum].cy,
                -(this.bloodNumVec1[bloodNum].sx/2*_scale1),
                -(this.bloodNumVec1[bloodNum].sy/2-20)
                ,this.bloodNumVec1[bloodNum].sx,
                this.bloodNumVec1[bloodNum].sy*_scale1);
        }
        this.ctx.restore();
    }


    deadDraw =(t)=>{
        if(this.drawLock){
            return;
        }

        this.ctx.save();
        this.ctx.translate(this.x,this.y);
        this.ctx.globalAlpha=this.animain.deadDrawGla.anValue;
        this.ctx.scale(this.animain.deadDrawScale.anValue,this.animain.deadDrawScale.anValue)
        this.ctx.drawImage(this.monsterSpriteV2,730,1350,
            140,150,-150,-155
            ,300,310);
       // this.ctx.drawImage(this.deadSprite, -50,-50, 100,100);
        this.ctx.restore();
    }

    deadLineDraw = (t)=>{
        this.deadLineAngelList.forEach((angel,index)=>{
            let  _x = this.x+Math.sin(this.deadLineAngelList[index] * Math.PI / 180)*this.animain.deadLineDrawRadius.anValue;
            let  _y = this.y+Math.cos(this.deadLineAngelList[index] * Math.PI / 180)*this.animain.deadLineDrawRadius.anValue;
            this.ctx.save();
            this.ctx.globalAlpha=this.animain.deadLineDrawGla.anValue;
            this.ctx.translate(_x, _y);
            this.ctx.rotate(-this.deadLineAngelList[index] * Math.PI / 180);
            this.ctx.drawImage(this.monsterSpriteV2,450,760,
                40,100,0,0
                ,40,this.animain.deadLineDrawHeight.anValue);

           // this.ctx.drawImage(this.deadLineSprite, 0,0, 5,this.deadHeight);
            this.ctx.restore();
           // this.deadLineStart++;
        })
    }

    calculateWalkRigidBody=()=>{
      let centerVecX = this.x+Math.sin(this.angel * Math.PI / 180)*(this.radius+70);
      let centerVecY = this.y+Math.cos(this.angel * Math.PI / 180)*(this.radius+70);
      let leftY = Math.sin(this.angel * Math.PI / 180)*70;
      let leftX = Math.cos(this.angel * Math.PI / 180)*70;
      leftX = centerVecX-leftX;
      leftY = centerVecY+leftY;
      let rightY = Math.sin(this.angel * Math.PI / 180)*70;
      let rightX = Math.cos(this.angel * Math.PI / 180)*70;
      rightX = centerVecX+rightX;
      rightY = centerVecY-rightY;
      if(leftY>=this.ctx.canvas.height||rightX<=0){
          this.angel = 120;
      }
      if(leftY<=0||rightX>= this.ctx.canvas.width){
          this.angel = -30;
      }
      if(leftX<=0||rightY<=0){
          this.angel = 30;
      }
      if(leftX>=this.ctx.canvas.width||rightY>=this.ctx.canvas.height){
          this.angel =200;
      }




      /*this.ctx.save();
      this.ctx.beginPath();
      this.ctx.fillStyle = 'red'
      this.ctx.arc(this.x,this.y,5,0,2*Math.PI)
      this.ctx.fill()
      this.ctx.closePath();
      this.ctx.restore();*/

        /*this.ctx.save();
        this.ctx.beginPath();
        this.ctx.fillStyle = 'red'
        this.ctx.arc(leftX,leftY,5,0,2*Math.PI)
        this.ctx.fill()
        this.ctx.closePath();
        this.ctx.restore();*/
    }


    drawDeadTail = (t)=>{
        let x11 = Math.pow(1 - this.t1, 2) * 200 + 2 * this.t1 * (1 - this.t1) * 80 + Math.pow(this.t1, 2) * 1
        let y11 = Math.pow(1 - this.t1, 2) * 130 + 2 * this.t1 * (1 - this.t1) * 380 + Math.pow(this.t1, 2) * 1
        //let x11 = Math.pow(1 - t, 2) * 200 + 2 * t * (1 - t) * 80 + Math.pow(t, 2) * 1
        //let y11 = Math.pow(1 - t, 2) * 130 + 2 * t * (1 - t) * 380 + Math.pow(t, 2) * 1
        x11+=10;
        y11+=10;
        if(x11<=1){
            window.pools.push(this);
            return;
        }
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.fillStyle = 'red'
        this.ctx.arc(x11,y11,4,0,2*Math.PI)
        this.ctx.fill()
        this.ctx.closePath();
        this.ctx.restore();
        this.t1+=0.015;
    }

    drawDemo = ()=>{
        this.ctx.beginPath();
        this.ctx.fillStyle = 'red'
        this.ctx.arc(this.x,this.y,20,0,2*Math.PI)
        this.ctx.fill()
        this.ctx.closePath();
    }

    clDeadDrawScaleAnvalue = ()=>{
        plusAnimainByCubicEaseOut(this.animain.deadDrawScale,()=>{
        })
        reduceAnimainByCubicEaseOut(this.animain.deadDrawGla,()=>{
            this.animain.deadDrawGla.anValue = 0;
        })

    }

    clDeadDrawLineAnvalue = ()=>{

        plusAnimainByCubicEaseOut(this.animain.deadLineDrawRadius,()=>{
        })

        plusAnimainByCubicEaseOut(this.animain.deadLineDrawHeight,()=>{

        })
        reduceAnimainByCubicEaseOut(this.animain.deadLineDrawGla,()=>{
            this.animain.deadLineDrawGla.anValue = 0;
        })


    }

    clFlashScalAnValue = ()=>{

        plusAnimainByLiner(this.animain.flashDrawGla,()=>{
        })
    }

    clMonsterBodyByArams = ()=>{
        if(this.monsterBodyParamList[this.moType].checkAnimaFlag ==0){
            return;
        }
        if(this.monsterBodyParamList[this.moType].anValue>=this.monsterBodyParamList[this.moType].end){
            this.monsterBodyParamList[this.moType].start = 0;
            this.monsterBodyParamList[this.moType].anValue = 0;
            this.monsterBodyParamList[this.moType].checkAnimaFlag = 0;
            this.monsterBodyParamList[this.moType].width = this.moType == 0?200:120;
            this.monsterBodyParamList[this.moType].height = this.moType == 0?140:153;
            this.monsterBodyParamList[this.moType].crWidth = this.moType == 0?90:60;
            this.monsterBodyParamList[this.moType].crHeight = this.moType == 0?70:75;
            this.sinT = 0.01;
            this.bounceSpring = 0.05;
        }else {
            this.monsterBodyParamList[this.moType].width = this.moType == 0?240:100,
            this.monsterBodyParamList[this.moType].height = this.moType == 0?123:130,
            this.monsterBodyParamList[this.moType].crWidth = this.moType == 0?110:50,
            this.monsterBodyParamList[this.moType].crHeight = this.moType == 0?60:65,
            this.bounceSpring = 0.1;
            this.sinT = 0.05
            this.monsterBodyParamList[this.moType].anValue  = Tween.Cubic.easeOut(
                this.monsterBodyParamList[this.moType].start,
                this.monsterBodyParamList[this.moType].begin,
                this.monsterBodyParamList[this.moType].end,
                this.monsterBodyParamList[this.moType].during);
            this.monsterBodyParamList[this.moType].start++;

        }
    }

    bornDropSprite = ()=>{
        if(this.isDropArams){
            window.aramHideList[5] = 5;
            window.aramHideListLock[5] = true;
            this.isDropArams = false;
            let dropAram = new DropSprite(this.ctx);
            dropAram.x = this.x;
            dropAram.y = this.y;
            dropAram.initX = this.x ;
            dropAram.initY = this.y;
            window.dropSpriteList.push(dropAram)
        }
    }
    clBrokenStoneAnValue = ()=>{
        for(let i = 0;i<this.brokenStoneParam.numIndex;i++){
            if(this.brokenStoneAnVecRadiusListParam[i].anValue>=this.brokenStoneAnVecRadiusListParam[i].end){
                this.brokenStoneAnVecRadiusListParam[i].start = 0;
            }else {
                this.brokenStoneAnVecRadiusListParam[i].anValue  = Tween.Quad.easeOut(
                    this.brokenStoneAnVecRadiusListParam[i].start,
                    this.brokenStoneAnVecRadiusListParam[i].begin,
                    this.brokenStoneAnVecRadiusListParam[i].end,
                    this.brokenStoneAnVecRadiusListParam[i].during);
                this.brokenStoneAnVecRadiusListParam[i].start++;
            }
        }
        reduceAnimainByQuadEaseInOut(this.animain.brokenStoneScale,()=>{
            this.allStop = true;
        })
    }

    drawBrokenStone = ()=>{
        for(let i =0;i<this.brokenStoneParam.numIndex;i++){
            let x1 = this.x+Math.sin(this.brokenStoneParam.angelList[i] * Math.PI / 180)*this.brokenStoneAnVecRadiusListParam[i].anValue;
            let y1 = this.y+Math.cos(this.brokenStoneParam.angelList[i] * Math.PI / 180)*this.brokenStoneAnVecRadiusListParam[i].anValue;
            this.ctx.save();
            this.ctx.translate(x1,y1)
            let angle1 = util.random(this.brokenStoneParam.minAngel,this.brokenStoneParam.maxAngel);
          //  this.ctx.rotate(-angle1 * Math.PI / 180)
          //  this.ctx.globalAlpha = this.brokenStoneAnVecGlaParam.anValue
            this.ctx.scale(this.animain.brokenStoneScale.anValue,this.animain.brokenStoneScale.anValue)

            if(this.moType == 0){
                if(this.moType_1 == 0){
                    this.ctx.drawImage(this.monsterSpriteV3,
                        425, 95,
                        60, 58,
                        -45, -42,
                        90, 88);
                }
                if(this.moType_1 == 1){
                    this.ctx.drawImage(this.monsterSpriteV3,
                        270, 20,
                        60, 60,
                        -45, -42,
                        90,88);

                }
            }else {
                this.ctx.drawImage(this.monsterSpriteV2, 1560, 1340,
                    65, 65, -45, -42,
                    90,88);
            }

            this.ctx.restore();
        }
    }
    shakePhone = ()=>{
        if(this.isShake){
            return;
        }
        navigator.vibrate(10);
        this.isShake = true;
    }
    drawPar = ()=>{
        if(this.initParticleLock){
            this.initParticleLock = false;
            this.particleSp.particleList = [];
            this.particleSp.x = this.x;
            this.particleSp.y = this.y;
            this.particleSp.stopLength = 0;
            this.particleSp.init();
            this.particleSp.allStop = false;
        }
        this.particleSp.draw();
    }
    countDeadCount = ()=>{
      if(this.isDead){
          window.deadMonster+=1;
          this.isDead = false;
      }
    }
     draw = (t,armsList)=>{
        if(this.allStop){
            return;
        }
        if(this.deadDrawLock){
           // this.shakePhone();
            this.countDeadCount();
            this.drawPar();
            this.bornDropSprite();
            this.clDeadDrawScaleAnvalue();
            this.clDeadDrawLineAnvalue();
            this.clBrokenStoneAnValue()
            this.deadDraw(t);
            this.deadLineDraw(t);
            this.drawBrokenStone()
        }else {
            this.calculateWalkRigidBody();
            if(!window.stopAramUpdate){
                this.beAttack(armsList);
                this.clFlashScalAnValue();
                this.clMonsterBodyByArams();
            }
            this.clwalkTime()
            this.clwalk();
            this.clMonsterAIByHero();
            this.clRotateAngel();
            this.drawSprite(t);
           // this.drawDemo3();
        }


    }

    drawDemo3 =  ()=>{
        this.ctx.drawImage(this.monsterSpriteV3, 270, 20,
            60, 60, 300, 900,
            65,65);
    }

    initParm =()=>{
        let monsterAnimainParam = {
            deadDrawScale:{
                isLock:false,
                anValue:0,
                start:0,
                begin:0.01,
                end:1,
                during:40,
            },
            deadDrawGla:{
                isLock:false,
                anValue:0.02,
                start:0,
                begin:0.01,
                end:2,
                during:40,
            },
            deadLineDrawRadius:{
                isLock:false,
                anValue:0,
                start:0,
                begin:1,
                end:80,
                during:40,
            },
            deadLineDrawHeight:{
                isLock:false,
                anValue:0,
                start:0,
                begin:1,
                end:140,
                during:40,
            },
            deadLineDrawGla:{
                isLock:false,
                anValue:0.02,
                start:0,
                begin:0.01,
                end:2,
                during:40,
            },
            flashDrawGla:{
                isLock:false,
                anValue:0.02,
                start:0,
                begin:0.1,
                end:1,
                during:10,
            },
            brokenStoneScale:{
                isLock:false,
                anValue:0.02,
                start:0,
                begin:0.01,
                end:1,
                during:90,
            },
            walk:{
                isLock:false,
                anValue:0,
                start:0,
                begin:1,
                end:100,
                during:100,
            }
        }
        this.animain = monsterAnimainParam;
    }
}
