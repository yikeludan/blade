/**
 * 游戏场景主题类 用来运行帧动画 与交互坐标轴响应
 */
import Hero from "./sprite/hero";
import Load from "./sprite/load";
import Boss from "./sprite/boss";
import Monster from "./sprite/monster";
import HomePage from "./sprite/homePage";
import imageLoader from "./util/imageLoadManager";
import util from "./util/util";
import dropSprite from "./sprite/dropSprite";
import Scene from "./sprite/scene";
export  default class GamePlay {
    constructor(ctx,canvas) {
        this.ctx = ctx;
        this.canvas = canvas;
        this.flag = false;
        this.x = 0;
        this.y = 0;
        this.cx = 10;
        this.cy = 10;
        this.px = window.initHeroVecX;
        this.py = window.initHeroVecY;

        this.moList = [];
        this.groundObjList = [];
        this.musicSprite = [];
        this.switchSceneSp = null;
        this.countDown = null;
        this.stopCountDown = false;
        this.playBackMusic = true;
        this.hero = new Hero(ctx,canvas);
        this.firstGroundInit();
        //this.pcInit();
        this.mosterLength = 0;
        this.mobleInit();
        this.musicInit();
        this.monsterInit();
    }
    musicInit =()=>{
        let audio = new Audio();
        audio.src='http://139.196.89.179:8103/image/pro/2.mp3'
        let audio1 = new Audio();
        audio1.src='http://139.196.89.179:8103/image/pro/3.mp3'
        let audio2 = new Audio();
        audio2.src='http://139.196.89.179:8103/image/pro/30.mp3'

        let audio3 = new Audio();
        audio3.src='http://139.196.89.179:8103/image/pro/9.mp3'
        let audio4 = new Audio();
        audio4.src='http://139.196.89.179:8103/image/pro/10.mp3'

        let audio5 = new Audio();
        audio5.src='http://139.196.89.179:8103/image/pro/15.mp3'

        let audio6 = new Audio();
        audio6.src='http://139.196.89.179:8103/image/pro/32.mp3'
        this.musicSprite.push(audio)
        this.musicSprite.push(audio1)
        this.musicSprite.push(audio2);
        this.musicSprite.push(audio3);
        this.musicSprite.push(audio4);
        this.musicSprite.push(audio5);
        this.musicSprite.push(audio6);

        window.musicList = this.musicSprite;

    }
    firstGroundInit = ()=>{
        let homePage = new HomePage(this.ctx);
        let load = new Load(this.ctx);
        //let boss = new Boss(this.ctx);
        this.groundObjList.unshift(load)
        this.groundObjList.push(homePage);
        this.switchSceneSp = new Scene(this.ctx)
       // this.groundObjList.push(boss);
        //this.groundObjList.unshift(homePage);

    }

    mobleInit = ()=>{
        this.canvas.ontouchstart =  (e) =>{
            e.preventDefault();
            this.x = e.touches[0].clientX;
            this.y = e.touches[0].clientY;
            this.seedHomePageCheckFlag(e);
            this.clcheckVecClick(e);
            this.flag = true;
        }

        this.canvas.ontouchend =  (e) =>{
            e.preventDefault();
            this.flag = false;
        }

        this.canvas.ontouchmove =  (e)=> {
            e.preventDefault();
            if (!this.flag) {
                return;
            }
            const sx = e.touches[0].clientX - this.x;
            const sy = e.touches[0].clientY - this.y;
            this.x = e.touches[0].clientX;
            this.y = e.touches[0].clientY;
            this.px += sx;
            this.py += sy;
        }
    }
    seedHomePageCheckFlag =(e)=>{
        window.checkX = e.touches[0].clientX;
        window.checkY = e.touches[0].clientY;
    }
    matchTouchVec = (key)=>{
        if(key == 'goStart'){
            if(this.groundObjList[window.playGroundIndex].showShadowFlag == 0){
                this.groundObjList[window.playGroundIndex].showAllSprite = 1;
              /*  window.musicList[2].currentTime = 0;
                window.musicList[2].muted = true;
                window.musicList[2].play();
                console.log(window.musicList[2])
                console.log('goStart');*/
                window.musicList[2].currentTime = 0;
                window.musicList[2].muted = true;
                window.musicList[2].play();
                window.musicList[4].currentTime = 0;
                window.musicList[4].muted = true;
                window.musicList[4].play();

                window.musicList[5].currentTime = 0;
                window.musicList[5].muted = true;
                window.musicList[5].play();
            }
        }

        if(key == 'goCron'){

            window.clickGron = true
            this.musicSprite[3].currentTime = 0;
            this.musicSprite[3].play();
        }
        if(key == 'rockOne'){
            if(this.groundObjList[window.playGroundIndex].rockOneClickFlag == 1){
                this.groundObjList[window.playGroundIndex].rockOneAnimaFlag = 2;
            }
            if(this.groundObjList[window.playGroundIndex].rockOneClickFlag == 0){
                this.groundObjList[window.playGroundIndex].rockOneAnimaFlag = 1;
                this.musicSprite[0].currentTime = 0;
                this.musicSprite[0].play();
                if(this.groundObjList[window.playGroundIndex].rockTwoClickFlag == 1){
                    this.groundObjList[window.playGroundIndex].rockTwoAnimaFlag = 2;
                }
            }
        }
        if(key == 'rockTwo'){
            if(this.groundObjList[window.playGroundIndex].rockTwoClickFlag == 1){
                this.groundObjList[window.playGroundIndex].rockTwoAnimaFlag = 2;
            }
            if(this.groundObjList[window.playGroundIndex].rockTwoClickFlag == 0){
                this.groundObjList[window.playGroundIndex].rockTwoAnimaFlag = 1;
                this.musicSprite[0].play();
                if(this.groundObjList[window.playGroundIndex].rockOneClickFlag == 1){
                    this.groundObjList[window.playGroundIndex].rockOneAnimaFlag = 2;
                }
            }
        }
        if(this.groundObjList[window.playGroundIndex].chckHeroAniParam.checkAnimaFlag ==1){
            if(key == 'checkHeroOne'){
                this.groundObjList[window.playGroundIndex].chckStorkeAniParam.checkAnimaFlag =0;
                this.hero.swtichLock = true;
                this.musicSprite[1].currentTime = 0;
                this.musicSprite[1].play();

            }
            if(key == 'checkHeroTwo'){
                this.groundObjList[window.playGroundIndex].chckStorkeAniParam.checkAnimaFlag =1;
                this.hero.swtichLock = true;
                this.musicSprite[1].currentTime = 0;
                this.musicSprite[1].play();

            }
            if(key == 'checkHeroThree'){
                this.groundObjList[window.playGroundIndex].chckStorkeAniParam.checkAnimaFlag =2;
                this.hero.swtichLock = true;
                this.musicSprite[1].currentTime = 0;
                this.musicSprite[1].play();

            }
        }
    }
    clcheckVecClick = (e)=>{
        if(window.playGroundIndex == 0){
            if(window.loadingCompleteFlag){
                window.playGroundIndex = 1
            }
            return;
        }
        for(let key in window.checkVecMap){
            if(window.checkVecMap.hasOwnProperty(key)){
                if(e.touches[0].clientX>=window.checkVecMap[key].topLeftX
                    &&e.touches[0].clientX<=window.checkVecMap[key].topRightX){
                    if(e.touches[0].clientY>=window.checkVecMap[key].topLeftY&&
                        e.touches[0].clientY<=window.checkVecMap[key].bottomLeftY){
                        this.matchTouchVec(key);
                    }
                }
            }
        }

    }
    playBackGroundMusic = ()=>{


    }
    pcInit=()=>{
        this.canvas.onmousedown =  (e) =>{
            e.preventDefault();
            this.x = e.clientX;
            this.y = e.clientY;
            this.flag = true;
        }

        this.canvas.onmouseup =  (e) =>{
            e.preventDefault();
            this.flag = false;
        }

        this.canvas.onmousemove =  (e)=> {
            e.preventDefault();
            if (!this.flag) {
                return;
            }
            const sx = e.clientX - this.x;
            const sy = e.clientY - this.y;
            this.x = e.clientX;
            this.y = e.clientY;
            this.px += sx;
            this.py += sy;
        }
    }





