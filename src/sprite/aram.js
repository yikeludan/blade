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
        this.armsSwitchVecList = [
            {px:690,py:470,cx:100,cy:50,tx:-70,ty:-40,sx:140,sy:80,angel:0},
            {px:446,py:470,cx:96, cy:40,tx:-45,ty:-35,sx:150,sy:70,angel:90},
            {px:605,py:780,cx:70, cy:110,tx:-80,ty:-70,sx:120,sy:160,angel:90}
        ];

        this.armsSwitchVecList1 = [
            {px:690,py:470,cx:100,cy:50,tx:-70,ty:-40,sx:140,sy:80,angel:0},
            {px:446,py:470,cx:96, cy:40,tx:-45,ty:-35,sx:150,sy:70,angel:90},
            {px:605,py:780,cx:70, cy:110,tx:-80,ty:-70,sx:120,sy:160,angel:90}
        ];
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
    drawDemo2  = ()=>{
        this.ctx.save();
        this.ctx.drawImage(window.homeSpV4,
            this.armsSwitchVecList[window.checkSwitchHeroAniFlag].px,this.armsSwitchVecList[window.checkSwitchHeroAniFlag].py,
            this.armsSwitchVecList[window.checkSwitchHeroAniFlag].cx,this.armsSwitchVecList[window.checkSwitchHeroAniFlag].cy,
            this.armsSwitchVecList[window.checkSwitchHeroAniFlag].tx, this.armsSwitchVecList[window.checkSwitchHeroAniFlag].ty,
            this.armsSwitchVecList[window.checkSwitchHeroAniFlag].sx,this.armsSwitchVecList[window.checkSwitchHeroAniFlag].sy);
        this.ctx.restore();
    }


    draw=(i)=>{
        if(this.angel>=360){
            this.angel = 0;
        }
        let x1 = window.initHeroVecX+Math.sin(this.angel * Math.PI / 180)*this.radius;
        let y1 = window.initHeroVecY+Math.cos(this.angel * Math.PI / 180)*this.radius;
        this.angel+=window.heroAramSpeed;
        this.ctx.save();
        if(i == window.aramHideList[i]){
            if(window.aramHideListLock[i]){
                window.globalAngel = this.angel;
                this.ctx.globalAlpha = 0;
            }

        }
        this.ctx.translate(x1, y1);
        this.attackPoint.x = x1;
        this.attackPoint.y = y1;
        this.ctx.rotate(-(this.angel+this.armsSwitchVecList[window.checkSwitchHeroAniFlag].angel) * Math.PI / 180);

        this.ctx.drawImage(window.homeSpV4,
            this.armsSwitchVecList[window.checkSwitchHeroAniFlag].px,this.armsSwitchVecList[window.checkSwitchHeroAniFlag].py,
            this.armsSwitchVecList[window.checkSwitchHeroAniFlag].cx,this.armsSwitchVecList[window.checkSwitchHeroAniFlag].cy,
            this.armsSwitchVecList[window.checkSwitchHeroAniFlag].tx, this.armsSwitchVecList[window.checkSwitchHeroAniFlag].ty,
            this.armsSwitchVecList[window.checkSwitchHeroAniFlag].sx,this.armsSwitchVecList[window.checkSwitchHeroAniFlag].sy);

        this.ctx.restore();
    }
}
