// isPassive
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

// body 스크롤 막음
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

// body 스크롤 풀기
function scrollOn() {
	$('body').removeClass('scrollOff');
	$('body').off('scroll touchmove mousewheel');
}

window.addEventListener('message', function(e) {

	if (e.data.touchmove == "Y") {
		// scrollOff();
	} else if (e.data.touchmove == "N") {
		// scrollOn();
	}

	if (e.data.full360 == "Y") {
		$('body').addClass('fixPopup360');
		// scrollOff();
	} else if (e.data.full360 == "N") {
		$('body').removeClass('fixPopup360');
		// scrollOn();
	}

	if (e.data.sync) {
		$('.frame_360').each(function (index, value) {
			value.contentWindow.postMessage({syncReturn: "Y" }, '*');
		})
	}

	if (e.data.callResize_now360pb != undefined) {
		$('.iframeWrap360').css('padding-bottom',e.data.callResize_now360pb + '%');
	} else if (e.data.blob != undefined) {
		var reader = new FileReader();
		reader.readAsDataURL(e.data.blob);
		reader.onloadend = function () {
			var base64data = reader.result;
			var imgTag = $(selectedPhotoObject).attr('src');
			$(selectedPhotoObject).attr('src', base64data);
		}
	}
});