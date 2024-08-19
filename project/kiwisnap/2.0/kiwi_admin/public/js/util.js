$(document).on('keydown keyup past change', '.is_onlyNum', function (e) {
    e.target.value = e.target.value.replace(/[^0-9]/g, '');
});

/* resize 디바이스 분기 */
function windowSizeCheck(func) {
    const dividePoint = 768;
    let prevPoint = '';
    let nowPoint = '';
    let $body = $('body');
    if (dividePoint > window.innerWidth) {
        prevPoint = 'm';
        nowPoint = 'm';
        func('m');
        $body.addClass('is_mobile').removeClass('is_pc');
    } else {
        prevPoint = 'p';
        nowPoint = 'p';
        func('p');
        $body.addClass('is_pc').removeClass('is_mobile');
    }
    $(window).on('resize', function () {
        if (dividePoint > window.innerWidth) {
            nowPoint = 'm';
            $body.addClass('is_mobile').removeClass('is_pc');
        } else {
            nowPoint = 'p';
            $body.addClass('is_pc').removeClass('is_mobile');
        }
        if (nowPoint != prevPoint) {
            prevPoint = nowPoint;
            func(nowPoint);
        }
    });
}

function jsonTextChange(target) {
    let nowArray = [];
    target.split('\n').forEach(function (row){
        let nowRow = [];
        row.split(',').forEach(function (col){
            nowRow.push(col);
        })
        if (nowRow.length > 1) {
            nowArray.push(nowRow);
        }
    });
    return nowArray;
};

function hasArrayData (target, key) {
    let nowValue = '';
    target.forEach(function (value){
        if (value[key] && value[key].data) {
            nowValue = value[key].data;
        }
    })
    return nowValue;
}

function findArrayData (target, key, data) {
    let nowValue = '';
    target.forEach(function (value){
        if (value[key] == data) {
            nowValue = value;
        }
    })
    return nowValue;
}

/* 복사 버튼 */
function clipboardCopy(target, msg) {
    let $target = '';
    if (target) {
        $target = $(target).clone();
        $target.find('[contenteditable]').attr('contenteditable', false);
        $target = $target.html();
    } else {
        $target = $(event.target).data('clip');
    }
    $('#clip_target').val($target);
    $('#clip_target').select();
    try {
        let successful = document.execCommand('copy');
        console.log("clipboardCopy successful : ", successful);
        if (msg) {
            alert(msg);
        }
    } catch (err) {
        console.log("clipboardCopy err : ", err);
    }
}

/*************************************
 ** 오늘 날짜
 *************************************/
function getTimeStamp() {
    var d = new Date();
    var s =
        leadingZeros(d.getFullYear(), 4) +
        leadingZeros(d.getMonth() + 1, 2) +
        leadingZeros(d.getDate(), 2) +

        leadingZeros(d.getHours(), 2) +
        leadingZeros(d.getMinutes(), 2) +
        leadingZeros(d.getSeconds(), 2);

    return s;
}

// 4자리 난수 발생 함수
function fourRandomNumber() {
    const min = 1000;
    const max = 9999;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/*************************************
 **  날짜
 *************************************/
function getFormatDate(date, div) {
    var year = date.getFullYear();  //yyyy
    var month = (1 + date.getMonth());  //M
    month = month >= 10 ? month : '0' + month;     // month 두자리로 저장
    var day = date.getDate(); //d

    day = day >= 10 ? day : '0' + day;                            //day 두자리로 저장

    return (year + div + month + div + day);
}

/*************************************
 **  날짜 포맷 (str) 예) date:20200808 , div:/ ==> 2020/08/08
 *************************************/
function getFormatStrDate(date, div) {
    if (date.length != 8) {
        return date;
    }

    var year = date.substr(0, 4)  //yyyy
    var month = date.substr(4, 2);  //M
    var day = date.substr(6, 2); //d

    return (year + div + month + div + day);
}


/*************************************
 **  날짜 시간
 *************************************/
function getFormatDateTime(date, div, timeDiv) {
    var year = date.getFullYear();  //yyyy
    var month = (1 + date.getMonth());  //M
    month = month >= 10 ? month : '0' + month;     // month 두자리로 저장
    var day = date.getDate(); //d

    day = day >= 10 ? day : '0' + day;                            //day 두자리로 저장

    var h = date.getHours();
    var m = date.getMinutes();
    m = m >= 10 ? m : '0' + m;
    var s = date.getSeconds();
    s = s >= 10 ? s : '0' + s;

    return (year + div + month + div + day + ' ' + h + timeDiv + m + timeDiv + s);
    ;
}

/*************************************
 **  날짜 시간 더하기
 *************************************/
function dateAdd(date, interval, units) {
    var ret = new Date(date); //don't change original date
    var checkRollover = function () {
        if (ret.getDate() != date.getDate()) ret.setDate(0);
    };
    switch (interval.toLowerCase()) {
        case 'year'   :
            ret.setFullYear(ret.getFullYear() + units);
            checkRollover();
            break;
        case 'quarter':
            ret.setMonth(ret.getMonth() + 3 * units);
            checkRollover();
            break;
        case 'month'  :
            ret.setMonth(ret.getMonth() + units);
            checkRollover();
            break;
        case 'week'   :
            ret.setDate(ret.getDate() + 7 * units);
            break;
        case 'day'    :
            ret.setDate(ret.getDate() + units);
            break;
        case 'hour'   :
            ret.setTime(ret.getTime() + units * 3600000);
            break;
        case 'minute' :
            ret.setTime(ret.getTime() + units * 60000);
            break;
        case 'second' :
            ret.setTime(ret.getTime() + units * 1000);
            break;
        default       :
            ret = undefined;
            break;
    }
    return ret;
}

function leadingZeros(n, digits) {
    var zero = '';
    n = n.toString();

    if (n.length < digits) {
        for (i = 0; i < digits - n.length; i++)
            zero += '0';
    }
    return zero + n;
}


function getRandomStr(len) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < len; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
}


