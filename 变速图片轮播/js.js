//要变化的Dom元素
//元素要变化的目标值，用对象描述
//运动完成（clearInterval）回调函数
function move(element,target,fn){
    clearInterval(element.timer);
    element.timer=setInterval(function(){
        //把需要变化的属性，都变化一次；
        var isComplete=true;
        for(var attr in target){
            //speed (目标值-当前值)/10
            //499.999px;  500.00003px
            var current;
            if (attr == 'opacity') {
                current = Math.round(parseFloat(getStyle(element, attr)) * 100);
            } else {
                current = Math.round(parseFloat(getStyle(element, attr)));//current ==》NAN
            }
            if(!current){
                current=0;
            }
            var speed=(target[attr]-current)/10;
            //speed 每次都除以10 ，，值无法到达目标值；
            // 当speed 小于  -1px  1px  。移动的时候，无效；
            speed=speed>0?Math.ceil(speed):Math.floor(speed);
            if(current!=target[attr]){
                if (attr == 'opacity') {
                    element.style.filter = 'alpha(opacity:' + parseInt(current + speed) + ')';
                    element.style.opacity = (current + speed) / 100;
                } else {
                    element.style[attr]=current+speed+"px";
                }
                isComplete=false;
            }
        }
        //清理定时器。
        if(isComplete){
            clearInterval(element.timer);
            if(fn){
                fn();
            }
        }
    },30);
}

//1.DOM元素
//2.样式的名称，到底要获取哪个样式的值；
// left  100px =>100  100px  parseInt(100px)=>100
// 500px ;  parseInt(499.99999px)==>499   500   500.0000003   501
//parseFloat(499.999px)==>499.999  Math.round(499.999)=>500
function getStyle(dom,name){
    if(dom.currentStyle){
        return dom.currentStyle[name];
    }else{
        return window.getComputedStyle(dom,false)[name];
    }
}