var menu1=0;
var menu2=0;
var menu3=0;
var menu4=0;
var menu5=0;
var shoppingCart=[];



var t=0;
function open_sublist(index){
   if(t==0){ for(let i=1;i<=5;i++){
       
        document.getElementById("list"+i).style.display='none';
    }
    t++;
}
   var x= document.getElementById("list"+index);


   if(x.style.display=='none'){
       x.style.display='block';
  
   }else{
       x.style.display='none';
       
   }
}


function open_sublist_header(index){//open menu khi reposive 17/12/2020 1:18Am cuongtsmbe
    for(let i=1;i<=5;i++){
       
        document.getElementById("list"+i+"_menu").style.display='none';
    }

   var x= document.getElementById("list"+index+"_menu");


   if(x.style.display=='none'){
       x.style.display='block';
   }else{
       x.style.display='none';  
   }
}


function show_menu_reposive(){

  if(document.getElementById('menu_res').style.display=='block'){
    document.getElementById('menu_res').style.display='none';
  }else{
    document.getElementById('menu_res').style.display='block';
  }
}

//button back to top
//var button=documnet.getElementById("btt"); không dùng đc

window.onscroll = function(){scrollFunction()};

function scrollFunction(){
    
  
  if (document.body.scrollTop>20||document.documentElement.scrollTop>20) {
    
    document.getElementById("btt").style.display = "block";

  } else {
  
    document.getElementById("btt").style.display = "none";
  
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

//update price cho user khi click vào nút payment
function update_price(total_price){
  var array_inf=JSON.parse(localStorage.getItem('arr_login'));
  var user_up_price=localStorage.getItem('username');
  var log_out=localStorage.getItem('logout');
  if(user_up_price=='admin'){
    alert("admin can't pay!!!");
    return;
  }

  if(log_out==0){
    for(var i=0;i<array_inf.length;i++){
      if(array_inf[i].user_n==user_up_price){
        array_inf[i].payment=total_price;
      }
    }

    localStorage.setItem('arr_login',JSON.stringify(array_inf));
    alert("Save payment success!!");
  }else{
    alert("you need login to payment!.thanks you!")
  }
}
//end update price
//cart show_close

function show_close_cart(){

  if(document.getElementById("cart_baoquanh").style.display=="block"){
    document.getElementById("cart_baoquanh").style.display="none";
  }else{
    document.getElementById("cart_baoquanh").style.display="block";
  }
}

function localToArray(){
  var arr_local=JSON.parse(localStorage.getItem('arr_login'));
  var user_name=localStorage.getItem('username');
  var logout=localStorage.getItem('logout');
  if(logout==0){
   
    //lưu giỏ hàng vào cart trong localStore
    if(shoppingCart.length!=0 ){//nếu khi mới login thì trong shoppingCart không có gì cả nên phải cập nhật từ localStore về 
      for(var i=0;i<arr_local.length;i++){
        if(user_name==arr_local[i].user_n){
          arr_local[i].cart=shoppingCart;//copy từ  object shoppingcart đến cart localStore
         localStorage.setItem('arr_login',JSON.stringify(arr_local));
        // alert("cap nhat vao localStore success.")
        }
      }
    }
    //end lưu 

      //đưa thông tin của giỏ hàng từ localStore vào mảng shoppingCart để show
    shoppingCart=[];
      for(var i=0;i<arr_local.length;i++){
      if(user_name==arr_local[i].user_n){
        var temp_length_arr=arr_local[i].cart.length;
         for(var j=0;j<temp_length_arr;j++){
           if( arr_local[i].cart[j]!=null ){
              var add_element={};
              add_element.linksrc=arr_local[i].cart[j].linksrc;
              add_element.title=arr_local[i].cart[j].title;
              add_element.price=arr_local[i].cart[j].price;
              add_element.id_td=arr_local[i].cart[j].id_td;
              add_element.quanlity=arr_local[i].cart[j].quanlity;//so luong
              shoppingCart.push(add_element); //push dữ liệu từ mảng obj cart trên localStore vào shoppingCart
              
             
           }
         }     
      }
    }
   }
}
//end localToArray() function


var index_id_input=0;//id_input_number;
function display_cart(){
  localToArray();//chuyển dữ liệu cart từ localStore về shoppingCart và ngược lại
  var id_bodyTable=document.getElementById("add_list");
 //khi mới khởi động trang thì các chức nằng deleteRow .. inserRow không hoạt động ..(phải click chuột gọi hàm mới có hiệu quả chứ tự gọi hàm cx sẽ không thể chạy )
    while(id_bodyTable.rows.length>0){
      id_bodyTable.deleteRow(0); 
    }
    if(shoppingCart.length==0){
      document.getElementById("total_fo_price").innerHTML="...";//chỉ là xóa đi giá trị tiền trong footer khi shoppingCart==0
      return;
    }
  for(var product in shoppingCart){
    var x=document.getElementById("add_list");
    var rowy=x.insertRow(0);

    // rowy.setAttribute("id",1000+index_id_input); them id cho tr
    var cellx=rowy.insertCell(0);
    var celly=rowy.insertCell(1);
    var cellz=rowy.insertCell(2);
    var cell_number=rowy.insertCell(3);
    var cell_del=rowy.insertCell(4);
    var create_button="<div style='display:flex;flex-direction:row;'><button onclick='dec_value("+index_id_input+','+shoppingCart[product].id_td+")' class='but_dec_css' >-</button>"+"<input type='number' value='"+shoppingCart[product].quanlity+"' class='input_value_number' id='"+index_id_input+"'/>"+"<button class='but_inc_css'  onclick='inc_value("+index_id_input+','+shoppingCart[product].id_td+")'>+</button>";
    var del_button="<button  class='but_del_css' onclick='deleteRow("+shoppingCart[product].id_td+")'>Del</button></div>";
  //add img

    var img_create=document.createElement("IMG");
    img_create.setAttribute("src",shoppingCart[product].linksrc);
    img_create.setAttribute("width","70px");
    img_create.setAttribute("height","70px");
    
    cellx.appendChild(img_create);//add img in cart

    celly.innerText=shoppingCart[product].title;
    cellz.innerHTML=shoppingCart[product].price;
    
    cell_number.innerHTML=create_button;
    cell_del.innerHTML=del_button;
    index_id_input++;
  }
  var total_price=0;
  
  for(var i in shoppingCart){
    total_price+=(parseInt(shoppingCart[i].price)*parseInt(shoppingCart[i].quanlity));
   
  }
 
  var fo=document.getElementById("total_fo_price");//total_price
  fo.innerHTML="<b>Sum-price: "+total_price+" vnd</b>"+"<input type='button' value='Payment' onclick='update_price("+total_price+")' style='margin-left:10px;'>";
  
  document.getElementById('money_card').innerHTML=total_price;
  
}

  display_cart();//khi mở trình duyệt thì tự chạy

function add_to_cart(linksrc_add,title_add,price_add,id_td_del){
  var exist=0;
  for(var not_exist in shoppingCart){
    if(shoppingCart[not_exist].id_td==id_td_del){
      alert("products already in the cart!! you can go into the cart to change the number of products!!")
      exist=1; 
    }
  }
  if(exist==0){
  var add_element={};
  add_element.linksrc=linksrc_add;
  add_element.title=title_add;
  add_element.price=price_add;
  add_element.id_td=id_td_del;
  add_element.quanlity=1;//so luong
  shoppingCart.push(add_element);
   display_cart();
  }
}



function dec_value(id_input,id_object){
 var value_temp=parseInt(document.getElementById(id_input).value);
 if(document.getElementById(id_input).value>0){
  value_temp--;
  document.getElementById(id_input).value=value_temp;
  
 }

 for(var product in shoppingCart){
   if(shoppingCart[product].id_td==id_object){
     shoppingCart[product].quanlity=value_temp;
    
   }
 }
 display_cart();
}
function inc_value(id_input,id_object){
  var value_temp=parseInt(document.getElementById(id_input).value);
  value_temp++;
  document.getElementById(id_input).value=value_temp;
  for(var product in shoppingCart){
    if(shoppingCart[product].id_td==id_object){
      shoppingCart[product].quanlity=value_temp;
      
    }
  }
  display_cart();
}



//id dc thêm từ html sau đó lưu vào object shoppingCart cho chạy hết shoppingCart cái nào mà trùng id thì delete sau đó chạy lại display_cart

function deleteRow(a)
{
  for(var product in shoppingCart){
   if(shoppingCart[product].id_td==a){
     delete shoppingCart[product];
   }
  }

  display_cart();
}
//sign_show close open window log-in 
 
function show_sign(){

    // var temp_log_in=document.getElementById("sign_show1");

    if(document.getElementById("sign_show1").style.display=="flex"){
      document.getElementById("sign_show1").style.display="none";
    
    }else{
      document.getElementById("sign_show1").style.display="flex";
    }

}



//  mở trang sản phẩm 1 2 3 4 

function open_trang(index){
  //document.getElementsByClassName('so'+(index+4)).style.background ="rgb(163, 192, 245)"; khog dc thì thay thẳng vào html
  for(var i=1;i<5;i++){//1->i->leng trang+1
    document.getElementById("trang_"+i).style.display="none";
  }
  document.getElementById("trang_"+index).style.display="block";


}

function open_search(){
 
  // var temp_log_in=document.getElementById("search_1");
  if(document.getElementById("search_1").style.display=="block"){
    document.getElementById("search_1").style.display="none";
  }else{
    document.getElementById("search_1").style.display="block";
  }
}

function show_dk_form(){

  if(document.getElementById("dk").style.display=="block"){
    document.getElementById("dk").style.display="none";
    document.getElementById("log_in_show").style.display="block";
  }else{
  document.getElementById("dk").style.display="block";
  document.getElementById("log_in_show").style.display="none";
  }
 
}

function show_sign_cancer(){
//mục đích: khi show_sign_cancer thì hộp login sẽ open và dk close 
  document.getElementById("dk").style.display="none";
  document.getElementById("log_in_show").style.display="block";
  if(document.getElementById("sign_show1").style.display=="flex"){
    document.getElementById("sign_show1").style.display="none";
  
  }else{
    document.getElementById("sign_show1").style.display="flex";
  }
}
//thêm thoong tin cho thẻ div id=thexem


var thongtin_sp=[];
//save thong tin object sp

function add_thongtin(){

  document.getElementById("id_the_img").innerHTML='';//delete nội dung thẻ div 
  var create_img=document.createElement("IMG");
  create_img.setAttribute('src',thongtin_sp.link_img);
  create_img.setAttribute('height','300px');
  create_img.setAttribute('width','300px');
  document.getElementById("id_the_img").appendChild(create_img);
  //thêm img
  document.getElementById("the_name").innerHTML=thongtin_sp.title_name;//thêm title cho sp
  document.getElementById("body_thanhphan").innerText=thongtin_sp.thanh_phan;//thêm thành phần cho sp

  document.getElementById("button_id_thongtin").innerHTML="<div class='div_button_buy'><a class='button_buy' onclick="+'"'+"add_to_cart("+"'"+thongtin_sp.link_img +"','"+ thongtin_sp.title_name +"','"+ thongtin_sp.price +"',"+thongtin_sp.id_del +")"+'"'+'>Add cart</a></div>';
  //chú ý đến các dấu ' và "" phù hợp với onclick (xem bằng code trong chorme)
  //thêm thông tin vào các thẻ div
}

function show_thongtin(title_n,price_c,link_i,thanh_p,id){

  if(title_n!=''){
    thongtin_sp.title_name=title_n;
  }
  if(price_c!=''){
    thongtin_sp.price=price_c;
  }
  if(link_i!=''){
    thongtin_sp.link_img=link_i;
  }
  if(thanh_p!=''){
    thongtin_sp.thanh_phan=thanh_p;
  }
  if(id!=''){
  thongtin_sp.id_del=id;
  }
  add_thongtin();
  
  if(document.getElementById("baoquanh_thexem").style.display=="flex"){
    document.getElementById("baoquanh_thexem").style.display="none";
  }else{
  document.getElementById("baoquanh_thexem").style.display="flex";
  }
}
