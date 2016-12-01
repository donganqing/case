$.getJSON("js/cart.json",function(data){
			var html = "";
			for(var i = 0; i < data.length; i++){
					html += '<li><span><img src="'+data[i].img+'"></span>'
					html += '<em>￥<b>'+data[i].price+'</b></em>'
					html += '<p code="lstvs50">'+data[i].name+'</p>'
					html += '<a class = "add_cart" href="javascript:;">'+data[i].del+'</a>'
				$("ul").html(html);
			}
			$(".add_cart").click(function(){
				var oLi = $(this).parent("li");
				var name = oLi.children("p").text();
				var imgSrc = oLi.children("span").children().attr("src");
				var price = oLi.children("em").children("b").text();
				var count = 1;
				var color = "";
				var strValue = imgSrc + "&&" + name + "&&" + color + "&&" + price + "&&" + count; 
				//console.log(strValue);
				var strOld = $.cookie("cookieshopping");//从cookie中得到商品信息
				if(strOld){
					var isExist = false;
					var arrProduct = strOld.split("||");
					for(var i = 0; i < arrProduct.length; i++){
						var arrItem=arrProduct[i].split("&&");
						//判断一下 每个商品的的名字是否一样 如果一样的话 只增加数量
						if(arrItem[1]==name){
							isExist = true;
							arrItem[4] = parseInt(arrItem[4])+1;
							var newProduct=arrItem.join("&&");
							arrProduct[i]=newProduct;
							strValue = arrProduct.join("||");
							break;
						}
					}
					if(isExist){
						
					}else{
						strValue = strOld + "||" + strValue;
					}
				}
				$.cookie("cookieshopping",strValue,{expires: 100,path:"/"});//存cookie 有效期为100天
				
			})
			
		})
		