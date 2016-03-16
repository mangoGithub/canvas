function drawStar( cxt,r,R,x,y,width,lineColor){
    cxt.beginPath();
    for(var i = 0; i<5; i++) {
        cxt.lineTo(Math.cos((18 + i * 72) / 180 * Math.PI) * R + x,
            -Math.sin((18 + i * 72) / 180 * Math.PI) * R + y);
        cxt.lineTo(Math.cos((54 + i * 72) / 180 * Math.PI) * r + x,
            -Math.sin((54 + i * 72) / 180 * Math.PI) * r + y);
    }
    cxt.closePath();
    cxt.lineWidth = width;
    cxt.strokeStyle  = lineColor;
    cxt.stroke();
}
/**
 * Created by 201404210289 on 2016/3/4.
 */
