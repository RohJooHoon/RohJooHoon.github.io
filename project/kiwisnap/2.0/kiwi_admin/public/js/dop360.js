let dop360_nowPB;
let dop360_imgWrapRealH;
let dop360_imgGideRealH;
let dop360_imgNaturalH;
let dop360_imgNaturalW;
let dop360_zoomSize = 1;
let dop360_scrollPage = 0;
let dop360_360list = '';
let dop360_popupMode = false;
let dop360_nowTouch = false;
let dop360_autoRotate = false;

$(window).on('resize', function (e) {
    dop360_nowPB = dop360_imgNaturalH / dop360_imgNaturalW * 100;
    resize360();
    gotoPage360(dop360_scrollPage);
    window.parent.postMessage({ callResize_nowPB: dop360_nowPB }, '*');
})

window.addEventListener('message', function(e) {
    if (e.data.syncReturn == "Y") {
        resize360();
        gotoPage360(dop360_scrollPage);
    }
});

function productInfo(client_id, product_id, product_type){
    let api_url = getApiUrlByUrl();
    let prefix = 'product';
    if(product_type !== undefined && product_type != ''){
        prefix = product_type;
    }
    $.ajax({
        type : 'get',
        url : `${api_url}/${prefix}/infoSpin/${client_id}/${product_id}`,
        success : function(response) {
            initGoods360(response);
        },
        error : function(error) {
            console.log("kiwisnap error:", error);
        }
    });
}

