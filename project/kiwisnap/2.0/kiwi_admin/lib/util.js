module.exports = {

    isEmpty(value) {
        if (value == "" || value == null || value == undefined || (value != null && typeof value == "object" && !Object.keys(value).length)) {
            return true
        } else {
            return false
        }
    },

    /*
      async 에러 처리를 위해...
    */
    wrapAsync(fn) {
        return function(req, res, next) {
            // 모든 오류를 .catch() 처리하고 체인의 next() 미들웨어에 전달하세요
            // (이 경우에는 오류 처리기)
            fn(req, res, next).catch(next);
        };
    }

}