/*************************************
 ** email 주소형식이 올바른지 검사
 *************************************/
// function checkEmail(strEmail) {
// 	var arrMatch = strEmail.match(/^(\".*\"|[A-Za-z0-9_-]([A-Za-z0-9_-]|[\+\.])*)@(\[\d{1,3}(\.\d{1,3}){3}]|[A-Za-z0-9][A-Za-z0-9_-]*(\.[A-Za-z0-9][A-Za-z0-9_-]*)+)$/);
// 	if (arrMatch == null) {
// 		return false;
// 	}
//
// 	var arrIP = arrMatch[2].match(/^\[(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})\]$/);
// 	if (arrIP != null) {
// 		for (var i = 1; i <= 4; i++) {
// 			if (arrIP[i] > 255) {
// 				return false;
//       		}
//    		}
// 	}
// 	return true;
// }
function checkEmail(strEmail) {
    var emailRule = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;//이메일 정규식

    if (!emailRule.test(strEmail)) {
        //경고
        return false;
    }
    return true;

}

/*************************************
 ** password 형식 : 영문,특문 혼합하여 6 이상
 *************************************/
function checkPassword(str) {
    console.log(str);
    //var reg_pwd = /^.*(?=.{8,30})(?=.*[0-9])(?=.*[a-zA-Z]).*$/;
    //var reg_pwd = /^(?=.*[a-zA-Z0-9])(?=.*[!@#$%^*+=-]).{6,30}$/;
    var reg_pwd = /^(?=.*[a-z])(?=.*[$@$!%*?&])[A-Za-z\\d$@$!%*?&]{6,}/;
    if (!reg_pwd.test(str)) {

        return false;
    }
    return true;
}

/*************************************
 ** 날짜 유효성 체크
 *************************************/
function isValidDate(param) {
    try {
        param = param.replace(/-/g, '');

        // 자리수가 맞지않을때
        if (isNaN(param) || param.length != 8) {
            return false;
        }

        var year = Number(param.substring(0, 4));
        var month = Number(param.substring(4, 6));
        var day = Number(param.substring(6, 8));

        if (month < 1 || month > 12) {
            return false;
        }

        var maxDaysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        var maxDay = maxDaysInMonth[month - 1];

        // 윤년 체크
        if (month == 2 && (year % 4 == 0 && year % 100 != 0 || year % 400 == 0)) {
            maxDay = 29;
        }

        if (day <= 0 || day > maxDay) {
            return false;
        }
        return true;

    } catch (err) {
        return false;
    }
}

/*************************************
 ** 핸드폰번호 유효성 체크
 *************************************/
function isValidPhone(str) {
    var reg_phone = /^\d{11}$/;
    if (str.match(reg_phone)) {
        return true;
    } else {
        return false;
    }
}

/*************************************
 ** 숫자만 남김
 *************************************/
function numOnly(str){
    if (str) {
        return Number(str.replace(/[^0-9]/g,""));
    }
}

/*************************************
 ** 금액 입력시 "," 자동 입력
 *************************************/
// 숫자 타입에서 쓸 수 있도록 format() 함수 추가
Number.prototype.format = function () {
    if (this == 0) return 0;

    var reg = /(^[+-]?\d+)(\d{3})/;
    var n = (this + '');

    while (reg.test(n)) n = n.replace(reg, '$1' + ',' + '$2');

    return n;
};

// 문자열 타입에서 쓸 수 있도록 format() 함수 추가
String.prototype.format = function () {
    var num = parseFloat(this);
    if (isNaN(num)) return "0";

    return num.format();
};


function addComma(obj) {
    var regx = new RegExp(/(-?\d+)(\d{3})/);
    var bExists = obj.indexOf(".", 0);//0번째부터 .을 찾는다.
    var strArr = obj.split('.');
    while (regx.test(strArr[0])) {//문자열에 정규식 특수문자가 포함되어 있는지 체크
        //정수 부분에만 콤마 달기
        strArr[0] = strArr[0].replace(regx, "$1,$2");//콤마추가하기
    }
    if (bExists > -1) {
        //. 소수점 문자열이 발견되지 않을 경우 -1 반환
        obj = strArr[0] + "." + strArr[1];
    } else { //정수만 있을경우 //소수점 문자열 존재하면 양수 반환
        obj = strArr[0];
    }
    return obj;//문자열 반환
    // str = String(str);
    // return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
}

