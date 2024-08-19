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
    plus_cnt = 1;
    newX = 0;
    newY = 0;
    zoomScale = 1;
    var canvas = document.getElementById('canvas360');
    var context = canvas.getContext('2d');
    context.drawImage(images[modulus], 0, 0, context.canvas.width, context.canvas.height);
    $('#canvas360').css('position', 'relative');
    $('#canvas360').css('top', 'inherit');
    $('#canvas360').css('left', 'inherit');
    $('#canvas360').css('transform', 'scale(1)');
    $('#canvas360').css('-webkit-transform', 'scale(1)');
    $('.layer360-canvas_wrap').css('height','calc(100% - 50px)');
}

function out() {
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

    plus_cnt = 1;
    newX = 0;
    newY = 0;
    zoomScale = 1;
    var canvas = document.getElementById('canvas360');
    var context = canvas.getContext('2d');
    context.drawImage(images[modulus], 0, 0, context.canvas.width, context.canvas.height);
    $('#canvas360').css('position', 'relative');
    $('#canvas360').css('top', 'inherit');
    $('#canvas360').css('left', 'inherit');
    $('#canvas360').css('transform', 'scale(1)');
    $('#canvas360').css('-webkit-transform', 'scale(1)');
    $('.layer360-canvas_wrap').css('height','calc(100% - 50px)');
}

function zoom() {
    $('.layer360-img').css('display', 'none');
    $('.layer360-logo').css('visibility', 'hidden');
    $('#rotate_right').css('visibility', 'visible');
    $('#rotate_left').css('visibility', 'visible');
    $('.wave360_plusminus_btn_wrap').css('visibility', 'visible');
    // zoom out 踰꾪듉 �좉� 20191115 UI-HS
    $('.wave360_out_btn').css('visibility', 'visible');
    $('.wave360_zoom_btn').css('visibility', 'hidden');
    // zoom out 踰꾪듉 �좉�
    $('#canvas360').css('cursor', 'default');
    var canvas = document.getElementById('canvas360');
    var context = canvas.getContext('2d');
    context.drawImage(images[modulus], 0, 0, context.canvas.width, context.canvas.height);
    rotate_flag = 0;
    $('#canvas360').css('position', 'absolute');
    $('#canvas360').css('transform', 'scale(3)');
    $('#canvas360').css('-webkit-transform', 'scale(3)');

    $('.layer360-canvas_wrap').css('height','calc(100% - 50px)');
}

/*
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
*/


function rotate_right() {
    right_flag = true;
    setTimeout(function() {
        var canvas = document.getElementById('canvas360');
        var context = canvas.getContext('2d');
        modulus -= 1;
        if(modulus == -1)
            modulus = image_frame-1;
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
        metaTag.content = "width=device-width, user-scalable=no, initial-scale=1";
        document.getElementsByTagName('head')[0].appendChild(metaTag);
        photo360.innerHTML += "<canvas id='canvas360' style='z-index:1;'></canvas>";
        $('#wave360').css('-webkit-appearance', 'none');
        $('#wave360').css('-moz-appearance', 'none');
        $('#wave360').css('appearance', 'none');

        photo360.style.textAlign = 'center';

        photo360.innerHTML += '<button id="rotate_left" oncontextmenu="return false" style="width:50px;height:50px;-webkit-touch-callout:none; \
        -webkit-user-select:none; -webkit-tap-highlight-color:rgba(0, 0, 0, 0); -khtml-user-select: none; -moz-user-select: none; \
        -ms-user-select: none; user-select: none; position:absolute; cursor:pointer; z-index:100; \
        top:50%; border:none; padding:0;right:0" onmousedown="rotate_right();">\
        <img src="/img/left.png" oncontextmenu="return false" \
        style="width:100%;-webkit-touch-callout:none; -webkit-user-select:none; -webkit-tap-highlight-color:rgba(0, 0, 0, 0); \
        -khtml-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none;"></button>';

        photo360.innerHTML += '<button id="rotate_right" oncontextmenu="return false" style="width:50px;height:50px;-webkit-touch-callout:none; \
        -webkit-user-select:none; -webkit-tap-highlight-color:rgba(0, 0, 0, 0); -khtml-user-select: none; -moz-user-select: none; \
        -ms-user-select: none; user-select: none; position:absolute; cursor:pointer; z-index:100; \
        top:50%; border:none; padding:0;left:0" onmousedown="rotate_left();" >\
        <img src="/img/right.png" oncontextmenu="return false"\
         style="width:100%;-webkit-touch-callout:none; -webkit-user-select:none; -webkit-tap-highlight-color:rgba(0, 0, 0, 0); \
         -khtml-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; "></button>';

        $('#rotate_right').css('visibility', 'hidden');
        $('#rotate_left').css('visibility', 'hidden');
        var canvas360 = document.getElementById('canvas360');
        var ro_right = document.getElementById('rotate_right');
        var ro_left = document.getElementById('rotate_left');
        canvas360.style.cursor = 'e-resize';
        canvas360.style.display = 'block';
        var context = canvas360.getContext('2d');
        var devicePixelRatio, backingStoreRatio, ratio;
        devicePixelRatio = window.devicePixelRatio || 1,
            backingStoreRatio = context.webkitBackingStorePixelRatio ||
                context.mozBackingStorePixelRatio ||
                context.msBackingStorePixelRatio ||
                context.oBackingStorePixelRatio ||
                context.backingStorePixelRatio || 1,
            ratio = 3 / backingStoreRatio;
        var tx = (canvas360.width) / (images.length+1);

        var image = new Image();

        /* �꾩씠��8�� 留욎텛湲� �꾪븳 罹붾쾭�� �ъ씠利� �댁긽�� ���� */
        if($(window).height() > 667) {
            /* �꾩씠��8 珥덇낵 */
            image.onload = function () {
                context.canvas.width = this.naturalWidth;
                context.canvas.height = this.naturalHeight;

                context.canvas.style.width = (context.canvas.width / (ratio*(this.naturalHeight/1650))) + 'px';
                canWidth = (context.canvas.width / (ratio*(this.naturalHeight/1650)))
                context.canvas.style.height = (context.canvas.height / (ratio*(this.naturalHeight/1650))) + 'px';
                canHeight = (context.canvas.height / (ratio*(this.naturalHeight/1650)))

                context.drawImage(image, 0, 0, context.canvas.width, context.canvas.height);
            };
        }else {
            /* �꾩씠��8 誘몃쭔 */
            image.onload = function () {
                context.canvas.width = this.naturalWidth;
                context.canvas.height = this.naturalHeight;

                context.canvas.style.width = (context.canvas.width / (ratio*(this.naturalHeight/1410))) + 'px';
                canWidth = (context.canvas.width / (ratio*(this.naturalHeight/1410)))
                context.canvas.style.height = (context.canvas.height / (ratio*(this.naturalHeight/1410))) + 'px';
                canHeight = (context.canvas.height / (ratio*(this.naturalHeight/1410)))

                context.drawImage(image, 0, 0, context.canvas.width, context.canvas.height);
            };
        }

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