    monsterInit=()=>{
        for(let i = 0;i<50;i++){
            let x = util.random(1,window.canvasWidth);
            let y = util.random(1,window.canvasHeight);
            let angel = util.random(1,360);
            let type = util.randomInt(0,2)
            let type1 = util.randomInt(0,2)

            // let imageIndex = util.random(0,1)
           //   let x = 400;
           //   let y =400;
             //let angel = 30;
           // let imageIndex = 1;

            let mo = new Monster(this.ctx,
                this.canvas,x,y,imageLoader.monsterImageList[0]);
            if(i >25){
              //  mo.isDropArams = true;
            }
           // mo.isDropArams = true;
            mo.angel = angel;
            mo.walkLock = true;
            mo.moType = type;
            mo.moType_1 = type1;
            this.moList.push(mo)
        }
        window.initGlobalMonsterList = this.moList;
    }

    dropSpriteDraw = (t,aramList)=>{
        window.dropSpriteList.forEach((dropSprite,index)=>{
            dropSprite.draw(t,aramList);
        })
    }
    monsterDraw = (t,aramList)=>{
        window.drawGlobalMonsterList.forEach((monSter,index)=>{
            if(monSter.drawLock){
                //  this.moList.splice(index,1);//会造成闪屏
            }
            monSter.draw(t,aramList);
        })
    }
    clearCanvas =()=>{
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    }
    stopCountDownByMonster =()=>{
        if(this.stopCountDown){
            clearInterval(window.interval);
            window.interval = null;
            this.stopCountDown = false;
        }
    }

    countDownMonster =()=>{
        console.log('定时')
        if(this.mosterLength>=50){
           this.stopCountDown = true;
        }else {
            window.drawGlobalMonsterList.push(window.initGlobalMonsterList[this.mosterLength])
            this.mosterLength++;
        }

    }

    startCountDownByMonster = ()=>{
        if(window.isCountMonster){
            window.interval = setInterval(this.countDownMonster,500)
            window.isCountMonster = false;
        }
    }
    countIsNextSence = ()=>{
        if(window.deadMonster>=50){
            window.nextSence = true;
            window.drawGlobalMonsterList = [];
            window.initGlobalMonsterList = [];

            //  window.nextSenceBefore = true;
        }
    }

    //运行帧动画
    play=(t)=>{
        this.clearCanvas();
        if(window.beginAttack){
            this.countIsNextSence();
            this.stopCountDownByMonster();
            this.startCountDownByMonster();
            this.monsterDraw(t,this.hero.armsList);
            this.switchSceneSp.draw(t);
            //this.dropSpriteDraw(t,this.hero.armsList);
        }else {
            this.groundObjList[window.playGroundIndex].draw(t);
        }
         if(window.playGroundIndex>0){
             this.hero.draw(this.px,this.py,t);
         }
        window.requestAnimationFrame(this.play);
    }
}
