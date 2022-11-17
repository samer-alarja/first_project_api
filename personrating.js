$.ajax({
    type:'GET',
    url:'https://test.dumyah.com/api/v1/review/purchases-list',
    headers:{
        token: '82e8931d5d723a4a505ac73a7e84ff77b2e0983cd36c8bf02404c6b8006b87a0'
           },
success: function (response) {
    JSON.stringify(response)
   
for (var i = 0; i < response.data.purchases_list.length ; i++){
     var hiddenval = response.data.purchases_list[i].product_id;
    $("body").append(
      "<div id='merge"+i+"' class='merge'><img id='img'src='"+response.data.purchases_list[i].image+"' width='250px' height='250px'>"+
      "<p id='name' name='name' style='padding-top:80px'>"+response.data.purchases_list[i].name+"</p></div>"+
      " <a onclick='functionn("+i+")' class='rateYo2'><div id='rateYo2"+i+"'></div></a>"+
      "<input id='hiddden"+i+"' type='hidden' value='"+hiddenval+"'>"+
      "<div class='d-flex justify-content-center'><a onclick='funnctionbutton("+i+")'><input type='button' id='buttonhide"+i+"' class='button' value='Submit Review' ></div></a><hr id='hrhide"+i+"' width='50%' style='margin-top: 60px;'>"
    )
    $("#rateYo2"+i+"").rateYo({
           numStars:5,
           ratedFill:"#ff3399",
           starWidth:"83px",
           spacing:"25px",   
           fullStar:true
    });  
    $("#rateYo2"+i+"").rateYo().on("rateyo.set", function (e, data) {
      sessionStorage.removeItem('datarating');
      sessionStorage.setItem("datarating", data.rating);
    })
   }
 },
});
function funnctionbutton(i){
    var vari = document.getElementById('hiddden'+i+'').value;
    sessionStorage.removeItem('product_id'); 
    sessionStorage.setItem("product_id", vari);
    window.location.href = "formpage.html";
}
function functionn(i){
    var datarating = sessionStorage.getItem("datarating");
    var productidd = document.getElementById('hiddden'+i+'').value;
    $.ajax({
        type:"POST",
        url:"https://test.dumyah.com/api/v1/review",
        data:{
            rating_flag:1,
            product_id:productidd,
            rating:datarating,
            },
        headers:{
            token:'82e8931d5d723a4a505ac73a7e84ff77b2e0983cd36c8bf02404c6b8006b87a0'
            }, 
        });
$('#merge'+i+'').hide();
$('#rateYo2'+i+'').hide();
$('#buttonhide'+i+'').hide();
$('#hrhide'+i+'').hide();
alert("You have rated the product")
}
   