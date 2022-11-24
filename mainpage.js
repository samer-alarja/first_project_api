const xhttp = new XMLHttpRequest();
xhttp.onload = function() {
var jsonResponse = JSON.parse(xhttp.response);
sessionStorage.setItem("product_id", jsonResponse.data.product_info.product_id);
$(".left").append("<div class='div-left'>"+
    "<b style='margin:0 0 10px 7px;'><span id='Customer'>Customer</span> Reviews</b><br>"+
    " <div id='rateYo2' style='float: left;margin-top:5px'></div>"+
    "<p style='float:left; margin: 6px 0 0 5px;font-size: 17px;'>"+jsonResponse.data.average_product_rating.reviews_avg+" out 5</p>"+
    "<br><br><p class='down' style='opacity: 0.5;font-size: 20px;'>"+jsonResponse.data.average_product_rating.num_of_reviews+" customer ratings</p>");
$("#rateYo2").rateYo({
    rating: jsonResponse.data.average_product_rating.reviews_avg,
    numStars:5,
    ratedFill: "#ff3399",
    starWidth: "30px",
    spacing: "10px",
    readOnly: true,
});
for (var i = 0 ; i < jsonResponse.data.rating_summary.length ; i++){
$(".div-left").append(""+
    "<div style='margin-top: 25px;'><p style='float: left;margin:0 7px 0 0;font-size: 21px;'>"+(jsonResponse.data.rating_summary.length-i)+" Stars </p>"+
    "<div id='rateYo1"+i+"' style='float:left;'></div>"+
    "<p style='float: left;margin:0 0 0 7px;font-size: 21px;'>"+jsonResponse.data.rating_summary[i].number_of_reviews+"  Reviews</p><br>"+
    "")
$("#rateYo1"+i+"").rateYo({
    rating: jsonResponse.data.rating_summary[i].rating,
    numStars:5,
    ratedFill: "#ff3399",
    starWidth: "30px",
    spacing: "10px",
    readOnly: true
}); 
}
if(i=jsonResponse.data.rating_summary.length){
    $(".div-left").append("<br><a href='formpage.html?id="+jsonResponse.data.product_info.product_id+"'><input type='submit' id='inputid' value='write a review' style='background-color: white;border: 1px solid black;"+
    "color: black;border-radius:15px;width:300px;height:45px;font-size: 15px;'></div></a>");
 }
 var leenn = jsonResponse.data.list_reviews.length -1;
 for (var i = 0; i < jsonResponse.data.list_reviews.length ; i++){
       var productid = jsonResponse.data.product_info.product_id;
       var name =jsonResponse.data.list_reviews[i].author;
       var date =jsonResponse.data.list_reviews[i].date_added;
       var text =jsonResponse.data.list_reviews[i].text;
       var rating=jsonResponse.data.list_reviews[i].rating;
       var verified_purchase=jsonResponse.data.list_reviews[i].verified_purchase;
       var sshow_helpful=jsonResponse.data.list_reviews[i].show_helpful;
       var helpful_count=jsonResponse.data.list_reviews[i].helpful_count;
       var reeview_id=jsonResponse.data.list_reviews[i].review_id;
      //  var image=jsonResponse.data.list_reviews[i].image;
       addcenter(i,name,date,text,rating,verified_purchase,sshow_helpful,helpful_count,reeview_id,productid,/*image*/);
       funhr(i,leenn);
 }
}
//10730 63514 4436
xhttp.open("GET","https://test.dumyah.com/api/v1/reviews?product_id=10730");
xhttp.send();
function addcenter(i,name,date,text,rating,verified_purchase,sshow_helpful,helpful_count,reeview_id,productid,/*image*/){
$(".center-append").append("<div id='append0'>"+
    "<img src='image/girl.png' width='55px' height='55px' style='border-radius: 25px;float: left;margin-top: 8px;'>"+
    "<div><b class='display"+i+" display' style='font-size: 19px;float:right;'>verified purshase</b>"+
    "<b style='font-size: 25px;margin-left: 11px;'>"+name+"</b><br>"+
    "<div id='rateYoo"+i+"' style='float: left;'></div>"+
    "<p class='float' style='margin: 1px 0 0 5px;font-size: 17px;opacity: 0.5;'>on "+date+"</p><br>"+
    "</div><b id='verified' class='verified"+i+"' style='font-size: 18px;margin: 10px 0 0 4px;'>verified purshase</b>"+
    "<p style='font-size:20px;float:left;width:100%;margin-top:30px'>"+text+"</p>"+
    "<a onclick='funimage("+i+")'><img src='image/girl.png' width='185px' height='185px' style='cursor: pointer;'></a>"+
    "</div><p style='opacity: 0.3;float: left;font-size: 20px;margin: 12px 0 10px 0;width: 100%;'>"+helpful_count+" peaple found this helpful</p>"+
    "<input id='helpfulremove"+i+""+reeview_id+"' onclick='helpremovee("+i+","+reeview_id+")' type='button' value='helpful' style='margin:0 0 20px 0;background-color: white;border: 1px solid black;color: black;border-radius:10px;width: 100px ;height: 30px;font-size: 15px;float: left;cursor: pointer;'>"+
    "<p id='helpfulshow"+i+""+reeview_id+"' style='color:green;display: none'>Thank you for your feedback.</p>"+
    "<input id='hiddden"+i+"' type='hidden' value='"+reeview_id+"'>"+
    "<input id='productid"+i+"' type='hidden' value='"+productid+"'>"+
    "<hr class='hr"+i+"' width='100%' style='margin-top: 20px;'> </div>"
)
if (sessionStorage.getItem('helpfulremove'+reeview_id+'') =="true" ){
 $('#helpfulremove'+i+''+reeview_id+'').hide();
 $('#helpfulshow'+i+''+reeview_id+'').show();
}
$("#rateYoo"+i+"").rateYo({
    rating: rating,
    numStars:5,
    ratedFill: "#ff3399",
    starWidth: "25px",
    spacing: "5px",
    readOnly: true
}); 
      
if(verified_purchase == false ){
    $(".verified"+i+"").hide();
    $(".display"+i+"").hide();
}

}
function funimage(i){
  var ccurrentPage =2;
  var product = document.getElementById('productid'+i+'').value;
  sessionStorage.removeItem('imgproduct'); 
  sessionStorage.setItem("imgproduct", product);
  sessionStorage.removeItem('ccurrentPage'); 
  sessionStorage.setItem("ccurrentPage", ccurrentPage);
  sessionStorage.removeItem('i'); 
  sessionStorage.setItem("i", i);
  window.location.href = "imagepage.html";
  }


  function helpremovee(i ,reeview_id )
  {
  $('#helpfulremove'+i+''+reeview_id+'').hide();
  $('#helpfulshow'+i+''+reeview_id+'').show();
    $.ajax({
      type:"POST",
      url:"https://test.dumyah.com/api/v1/review/helpful",
      data:{
        review_id:reeview_id,
           },
      headers:{
              token:'ce79ff3bf61223024c5b8fca6584d5916df5aa4d577470439f0633b9a6e7b103'
           },
    });
    sessionStorage.setItem('helpfulremove'+reeview_id+'',"true");
  }
