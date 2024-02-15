// var imported =  document.createElement('script');
// imported.src = "https://cdn.jsdelivr.net/npm/@tensorflow/tfjs";
//
// var imported2 =  document.createElement('script');
// imported2.src = "https://cdn.jsdelivr.net/npm/@tensorflow-models/posenet";

var imported3 =  document.createElement('script');
imported3.src = "/js/cropper.js";

// document.head.appendChild(imported);
// document.head.appendChild(imported2);
document.head.appendChild(imported3);


var cropperAuto;

//이미지 교체하기
function replaceImage(target,source) {
    //croper 가 위에 있으니 잠시 감춘다.
    $(".cropper-container").hide();

    let replaceSrc = source.attr("src");
    //console.log("replaceSrc",replaceSrc);
    target.css("background-image","url('"+replaceSrc+"')");
}

//배경이미지 지로 부터 썸네일 리스트를 만들어 준다.
function createThumnailList(element,fuc){
    loadingMe(element);
    var bg_img = element.css('background-image').replace(/^url\(['"](.+)['"]\)/, '$1');
    //element.css('background-image',''); //배경 잠시 없애기
    //console.log("bg_img",bg_img);

    //이 이미지를 기준으로 Cropper를 생성한다.
    var img = new Image();
    img.src = bg_img;
    $(img).hide();
    element.append(img);

    cropperAuto = new Cropper(img, {
        zoomable : false,
        ready: function () {
            var cropper = this.cropper;
            var containerData = cropper.getContainerData();
            var cropBoxData = cropper.getCropBoxData();
            cropper.zoom_enabled = false;

            cropper.setCropBoxData({
                left : 0,
                top : 0,
                width : containerData.width,
                height : containerData.height
            });

            //원래 사이즈 정보 얻기 위해 챙긴다.
            var image = new Image();
            image.src = cropper.getCroppedCanvas().toDataURL('image/jpeg');
            $(image).attr("id","result_img")
            $(image).hide();
            element.append(image);


            /*
            $(image).attr("id","result_img")
            $("#result_org").html(image);
             */
            var imagesData = cropper.getCroppedCanvas();

            setTimeout(function () {
                makeThumnail(image,cropper,function (images) {
                    console.log("image",images);
                    $.each(images,function (index,object) {
                        console.log("image:",object);
                        //element.append(object);
                    })
                    fuc(images);
                    //element.remove();

                    //cropper.clear();
                    //cropper.destroy();
                    img.remove();

                    console.log("cropper.aspectRatio ====== ");


                    //로딩 지우기
                    //element.find(".fullDim").remove();
                    loadingMeHide(element);
                })
            },0);
            //makeThumnail(cropper);
        }
    });



    //썸네일 이미지 객체를 던저 줘야 한다.

}

function makeThumnail(image,cropper,callback){
    var all   = ["nose","leftEye","rightEye","rightEar","leftEar","leftHip","rightHip","leftHip","rightHip","leftKnee","rightKnee","leftAnkle","rightAnkle"];
    var upHalf = ["nose","leftEye","rightEye","rightEar","leftEar","leftHip","rightHip"];
    var downHalf = ["leftHip","rightHip","leftKnee","rightKnee","leftAnkle","rightAnkle"];
    var bodyKnee = ["leftShoulder","rightShoulder","leftHip","rightHip","leftKnee","rightKnee"];
    var bodyAnkle = ["leftShoulder","rightShoulder","leftHip","rightHip","leftAnkle","rightAnkle"];

    //console.log("manek:",image);

    //사람 인식해서 가져 포인트 좌표 반환
    posenet.load({
        architecture: 'MobileNetV1',
        outputStride: 16,
        inputResolution: { width: 640, height: 480 },
        multiplier: 0.75
    }).then(function(net) {
        //canvas로 받아 와야 crossOrgin error 를 막을 수 있음.
        const pose = net.estimateSinglePose(image, {
            flipHorizontal: false
        });
        return pose;
    }).then(function(pose){
        console.log(pose.keypoints);
        //이미지 사이즈와 화면 사이즈 비율.
        //let imageWidth = $("#result_img").width() //현재 화면상의 사이즈
        let imageWidth = $(".cropper-wrap-box").width();
        //console.log("imageWidth",imageWidth);
        let orgwidth = document.getElementById("result_img").naturalWidth; //원본 이미지 사이즈
        //console.log("orgwidth",orgwidth);
        let ratio = imageWidth/orgwidth;



        //자를 영역 가져오기
        let maxmin = maxPosition(pose.keypoints,upHalf,ratio);
        let maxmin2 = maxPosition(pose.keypoints,downHalf,ratio);
        let maxminAll = maxPosition(pose.keypoints,all,ratio);
        let bodyknee = maxPosition(pose.keypoints,bodyKnee,ratio);
        let bodyankle = maxPosition(pose.keypoints,bodyAnkle,ratio);

        var img1 = createImage(maxminAll,true,cropper); // 전신
        var img2 = createImage(maxminAll,false,cropper); //얼굴 없는 전신
        var img3 = createImage(maxmin,true,cropper); //상반신
        var img4 = createImage(maxmin,false,cropper);// 얼굴 없는 상반시
        var img5 = createImage(maxmin2,true,cropper); // 하반신 좀 길게..
        var img6 = createImage(bodyknee,false,cropper); // 상반신 - 무릅
        var img7 = createImage(bodyankle,false,cropper); //상반신 - 발목

        callback([img1,img2,img3,img4,img5,img6,img7]);

    })
}


function maxPosition(keypoint,partArray,ratio) {
    var tempMaxX = 0;
    var tempMaxY = 0;
    var tempMinX = 10000;
    var tempMinY = 10000;
    $.each(keypoint,function (index,object) {
        console.log("object.part",object.part);
        //해당하는 부분 array
        if(partArray.includes(object.part)){
            let left = object.position.x * ratio;
            let top  = object.position.y* ratio;
            //console.log("left",left);
            //console.log("top",top);

            //최대값 구하기
            if(left > tempMaxX){
                tempMaxX = left;
            }
            //최대값 구하기
            if(top > tempMaxY){
                tempMaxY = top;
            }

            //최소값 구하기
            if(left < tempMinX){
                tempMinX = left;
            }
            //최소값 구하기
            if(top < tempMinY){
                tempMinY = top;
            }
        }
    })
    let obj ={
        minx : tempMinX,
        miny : tempMinY,
        maxx : tempMaxX,
        maxy : tempMaxY
    }
    return obj;
}

//얼굴 노출 여부
function createImage(maxmin,isExpand,cropper) {
    tempMaxX = maxmin.maxx;
    tempMaxY = maxmin.maxy;
    tempMinY = maxmin.miny;
    tempMinX = maxmin.minx;

    var cropWidth = tempMaxX - tempMinX;
    var cropHeight = tempMaxY - tempMinY;
    var centerX = tempMinX + cropWidth/2;
    var startX = centerX - cropHeight/2;
    var endX = centerX + cropHeight/2;
    var startY = tempMinY;
    var endY = tempMaxY;
    var totalH = endY - startY;

    var ratiobody = 0;
    //전신 얼굴 ~ 다리 까지 다 보이게 하려면?

    var faceRatio = 0;
    if(isExpand){
        faceRatio = 0.3
    }else{
        faceRatio = 0;
    }
    if(true){
        //눈에서 머리까지 올려야 한다.
        startY = startY - totalH *faceRatio
        endY = endY + totalH *faceRatio;
        var changeWidth = endY - startY;
        startX = centerX - changeWidth/2;
        endX = centerX + changeWidth/2;

    }

    //console.log("cropWidth["+cropWidth+"] cropHeight["+cropHeight+"]");

    let ltwh = {
        left:startX,
        top:startY,
        width: endX - startX,
        height: endY - startY
    };

    cropper.setCropBoxData(ltwh);



    // Crop
    croppedCanvas = cropper.getCroppedCanvas();
    //console.log("croppedCanvas",croppedCanvas.toDataURL("image/png"));
    //Image
    var imgo = new Image();
    imgo.src =croppedCanvas.toDataURL("image/png");
    //$( imgo ).css({"width": "100px", "float": "left","padding":"10px"});
    //$("#image_result").attr("src",croppedCanvas.toDataURL("image/png"));
    //$("#result").append(imgo);
    ltwh.img = imgo;

    return ltwh;
}



function cropMenuRatio(object){
    let $target = $(object);
    let ratio = $target.attr("data-ratio");
    console.log("ratio",Number(ratio));
    //console.log("cropperAuto",cropperAuto);
    $(".cropper-container").show();

    cropperAuto.aspectRatio = Number(ratio);



    var image = document.querySelector('#result_img');
    console.log("image",image);
    cropperAuto.destroy();
    cropperAuto = new Cropper(image, {
        aspectRatio: ratio,
        zoomable : false,
        ready: function () {
            var cropper = this.cropper;
            var containerData = cropper.getContainerData();
            var cropBoxData = cropper.getCropBoxData();
            cropper.zoom_enabled = false;
        }
    });


}



