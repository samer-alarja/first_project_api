var ccurrentPage =sessionStorage.getItem('ccurrentPage')-1;
var iid = sessionStorage.getItem('i');
const xhttp = new XMLHttpRequest();
xhttp.onload = function(){
var jsonResponse = JSON.parse(xhttp.response);
$(".p").append(
   "<div class='divleft'></div><div class='divtop'></div><img class='imgprodcut' src='"+jsonResponse.data.product_info.image+"' ><div class='divright'></div><div class='divdown'></div>"+
   "<div class='divv'>"+
   "<img src='image/girl.png' width='55px' height='55px' style='border-radius: 25px;float: left;'>"+
   "<div><b class='display' style='font-size: 19px;float: right;margin-top:6px''>verified purshase</b>"+
   "<b style='font-size: 25px;margin-left: 11px;'>"+jsonResponse.data.list_reviews[iid].author+"</b><br>"+
   "<br><div style='float:left' class='rateYo2'><div id='rateYo2"+iid+"'></div></div>"+
   "<p class='float' style=' margin: 6px 0 0 15px;font-size: 17px;opacity: 0.5;'>"+jsonResponse.data.list_reviews[iid].date_added+"</p><br>"+
   "</div><b id='verified' style='font-size: 18px;margin: 10px 0 0 4px;'>verified purshase</b>"+
   "<p style='font-size:20px;float:left;margin:17px 0 25px 0;width:100%'>"+jsonResponse.data.list_reviews[iid].text+"</p>"+
   "<h1 style='font-size: 25px;width:100%;float:left'>Images in this review </h1>"+
   "<img src='image/girl.png' width='185px' height='185px'>")
$("#rateYo2"+iid+"").rateYo({
   rating: jsonResponse.data.list_reviews[iid].rating,
   numStars:5,
   ratedFill: "#ff3399",
   starWidth: "30px",
   spacing: "10px",
   readOnly: true
});  
}
xhttp.open("GET","https://test.dumyah.com/api/v1/reviews?product_id="+sessionStorage.getItem('imgproduct')+"&current_page="+ ccurrentPage +"");
xhttp.send();