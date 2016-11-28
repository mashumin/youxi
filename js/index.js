window.onload=function(){
    var clinew=document.documentElement.clientWidth;
    var clineh=document.documentElement.clientHeight;

    var canvas=document.querySelector("canvas");
    var cobj=canvas.getContext("2d");
    canvas.width=clinew-5;
    canvas.height=clineh-5;
    var run=document.querySelectorAll(".run");
    var jump=document.querySelectorAll(".jump");
    var hinderImg=document.querySelectorAll(".zhang");
    var pro=document.querySelectorAll(".blods")[0];
    // var glead=document.querySelectorAll(".glead")[0];
    var span=document.querySelectorAll("span")[0];
    var zidan=document.querySelectorAll(".zidan")[0];
    var vido_run=document.querySelector(".vido_run");
    var vido_jump=document.querySelector(".vido_jump");
    var vido_hit=document.querySelector(".vido_hit");
    var vido_zidan=document.querySelector(".vido_zidan");
    var vido_eat=document.querySelector(".vido_eat");
    
console.log(jump)
    var star= $(".star");
    var zhao= $(".zhao");
    var but=$(".beg");
    var req=$(".but");
    but.one("click",function(){
       
        var obj=new game(canvas,cobj,run,jump,hinderImg,pro,span,zidan,req,vido_run,vido_jump,vido_hit,vido_zidan,vido_eat);
        obj.play(star,zhao);
    })

    
}