function removeComma(str) {
    str = "" + str.replace(/,/gi, ''); // 콤마 제거
    str = str.replace(/(^\s*)|(\s*$)/g, ""); // trim()공백,문자열 제거
    return str;
    //eturn (new Number(str));//문자열을 숫자로 반환

    // str = String(str);
    // return str.replace(/[^\d]+/g, '');
}

/*************************************
 ** 용량
 *************************************/
function getFileSize(x) {
    var s = ['bytes', 'kB', 'MB', 'GB', 'TB', 'PB'];
    var e = Math.floor(Math.log(x) / Math.log(1024));
    return (x / Math.pow(1024, e)).toFixed(2) + " " + s[e];
};

/*************************************
 ** 초를 시분초로 변환
 *************************************/
function getTimeStringSeconds(seconds) {
    var hour, min, sec;
    hour = parseInt(seconds / 3600);
    min = parseInt((seconds % 3600) / 60);
    sec = seconds % 60;

    // if (hour.toString().length==1) hour = '0' + hour;
    // if (min.toString().length==1) min = '0' + min;
    // if (sec.toString().length==1) sec = '0' + sec;

    let str = '';
    if (seconds >= 3600) {
        str += hour + 'h ' + min + 'm ' + sec + 's'
    } else if (seconds < 3600 && seconds >= 60) {
        str += min + 'm ' + sec + 's'
    } else {
        str += sec + 's'
    }

    return str;
}

/*************************************
 ** 넘어온 값이 빈값인지 체크합니다.
 ** !value 하면 생기는 논리적 오류를 제거하기 위해
 ** 명시적으로 value == 사용
 ** [], {} 도 빈값으로 처리
 *************************************/

var isEmpty = function (value) {
    if (value == "" || value == null || value == undefined || (value != null && typeof value == "object" && !Object.keys(value).length)) {
        return true
    } else {
        return false
    }
};

/**
 * 빈값을 대체.
 * @param value
 * @param defaultValue : value 가 빈값이면 대체할값.
 * @returns {*}
 */
var getValueOrDefault = function (value, defaultValue) {
    if(isEmpty(value)){
       if(isEmpty(defaultValue)) {
           return value;
       }else{
           return defaultValue;
       }
    }else{
        return value;
    }
};


function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}


function dataURItoBlob(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1]);
    else
        byteString = unescape(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], {type: mimeString});
}

/*************************************
 ** input 필수 입력값 체크 (미입력 필드 있으면 false 없으면 true)
 *************************************/
function inputImpotent() {
    const $inputImpotent = $('input.is_impotent');
    for (let i = 0; i < $inputImpotent.length; i++) {
        if (!$inputImpotent.eq(i).val()) {
            $inputImpotent.eq(i).focus();
            alert('필수 정보를 입력해주세요.');
            return false;
        }
    }
    return true;
}

/**
 ** input 숫자만 입력
 **/
function numkeyCheck(e, isDecimal) {
    var keyValue = event.keyCode;

    if (((keyValue >= 48) && (keyValue <= 57))) {
        return true;
    } else {
        //소수점체크
        if (isDecimal) {
            if (keyValue === 46) {
                return true;
            }
        }
        return false;
    }
}

function numMinMaxCheck(obj, min, max) {
    if (obj.val() >= min || ob.val() <= max) {
        return true;
    } else {
        return false;
    }
}


function mobileCheck() {
    var varUA = navigator.userAgent.toLowerCase(); //userAgent 값 얻기

    if (varUA.match('android') != null) {
        //안드로이드 일때 처리
        return 'ANDROID';

    } else if (varUA.indexOf("iphone") > -1 || varUA.indexOf("ipad") > -1 || varUA.indexOf("ipod") > -1) {
        //IOS 일때 처리
        return 'IOS';
    } else {
        //아이폰, 안드로이드 외 처리
        return 'ELSE';
    }
}

/**
 * 키위스냅앱 체크
 * @returns {boolean}
 */
function isKiwisnapApp() {
    var varUA = navigator.userAgent; //userAgent 값 얻기

    //키위스냅 앱에서 들어온경우
    if (varUA.indexOf("KIWISNAP_IOS") > -1 || varUA.indexOf("KIWISNAP_ANDROID") > -1) {
        return true;
    } else {
        return false;
    }
}


function showAlert(msg) {
    toastr.options = {
        progressBar: false,
        timeOut: 1500,
        positionClass: "toast-bottom-center",
    };
    toastr.success('', msg);
}

/**
 * url로 부터 파라미터 리턴.
 * @returns {{}}
 */
function getUrlParams(innerUrl) {
    const params = {};
    let target = "";
    if (innerUrl) {
        target = innerUrl;
    } else {
        target = window.location.search;
    }
    target.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (str, key, value) {
        params[key] = value;
    });
    return params;
}

/**
 * url을 기준으로 API url 조회.
 */
