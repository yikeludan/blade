import sceneAnimainParam from "../animainParam/secne/sceneAnimainParam";
import {plusAnimainByQuartEaseInOut,
    reduceAnimainByQuartEaseInOut,
    plusAnimainByLiner
} from "../manager/globalAnimationManager";
import imageLoader from "../util/imageLoadManager";
export default class Scene {
    constructor(ctx) {
        this.ctx = ctx;
        this.x = 0;
        this.y = 0;
        this.sinT = 0.01;
        this.bounceSpring = 0.1;
        this.shoWaringRed = false;
        this.isWaringMusic = false;
        this.isBegingWaringTitle = false;
        this.isOverBtnShake = false;
        this.stopWaringTitle = false;
        this.isPlayGameOverMusic = false;
        this.homePageSpV7 = null;
       // this.init();
    }


    init =()=>{
        let image = new Image();
        image.src = imageLoader.homePageImageV7;
        this.homePageSpV7 = image;
    }
    drawGameOver = ()=>{
        this.ctx.save();
        this.ctx.translate(window.canvasWidth/2,-300+sceneAnimainParam.overVecY.anValue);
        this.ctx.scale(5-sceneAnimainParam.overScale.anValue,5-sceneAnimainParam.overScale.anValue)
        this.ctx.drawImage(window.homeSpV6,420,5,
            490,120,
            -245, -60
            ,490,120);
        this.ctx.restore();
    }

    drawConformBtn = (t)=>{
        let _scale1 = 0;
        if(this.isOverBtnShake){
            _scale1 =  Math.sin(t * 0.01) * 0.015;
        }
        this.ctx.save();
        this.ctx.translate(window.canvasWidth/2-40,window.canvasHeight/2+400);
        this.ctx.scale(sceneAnimainParam.overBtnScale.anValue+_scale1,sceneAnimainParam.overBtnScale.anValue+_scale1);
        this.ctx.drawImage(window.homeSpV6,831,132,
            265,110,
            -132, -55
            ,365,150);
        this.ctx.restore();
    }
    drawMonsterWaringBand = (t)=>{
        if(this.shoWaringRed){
            if(this.isWaringMusic){
                window.musicList[4].currentTime = 0;
                window.musicList[4].muted = false;
                window.musicList[4].volume = 0.5

                window.musicList[4].play();
                this.isWaringMusic = false;
                this.isBegingWaringTitle = true;
            }
            let _scale1 = 0.3 + Math.sin(t * this.sinT) * this.bounceSpring;
            this.ctx.save();
            this.ctx.globalAlpha = _scale1
            this.ctx.drawImage(window.homeSpV6,910,20,
                360,100,
                -10, 200
                ,window.canvasWidth,200);
            this.ctx.restore();
        }
        this.ctx.save();
        this.ctx.translate(window.canvasWidth/2,-200+sceneAnimainParam.vecY.anValue);
        this.ctx.scale(5-sceneAnimainParam.scale.anValue,5-sceneAnimainParam.scale.anValue)
        //this.ctx.globalAlpha = _scale1
        this.ctx.drawImage(window.homeSpV6,410,600,
            360,65,
            -215, -42
            ,430,85);
        this.ctx.restore();
    }
    clWaringBandAnValue = ()=>{
        plusAnimainByQuartEaseInOut(sceneAnimainParam.vecY,()=>{
            this.shoWaringRed = true;
            this.isWaringMusic = true;
        })
        plusAnimainByQuartEaseInOut(sceneAnimainParam.scale,()=>{
        })
    }

    clGameOverAnValue = ()=>{
        plusAnimainByQuartEaseInOut(sceneAnimainParam.overBtnScale,()=>{
            this.isOverBtnShake = true;
            this.isPlayGameOverMusic = true;
        })
        plusAnimainByQuartEaseInOut(sceneAnimainParam.overVecY,()=>{
        })
        plusAnimainByQuartEaseInOut(sceneAnimainParam.overScale,()=>{
        })
    }

    clStopWaringTitleCount = ()=>{
        if(this.isBegingWaringTitle){
            plusAnimainByQuartEaseInOut(sceneAnimainParam.count,()=>{
                this.stopWaringTitle = true;
                window.isCountMonster = true;
            })
        }

    }
    playGameOverMusic =()=>{
        if(this.isPlayGameOverMusic){
            this.isPlayGameOverMusic = false;
            window.musicList[5].currentTime = 0;
            window.musicList[5].muted = false;
            window.musicList[5].volume = 0.5
            window.musicList[5].play();
        }
    }
    drawShadowRect=()=>{
        this.ctx.save();
        this.ctx.globalAlpha= 0.5
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(1,1,window.canvasWidth,window.canvasHeight);
        this.ctx.restore();
    }
    draw=(t)=>{
        if(window.gameOver){
            this.playGameOverMusic();
            this.drawShadowRect();
            this.clGameOverAnValue();
            this.drawConformBtn(t);
            this.drawGameOver();
        }
        if(!this.stopWaringTitle){
           this.clWaringBandAnValue();
           this.drawMonsterWaringBand(t);
           this.clStopWaringTitleCount()
        }

    }
}
