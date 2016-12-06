function person(canvas,cobj,run,jump){
    this.canvas=canvas;
    this.cobj=cobj;
    this.run=run;
    this.jump=jump;
    this.state=0;
    this.status="run";
    this.x=0;
    this.y=420;
    this.width=128;
    this.height=128;
    this.peedx=5;

    this.zhongli=5;
    this.speedy=10;
    this.num=0
}
person.prototype={
    draw: function () {
        this.cobj.clearRect(0,0,this.canvas.width,this.canvas.height);
        this.cobj.save();
        this.cobj.translate(this.x, this.y);
        this.cobj.drawImage(this[this.status][this.state],0,0,128,128,0,0,this.width,this.height);
        this.cobj.restore();
    },
    // uplodata:function(){
    //     if(this.y>=this.endy){
    //         this.y = this.endy
    //         // stone(this.cobj, this.x + this.width / 2, this.y + this.height)
    //     } else if (this.y < this.endy) {
    //         this.speedy += this.zhongli;
    //         this.y += this.speedy;
    //     }
    // }

}
// 障碍物
function hinder(canvas, cobj, hinderImg) {
    this.canvas = canvas;
    this.cobj = cobj;
    this.hinderImg = hinderImg;
    this.state = 0;
    this.x = canvas.width;
    this.y = 470;
    this.width=81;
    this.height=100;
}
hinder.prototype={
    draw:function(){
        this.cobj.save();
        this.cobj.translate(this.x,this.y);
        this.cobj.drawImage(this.hinderImg[this.state],0,0,81,100,0,0,this.width,this.height);
        this.cobj.restore();
        // console.log(this.hinderImg[this.state])
    }
}
// 血

function lizi(canvas,cobj,person){
    this.person=person;
    this.x=this.person.x+this.person.width/2;
    this.y=this.person.y+this.person.height/2;
    this.canvas=canvas;
    this.cobj=cobj;
    this.speedx=6*Math.random()-3;
    this.speedy=6*Math.random()-3;
    this.r=6-3*Math.random();
    this.color="red";
    this.zhongli=1;
    this.lifts=5;
}
lizi.prototype={
    darw:function(){
        // this.cobj.clearRect(0,0,this.canvas.width,this.canvas.height);
        this.cobj.save();
        this.cobj.translate(this.x,this.y);
        this.cobj.beginPath();
        this.cobj.fillStyle=this.color;
        this.cobj.arc(0,0,this.r,0,Math.PI*2);
        this.cobj.fill();
        this.cobj.restore();
    },
    uplade:function(){
        this.x+=this.speedx;
        this.speedy+=this.zhongli;
        this.y+=this.speedy;
        this.r-=0.1;
        this.lifts-=0.5;

    }
}
function blod(canvas,cobj,person){
    var arr=[];
    for(var i=0;i<30;i++){
        arr.push(new lizi(canvas,cobj,person));
    }
    var t=setInterval(function(){
        for(var i=0;i<arr.length;i++){
            arr[i].darw();
            arr[i].uplade();
            if(arr[i].r<=0 || arr[i].lifts<=0){
                arr.splice(i,1);
            }
        }
        if(arr.length==0){
            clearInterval(t)
        }
    },80)
}
// 子弹
function zidan(canvas,cobj,zidan){
    this.canvas=canvas;
    this.cobj=cobj;
    this.x=0;
    this.y=0;
    this.width=80;
    this.height=80;
    this.speedx=5;
    this.zidan=zidan;
}
zidan.prototype={
    draw:function(){
        // this.cobj.clearRect(0,0,this.canvas.width,this.canvas.height);
        this.cobj.save();
        this.cobj.beginPath();
        this.cobj.translate(this.x,this.y);
        this.cobj.drawImage(this.zidan,0,0,80,80,0,0,this.width,this.height);
        this.cobj.restore();
    }
}

