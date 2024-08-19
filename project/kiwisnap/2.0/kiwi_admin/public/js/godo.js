/**
 * cafe24 연동.
**/

class godoClass {
	constructor() {
	}


	/**
	 고도 상품 조회
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
			url : `${denma_api_url}/godo/product`,
			success : function(response) {
				console.log("response godo product : ", response);

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
			url : `${denma_api_url}/category/mall/list`,
			success : function(response) {
				console.log("response category/mall/list: ", response);
				callback(response);
			},
			error : function(error) {
				console.log("error:", error);
			}
		});
	}

}
