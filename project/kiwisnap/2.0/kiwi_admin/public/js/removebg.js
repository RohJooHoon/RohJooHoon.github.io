
function deepMoveSpin() {
    if (confirm('AI 배경제거 사용시 추가 과금이 발생합니다. 진행하시겠습니까?')) {
        $('#btn_deep_remove').hide();
        $('#text_deep_remove').text('AI 배경제거 작업중.');

        $.ajax({
            type: "PUT",
            dataType: "json",
            url: `${denma_api_url}/airemove/spinProcess`,
            data: {
                "product_seq": '<%- product_seq %>'
                ,"type":'clipmagic'
                ,"test":'false' //운영은 false 개발은 true
            },
            success: function (response) {
                console.log("deepMoveSpin :", response);
                if (response.hasOwnProperty("error_code")) {
                    alert(response.error_msg);
                }
            },
            error: function (error) {
                console.log("error:", error);
            }
        });
    }
}

function rollbackImage(item,product_seq){
    //@PutMapping("/image/imageInit/{product_seq}/{product_image_seq}")
    var product_image_seq = item.attr("data-imageseq");

    //var uri = `${denma_api_url}/image/imageInit/${product_seq}/${product_image_seq}`;
    //console.log("rollbackImage:"+uri);

    $.ajax({
        type: "PUT",
        dataType: "json",
        url: `${denma_api_url}/product/image/imageInit/${product_seq}/${product_image_seq}`,
        success: function (response) {
            console.log("response.data.use_image_url2:",response.use_image_url);
            var org_bg_img = $(item).css('background-image').replace(/^url\(['"](.+)['"]\)/, '$1');
            //편집기해당 영역으로 이동하기
            findSelectorEditorFromLeftElement($(item),function (targetObject) {
                //해당 .ks_img 이미지 변경
                $(targetObject).css("background-image","url('"+response.use_image_url+"')");
            });
            let listValue = $(item).closest(".goodsCard").attr("id");
            let renderData = renderDataItem(listValue,response,0);
            $(item).replaceWith($.templates($.templates("#imageItem")).render(renderData));


        },
        error: function (error) {
            console.log("error:", error);
        }
    });
}



function clipMagicUpload(object,client_id,product_id,callback){

    //console.log("---- start 1 ----");
    var imgurl = object.attr("data-imageurl");
    var product_image_seq = object.attr("data-imageseq");

    //console.log("imgurl",imgurl);
    //api 서버로 clipMagic 업로드 요청
    const paramMap = {
        'imgUrl': imgurl,
        'client_id': client_id,
        'product_image_seq': product_image_seq,
        'product_id': product_id,
        'test': 'false'
    }

    $.ajax({
        type: "POST",
        dataType: "json",
        data: paramMap,
        url: `${denma_api_url}/product/uploadImageClipping`,
        success: function (response) {
            console.log("success : ", JSON.stringify(response));
            /////https://clippingmagic.com/images/96320877/edit/b44gg51eufubra89ocp5v3lj9qmffvssh5s3sti2dav84494403n
            var clipmagic_id = response.id;
            var clipmagic_secret = response.secret;
            var modify_image =  response.img;
            console.log("clipMagicUpload");
            updateClipMagicImg(product_image_seq,modify_image,clipmagic_id,clipmagic_secret,function () {

                callback(true);
            });

            //updateClipMagicImg(product_image_seq,response.img);

            /*
            {"image":{"id":96298121,"secret":"mkh2qjnqro08lkj24dlcuffqho0m7c7nl83eef72i89j0duhu6mn","resultRevision":0,"originalFilename":"image","test":true}}
             */

            //json.clipmagic_secret = clipmagic_secret;
            //json.clipmagic_id = clipmagic_id;
            //$(currentImageClipMagic).attr("data-data",JSON.stringify(json));


            /*
           에디터 열기
            let modify_url = "https://clippingmagic.com/images/"+clipmagic_id+"/edit/"+clipmagic_secret;
            window.open(modify_url);
            */

        },
        error: function (error) {
            callback(false);
            console.log("error:", error);
        }
    });
}


//이미지 매직에 수정된 이미지 정보를 올려 준다.
function updateClipMagicImg(product_seq,modify_image_url,clipmagic_id,clipmagic_secret,callback) {
    ///https://clippingmagic.com/images/96320877/edit/b44gg51eufubra89ocp5v3lj9qmffvssh5s3sti2dav84494403n
    const paramMap = {
        'modify_image_url': modify_image_url,
        'clipmagic_id':clipmagic_id,
        'clipmagic_secret':clipmagic_secret
    }
    $.ajax({
        type: "PUT",
        dataType: "json",
        data: paramMap,
        url: `${denma_api_url}/product/image/`+product_seq,
        success: function (response) {
            console.log("success imageDetail : ", JSON.stringify(response));

            var allImgs = $("li[data-imageseq]");
            var myObject ;
            $.each(allImgs,function(index,object){
                var data_imageseq = $(object).attr("data-imageseq");
                //현재 선택된 이미지를 가져오기 위한 selector
                if(product_seq == data_imageseq){
                    myObject = object;
                    return false;
                }
            });
            //이미지 data-data 정보 변경하기.
            $(myObject).attr("clipmagic_id",clipmagic_id);
            $(myObject).attr("clipmagic_secrect",clipmagic_secret);
            if(response.data.use_image_url !=undefined){




                //var org_bg_img = $(myObject).css('background-image').replace(/^url\(['"](.+)['"]\)/, '$1');
                //편집기해당 영역으로 이동하기
                findSelectorEditorFromLeftElement($(myObject),function (targetObject) {
                    //해당 .ks_img 이미지 변경
                    $(targetObject).css("background-image","url('"+response.data.use_image_url+"')");
                });


                let listValue = $(myObject).closest(".goodsCard").attr("id");
                let renderData = renderDataItem(listValue,response.data,0);
                console.log("response.data",response.data);
                //console.log("xrenderData",renderData);

                var  backImage = new Image()
                backImage.src = renderData.nowImage;
                backImage.onload = function(){
                    callback(true);
                    $(myObject).replaceWith($.templates($.templates("#imageItem")).render(renderData));
                }
                backImage.onerror = function(){
                    setTimeout(function () {
                        backImage.src = renderData.nowImage;
                    }, 200);
                }
                //$(myObject).find(".goodsCardItemImg").css("background-image","url('"+response.data.use_image_url+"')");
                //$(myObject).closest(".goodsCardItem").attr("data-imageurl",response.data.use_image_url); //편집 화면에 변경될 이미지.
                //editPreviewSetting();

            }
            //callback(true);
        },
        error: function (error) {
            console.log("error:", error);
            callback(false);
        }
    });
}



function clipMagicEditor(object){

    var clipmagic_id = object.attr("clipmagic_id");
    var product_image_seq = object.attr("data-imageseq");
    var clipmagic_secret = object.attr("clipmagic_secret");
    console.log(clipmagic_id);
    console.log(clipmagic_secret);
    /*
    ClippingMagic.edit({
        "image" : {
            "id" : clipmagic_id,
            "secret" : clipmagic_secret
        },
        "useStickySettings" : false,
        "locale" : "en-US"
    }, function(){

    });
*/

     let modify_url = "https://clippingmagic.com/images/"+clipmagic_id+"/edit/"+clipmagic_secret;
     window.open(modify_url);
}



function clipMagicDownload(item,client_id,product_id){
    var clipmagic_id = item.attr("clipmagic_id");
    var product_image_seq = item.attr("data-imageseq");

    console.log("clipmagic_id",clipmagic_id);
    console.log("product_img_seq",product_image_seq);

    const paramMap = {
        'client_id': client_id,
        'clipmagic_id': clipmagic_id,
        'product_image_seq': product_image_seq,
        'product_id': product_id
    }
    $.ajax({
        type: "GET",
        dataType: "json",
        data: paramMap,
        url: `${denma_api_url}/product/downLoadImage`,
        success: function (response) {
            console.log("clipMagicDownload response",response);
            if(response.code =="99"){
                alert("아직 작업중 입니다.");
                return;
            }
            if(response.code =="00"){
                //이미지 modify 경로에 넣어 주기
                //updateClipMagicImg(product_seq,modify_image_url,clipmagic_id,clipmagic_secret)
                var clipmagic_id = response.id;
                var clipmagic_secret = response.secret;
                var modify_image =  response.img;
                updateClipMagicImg(product_image_seq,modify_image,clipmagic_id,clipmagic_secret,function () {
                    console.log("download callback");
                });
            }
            /*
            {"image":{"id":96298121,"secret":"mkh2qjnqro08lkj24dlcuffqho0m7c7nl83eef72i89j0duhu6mn","resultRevision":0,"originalFilename":"image","test":true}}
             */
        },
        error: function (error) {
            console.log("error:", error);
        }
    });
}


function myCallback(opts) {
    // TODO: Replace this with your own functionality
    switch (opts.event) {
        case "error":
            alert("An error occurred: " + opts.error.status + ", " + opts.error.code + ", " + opts.error.message);
            break;

        case "result-generated":
            alert("Generated a result for " + opts.image.id + ", " + opts.image.secret);
            break;

        case "editor-exit":
            alert("The editor dialog closed");
            break;
    }
}
var errorsArray = ClippingMagic.initialize({apiId: 6646});
if (errorsArray.length > 0) alert("Sorry, your browser is missing some required features: \n\n " + errorsArray.join("\n "));