/* 메인 이미지 슬라이더 생성 */
function initGoods360(response) {
    let goods360Imgs = "";

    //360 이미지
    let goods360Popup_html = "";
    let goods360Popup_htmlGide = "";
    if (response) {
        dop360_360list = response;
        $.each(dop360_360list,function (i,str) {
            if (i == 0) {
                goods360Imgs += `<img class="goods360Img is_360" src='${str}' alt='' >`;
                goods360Popup_htmlGide += `<img class="goods360ImgGide" src='${str}' >`;
            }
            goods360Popup_html+=`<img class='img360' id='img${i}' src=${str} alt='' />`;
        })
        $('.goods360PopupRotationBtn').on('touchstart mousedown', function(event){
            event.preventDefault();
            dop360_nowTouch = true;
            if($(this).hasClass('is_left')) {
                rotation("L");
            } else if ($(this).hasClass('is_right')) {
                rotation("R");
            }
        });
        $('.goods360PopupRotationBtn').on('touchend mouseup', function(event){
            event.preventDefault();
            dop360_nowTouch = false;
        });
        $('.goods360ImgWrap').html(goods360Imgs);
        $('.goods360PopupContentGide').html(goods360Popup_htmlGide);
        $('.goods360PopupContent').html(goods360Popup_html);
        goods360PopupOpen('.goods360Popup_zoom');
        $('#img0').on("load", function() {
            dop360_imgNaturalH = $('.img360')[0].naturalHeight;
            dop360_imgNaturalW = $('.img360')[0].naturalWidth;
            dop360_nowPB = dop360_imgNaturalH / dop360_imgNaturalW * 100;
            $('.goods360PopupContent').css({
                'padding-bottom' : dop360_zoomSize * dop360_nowPB + "%",
                'width' : '100%'
            });
            window.parent.postMessage({ callResize_now360pb: dop360_nowPB}, '*');
            $('.goods360Popup_mark').addClass('is_on');
            dop360_autoRotate = true;
            autoPlay360();
        })
        $('.goods360Popup_mark').on('click', function () {
            if ($(this).hasClass('is_on')) {
                $(this).removeClass('is_on');
                dop360_autoRotate = false;
            } else {
                $(this).addClass('is_on');
                dop360_autoRotate = true;
            }
            autoPlay360();
        })
    }

    /* 아이템 줌 팝업 */
    function goods360PopupOpen(trigger) {
        const $trigger = $(trigger);
        const $target = $('.goods360PopupContent');
        const $targetClose = $('.goods360PopupClose');
        const $targetImg = $('.goods360PopupContent');
        let dragMode = false;
        let moveX = 0;
        let moveY = 0;
        let resetGapX = 0;
        let gapX = 0;
        let gapY = 0;
        let keepX = 0;
        let keepY = 0;
        let nowX = 0;
        let nowY = 0;
        $trigger.on('click', function (e) {
            if (!dop360_popupMode) {
                $('.goods360Popup_mark').removeClass('is_on');
                dop360_autoRotate = false;
                dop360_popupMode = true;
                if (!dop360_imgWrapRealH && !dop360_imgGideRealH) {
                    dop360_imgGideRealH = $('.goods360PopupContentGide')[0].offsetHeight;
                    dop360_imgWrapRealH = $('.goods360Popup')[0].offsetHeight;
                }
                $('.goods360Popup').addClass('is_full');
                scrollOff();
                resize360();
                gotoPage360(dop360_scrollPage);
                window.parent.postMessage({ full360: "Y", sync: "Y" }, '*');
            }
        });
        $targetClose.on('click', function (e) {
            dop360_popupMode = false;
            dop360_zoomSize = 1;
            $('.goods360PopupContent').css({
                'padding-bottom' : dop360_zoomSize * dop360_nowPB + "%",
                'width' : dop360_zoomSize * 100 + "%",
                'left' : '50%',
                'top' : '50%'
            });
            $('.goods360PopupRotationBtn').hide();
            $('.goods360PopupZoomBtn.is_in').removeClass('is_dim');
            $('.goods360PopupZoomBtn.is_out').addClass('is_dim');
            dragMode = false;
            resize360();
            gotoPage360(dop360_scrollPage);
            $('.goods360Popup').removeClass('is_full');
            scrollOn();
            window.parent.postMessage({ full360: "N"}, '*');
        });
        $('.goods360PopupZoomBtn.is_in').on('click', function (e) {
            $('.goods360PopupZoomBtn').removeClass('is_dim');
            if (dop360_zoomSize < 8) {
                dop360_zoomSize = dop360_zoomSize * 2;
                resize360();
            }
            if (dop360_zoomSize >= 8) {
                $(this).addClass('is_dim');
            }
            if (dop360_zoomSize <= 1) {
                dragMode = false;
                $('.goods360PopupRotationBtn').hide();
            } else {
                dragMode = true;
                $('.goods360PopupRotationBtn').show();
            }
            rotation('', true);
        });
        $('.goods360PopupZoomBtn.is_out').on('click', function (e) {
            $('.goods360PopupZoomBtn').removeClass('is_dim');
            if (dop360_zoomSize > 1) {
                dop360_zoomSize = dop360_zoomSize / 2;
                if (dop360_imgGideRealH > dop360_imgWrapRealH && $('.goods360Popup')[0].offsetWidth > dop360_imgNaturalW) {
                    $('.goods360PopupContent').css({
                        'padding-bottom' : dop360_zoomSize * $('.goods360Popup')[0].offsetHeight  + "px",
                        'width' : dop360_zoomSize * $('.goods360Popup')[0].offsetHeight / dop360_nowPB * 100 + "px",
                        'left' : '50%',
                        'top' : '50%'
                    });
                } else if ($('.goods360PopupContentGide')[0].offsetHeight >= $('.goods360Popup')[0].offsetHeight) {
                    $('.goods360PopupContent').css({
                        'padding-bottom': dop360_zoomSize * $('.goods360Popup')[0].offsetHeight + "px",
                        'width': dop360_zoomSize * $('.goods360Popup')[0].offsetHeight / dop360_nowPB * 100 + "px",
                        'left' : '50%',
                        'top' : '50%'
                    });
                } else {
                    $('.goods360PopupContent').css({
                        'padding-bottom' : dop360_zoomSize * dop360_nowPB + "%",
                        'width' : dop360_zoomSize * 100 + "%",
                        'left' : '50%',
                        'top' : '50%'
                    });
                }
            }
            if (dop360_zoomSize <= 1) {
                $(this).addClass('is_dim');
                dragMode = false;
                $('.goods360PopupRotationBtn').hide();
            } else {
                dragMode = true;
                $('.goods360PopupRotationBtn').show();
            }
            rotation('', true);
        });

        // 드래그
        $target.on('touchstart', function(e){
            scrollOff();
            $('.goods360Popup_mark').removeClass('is_on');
            dop360_autoRotate = false;
            window.parent.postMessage({ touchmove: "Y" }, '*');
            if (dragMode) {
                moveX = e.originalEvent.touches[0].pageX;
                moveY = e.originalEvent.touches[0].pageY;
                nowX = Number($targetImg.css('left').replace('px',''));
                nowY = Number($targetImg.css('top').replace('px',''));
                keepX = 0;
                keepY = 0;
            }
        });
        $target.on('touchmove', function(e){
            if (dragMode) {
                gapX = e.originalEvent.touches[0].pageX - moveX;
                gapY = e.originalEvent.touches[0].pageY - moveY;
                moveX = e.originalEvent.touches[0].pageX;
                moveY = e.originalEvent.touches[0].pageY;
                keepX += gapX;
                keepY += gapY;
                $targetImg.css({
                    'left' : nowX + keepX + 'px',
                    'top' : nowY + keepY + 'px',
                });
            } else {
                gapX = e.originalEvent.touches[0].pageX - moveX;
                moveX = e.originalEvent.touches[0].pageX;
                keepX += gapX;
                if (gapX > 0) {
                    resetGapX++;
                    if (resetGapX > 2) {
                        rotation("R", true);
                        resetGapX = 0;
                    }
                } else if (gapX < 0) {
                    resetGapX--;
                    if (resetGapX < -2) {
                        rotation("L", true);
                        resetGapX = 0;
                    }
                }
            }
        })
        $target.on('touchend', function(e){
            scrollOn();
            window.parent.postMessage({ touchmove: "N" }, '*');
        })
        $target.on('dragstart', function(e){
            $('.goods360Popup_mark').removeClass('is_on');
            dop360_autoRotate = false;
            if (dragMode) {
                moveX = e.originalEvent.pageX;
                moveY = e.originalEvent.pageY;
                nowX = Number($targetImg.css('left').replace('px',''));
                nowY = Number($targetImg.css('top').replace('px',''));
                keepX = 0;
                keepY = 0;
            }
        });
        $target.on('drag', function(e){
            if (dragMode) {
                gapX = e.originalEvent.pageX - moveX;
                gapY = e.originalEvent.pageY - moveY;
                moveX = e.originalEvent.pageX;
                moveY = e.originalEvent.pageY;
                if (e.originalEvent.pageX > 0 && e.originalEvent.pageY > 0) {
                    keepX += gapX;
                    keepY += gapY;
                    $targetImg.css({
                        'left' : nowX + keepX + 'px',
                        'top' : nowY + keepY + 'px',
                    });
                }
            } else {
                gapX = e.originalEvent.pageX - moveX;
                moveX = e.originalEvent.pageX;
                if (e.originalEvent.pageX > 0) {
                    keepX += gapX;
                }
                if (gapX > 0) {
                    resetGapX++;
                    if (resetGapX > 7) {
                        rotation("R", true);
                        resetGapX = 0;
                    }
                } else if (gapX < 0) {
                    resetGapX--;
                    if (resetGapX < -7) {
                        rotation("L", true);
                        resetGapX = 0;
                    }
                }
            }
        })
    }
}