function getApiUrlByUrl() {
    let api_url = '';
    if (location.host.indexOf('localhost') > -1) {
        api_url = 'http://localhost:9090';
    } else if (location.host.indexOf('devservice.kiwisnap') > -1) {
        api_url = 'https://devapi.kiwisnap.net';
    } else if (location.host.indexOf('service.kiwisnap') > -1) {
        api_url = 'https://api.kiwisnap.net';
    }

    return api_url;
}

/**
 * 확장자에 다른 contentType
 */
function getContentType(ext){
    ext = ext.toLowerCase();
    if(ext == 'jpg' || ext == 'jpeg'){
        return 'image/jpeg';
    }else if(ext == 'png'){
        return 'image/png';
    }else if(ext == 'gif'){
        return 'image/gif';
    }else if(ext == 'svg'){
        return 'image/svg+xml';
    }else{
        return '';
    }
}

//replaceAll prototype 선언
String.prototype.replaceAll = function (org, dest) {
    return this.split(org).join(dest);
}


/**
 *  이미지 데이터를 blob 데이터로 변환(예: canvas toDataURL 를 s3에 올리는 blob 데이터로 변환)
 * @param dataURI
 * @returns {*}
 */
function dataURItoBlob(dataURI) {
    var binary = atob(dataURI.split(',')[1]);
    var array = [];
    for (var i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], {type: 'image/jpeg'});
}

/**
 ** 전역 스크롤 일시 정지, 재시작
 **/
function isPassive() {
    var supportsPassiveOption = false;

    try {
        addEventListener("test", null, Object.defineProperty({}, "passive", {
            get: function get() {
                supportsPassiveOption = true;
            }
        }));
    } catch (e) {
    }

    return supportsPassiveOption;
}

function scrollOff() {
    $('body').addClass('scrollOff');
    document.addEventListener('scroll touchmove mousewheel', function (e) {
        e.preventDefault();
        e.stopPropagation();
    }, isPassive() ? {
        capture: false,
        passive: false
    } : false);
}

function scrollOn() {
    $('body').removeClass('scrollOff').off('scroll touchmove mousewheel');
}

/**
 ** rgb 컬러 hex 코드 변환
 **/
function rgbHex(rgb) {
    if (rgb) {
        if (  rgb.search("rgb") == -1 ) {
            return rgb;
        } else {
            rgb = rgb.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+))?\)$/);
            function hex(x) {
                return ("0" + parseInt(x).toString(16)).slice(-2);
            }
            return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
        }
    }
}

/**
 아코디언 동작
 **/
function setAccordion() {
    $('.js-accordionTitle').on('click', function () {
        $(this).toggleClass('is_open');
    })
}

/**
 아코디언 동작
 **/
function toggleAccordion(pointer) {
    const $trigger = $(event.currentTarget);
    let $pointer;
    if (pointer) {
        $pointer = $(event.currentTarget).closest(pointer);
    } else {
        $pointer = $(event.currentTarget);
    }
    $trigger.toggleClass('is_active');
    $pointer.toggleClass('is_active').next().toggle();
}

/**
 앱 오픈시 상태값 클래스 추가
 **/
function openAppParamsCheck() {
    if (isKiwisnapApp()) {
        $('body').addClass('pageOpenApp');
        $('.is_appShow').removeClass('is_appShow');    //앱만 보인다.
    } else {
        $('.is_appHide').removeClass('is_appHide');    //웹만 보인다.
    };
}

/**
 체크항목 전체 체크
 **/
function allCheck(trigger, target) {
    $(document).on('click', trigger, function (e){
        if (e.target.checked) {
            $(target).each(function (index, value) {
                $(value).prop("checked", true);
            });
        } else {
            $(target).each(function (index, value) {
                $(value).prop("checked", false);
            });
        }
    })
    $(document).on('click', target, function (e){
        if (e.target.checked) {
            let nowAllCheck = true;
            $(target).each(function (index, value) {
                if (!$(value).prop("checked")) {
                    nowAllCheck = false;
                }
            });
            if (nowAllCheck) {
                $(trigger).prop("checked", true);
            }
        } else {
            $(trigger).prop("checked", false);
        }
    })
}

/**
 필수항목 체크
 **/
function primaryCheck(trigger, target, subTrigger) {
    primaryCheckFunc();

    $(document).on('click', trigger + ' , ' + subTrigger, function (e){
        primaryCheckFunc();
    })

    function primaryCheckFunc() {
        let nowAllCheck = true;
        $(trigger).each(function (index, value) {
            if (!$(value).prop("checked")) {
                nowAllCheck = false;
            }
        });
        if (nowAllCheck) {
            $(target).attr("disabled", false);
        } else {
            $(target).attr("disabled", true);
        }
    }
}


/**
 input 변경 확인
 **/
function checkInput(trigger, target, inputData) {
    const $trigger = $(trigger);
    const $target = $(target);
    let saveData = '개별입력';
    checkInputFunc();
    $(document).on('keyup keydown change paste', target, function (e){
        saveData = e.target.value;
    })
    $(document).on('keyup keydown change paste', trigger, function (e){
        checkInputFunc();
    })
    function checkInputFunc() {
        let nowInput = false;
        $trigger.each(function (index, value) {
            if ($(value).val()) {
                nowInput = true;
            }
        })
        if (nowInput) {
            if ($target.val() != '개별입력') {
                saveData = $target.val();
            }
            $target.val(saveData);
        } else {
            if (inputData) {
                $target.val(inputData);
            } else {
                if (saveData != '개별입력') {
                    $target.val(saveData);
                }
            }
        }
    }
}

