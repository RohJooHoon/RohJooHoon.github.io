var rotate_flag = 1;
var plus_cnt = 1.0;
var modulus = 0;
var images;
var newX = 0;
var newY = 0;
var shiftX = 0;
var shiftY = 0;
var zoomScale = 0;
var right_flag = false;
var left_flag = false;
var zoom_flag = false;
var image_frame = 0;

function mode() {
    zoom_flag = !zoom_flag;
    if (zoom_flag) {
        zoom();
    }
    else {
        out();
    }
}


function close360(){
    $('.layer360-img').css('display', 'block');
    $('#rotate_right').css('visibility', 'hidden');
    $('#rotate_left').css('visibility', 'hidden');
    $('.wave360_plusminus_btn_wrap').css('visibility', 'hidden');
    // zoom out 踰꾪듉 �좉� 20191115 UI-HS
    $('.wave360_out_btn').css('visibility', 'hidden');
    $('.wave360_zoom_btn').css('visibility', 'visible');
    // zoom out 踰꾪듉 �좉�
    $('#canvas360').css('cursor', 'e-resize');
    rotate_flag = 1;
    $('#canvas360').attr('width', 840);
    $('#canvas360').attr('height', 840);
    $('#canvas360').css('width', 840);
    $('#canvas360').css('height', 840);
    $('#wave360').css('overflow', 'visible');
    $('#wave360').css('top', '0');
    plus_cnt = 1;
    newX = 0;
    newY = 0;
    zoomScale = 1;
    $('#canvas360').css('top', 0);
    $('#canvas360').css('left', '5px');
    var canvas = document.getElementById('canvas360');
    var context = canvas.getContext('2d');
    context.drawImage(images[modulus], 0, 0, context.canvas.width, context.canvas.height);
    $('#canvas360').css('transform', 'scale(1)');
    $('#canvas360').css('-webkit-transform', 'scale(1)');
}

function out() {
    $('.layer360-img').css('display', 'block');
    $('#rotate_right').css('visibility', 'hidden');
    $('#rotate_left').css('visibility', 'hidden');
//    $('#img_plus').css('visibility', 'hidden');
//    $('#img_minus').css('visibility', 'hidden');
    // zoom out 踰꾪듉 �좉� 20191115 UI-HS
    $('.wave360_out_btn').css('visibility', 'hidden');
    $('.wave360_zoom_btn').css('visibility', 'visible');
    $('#canvas360').css('cursor', 'e-resize');
    rotate_flag = 1;
    $('#canvas360').attr('width', 840);
    $('#canvas360').attr('height', 840);
    $('#canvas360').css('width', 840);
    $('#canvas360').css('height', 840);
    plus_cnt = 1;
    newX = 0;
    newY = 0;
    zoomScale = 1;
    $('#canvas360').css('top', 0);
    $('#canvas360').css('left', '5px');
    var canvas = document.getElementById('canvas360');
    var context = canvas.getContext('2d');
    context.drawImage(images[modulus], 0, 0, context.canvas.width, context.canvas.height);
    $('#canvas360').css('transform', 'scale(1)');
    $('#canvas360').css('-webkit-transform', 'scale(1)');
}

function zoom() {
    $('.layer360-img').css('display', 'none');
    $('#rotate_right').css('visibility', 'visible');
    $('#rotate_left').css('visibility', 'visible');
    // zoom out 踰꾪듉 �좉� 20191115 UI-HS
    $('.wave360_out_btn').css('visibility', 'visible');
    $('.wave360_zoom_btn').css('visibility', 'hidden');
    $('#canvas360').css('cursor', 'default');
    $('#canvas360').attr('width', 2700);
    $('#canvas360').attr('height', 2700);
    var canvas = document.getElementById('canvas360');
    var context = canvas.getContext('2d');
    context.drawImage(images[modulus], 0, 0, context.canvas.width, context.canvas.height);
    $('#canvas360').css('width', 850);
    $('#canvas360').css('height', 850);
    rotate_flag = 0;
    $('#canvas360').css('transform', 'scale(3)');
    $('#canvas360').css('-webkit-transform', 'scale(3)');
}

function plus() {
    plus_flag = true;
    setTimeout(function() {
        if(plus_cnt <= 3) {
            plus_cnt += 0.1;
        }
        $('#canvas360').css('transform', 'scale('+plus_cnt+')');
        $('#canvas360').css('-webkit-transform', 'scale('+plus_cnt+')');
        if (plus_flag)
            plus();
    }, 250);
}