function rotation(way, force) {
    let delayTime;
    if (force == true) {
        delayTime = 0;
    } else if (force > 0) {
        delayTime = force;
    } else {
        delayTime = 90;
    }
    const timer = setTimeout(function () {
        clearTimeout(timer);
        if (dop360_nowTouch || force) {
            if (way == "L") {
                dop360_scrollPage++;
            } else if (way == "R") {
                dop360_scrollPage--;
            }
            if (dop360_scrollPage > dop360_360list.length - 2) {
                dop360_scrollPage = 0;
            } else if (dop360_scrollPage < 0) {
                dop360_scrollPage = dop360_360list.length - 2;
            }
            gotoPage360(dop360_scrollPage);
            rotation(way);
        }
    },delayTime);
}

function resize360() {
    if (dop360_popupMode) {
        if (dop360_imgGideRealH > dop360_imgWrapRealH && $('.goods360Popup')[0].offsetWidth > dop360_imgNaturalW || $('.goods360PopupContentGide')[0].offsetHeight >= $('.goods360Popup')[0].offsetHeight) {
            $('.goods360PopupContent').css({
                'padding-bottom' : dop360_zoomSize * $('.goods360Popup')[0].offsetHeight  + "px",
                'width' : dop360_zoomSize * $('.goods360Popup')[0].offsetHeight / dop360_nowPB * 100 + "px"
            });
        } else {
            $('.goods360PopupContent').css({
                'padding-bottom' : dop360_zoomSize * dop360_nowPB + "%",
                'width' : dop360_zoomSize * 100 + "%",
            });
        }
    } else {
        $('.goods360PopupContent').css({
            'padding-bottom' : dop360_zoomSize * dop360_nowPB + "%",
            'width' : dop360_zoomSize * 100 + "%",
        });
    }
}

function gotoPage360(dop360_scrollPage) {
    let nowSize = $('.goods360PopupContent #img0').innerHeight();
    $(".goods360PopupContent").scrollTop(dop360_scrollPage * nowSize);
}

function autoPlay360() {
    if (dop360_autoRotate) {
        setTimeout(function () {
            rotation("R", true);
            autoPlay360();
        },90);
    }
}