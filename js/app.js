import DrawClock from './clock.js';
import DrawClockHands from './clockHands.js'

window.onload = init

var ctx;
var canvas;

var x; //x-ul centrul ceasului
var y; //y-ul centrul ceasului
var rad; //raza cadranului ceasului
const space = 15; //grosimea chenarului ceasului cat si a spatiului dintre chenar si ceas

const length = 18; //lungimea indicatorului de ore a ceasului, iar lungimea indicatorului de minute a ceasului este de trei ori mai mica
const width = 6; //grosimea indicatorului de ore a ceasului, grosimea indicatorului de minute a ceasului este jumatate

const hourHandLen = 120; //lungimea limbei orelor ceasului
const minHandLen = 190; //lungimea limbei minutelor ceasului
const secHandLen = 240; //lungimea limbei secundelor ceasului

const hourHandWid = 12; //grosimea limbei orelor ceasului
const minHandWid = 10; //grosimea limbei minutelor ceasului
const secHandWid = 4; //grosimea limbei secundelor ceasului

const hourColor = 'black'; // coloeare limbi orelor
const minColor = 'black'; // culoare limbi minutelor
const secColor = 'red'; // culoare limbi secundelor

function init() {
    canvas = document.querySelector("#canvas");
 
    if (canvas.getContext) {
        ctx = canvas.getContext('2d'); 

        x = canvas.width / 2;
        y = canvas.height / 2;        
        rad = Math.min(x, y) - space;

        update(ctx);

    } else {
        alert("Canvas is not supported.");
    }
}

function draw(ctx) {
    var clock = new DrawClock(ctx, x, y, rad, space, width , length);
    clock.drawClockFrame();
    clock.drawClockBackground();
    clock.drawIndicators();
    clock.drawTextNumbers();
}

function update(ctx) {    
    ctx.clearRect(0, 0, 600, 600);

    draw(ctx);

    var clockHands = new DrawClockHands(ctx, x, y, rad, hourHandLen, hourHandWid, minHandLen, minHandWid, secHandLen, secHandWid);
    clockHands.drawCenter();
    clockHands.drawMeridian();
    clockHands.drawHourHand(hourColor);
    clockHands.drawMinutesHand(minColor);
    clockHands.drawSecondsHand(secColor);
    
    window.requestAnimationFrame(function(){update(ctx)});
}