function minus() {
    minus_flag = true;
    setTimeout(function() {
        if(plus_cnt > 1) {
            plus_cnt -= 0.1;
        }
        $('#canvas360').css('transform', 'scale('+plus_cnt+')');
        $('#canvas360').css('-webkit-transform', 'scale('+plus_cnt+')');
        if(plus_cnt==1.0) {
            out();
        }
        if (minus_flag)
            minus();
    }, 250);
}

function rotate_right() {
    right_flag = true;
    setTimeout(function() {
        var canvas = document.getElementById('canvas360');
        var context = canvas.getContext('2d');
        modulus -= 1;
        if(modulus == -1)
            modulus = image_frame-1;
        //    context.clearRect(0, 0, 900, 900);
        context.drawImage(images[modulus], 0, 0, context.canvas.width, context.canvas.height);
        if (right_flag)
            rotate_right();
    }, 100);
}

function rotate_left() {
    left_flag = true;
    setTimeout(function() {
        var canvas = document.getElementById('canvas360');
        var context = canvas.getContext('2d');
        modulus += 1;
        if(modulus == image_frame)
            modulus = 0;
        //    context.clearRect(0, 0, 900, 900);
        context.drawImage(images[modulus], 0, 0, context.canvas.width, context.canvas.height);
        if (left_flag)
            rotate_left();
    }, 100);

}

