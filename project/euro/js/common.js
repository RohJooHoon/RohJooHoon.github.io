const thisFileFullName = document.URL.substring(document.URL.lastIndexOf("/") + 1, document.URL.length);
let allLoad = 0;
let nowLoad = 0;

$( document ).ready(function() {
    loadHtml("header", "../layout/header.html");
    loadHtml("footer", "../layout/footer.html");
});

function loadHtml(target, url) {
    allLoad++;
    $(target).load(url, function( response, status, xhr ) {
        loadCheck();
    });
}

function loadCheck() {
    nowLoad++;
    if (allLoad == nowLoad) {
        navActiveCheck();
        scrollActive();
        scrollCheck();
    }
}

// 네비게이션 액티브 상태 확인
function navActiveCheck() {
    $('.euroHeaderBarMenuLink, .euroHeaderBarMenuSubLink').each(function (index, value) {
        if (thisFileFullName ==  $(value).attr('href')) {
            $(value).addClass('is_active');
            if ($(value).hasClass('euroHeaderBarMenuSubLink')) {
                $(value).closest('.euroHeaderBarMenu').find('.euroHeaderBarMenuLink').addClass('is_active');
            }
        }
    });
}

// 스크롤 방향 판단
function scrollCheck() {
    let prevScrollTop = $(window).scrollTop();
    scrollCheckFunc();
    $(window).scroll(function (e) {
        scrollCheckFunc();
        prevScrollTop = $(window).scrollTop();
    });
    function scrollCheckFunc() {
        const $euroHeader = $(".euroHeader");
        if ($(window).scrollTop() == 0) {
            $euroHeader.addClass("is_top");
            $euroHeader.removeClass("is_up");
            $euroHeader.addClass("is_on");
        } else if ($(window).scrollTop() < prevScrollTop) {
            $euroHeader.removeClass("is_top");
            $euroHeader.addClass("is_up");
            $euroHeader.addClass("is_on");
        } else {
            $euroHeader.removeClass("is_on");
        }
    }
}

// 메인메뉴버튼
function euroMenuBtn() {
    $(event.currentTarget).toggleClass("is_on");
    $(".euroNav").toggleClass("is_on");
}

// 이미지 지연 스크롤
function parallax(degree) {
    parallaxFunc();
    $(window).on('scroll', function (e){
        parallaxFunc();
    })

    function parallaxFunc() {
        const windowScrollTop = $(window).scrollTop();
        $('.is_parallax').each(function (index, target) {
            const $target = $(target);
            const startPoint = $target.offset().top - $(window).height();
            const endPoint = $target.offset().top + $target.outerHeight();
            if (startPoint < windowScrollTop && windowScrollTop < endPoint) {
                if (degree == "auto") {
                    $target.css('background-position-y', windowScrollTop * 0.5 + "px");
                } else {
                    const nowPoint = windowScrollTop - startPoint;
                    const gab = endPoint - startPoint;
                    const percentage = (nowPoint / gab).toFixed(4);
                    $target.css('background-position-y', percentage * degree - degree / 2 + "px");
                }
            }
        });
    }
}

// 영역 접근
function scrollActive() {
    scrollActiveFunc();
    $(window).on('scroll', function (e){
        scrollActiveFunc();
    })
    function scrollActiveFunc() {
        $('.is_scrollActive').each(function (index, target) {
            const $target = $(target);
            const startPoint = $target.offset().top - $(window).height();
            const endPoint = $target.offset().top + $target.outerHeight();
            if (startPoint < $(window).scrollTop() && $(window).scrollTop() < endPoint) {
                $target.addClass('is_active');
            } else {
                $target.removeClass('is_active');
            }
        });
    }
}

// euroSubHeader 움직임
function euroSubHeaderMove(size) {
    let scrollActiveSwitch = true;

    euroSubHeaderMoveFunc();
    $(window).resize(function () {
        euroSubHeaderMoveFunc();
    });

    function euroSubHeaderMoveFunc() {
        if ($(window).width() < size) {
            $('.euroSubHeader').css('text-indent', `${$(window).width() - size}px`);
        } else {
            $('.euroSubHeader').css('text-indent', `0px`);
        }
    }

    $(".euroSubHeader").on('transitionend webkitTransitionEnd', function() {
        if (scrollActiveSwitch) {
            scrollActiveSwitch = false;
            $('.euroSubHeader').css('text-indent', `0px`);
        } else {
            scrollActiveSwitch = true;
            euroSubHeaderMoveFunc();
        }
    });
}