// 游戏的主类
function game(canvas,cobj,run,jump,hinderImg,pro,span,zidan,req,vido_run,vido_jump,vido_hit,vido_zidan,vido_eat){
    this.canvas=canvas;
    this.w=this.canvas.width;
    this.h=this.canvas.height;
    this.cobj=cobj;
    this.zhang=hinderImg ;
    this.zidan=zidan;
    this.req=req;
    this.pro=pro;
    this.span=span;
    this.zhangarr=[];
    this.run=run;
    this.jump=jump;
    this.person=new person(canvas,cobj,run,jump);
    this.backx=0;
    this.backspeed=5;
    this.speed=10;
    this.lift=5;
    this.gread=0;
    this.isfir=false;
    this.dany=10;
    document.querySelector(".dany").innerHTML=this.dany;
    this.vido_run=vido_run;
    this.vido_jump=vido_jump;
    this.vido_hit=vido_hit;
    this.vido_zidan=vido_zidan;
    this.vido_eat=vido_eat;
    this.num1=0;
    this.ts={};
    this.flag=true;
    this.inta=0;
    this.speed=10;
    this.r=110;
    this.y=this.person.y;
    this.stop=true;
}
game.prototype={
    play:function(star,zhao){
        star.css("animation","star1 2s forwards");
        zhao.css("animation","zhao1 2s forwards");
        // this.move1()
        this.runs();
        this.jumps();
        this.move()

    },
    move1:function(){
        var that=this;
        // console.log(that)
        that.num1+=50;
        var time=2000+parseInt(3*Math.random())*1000;
        that.person.num++;
        if(that.person.status=="run"){
            that.person.state=that.person.num%8;
        }else{
            that.person.state=0;
        }
        that.person.x+=that.person.peedx;
        if(that.person.x>that.w/3){
            that.person.x=that.w/3
        }
        that.person.draw();
        // that.person.uplodata();
        that.backx-=that.backspeed;
        that.canvas.style.backgroundPositionX = that.backx + "px";
        // 障碍物
        if(that.num1%time==0){
            that.num1=0;
            time=2000+parseInt(3*Math.random())*1000;
            var zhangaiobj=new hinder(that.canvas,that.cobj,that.zhang);
            zhangaiobj.state=Math.floor(4*Math.random());

            that.zhangarr.push(zhangaiobj);
            if(that.zhangarr.length>100){
                that.zhangarr.shift();
            }
        }

        for(var i=0;i<that.zhangarr.length;i++){
            that.zhangarr[i].draw();
            that.zhangarr[i].x-=that.speed;

            if(hitPix(that.canvas,that.cobj,that.zhangarr[i],that.person)) {
                //子弹数量
                if (that.zhangarr[i].state == 1) {
                    that.vido_eat.play();
                    that.zhangarr[i].flage = true;
                    that.zhangarr[i].flage1 = true;
                    if (!that.zhangarr[i].flage2) {
                        that.dany++;
                    }
                    that.zhangarr[i].flage2 = true;
                    document.querySelector(".dany").innerHTML = that.dany;
                    that.zhangarr.splice(i, 1)
                    that.vido_hit.pause();
                }else {
                    that.vido_eat.pause();
                    that.vido_hit.play()
                    // 生命值
                    if (!that.zhangarr[i].flage) {
                        that.lift--;
                        that.zhangarr[i].flage = true;
                        that.pro.style.width = that.lift * 20 + "px";

                        blod(that.canvas,that.cobj,that.person);
                    }
                    // 生命值小于0的时候
                    if (that.lift <= 0) {
                        that.vido_run.pause();
                        document.querySelector(".gave").style.display = "block";
                        document.querySelector(".gave").style.animation = "gread 2s forwards";
                        document.querySelector(".zhao").style.animation = "zhao 2s forwards";
                        var messages=localStorage.messages?JSON.parse(localStorage.messages):[];
                        var name=document.querySelector(".name").value;
                        var map={name:name,gread:that.gread};

                        if(messages.length>0){
                            messages.sort(function(a,b){
                                return a.gread<b.gread;
                            })
                            if(map.gread>messages[messages.length-1].gread){
                                if(messages.length==5){
                                    messages[messages.length-1]=map;
                                }else if(messages.length<5){
                                    messages.push(map);
                                }
                            }
                        } else{
                            messages.push(map);
                        }
                        localStorage.messages=JSON.stringify(messages);

                        clearInterval(that.ts.t1);
                        clearInterval(that.ts.t2);

                        document.querySelector(".gave p").innerHTML=that.gread;
                        var messages=localStorage.messages?JSON.parse(localStorage.messages):[];
                        var str="";
                        for(var k=0;k<messages.length;k++){
                            var li=document.createComment("li");
                            str+="<li>"+messages[k].name+":"+messages[k].gread;
                        }
                        document.querySelector(".gave ul").innerHTML=str;
                        document.querySelector(".but").onclick = function () {
                            location.reload();
                        }
                    }
                }
            }
            // 子弹
            if(that.isfir){
                if(that.dany>0){
                    that.zd.speedx+=1;
                    that.zd.x+=that.zd.speedx;
                    that.zd.draw();
                }
                if(hitPix(that.canvas,that.cobj,that.zhangarr[i],that.zd)){
                    // console.log(that.zhangarr[i].width)
                    that.zhangarr.splice(i,1)
                }
            }

            // 分数值
            // console.log(that.zhangarr[i].x+that.zhangarr[i].width)
            if(that.person.x>that.zhangarr[i].x+that.zhangarr[i].width){
                if(!that.zhangarr[i].flage && !that.zhangarr[i].flage1){
                    that.gread++;
                    that.span.innerHTML=that.gread;
                }
                that.zhangarr[i].flage1=true;
            }
        }

    },
    // 跑
    runs:function(){
        var that=this;
        // console.log(that);
        that.vido_run.play();
        // var num=0;

        that.ts.t1=setInterval(function(){
            that.move1();
        },50)
    },
    // 跳
    jumps:function(){
        var that=this;
        document.onkeydown=function(e){
            if(e.keyCode==13){
                if(that.stop){
                    clearInterval(that.ts.t1);
                    clearInterval(that.ts.t2);
                    that.stop=false;
                }
            }else if(e.keyCode==65){
                if(!that.stop){
                    that.ts.t1=setInterval(function(){
                        that.move1();
                    },50)
                    if(!that.flag){
                        clearInterval(that.ts.t2);
                        that.ts.t2=setInterval(function(){
                            that.move2();
                        },50)
                    }
                    that.stop=true;
                }
            }else if(e.keyCode==32){
                if(!that.flag){
                    return;
                }
                that.flag=false;
                that.vido_jump.play();
                that.vido_run.pause();
                that.person.status= "jump";
                that.ts.t2=setInterval(function(){
                    that.move2();
                },50)
            }
        }
    },
    move2:function(){
        var that=this;
        that.inta+=that.speed;

        if(that.inta>=180){
            that.person.y=that.y;
            clearInterval(that.ts.t2);
            that.flag=true;
            that.person.status="run";
            that.inta=0;
            that.vido_run.play();
        }
        var top=Math.sin(that.inta*Math.PI/180)*that.r;
        that.person.y=that.y-top;
    },

    move:function(){
        var that=this;
        document.querySelector(".zhao").onclick=function(){
            that.vido_zidan.play();
            that.zd=new zidan(that.canvas,that.cobj,that.zidan);
            that.zd.x=that.person.width/2+that.person.x;
            that.zd.y=that.person.height/2+that.person.y;
            that.zidan.speedx=10;
            that.isfir=true;
            that.dany--;
            if(that.dany<=0) {
                that.dany=0;
                that.isfir = false;
                document.querySelector(".dany").innerHTML = "0";
            }else{
                that.isfir=true;
                document.querySelector(".dany").innerHTML=that.dany;
            }

        }
    },

    // agin:function(){
    //     var that=this;
    //     document.querySelector(".gave").style.animation = "gread1 2s forwards";
    //     document.querySelector(".zhao").style.animation = "zhao1 2s forwards";
    //
    //     that.person.x=0;
    //     that.person.y=420;
    //     that.lift=5;
    //     that.gread=0;
    //     that.zhangarr=[];
    //     // that.inta=0;
    //     // that.speed=10;
    //     // that.r=110;
    //     // that.y=that.person.y;
    //     that.dany=10;
    //     // that.run();
    //     that.stop=false;
    //     that.flag=false;
    //     if(!that.stop){
    //         that.ts.t1=setInterval(function(){
    //             that.move1();
    //         },50)
    //         if(!that.flag){
    //             clearInterval(that.ts.t2);
    //             that.ts.t2=setInterval(function(){
    //                 that.move2();
    //             },50)
    //         }
    //         that.stop=true;
    //     }
    // }
}