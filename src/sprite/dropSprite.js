import Tween from "../util/tween";
import util from "../util/util";
export default class DropSprite {
    constructor(ctx) {
        this.ctx = ctx;
        this.x = 0;
        this.y = 0;
        this.initX = 0
        this.initY = 0;
        this.index = 0;//0 飞刀 1 宝物
        this.springWalkRadius = 10;
        this.springWalkAngel = null;
        this.angel = 0;
        this.angelSpeed = 7
        this.radius  = 125;
        this.radiusSpeed = 0;
        this.isCollided = true;
        this.walkLock = false;
        this.angelLock = false;
        this.isBeginRoundLock = true;
        this.armsSwitchVecList = [
            {px:690,py:470,cx:100,cy:50,tx:-50,ty:-20,sx:100,sy:40,angel:0},
            {px:446,py:470,cx:96, cy:40,tx:-45,ty:-35,sx:150,sy:70,angel:90},
            {px:605,py:780,cx:70, cy:110,tx:-80,ty:-70,sx:120,sy:160,angel:90}
        ];

        this.dropKnifenRadiusValue= {
            checkAnimaFlag:0,
            anValue:0,
            start:0,
            begin:1,
            end:200,
            during:100,
        }

        this.dropKnifenAngelValue= {
            checkAnimaFlag:0,
            anValue:0,
            start:0,
            begin:1,
            end:120,
            during:50,
        }
    }
    clDropKnifeAnValue = ()=>{
        if(this.walkLock){
            return;
        }
        if(this.dropKnifenRadiusValue.anValue>=this.dropKnifenRadiusValue.end){
            this.dropKnifenRadiusValue.start = 0;
            this.walkLock = true;
            this.isCollided = false;
        }else {
            this.dropKnifenRadiusValue.anValue  = Tween.Quad.easeOut(
                this.dropKnifenRadiusValue.start,
                this.dropKnifenRadiusValue.begin,
                this.dropKnifenRadiusValue.end,
                this.dropKnifenRadiusValue.during);
            this.dropKnifenRadiusValue.start++;
        }

        if(this.dropKnifenAngelValue.anValue>=this.dropKnifenAngelValue.end){
            this.dropKnifenAngelValue.start = 0;
        }else {
            this.dropKnifenAngelValue.anValue  = Tween.Quad.easeOut(
                this.dropKnifenAngelValue.start,
                this.dropKnifenAngelValue.begin,
                this.dropKnifenAngelValue.end,
                this.dropKnifenAngelValue.during);
            this.dropKnifenAngelValue.start++;
        }
    }
    clKnifeSpringWalk = ()=>{
        if(this.walkLock){
            return;
        }
        if(this.angel>=360){
            this.angel = 0;
        }
        if(this.springWalkAngel == null){
            if(this.y<window.canvasHeight/2&&this.x<window.canvasWidth/2){
                this.springWalkAngel = util.random(0,30);
            }
            if(this.y<window.canvasHeight/2&&this.x>window.canvasWidth/2){
                this.springWalkAngel = util.random(270,360);
            }
            if(this.y>window.canvasHeight/2&&this.x>window.canvasWidth/2){
                this.springWalkAngel = util.random(180,270);

            }

            if(this.y>window.canvasHeight/2&&this.x<window.canvasWidth/2){
                this.springWalkAngel = util.random(90,180);
            }
        }
        this.angel +=25;
        this.x= this.x+Math.sin(this.springWalkAngel * Math.PI / 180)*this.springWalkRadius;
        this.y= this.y+Math.cos(this.springWalkAngel * Math.PI / 180)*this.springWalkRadius;



    }
    clIsThisSpriteCollided = ()=>{
        if(this.isCollided){
            return;
        }
        let sqrtR = null;
        let qy = null;
        let qx = null;
        if(this.y>window.initHeroVecY&&this.x>window.initHeroVecX){
             qy = this.y-window.initHeroVecY;
             qx = this.x - window.initHeroVecX;


        }
        if(this.y<window.initHeroVecY&&this.x>window.initHeroVecX){
             qy = window.initHeroVecY-this.y;
             qx = this.x - window.initHeroVecX;

        }
        if(this.y<window.initHeroVecY&&this.x<window.initHeroVecX){
             qy = window.initHeroVecY-this.y;
             qx = window.initHeroVecX-this.x;

        }
        if(this.y>window.initHeroVecY&&this.x<window.initHeroVecX){
             qy = this.y-window.initHeroVecY;
             qx = window.initHeroVecX-this.x;

        }
        sqrtR =Math.sqrt(qx*qx+qy*qy);
        if(sqrtR<= 160){
            this.isCollided = true;
            let ridus = Math.atan2(qy,qx);
            this.angel = ridus * 180 / Math.PI
            window.heroAramSpeed = 3;
            this.isBeginRoundLock = false;
        }




    }
    cldropSpriteRqoundCenterVec = ()=>{
        if(this.isBeginRoundLock){
            return;
        }
        if(this.radius>=160){
            this.radius = 160;
            window.aramHideList[5] = -1;
            window.aramHideListLock[5] = false;
            this.index = -1;
        }

        if(this.angel>=360){
            this.angel = 0;
        }
        if(!this.angelLock){
            let res = this.angel - window.globalAngel;
            if(Math.abs(res)<=3){
                this.angelLock = true;
                this.angel = window.globalAngel;
                this.radiusSpeed+=1;
                this.angelSpeed = 10;
                window.heroAramSpeed = 10;
            }
        }
        this.x  = window.initHeroVecX+Math.sin(this.angel * Math.PI / 180)*this.radius;
        this.y =  window.initHeroVecY+Math.cos(this.angel * Math.PI / 180)*this.radius;
        this.angel +=this.angelSpeed;
        this.radius+=this.radiusSpeed
    }
    drawDropKnife = ()=>{
        this.ctx.save();
        this.ctx.translate(this.x, this.y);
        this.ctx.rotate(-this.angel * Math.PI / 180);
        this.ctx.drawImage(window.homeSpV4,
            this.armsSwitchVecList[window.checkSwitchHeroAniFlag].px,this.armsSwitchVecList[window.checkSwitchHeroAniFlag].py,
            this.armsSwitchVecList[window.checkSwitchHeroAniFlag].cx,this.armsSwitchVecList[window.checkSwitchHeroAniFlag].cy,
            this.armsSwitchVecList[window.checkSwitchHeroAniFlag].tx, this.armsSwitchVecList[window.checkSwitchHeroAniFlag].ty,
            this.armsSwitchVecList[window.checkSwitchHeroAniFlag].sx,this.armsSwitchVecList[window.checkSwitchHeroAniFlag].sy);
        this.ctx.restore();
    }
    draw =(t,aramList)=>{
        if(this.index == 0){
            this.clIsThisSpriteCollided();
            this.clDropKnifeAnValue();
            this.clKnifeSpringWalk();
            this.cldropSpriteRqoundCenterVec();
            this.drawDropKnife();
        }
    }
}
