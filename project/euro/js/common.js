const $euroHeader = $(".euroHeader");
parallax();

// 스크롤 방향 판단
let prevScrollTop = $(window).scrollTop();
scrollCheck();
$(window).scroll(function (e) {
    scrollCheck();
    prevScrollTop = $(window).scrollTop();
});
function scrollCheck() {
    if ($(window).scrollTop() == 0) {
        $euroHeader.show();
        $euroHeader.addClass("is_top");
        $euroHeader.removeClass("is_up");
        $euroHeader.addClass("is_on");
    } else if ($(window).scrollTop() < prevScrollTop) {
        $euroHeader.show();
        $euroHeader.removeClass("is_top");
        $euroHeader.addClass("is_up");
        $euroHeader.addClass("is_on");
    } else {
        $euroHeader.hide();
        $euroHeader.removeClass("is_top");
        $euroHeader.removeClass("is_up");
        $euroHeader.removeClass("is_on");
    }
}

// 메인메뉴버튼
function euroMenuBtn() {
    $(event.currentTarget).toggleClass("is_on");
    $(".euroNav").toggleClass("is_on");
}

// 이미지 지연 스크롤
function parallax() {
    parallaxFunc();
    $(window).on('scroll', function (e){
        parallaxFunc();
    })

    function parallaxFunc() {
        $('.is_parallax').each(function (index, target) {
            const $target = $(target);
            const startPoint = $target.offset().top - $(window).height();
            const endPoint = $target.offset().top + $target.height();
            const nowPoint = $(window).scrollTop() - startPoint;
            const gab = endPoint - startPoint;
            const percentage = (nowPoint / gab).toFixed(4);
            const degree = 50;
            if (startPoint < $(window).scrollTop() && $(window).scrollTop() < endPoint) {
                $target.css('background-position-y', 50 + (percentage * degree - degree / 2) + "%");
            }
        });
    }
}