const xhttp = new XMLHttpRequest();
xhttp.onload = function() {
var jsonResponse = JSON.parse(xhttp.response);
var hiddenval = jsonResponse.data.product_info.product_id;
$("body").append(
   "<form name='form' method='post' enctype='multipart/form-data'>"+
   "<h1 style='font-size:40px;margin:20px 100% 0 0;width:85%'>Create Review</h1>"+
   "<div class='merge'><img id='img'src='"+jsonResponse.data.product_info.image+"' width='300px' height='300px'>"+
   "<p id='name' name='name' style='padding-top:120px;width:350px;'>"+jsonResponse.data.product_info.name+"</p></div>"+
   " <div class='rateYo2'><div id='rateYo2'></div></div>"+
   "<h1 style='font-size:33px;margin:60px 100% 20px 0;width:84%'>add the photo</h1>"+
   "<div class='fatherphoto'><div class='photo'><label for='firstimg'><i class='fa fa-camera' style='margin-top:70px;font-size:78px;color:rgb(211, 210, 210);cursor: pointer;'></i>"+
   "<p style='width:130px;color:#80aaff;cursor: pointer;'>Browse to find or drag image here</p>"+
   "<input type='file' name='file' id='firstimg' class='inputimg' accept='image/*' style='display: none;' multiple></label>"+
   "</div><div>"+
   "<h1 style='font-size:33px;margin:60px 0 0 0;width:97%'>Your review about the product</h1>"+
   "<div>"+
   "<div class='hidden2' id='textarea'><textarea onkeyup='fun(this)' class='hidden1' id='textareaa'"+
   "placeholder='What did you like or dislike? what did you use this product for?' rows='6' cols='40'></textarea>"+
   "<p style='font-size:23px;margin-top:30px;opacity:0.5;'><span id='points'>15</span> word/s left to get 25 points</p>"+
   "</div>"+
   "<input onclick='runpost()' onclick='uploadFile()' type='button' class='button' value='Submit Review'>"+
   "<input id='hidden' type='hidden' value='"+hiddenval+"'>"+
   "</form>"
)
$("#rateYo2").rateYo({
numStars:5,
ratedFill: "#ff3399",
starWidth: "83px",
spacing: "25px",   
fullStar: true
});       
}
xhttp.open("GET","https://test.dumyah.com/api/v1/reviews?product_id="+sessionStorage.getItem("product_id")+"");
xhttp.send();

function runpost()
{
var productid= document.getElementById('hidden').value;
var rateYo = $("#rateYo2").rateYo();
var ratingval = rateYo.rateYo("rating");
var textarea= document.getElementById('textareaa').value;

var number = parseInt(ratingval);

// var formData = new FormData();
// var files = $('#firstimg')[0].files[0];
// if(files.length > 0 ){
// formData.append('files',files);
// }


// document.cookie="d-token=b926a516a76e825cd69b0975153b60e6a935479d5dfe42d3380a0b5f0d4fafda"; 

// Cookies.set("d-token", "b926a516a76e825cd69b0975153b60e6a935479d5dfe42d3380a0b5f0d4fafda",{ expires : 6});
// var myCookie = Cookies.get("d-token")

$.ajax({
type:"POST",
url:"https://test.dumyah.com/api/v1/review",
data:{
      product_id: productid,
      rating: number,
      review_textarea: textarea,
      //  files:formData,
      //  contentType: false,
      //  processData: false, 
      },
headers:{
      token:'491a6df9e65af0b0e9e410178cc147c51f6d602da7d1626ead554b0e817b52c9'
      }, 
    });
}
function fun(val) {
var myArray = val.value.split(" ");
var len=0;
for(i=0;i < myArray.length;i++ ){
   if(myArray[i] == ""){
    len = len;
   }else{
    len = len + 1;
   }
   if (len > 15){
    len = 15;
    $('#points').text(15 - (len));
   }else{
    $('#points').text(15 - (len));
   }

 }

};

