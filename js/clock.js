export default class DrawClock {

    constructor(ctx, x, y, radius, border, indicatorsWidth, indicatorsLength){
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.border = border;
        this.indicatorsWidth = indicatorsWidth;
        this.indicatorsLength = indicatorsLength;
    };

    drawClockFrame(){
        //shadow
        this.ctx.shadowOffsetX = this.border / 1.2;
        this.ctx.shadowOffsetY = this.border / 1.2;
        this.ctx.shadowBlur =  this.border * 2;
        this.ctx.shadowColor = 'rgba(0, 0, 0, 0.6)';   
        //circle
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        //border
        this. ctx.lineWidth = this.border;
        this.ctx.strokeStyle = "black";
        this.ctx.stroke();
        // stergerea umbrei
        this.ctx.shadowOffsetX = 0; 
        this.ctx.shadowOffsetY = 0;    
    };

    drawClockBackground(){
        //shadow
        this.ctx.shadowOffsetX = this.border / 2 ;
        this.ctx.shadowOffsetY = this.border / 2;
        this.ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';  
        //circle background
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        this.ctx.fillStyle = "#8ED6FF";
        this.ctx.fill();
        // stergerea umbrei
        this.ctx.shadowOffsetX = 0; 
        this.ctx.shadowOffsetY = 0;
        this.ctx.shadowBlur = 0;
        this.ctx.shadowColor = 'rgba(0, 0, 0, 0.0)'; 
    };

    drawIndicators(){ 
        // cariabile transformate pentru simplificare notatiilor
        let nrIdicator = 60;
        let l = this.indicatorsLength;
        let w = this.indicatorsWidth;
        let x = this.x;
        let y = this.y;
        let r = this.radius; 
        // grosimea si lungimea indicatoarelor de minute
        let al = l / 3;
        let aw = w / 2;          
        // definirea unghiului dintre liniile indicatoarelor si unghiul de incrementare
        let angle = (2 * Math.PI) / nrIdicator;    
        let inerForAngle = angle;
        // desenarea indicatoarelor
        for (let i = 1; i <= nrIdicator; i++) { 
            // unghiul curent
            let cos = Math.cos(inerForAngle);
            let sin = Math.sin(inerForAngle);    
            // distributia indicatoarelor orelor
            if (i % 5 == 0) {            
                this.ctx.lineWidth = w;
                this.ctx.beginPath();
                this.ctx.moveTo(x + r * cos, y + r * sin);
                this.ctx.lineTo(x + (r - l) * cos, y + (r - l) * sin);    
            // distributia indicatoarelor minutelor                    
            } else {
                this.ctx.lineWidth = aw;
                this.ctx.beginPath();
                this.ctx.moveTo(x + r * cos, y + r * sin);
                this.ctx.lineTo(x + (r - al) * cos, y + (r - al) * sin);               
            }
            this.ctx.strokeStyle  = 'black';
            this.ctx.stroke(); 
            inerForAngle += angle; 
        };    
    };

    drawTextNumbers(){
        // marimea si culoarea numerelor ceasului
        this.ctx.font = 'bold 60px serif';
        this.ctx.fillStyle  = 'black'
        // variabile transformate pentru simplificare notatiilor
        let numbers = 12;
        let l = this.indicatorsLength + 40;
        let x = this.x;
        let y = this.y;
        let r = this.radius - l; 
        // definirea unghiului dintre liniile punctelor de start a textului cu centru cercului si unghiul de incrementare
        let angle = 2 * Math.PI / numbers; 
        let inerForAngle =  angle - Math.PI / 2; 
        for (let i = 1; i <= numbers; i++) { 
            // unghiul curent
            let cos = Math.cos(inerForAngle);
            let sin = Math.sin(inerForAngle);    
            // distributia indicatoarelor orelor
            let txt = i;
            const metrics = this.ctx.measureText(txt);
            let w = metrics.width;
            const actualHeight = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
            this.ctx.fillText(txt, x - w / 2 + r  * cos, y + actualHeight / 2 + r  * sin);     
            // distributia indicatoarelor minutelor 
            inerForAngle += angle; 
        };

    }
}