/**
 리스트 삽입동작
 **/
function concatBreak(target, index, input) {
    const sliceFront = target.slice(0,index);
    const sliceBack = target.slice(index);
    return sliceFront.concat(input, sliceBack);
}

/**
 input필드 텍스트만 입력
 **/
function onlyNum() {
    $(document).on('keydown keyup past change', '.is_onlyNum', function (e) {
        e.target.value = e.target.value.replace(/[^0-9]/g, '');
    });
}

/**
 탭 동작
 **/
function setTabTrigger() {
    $(document).on('click', '.is_tabTrigger', function (e) {
        let $trigger = $(e.currentTarget);
        const $target = $(`.is_tabTarget[data-tabTarget=${$trigger.attr('data-tabTrigger')}]`);
        const nowIndex = $trigger.index();
        if ($trigger.find('input').length) {
            if ($(e.target).hasClass('is_tabTrigger')) {
                return false;
            }
        }
        $trigger.addClass('is_active').siblings('.is_tabTrigger').removeClass('is_active');
        $target.removeClass('is_active').eq(nowIndex).addClass('is_active');
    });
}

/**
 셀렉트 변경 감지
 **/
function setSelectChange() {
    $(document).on('change', '.is_selectTrigger', function (e) {
        const $trigger = $(e.currentTarget);
        const $target = $(`.is_selectTarget[data-selectTarget=${$trigger.attr('data-selectTrigger')}]`);
        $target.each(function (index, value) {
            $(value)
            if ($(value).attr('data-selectValue') == $trigger.val()) {
                $target.show();
            } else {
                $target.hide();
            }
        });
    });
}

/**
 타겟 숨김동작
 .is_changeTab.is_on 클래스 있는 버튼 클릭시 타겟 활성화
 .is_changeTab.is_off 클래스 있는 버튼 클릭시 타겟 비활성화
 **/
function setSwitchTab() {
    setSwitchTabFunc($('.is_switchTab.is_active'));
    $(document).on('click', `.is_switchTab`, function (e) {
        setSwitchTabFunc($(e.currentTarget));
    });

    function setSwitchTabFunc(target) {
        const $trigger = target;
        const $triggerSwitch = $trigger.attr('data-switch');
        const $target = $(`.is_switchTabTarget[data-switch=${$triggerSwitch}]`);
        $target.each(function (index, value) {
            if ($trigger.attr('data-switchkey') == $(value).attr('data-switchkey')) {
                $(value).show();
            } else {
                $(value).hide();
            }
        })
    }
}

/* 1000 리사이즈 이미지 url로 전환 */
function imgUrlResize(url) {
    let nowUrlSplit = '';
    nowUrlSplit = url.split('/');
    nowUrlSplit.splice(nowUrlSplit.length - 1, 0, 'scaled-w_1000');
    return nowUrlSplit.join('/');
}

/* url 파일 확장자 확인 */
function findExtension(url) {
    let pathType = url.split('.');
    return pathType[pathType.length - 1];
}

/* navigatorStep */
function navigatorStep(step, target) {
    const $navigatorItem = $('.detailHeaderNavigatorList .detailHeaderNavigatorItem');
    $navigatorItem.each(function (index, value) {
        if (index <= step) {
            $(value).addClass('is_active');
        } else {
            $(value).removeClass('is_active');
        }
    });
    $(target).attr('data-step', step);
}

/* mobilePage */
function mobilePage(step) {
    const $mobileStep = $(`.mobileStep:not([data-step-m="${step}"])`);
    const $mobileNowStep = $(`.mobileStep[data-step-m="${step}"]`);
    $mobileStep.addClass('is_hide_m');
    $mobileNowStep.removeClass('is_hide_m');
}

/* pcPage */
function pcPage(step) {
    const $pcPage = $(`.pcStep:not([data-step-p="${step}"])`);
    const $pcNowStep = $(`.pcStep[data-step-p="${step}"]`);
    $pcPage.addClass('is_hide_p');
    $pcNowStep.removeClass('is_hide_p');
}


