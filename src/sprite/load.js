import imageLoader from "../util/imageLoadManager";
import loadAnimainParam from '../animainParam/load/loadAnimainParam'
import {plusAnimainByCubicEaseOut} from '../manager/globalAnimationManager'
export  default class Load{
    constructor(ctx) {
       this.ctx = ctx;
       this.bgSprite = null;
       this.strText = ''
       this.init();
    }

    init = ()=>{
        let image = new Image();
        image.src = imageLoader.loadBgImage;
        this.bgSprite = image;
    }
    clStrText = ()=>{
        if(loadAnimainParam.progressBarPlus.anValue>100){
            this.strText = '加载全局变量完毕...'
        }
        if(loadAnimainParam.progressBarPlus.anValue>200){
            this.strText = '加载图集完毕...'
        }
        if(loadAnimainParam.progressBarPlus.anValue>400){
            this.strText = '加载音效完毕...'
        }
        if(loadAnimainParam.progressBarPlus.anValue>600){
            this.strText = '加载物理效果完毕...'
        }
        if(loadAnimainParam.progressBarPlus.anValue>700){
            this.strText = '加载四叉树算法完毕...'
        }
        if(loadAnimainParam.progressBarPlus.anValue>=800){
            this.strText = '完成 点击屏幕进入'
        }
    }
    clLoadingAnValueParam = ()=>{
        plusAnimainByCubicEaseOut(
            loadAnimainParam.progressBarPlus, ()=> {
                window.loadingCompleteFlag = true;
            });
    }
    drawLoading = ()=>{
        this.ctx.save();
        this.ctx.fillRect(0,0,window.canvasWidth,window.canvasHeight);
        this.ctx.restore();

        this.ctx.save();
        this.ctx.fillStyle="white";
        this.ctx.fillRect(window.canvasWidth/2-400,window.canvasHeight/1.3,loadAnimainParam.progressBarPlus.anValue,30);
        this.ctx.restore();

        this.ctx.save();
        this.ctx.font = '50px "微软雅黑"';
        this.ctx.fillStyle = "white";
        this.ctx.fillText(this.strText, window.canvasWidth/2-150, window.canvasHeight/1.4);
        this.ctx.restore();
    }
    draw = ()=>{
       this.clLoadingAnValueParam();
       this.clStrText();
       this.drawLoading();
    }
}
