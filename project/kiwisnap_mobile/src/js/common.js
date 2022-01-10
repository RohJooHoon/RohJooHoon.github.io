import axios from "axios";
import AWS from "aws-sdk";

/* AWS S3 */
const bucketName = 'nextdop';
const bucketRegion = 'ap-northeast-2';
const IdentityPoolId = 'ap-northeast-2:7bac1f23-f1be-435c-887b-db3889ab1e13';

AWS.config.update({
    region: bucketRegion,
    credentials: new AWS.CognitoIdentityCredentials({
        IdentityPoolId: IdentityPoolId
    })
});

const s3 = new AWS.S3({
    apiVersion: '2006-03-01',
    params: {Bucket: bucketName}
});
/* //AWS S3 */

const script = {
    /** 오늘 날짜 **/
    getTimeStamp: function () {
        const newDate = new Date();
        const fullYear = newDate.getFullYear();
        const month = newDate.getMonth();
        const date = newDate.getDate();
        const hours = newDate.getHours();
        const minutes = newDate.getMinutes();
        const seconds = newDate.getSeconds();
        let time =
            leadingZeros(fullYear, 4) +
            leadingZeros(month + 1, 2) +
            leadingZeros(date, 2) +
            leadingZeros(hours, 2) +
            leadingZeros(minutes, 2) +
            leadingZeros(seconds, 2);
        return time;
        function leadingZeros(n, digits) {
            let zero = '';
            n = n.toString();
            if (n.length < digits) {
                for (let i = 0; i < digits - n.length; i++)
                    zero += '0';
            }
            return zero + n;
        }
    },

    /** 랜덤값 출력 **/
    getRandomStr: function (len) {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < len; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }

        return text;
    },

    /** 확장자에 따른 contentType **/
    getContentType: function (ext) {
        ext = ext.toLowerCase();
        if (ext == 'jpg' || ext == 'jpeg') {
            return 'image/jpeg';
        } else if (ext == 'png' || ext.indexOf('png') >= 0) {
            return 'image/png';
        } else if (ext == 'gif' || ext.indexOf('gif') >= 0) {
            return 'image/gif';
        } else if (ext == 'mp4' || ext.indexOf('mp4') >= 0) {
            return 'video/mp4';
        } else if (ext == 'mov' || ext.indexOf('mov') >= 0) {
            return 'video/mov';
        } else {
            return '';
        }
    },

    /** axios 요청 **/
    callAxios: function (type, option) {
        let parameter = {
            method: type,
            url: `https://devapi.kiwisnap.net${option.url}`,
            data: option.data,
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            }
        }
        for (let headersKey in option.headers) {
            parameter.headers.headerKey = option.headers[headersKey];
        }
        axios(parameter)
        .then(result => {
            if (option.result) {
                option.result(result);
            }
            return result;
        }).catch(err => {
            if (option.err) {
                option.err(err);
            }
            return err;
        });
    },

    /** 바디 스크롤 최상단으로 **/
    scrollTop: function () {
        document.getElementsByClassName('bodyContainer')[0].scrollTo(0,0);
    },

    /** s3 이미지 업로드 **/
    /*
    file : file
    url : s3 경로 = `vddm/certification/` 뒤에는 파일명 알아서 삽입
    index : 순서 = 0
    */
    s3upload: function (file, url, index) {
        const options = {queueSize: 1};
        console.log("s3upload file : ", file);
        const fileTypeSplit = file.type.split('/');
        let fileExt =  fileTypeSplit[fileTypeSplit.length - 1].toLowerCase();
        let ext = script.getContentType(fileExt);
        let fileName = script.getTimeStamp() + '_' + script.getRandomStr(3) + '.' + fileExt;
        let params = {
            Key: url + fileName,
            Body: file,
            Bucket: bucketName,
            ACL: 'public-read',
            ContentType: ext,
            Metadata: ext.indexOf("png") >= 0 ? {'path':'ks-modify'} : null //png 일경우 리사이징 할때 필요한 파라미터
        };
        s3.upload(params, options).on('httpUploadProgress', function (evt) {
            console.log((evt.loaded / evt.total) * 100);
            console.log("func evt : ", evt);
            console.log("func params : ", params);
            console.log("func options : ", options);
        }).send(function (err, uploadData) {
            console.log("send file : ", file);
            console.log("send options : ", options);
            console.log("send params : ", params);

            console.log("test uploadData : ", uploadData);
            console.log("test err : ", err);
            if (!err) {
                uploadData.fileName = file.name;
                return {
                    param: params,
                    uploadData: uploadData,
                    fileExt: fileExt,
                    index: index ? index : 0,
                };
            } else {
                return err;
            }
        });
    },
}

export default script;