/**
 * Created by 201404210289 on 2016/3/4.
 */
function drawRect(cxt,x,y,width,height,borderWidth,borderColor,fillColor){

    cxt.beginPath();
    /*
     cxt.moveTo(x,y);
     cxt.lineTo(x+width,y);
     cxt.lineTo(x+width,y+height);
     cxt.lineTo(x,y+height);
     */
    cxt.rect(x,y,width,height);
    cxt.closePath();

    cxt.lineWidth = borderWidth;
    cxt.fillStyle = fillColor;
    cxt.strokeStyle = borderColor;

    cxt.fill();
    cxt.stroke();
}
function drawRect2(cxt,x,y,width,height,borderWidth,borderColor,fillColor){


    cxt.lineWidth = borderWidth;
    cxt.fillStyle = fillColor;
    cxt.strokeStyle = borderColor;

    cxt.fillRect(x,y,width,height);
    cxt.strokeRect(x,y,width,height)
}