$(document).ready(function() {

    let host = `${location.protocol}//${location.host}`;
    let params = getUrlParams();

    //var url = document.getElementById("wave360").getAttribute("src");
    var url = 'https://devapi.kiwisnap.net/spin/info/' + params.cid + '/' + params.pid;
console.log(url);
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var myArr = JSON.parse(this.responseText);
            load_image(myArr.img360_list);
        }
    };
    xhr.open('GET', url, true);
    xhr.send();

    function load_image(image_list) {
        images = new Array(image_list.length);
        image_frame = image_list.length;
        for(var i=0; i<image_list.length; i++) {
            images[i] = new Image();
            images[i].src = image_list[i];
        }
        var photo360 = document.getElementById("wave360");
        var iMouseX = 1;
        var ceil = 1;
        var bMouseDown = false;
        var screen_width = window.screen.width*0.99;
        var screen_height = window.screen.height*0.99;
        if(screen_height > screen_width) {
            screen_height = screen_width
        }
        else {
            screen_width = screen_height
        }
        var scale = (screen.width / $('#wave360').width()).toFixed(4);
        var metaTag=document.createElement('meta');
        metaTag.name = "viewport";
        metaTag.content = "width=device-width, user-scalable=no, initial-scale="+scale;
        document.getElementsByTagName('head')[0].appendChild(metaTag);
        photo360.innerHTML += "<canvas id='canvas360' width='840px' height='840px' style='z-index:1; position:absolute;'></canvas>";
        $('#wave360').css('-webkit-appearance', 'none');
        $('#wave360').css('-moz-appearance', 'none');
        $('#wave360').css('appearance', 'none');
        $('#wave360').css('position', 'relative');
        photo360.style.width = "850px";
        photo360.style.height = "922px";
        photo360.style.textAlign = 'center';
        photo360.style.display = 'inline-block';
        photo360.style.overflow = 'hidden';
//        photo360.innerHTML += '<button style="cursor:pointer; position:absolute; z-index:100; background-color: transparent;  right:0%; top:0%; border:none; padding:0;" onclick="out();"><img width="134" height="35" src="https://wavee360.com/static/img/4.png"></button>';

        /* rotate left btn */
        photo360.innerHTML += '<button id="rotate_left" oncontextmenu="return false" onmousedown="rotate_left();">\
        <img src="/skin/musinsa/images/ic-50-line-turn-left-black.png" width="58" height="58" oncontextmenu="return false" \
        style="-webkit-touch-callout:none; -webkit-user-select:none; -webkit-tap-highlight-color:rgba(0, 0, 0, 0); \
        -khtml-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none;"></button>';

        /* rotate right btn */
        photo360.innerHTML += '<button id="rotate_right" oncontextmenu="return false" onmousedown="rotate_right();" touchstart="rotate_right();">\
        <img src="/skin/musinsa/images/ic-50-line-turn-right-black.png" width="58" height="58" oncontextmenu="return false"\
         tyle="-webkit-touch-callout:none; -webkit-user-select:none; -webkit-tap-highlight-color:rgba(0, 0, 0, 0); \
         -khtml-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; "></button>';
        // photo360.innerHTML += '<button id="img_plus" style="cursor:pointer; position:absolute; background-color: transparent;  z-index:100; right:3%; top:95%; border:none; padding:0;" onmousedown="plus();"><img src="https://wavee360.com/static/img/6.png" width="40" height="40"></button>';
        // photo360.innerHTML += '<button id="img_minus" style="cursor:pointer; position:absolute; background-color: transparent;  z-index:100; right:8%; top:95%; border:none; padding:0;" onmousedown="minus();"><img src="https://wavee360.com/static/img/5.png" width="40" height="40"></button>';
        $('#rotate_right').css('visibility', 'hidden');
        $('#rotate_left').css('visibility', 'hidden');
        // $('#img_plus').css('visibility', 'hidden');
        // $('#img_minus').css('visibility', 'hidden');
        var canvas360 = document.getElementById('canvas360');
        var ro_right = document.getElementById('rotate_right');
        var ro_left = document.getElementById('rotate_left');
        canvas360.style.cursor = 'e-resize';
        canvas360.style.display = 'block';
        canvas360.style.left = '5px';
        canvas360.style.top = 0;
        var context = canvas360.getContext('2d');
        var tx = (canvas360.width) / (images.length+1);

        var image = new Image();

        image.onload = function () {
            context.drawImage(image, 0, 0, context.canvas.width, context.canvas.height);
        };
        image.src = images[0].src;
        canvas360.addEventListener('mousemove', function (e) {
            if(bMouseDown==true && rotate_flag == 1) {
                var MouseX = Math.floor(e.pageX - iMouseX);
                now = Math.round((MouseX / (tx/1.5))*1.2);
                if (ceil < now)
                {
                    modulus--;
                    ceil = now;
                }
                else if (ceil > now)
                {
                    modulus++;
                    ceil = now;
                }
                if (modulus < 0) {
                    modulus = image_frame-1;
                } else if (modulus > image_frame-1) {
                    modulus = 0;
                }
                rotate360(modulus);
            }
            else if (bMouseDown==true && rotate_flag==0) {
                newX = e.pageX - shiftX;
                newY = e.pageY - shiftY;
                $('#canvas360').css('top', newY);
                $('#canvas360').css('left', newX);
            }
        });

        canvas360.addEventListener('mousedown', function (e) {
            shiftX = e.pageX - this.offsetLeft;
            shiftY = e.pageY - this.offsetTop;
            bMouseDown = true;
        });

        document.addEventListener('mouseup', function (e) {
            bMouseDown = false;
//            minus_flag = false;
//            plus_flag = false;
            right_flag = false;
            left_flag = false;
        });

        ro_left.addEventListener('touchstart', function (e) {
            e.preventDefault();
            if (right_flag == false)
                rotate_left();
        })

        ro_left.addEventListener('touchend', function (e) {
            e.preventDefault();
            right_flag = false;
            left_flag = false;
        })

        ro_right.addEventListener('touchend', function (e) {
            e.preventDefault();
            right_flag = false;
            left_flag = false;
        })

        ro_right.addEventListener('touchstart', function (e) {
            e.preventDefault();
            if (left_flag == false)
                rotate_right();
        })

        canvas360.addEventListener('touchstart', function (e) {
            shiftX = e.touches[0].pageX - this.offsetLeft;
            shiftY = e.touches[0].pageY - this.offsetTop;
        })

        canvas360.addEventListener('touchmove', function (e) {
            if(rotate_flag == 1) {
                var MouseX = Math.floor(e.touches[0].pageX - iMouseX);
                now = Math.floor((MouseX / (tx/1.5))*1.5);
                if (ceil < now)
                {
                    modulus--;
                    ceil = now;
                }
                else if (ceil > now)
                {
                    modulus++;
                    ceil = now;
                }
                if (modulus < 0) {
                    modulus = image_frame-1;
                } else if (modulus > image_frame-1) {
                    modulus = 0;
                }
                plus_cnt = modulus
                rotate360(modulus);
            }
            else {
                newX = e.touches[0].pageX - shiftX;
                newY = e.touches[0].pageY - shiftY;
                $('#canvas360').css('top', newY);
                $('#canvas360').css('left', newX);
            }
        });

        var rotate360 = function (img_no) {
            context.drawImage(images[img_no], 0, 0, context.canvas.width, context.canvas.height);
        };
    }
});