function getBackgroundImageUrl($element) {
    if (!($element instanceof jQuery)) {
        $element = $($element);
    }

    var imageUrl = $element.css('background-image');
    return imageUrl.replace(/(url\(|\)|'|")/gi, ''); // Strip everything but the url itself
}

let mouseTracker = false;
let $mouseTrackerTarget = "";
let mouseTrackerData = {};
function mouseTrackerSet() {
    const $mouseTracker = $('.mouseTracker');
    const spaceHtml = `<div class="ks_space" style="display: none;"></div>`;
    $(document).on('mousemove', function (e) {
        if (mouseTracker) {
            // 이미지 드래그 중 ( 전역 변수로 동작 형식 통일 )
            const $target = $(e.target);
            $('.ks_space').remove();
            if ($target.is('.ks_block, .ks_row, .ks_bg')){
                $mouseTrackerTarget = $target;
            } else if (!$target.is('.ks_space, .ui-sortable-handle')) {
                $mouseTrackerTarget = $target.closest('.ks_block, .ks_row, .ks_bg');
            }
            if ($(mouseTrackerData.ui.helper[0]).closest('#NO').length) {
                $mouseTrackerTarget.after(spaceHtml);
            }
            $mouseTracker.css({
                left: e.pageX + 5 + 'px',
                top: e.pageY + 5 + 'px',
            });
        }
    });
}

/* sortable 동작중에 overflow꺼야 할 항목 overflow 중지 */
function sortableStopOverflow(event, ui, yn) {
    const $mouseTracker = $('.mouseTracker');
    const $target = $(ui.helper[0]);
    const $clone = $target.clone();
    if (yn) {
        $target.hide();
        $mouseTracker.show().html($clone);
        mouseTrackerData = {
            event: event,
            ui: ui,
            yn: yn
        }
        mouseTracker = true;
    } else {
        // 이미지 드래그 완료 ( 전역 변수로 동작 형식 통일 )
        $target.show();
        $mouseTracker.hide().html('');
        mouseTrackerData = {
            event: event,
            ui: ui,
            yn: yn
        }
        mouseTracker = false;
        $('.ks_space').remove();
        if ($(mouseTrackerData.ui.helper[0]).closest('#NO').length) {
            editAddImage(`#${$mouseTrackerTarget.closest('.ks_column').attr('data-name')} .goodsCardList`, $mouseTrackerTarget, 'move');
        }
    }
}

// 팝업으로 iframe 호출시 body에 is_popup클래스 부여
function checkPopup() {
    console.log("getUrlParams : ", getUrlParams());
    console.log("getUrlParams.popup : ", getUrlParams().popup);
    console.log("getUrlParams['popup'] : ", getUrlParams()['popup']);
    if (getUrlParams().popup == 'Y') {
        $('body').addClass('is_popup');
    }
}

/* 셀렉트박스 커스텀 */
function customSelectBox() {
    /* 셀렉트박스 보이게 하기 */
    const $target = $('.is_customSelect');
    $target.each(function(index, value) {
        const $customSelect = $(value);
        const $customSelected = $customSelect.find('.is_customSelected');
        const $customSelectList = $customSelect.find('.is_customSelectList');
        const $customSelectOption = $customSelect.find('.is_customSelectList > *');

        $customSelected.on("click", function () {
            $customSelectList.toggle();
        })

        /* 셀렉트 박스 옵션 선택 */
        $customSelectOption.on("click", function () {
            $($customSelectOption).removeClass('is_select')
            $customSelected.html($(this).html());
            $customSelected.attr('value',$(this).attr('value'));

            $customSelectList.toggle();
            $(this).addClass('is_select')
        })
    })

    /* 셀렉트 박스 이외 선택시 보이지 않게 하기 */
    $("body").on("click", function(e){
        if (!$(e.target).closest('.is_customSelect').length) {
            $(".is_customSelectList").hide()
        }
    })
}

/* 기본값으로 유지할 옵션들은 옵션을 제거하시기 바랍니다. */
/*
// 기본팝업
openPopup({
    title: '알림', // 팝업 타이틀 [기본값 : '알림']
    html: `<b>[최대15글자이하의 프리셋]</b>으로<br/>보정설정을 저장하시겠습니까?`, // 팝업 디스크립션 html
    callBackFunc: function () {
        test('팝업 로드 콜백');
    }, // 팝업 로드시 동작함수 [기본값 : '']
    close: true, // 취소버튼 노출 유무 [기본값 : true]
    closeText: '취소', // 취소버튼 문구 [기본값 : '취소']
    closeFunc: function () {
        test('취소 콜백');
    }, // 취소버튼 클릭시 동작함수 [기본값 : '']
    closeCloseCancel: false, // 취소버튼 클릭시 기본 팝업 종로 동작 유무 [기본값 : false]
    agree: true, // 확인버튼 노출 유무 [기본값 : true]
    agreeText: '확인', // 확인버튼 문구 [기본값 : '확인']
    agreeFunc: `test('확인 콜백');`, // 확인버튼 클릭시 동작함수 [기본값 : '']
    agreeCloseCancel: false, // 확인버튼 클릭시 기본 팝업 종로 동작 유무 [기본값 : false]
    maxWidth: '270px', // 최대너비 [기본값 : '270px']
    doublePop: false, // 중복 팝업 허용 유무 [기본값 : false]
})
*/
let nowPopupIndex = 0;
let keepPopupData = {};
function openPopup(popupData, isAllowDoublePop, type) {
    $(popupData.focusTarget).removeClass('is_border');
    let isAllowDuplePop = false;
    if(isAllowDoublePop != undefined){
        isAllowDuplePop = isAllowDoublePop; //팝업 중복 허용.
    }
    //팝업 중복 뜨는 거 방지
    let popUpObhect = $(".popup.popupDefault");
    if(popUpObhect.length>0 && !isAllowDuplePop){
        //팝업이 이미 떠있다.
        return;
    }
    $(".fullDim.preloader").hide();

    popupData.zIndex = nowPopupIndex++;
    if (popupData.onlyOne) {
        $('.popup').remove();
    }

    if (popupData.type == 'EDIT') {
        $('body').append($.templates($.templates("#POPUP_EDIT")).render(popupData));
    } else if (popupData.type == 'EDITSAVE') {
        $('body').append($.templates($.templates("#POPUP_EDITSAVE")).render(popupData));
    } else if (popupData.type == 'POPUP_GIF') {
        $('body').append($.templates($.templates("#POPUP_GIF")).render(popupData));
    } else if(popupData.type == 'POPUP_MODELCONTROL') {
        $('body').append($.templates($.templates("#POPUP_MODEL")).render(popupData));
    } else if(popupData.type == 'POPUP_GUIDE') {
        $('body').append($.templates($.templates("#POPUP_GUIDE")).render(popupData));
    } else if (popupData.type == 'TUTORIALDEFAULT') {
        $('body').append($.templates($.templates("#TUTORIALDEFAULT")).render(popupData));
    } else if (popupData.type == 'TUTORIALEDIT') {
        $('body').append($.templates($.templates("#TUTORIALEDIT")).render(popupData));
    } else {
        $('body').append($.templates($.templates("#POPUP_DEFAULT")).render(popupData));
    }
    if (popupData.func) {
        popupData.func();
    }
    bodyDim(popupData.zIndex, popupData.bgColor);

    if (type == "BIG"){
        $(".popup.popupDefault").css({"max-width":"400px"});
    }

    if (type == "MID"){
        $(".popup.popupDefault").css({"max-width":"300px"});
    }

    $(popupData.focusTarget).addClass('is_border');

    // 튜토리얼 창의 위치
    tutorialSizeSetting(popupData);
    keepPopupData = popupData;
}

function bodyDim(zIndex,bgColor) {
    const bodyDimHtml = `<div class="bodyDim" style="z-index: ${zIndex ? 999 + zIndex : 999}; background-color: ${bgColor ? '' + bgColor : bgColor};"></div>`;
    $('.bodyDim').remove();
    $('body').append(bodyDimHtml);
}

function bodyDimClose() {
    $('.bodyDim').remove();
}

//리사이징 - 타켓 위치에 따라 튜토리얼 위치값 재설정
function tutorialSizeSetting(popupData) {

    // 타겟위치에 따라 , 각각의 위치값 재설정
    if (popupData.focusTargetPosition) {
        console.log('사이즈 줄기이')
        const $focusTarget = $(popupData.focusTarget);
        const focusTargetWidth = $focusTarget.width();
        const focusTargetLeft = $focusTarget.offset().left;
        const focusTargetTop = $focusTarget.offset().top;
        const focusTargetBottom = $focusTarget.offset().bottom;


        let string = popupData.focusTargetPosition;
        let strSplit = string.split(',');
        let translatePlus = Number(strSplit[1].replace(/[%-]/g, '')) / 100;
        let halfHeight = $('.popup.tutorialEdit').height() * (translatePlus * 0.8);
        const realHeight = focusTargetTop + $('.popup.tutorialEdit').height();
        const minusHeight = realHeight - $(window).height();
        const changeHeight = $('.popup.tutorialEdit').height() - minusHeight + halfHeight;

        $('.popup.tutorialEdit').height('auto');


        // 윈도우 높이보다 , 튜토리얼창+top값이 더 큰 경우
        if ($(window).height() < focusTargetTop + $('.popup.tutorialEdit').height() - halfHeight) {
            console.log('??? : ', changeHeight, minusHeight, translatePlus, realHeight);
            //높이값 다시 설정
            $('.popup.tutorialEdit').height(changeHeight);
        }

        //너비값 다시 설정
        $('.popup.tutorialEdit').css('left', focusTargetLeft + focusTargetWidth + 16);
    }

    // 튜토리얼 창의 위치
    // console.log("targetPosition : ", popupData, popupData['targetPosition']);
    if (popupData['targetPosition']) {
        const arrowW = 8;
        const arrowH = 12;
        const paddingW = 10;
        const paddingH = 10;
        const scrollH = 116;

        const $pointOut = $('.pointOut');
        const $tutorialEdit = $('.tutorialEdit');
        const $tutorialEditWidth = $tutorialEdit.width();
        const $tutorialEditHeight = $tutorialEdit.height();

        const $focusTarget = $(popupData.focusTarget);
        const focusTargetWidth = $focusTarget.width();
        const focusTargetHeight = $focusTarget.height();
        const focusTargetLeft = $focusTarget.offset().left;
        const focusTargetTop = $focusTarget.offset().top;


        if (popupData['targetPosition'] == 'leftTop') {
            $tutorialEdit.css({
                left: focusTargetLeft + arrowW + 'px',
                top: focusTargetTop + arrowH + 'px',
            })
            $pointOut.css({
                left: -arrowW + 'px',
                top: -arrowH + 'px'
            })
        } else if (popupData['targetPosition'] == 'leftCenter') {
            $tutorialEdit.css({
                left: focusTargetLeft - $tutorialEditWidth + arrowW + paddingW + 'px',
                top: focusTargetTop + paddingH + 'px',
            })
            $pointOut.css({
                left: $tutorialEditWidth + 'px',
                top: $tutorialEditHeight / 2 + arrowH + paddingH + 'px'
            })
        } else if (popupData['targetPosition'] == 'leftBottom') {
            $tutorialEdit.css({
                left: focusTargetLeft + arrowW + paddingW + 'px',
                top: focusTargetTop + paddingH + arrowH + 'px',
            })
            $pointOut.css({
                left: -arrowW + 'px',
                top: $tutorialEditHeight - arrowH - paddingH + 'px'
            })
        } else if (popupData['targetPosition'] == 'rightTop') {
            $tutorialEdit.css({
                left: focusTargetLeft + focusTargetWidth + arrowW + paddingW + 'px',
                top: focusTargetTop + 'px',
            })
            $pointOut.css({
                left: -arrowW + 'px',
                top: arrowH + paddingH + 'px'
            })
        } else if (popupData['targetPosition'] == 'rightCenter') {
            $tutorialEdit.css({
                left: focusTargetLeft + focusTargetWidth + arrowW + paddingW + 'px',
                top: focusTargetTop + 'px',
            })
            $pointOut.css({
                left: -arrowW + 'px',
                top: arrowH + paddingH + 'px'
            })
        } else if (popupData['targetPosition'] == 'rightBottom') {
            $tutorialEdit.css({
                left: focusTargetLeft + focusTargetWidth + arrowW + paddingW + 'px',
                top: focusTargetTop + 'px',
            })
            $pointOut.css({
                left: -arrowW + 'px',
                top: $tutorialEditHeight + arrowH + paddingH + 'px'
            })
        } else if (popupData['targetPosition'] == 'topCenter') {
            $tutorialEdit.css({
                left: focusTargetLeft + focusTargetWidth / 2 + arrowW  + 'px',
                top: focusTargetTop + arrowH + 'px',
            })
            $pointOut.css({
                left: -arrowW + 'px',
                top: $tutorialEditHeight / 2 + arrowH + paddingH + 'px'
            })
        } else if (popupData['targetPosition'] == 'bottomCenter') {
            $tutorialEdit.css({
                left: focusTargetLeft  + 'px',
                top: -focusTargetHeight + arrowH + 'px',
            })
            $pointOut.css({
                left: $tutorialEditWidth / 2 + 'px',
                top: -arrowH + 'px'
            })
        }
    }
}

function closePopup(self) {
    let classTutorial = $('.tutorialEditClose').attr('data-target')
    $(classTutorial).removeClass('is_border')
    nowPopupIndex--;
    if (self) {
        $(self).closest('.popup').remove();
        const $popup = $('.popup');
        if ($popup.length) {
            $('.bodyDim').css('z-index', Number($popup.eq($popup.length - 1).css('z-index')) - 1);
        } else {
            bodyDimClose();
        }
    } else {
        $('.popup').remove();
        bodyDimClose();
    }
}

function kiwiApiAjax(method,url,sendData,async){
    try{
        const httpMethod = method.toUpperCase();
        if (httpMethod === "GET" || httpMethod === "DELETE") {
            return objToMap(requestParamMethod(httpMethod, url, sendData, async));
        } else if (httpMethod === "POST" || httpMethod === "PUT") {
            return objToMap(requestBodyMethod(httpMethod, url, sendData, async));
        } else {
            return new Map([["error", true],["error_msg", "Http Method를 잘못 입력하였습니다"]]);
        }
    }catch (e){
        return new Map([["error", true]]);
    }
}
function requestParamMethod(method,url,sendData,async) {
    return JSON.parse(
        $.ajax({
            type: method,
            url: `${denma_nextdop_api_url}`+url,
            data: sendData,
            dataType: "json",
            async : async,
            success: function (data) {
                console.log("kiwiApiAjax url = ",url," / result : ",data);
            },
            error: function (data) {
                console.log("kiwiApiAjax url = ",url," / error : ",data);
            }
        }).responseText);
}

function requestBodyMethod(method,url,sendData,async){
    return JSON.parse($.ajax({
        type: method,
        url: `${denma_nextdop_api_url}`+url,
        data: JSON.stringify(sendData),
        dataType: "json",
        async : async,
        contentType : "application/json; charset=utf-8",
        success: function (data) {
            console.log("kiwiApiAjax url = ",url," / result : ",data);
        },
        error: function (data) {
            console.log("kiwiApiAjax url = ",url," / error : ",data);
        }
    }).responseText);
}
function objToMap(obj){
    if(obj instanceof Array){
        return objToListInMap(obj);
    }else {
        return new Map(
            Object
                .keys(obj)
                .map(
                    key => [key, obj[key]]
                )
        )
    }
}

function objToListInMap(obj){
    let result = []
    for (let value of obj) {
        const myMap = new Map(
            Object
                .keys(value)
                .map(
                    key => [key, value[key]]
                )
        )
        result.push(myMap);
    }
    return result;
}
