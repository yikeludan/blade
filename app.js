import GamePlay from "./src/gamePlay";
import GlobalParamManager from "./src/manager/GlobalParamManager";
const canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let globalManager = new GlobalParamManager(ctx);
globalManager.initAll();
let game = new GamePlay(ctx,canvas);
game.play();



