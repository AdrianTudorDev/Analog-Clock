import DrawClock  from "./clock.js";
export default class DrawClockHands extends DrawClock {
    
    constructor(ctx, x, y, radius, hourHandLen, hourHandWid, minHandLen, minHandWid, secHandLen, secHandWid) {

        super(ctx, x, y, radius)

        this.d = new Date();
        this.h = this.d.getHours() % 12 || 12;
        this.min = this.d.getMinutes();
        this.sec = this.d.getSeconds();
     
        this.hourHandLen = hourHandLen;
        this.hourHandWid = hourHandWid;
        this.minHandLen = minHandLen;
        this.minHandWid = minHandWid;
        this.secHandLen = secHandLen;
        this.secHandWid = secHandWid;
    };

    drawHands(color, width, length, unitOfTime, numberOfUnits, unitOfTimeLowerLevel ){
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = width;
        let prop = unitOfTimeLowerLevel / 60  
        let angle = (2 * Math.PI / numberOfUnits ) * (unitOfTime + prop)  - Math.PI / 2;
              
        let cos = Math.cos(angle);
        let sin = Math.sin(angle);
        
        this.ctx.beginPath();
        this.ctx.moveTo(this.x , this.y);
        this.ctx.lineTo(this.x + length * cos , this.y + length * sin);
        this.ctx.stroke(); 
    };
    
    drawCenter(){
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, 15, 0, 2 * Math.PI);
        this.ctx.strokeStyle = 'black'
        this.ctx.fill();
    };

    drawMeridian(){
        this.ctx.font = 'bold 30px serif';
        this.ctx.fillStyle  = 'black'
        let txt = "AM"
        if (this.d.getHours() >= 12) {
            txt = "PM"
        }
        const metrics = this.ctx.measureText(txt);
        let w = metrics.width;
        this.ctx.fillText(txt, this.x - w / 2, 450)
    };

    drawBehindeLine(color, width, length, unitOfTime, numberOfUnits, unitOfTimeLowerLevel){
        this.ctx.strokeStyle = color;
        this.ctx.fillStyle = color;
        this.ctx.lineWidth = width;
        let prop = unitOfTimeLowerLevel / 60;  
        let l = length / 5;
        let angle = (2 * Math.PI / numberOfUnits ) * (unitOfTime + prop)  - Math.PI / 2;
              
        let cos = Math.cos(angle);
        let sin = Math.sin(angle);
        
        this.ctx.beginPath();
        this.ctx.moveTo(this.x , this.y);
        this.ctx.lineTo(this.x - l * cos , this.y - l * sin);
        this.ctx.stroke();

        this.ctx.beginPath();
        this.ctx.arc(this.x - l * cos , this.y - l * sin, 12, 0, 2 * Math.PI);
        this.ctx.fill();

    }

    drawHourHand(color){
        this.drawHands(color, this.hourHandWid, this.hourHandLen, this.h, 12, this.min);        
    };

    drawMinutesHand(color){
        this.drawHands(color, this.minHandWid, this.minHandLen, this.min, 60, this.sec);  
    };

    drawSecondsHand(color){
        this.drawHands(color, this.secHandWid, this.secHandLen, this.sec, 60, 0);
        this.drawBehindeLine(color, this.secHandWid, this.secHandLen, this.sec, 60, 0);
    };

    

}
