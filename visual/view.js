export default class View{

    static player(ctx, x, y, size, color, shotRange){
        ctx.beginPath();
        ctx.arc(x, y, size, 0, 2 * Math.PI);
        ctx.strokeStyle = color;
        ctx.stroke();
        ctx.closePath();

        ctx.beginPath();
        ctx.strokeStyle = '#00000020';
        ctx.fillStyle = '#00000005';
        ctx.arc(x, y, shotRange, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    }

    static testEnemy(ctx, x, y, size, color) {
        ctx.beginPath();
        ctx.arc(x, y, size, 0, 2 * Math.PI);
        ctx.strokeStyle = color;
        ctx.stroke();
        ctx.closePath();
    }


}