function funhr(i,leenn)
{

  if (leenn == i)
  {
    // $(".hr"+leenn+"").css("opacity", "0.001");
    $(".center-append").after("<div id='linkdiv'>Load More</div>");
  }










//load more page
var currentPage = 2;
$('#linkdiv').on('click', function() {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
    var jsonResponse = JSON.parse(xhttp.response);
    currentPage++;
    var leenn = jsonResponse.data.list_reviews.length -1;
 for (var i = 0; i < jsonResponse.data.list_reviews.length ; i++){
    var name =jsonResponse.data.list_reviews[i].author;
    var date =jsonResponse.data.list_reviews[i].date_added;
    var text =jsonResponse.data.list_reviews[i].text;
    var rating=jsonResponse.data.list_reviews[i].rating;
    var verified_purchase=jsonResponse.data.list_reviews[i].verified_purchase;
    var sshow_helpful=jsonResponse.data.list_reviews[i].show_helpful;
    var helpful_count=jsonResponse.data.list_reviews[i].helpful_count;
    var reeview_id=jsonResponse.data.list_reviews[i].review_id;
    var productid = jsonResponse.data.product_info.product_id;


    addcenter(i,name,date,text,rating,verified_purchase,sshow_helpful,helpful_count,reeview_id,productid);
    fuunhr(i,leenn);
}
}
xhttp.open("GET","https://test.dumyah.com/api/v1/reviews?product_id=5078&current_page="+ currentPage +""); 
xhttp.send();
     

function addcenter(i,name,date,text,rating,verified_purchase,sshow_helpful,helpful_count,reeview_id,productid){
    $(".center-append").append("<div id='append0'>"+
       "<img src='image/girl.png' width='55px' height='55px' style='border-radius: 25px;float: left;margin-top: 8px;'>"+
       "<div><b id='display"+i+""+ currentPage +" display' style='font-size: 19px;float:right;'>verified purshase</b>"+
       "<b class='nameval"+i+""+ currentPage +"' value"+name+" style='font-size: 25px;margin-left: 11px;'>"+name+"</b><br>"+
       "<div id='rateYoo"+i+""+ currentPage +"' style='float: left;'></div>"+
       "<p class='float' style='margin: 1px 0 0 5px;font-size: 17px;opacity: 0.5;'>on "+date+"</p><br>"+
       "</div><b id='verified' class='verified"+i+""+ currentPage +"' style='font-size: 18px;margin: 10px 0 0 4px;'>verified purshase</b>"+
       "<p style='font-size:20px;float:left;width:100%;margin-top:30px'>"+text+"</p>"+
       "<a  onclick='funimagee("+i+","+currentPage+")'><img src='image/girl.png' width='185px' height='185px' style='cursor: pointer;'></a>"+
       "</div><p style='opacity: 0.3;float: left;font-size: 20px;margin: 12px 0 10px 0 ;width: 100%;'>"+helpful_count+" peaple found this helpful</p>"+
       "<input onclick='helpremove("+i+","+reeview_id+")' id='helpfulremove"+i+""+reeview_id+"' type='button' value='helpful' style='margin:0 0 20px 0;background-color: white;border: 1px solid black;color: black;border-radius:10px;width: 100px ;height: 30px;font-size: 15px;float: left;cursor: pointer;'>"+
       "<p id='helpfulshow"+i+""+reeview_id+"' style='color:green;display: none'>Thank you for your feedback.</p>"+
       "<input id='currentPage"+i+""+currentPage+"' type='hidden' value='"+currentPage+"'>"+
       "<input id='productid"+i+""+currentPage+"' type='hidden' value='"+productid+"'>"+
       "<hr class='hr"+i+""+ currentPage +"' width='100%' style='marg16573in-top: 20px;'> </div>"
      )
    if (sessionStorage.getItem('helpfulremove'+reeview_id+'') == "true"){
        $('#helpfulremove'+i+''+reeview_id+'').hide();
        $('#helpfulshow'+i+''+reeview_id+'').show();
       }
    $("#rateYoo"+i+""+ currentPage +"").rateYo({
        rating: rating,
        numStars:5,
        ratedFill: "#ff3399",
        starWidth: "25px",
        spacing: "5px",
        readOnly: true
    }); 
    if(verified_purchase == false ){
        $(".verified"+i+""+ currentPage +"").hide();
        $(".display"+i+""+ currentPage +"").hide();
    }

}

function fuunhr(i,leenn)
{

  if (leenn == i)
  {
    $( "hr" ).last().css("opacity", "0.00001");
    // $(".hr"+leenn+"").css("opacity", "0.00001");
  }
}



})
}//funtop funhr
function funimagee(i,ccurrentPage){
  var productt = document.getElementById('productid'+i+''+ccurrentPage+'').value;
  sessionStorage.removeItem('imgproduct'); 
  sessionStorage.setItem("imgproduct", productt);
  sessionStorage.removeItem('ccurrentPage'); 
  sessionStorage.setItem("ccurrentPage", ccurrentPage);
  sessionStorage.removeItem('i'); 
  sessionStorage.setItem("i", i);
  window.location.href = "imagepage.html";
}

function helpremove(i,reeview_id )
{
$('#helpfulremove'+i+''+reeview_id+'').hide();
$('#helpfulshow'+i+''+reeview_id+'').show();
  $.ajax({
    type:"POST",
    url:"https://test.dumyah.com/api/v1/review/helpful",
    data:{
      review_id:reeview_id,
         },
    headers:{
            token:'ce79ff3bf61223024c5b8fca6584d5916df5aa4d577470439f0633b9a6e7b103'
         },
  });
  sessionStorage.setItem('helpfulremove'+reeview_id+'',"true");
}

