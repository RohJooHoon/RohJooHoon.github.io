/**
 * cafe24 연동.
**/

class cafe24Class {
	constructor() {

	}

	/**
	 *	cafe24 로그
	 */
	cafe24Login(cafe24_client_id, mall_id){
		var path = document.location + "";
		if(path.indexOf("?") > 0){
			path = path.substring(0, path.indexOf("?"));
		}

		location.href = `https://${mall_id}.cafe24api.com/api/v2/oauth/authorize?response_type=code&client_id=${cafe24_client_id}&state=sese&redirect_uri=${path}&scope=mall.write_product,mall.read_product,mall.read_category,mall.read_collection,mall.read_order`
	}

	/**
	 * cafe24 accesstoken
	 */
	accessToken(code, mall_id, callback){
		var param={
			code: code,
			mall_id: mall_id,
			redirectUrl: "https://service.kiwisnap.net/view/mall/mall" //다시 돌아올 url
		}

		$.ajax({
			data : param,
			url : `${denma_api_url}/cafe/auth/accessToken`,
			success : function(data) {
				console.log('accessToken', data);

				var dateObj = new Date();
				dateObj = dateAdd(dateObj, "hour", 2);

				if(data.access_token != undefined){
					if(callback != undefined){
						callback(data);
					}
				}

			},
			error : function(error) {
				console.log("error:", error);
			}
		});
	}

	/**
	 카페24 상품 조회
	 */
	product(mall_product_no, callback){
		var dataMap={
			"mall_product_no" : mall_product_no,
			"product_type" : 'VINTAGE'
		}

		$.ajax({
			type: "GET",
			crossDomain : true,
			dataType: "json",
			data : dataMap,
			url : `${denma_api_url}/cafe24/product`,
			success : function(response) {
				console.log("response cafe24 product : ", response);

				callback(response);

			},
			error : function(error) {
				console.log("error:", error);
			}
		});
	}

	/**
	 * 카테고리 조회.
	 */
	categories(callback){
		var dataMap={
			"product_type" : 'VINTAGE'
		}

		$.ajax({
			type: "GET",
			crossDomain : true,
			dataType: "json",
			data : dataMap,
			url : `${denma_api_url}/cafe24/categories`,
			success : function(response) {
				console.log("response categories: ", response);
				callback(response);
			},
			error : function(error) {
				console.log("error:", error);
			}
		});
	}

}
