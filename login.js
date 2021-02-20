

    function them_login_pass(hoten,user_n,pw,mail,number_phone,address){
        this.hoten=hoten;
        this.user_n=user_n;
        this.pw=pw;
        this.mail=mail;
        this.number_phone=number_phone;
        this.address=address;
        this.payment=0;// khi mới lập nick thì chưa mua đồ nên cho payment bằng 0
        this.cart='';//cho giỏ hàng của username này là chưa có gì
    }
    //xử lý login
$(document).ready(function () {
    $("#login_cuongbanhmi_form").submit(function(){
        var user_form=$("#login_user").val();
        var pw_form=$("#login_pw").val();
      //admin
        if(user_form=='admin' && pw_form=='admin'){
            
            localStorage.setItem("hoten",'admin');
            localStorage.setItem("username",'admin');
            alert("login success");
            reset_logout();
            show_name_login();
            return;
        }

        //admin
        if(localStorage.getItem('arr_login')){
        var login_pas=JSON.parse(localStorage.getItem('arr_login'));
        if(login_pas.length==0){
            alert("you need resgiter !!!!!thanks you !");
            return;
        }
        }else{
            alert("you need resgiter!!!");
            return;
        }
        var user_local;
        var pw_local;
        

        if(user_form.indexOf("'")!=-1 || user_form.indexOf('"')!=-1||pw_form.indexOf("'")!=-1 || pw_form.indexOf('"')!=-1){
            alert("Không nhập kí tự ' hay "+'"' +"vào đăng nhập!!!thanks you!!!");
        }

    for(var i=0;i<login_pas.length;i++){
      
         user_local=login_pas[i].user_n;
         pw_local=login_pas[i].pw;
        if(user_local==user_form && pw_local==pw_form){
            localStorage.setItem("hoten",login_pas[i].hoten);
            localStorage.setItem("username",login_pas[i].user_n);
            alert("login success");
            reset_logout();
           show_name_login();
           break;
        }else if(user_local==user_form){
            alert("Password or username do not match");
            break;
        }

        if(i==login_pas.length-1){
            alert("You need register for user: "+user_form);
        }
    }

    });
    //end xử lý login
    //xử lý đăng kí
    $("#dk_cuongbanhmi_form").submit(function(){
        if($("#hoten_id_dk").val() && $("#username_id_dk").val()&&$("#pw_id_dk").val()&&$("#mail_id_dk").val()&&$("#number_id_dk").val()&&$("#address_id_dk").val()){
            //hạn chế dùng string để lấy thông tin từ cơ sở dữ liệu trong sql
            if($("#hoten_id_dk").val().indexOf("'")!=-1 || $("#hoten_id_dk").val().indexOf('"')!=-1){
                alert("Không nhập kí tự ' hay "+'"' +"vào họ tên !!!thanks you!!!");
               // $("#hoten_id_dk").value='';
                return ;
            }
            if($("#username_id_dk").val().indexOf("'")!=-1 || $("#username_id_dk").val().indexOf('"')!=-1){
                alert("Không nhập kí tự ' hay "+'"' +"vào họ tên !!!thanks you!!!");
               // $("#username_id_dk").value='';
                return ;
            }

            if($("#pw_id_dk").val().indexOf("'")!=-1 || $("#pw_id_dk").val().indexOf('"')!=-1){
                alert("Không nhập kí tự ' hay "+'"' +"vào họ tên !!!thanks you!!!");
               // $("#pw_id_dk").value='';
                return ;
            }

            if($("#mail_id_dk").val().indexOf("'")!=-1 || $("#mail_id_dk").val().indexOf('"')!=-1){
                alert("Không nhập kí tự ' hay "+'"' +"vào họ tên !!!thanks you!!!");
               // $("#mail_id_dk").value='';
                return ;
            }

            if($("#address_id_dk").val().indexOf("'")!=-1 || $("#address_id_dk").val().indexOf('"')!=-1){
                alert("Không nhập kí tự ' hay "+'"' +"vào họ tên !!!thanks you!!!");
               // $("#address_id_dk").value='';
                return ;
            }

            if($("#hoten_id_dk").val()=='admin'){
                alert("Vui lòng không đăng kí hoten là 'admin'!!!");
                return;
            }
            if($("#username_id_dk").val()=='admin'){
                alert("Vui lòng không đăng kí username là 'admin'!!!");
                return;
            }
            var thongtin=new them_login_pass($("#hoten_id_dk").val(),$("#username_id_dk").val(),$("#pw_id_dk").val(),$("#mail_id_dk").val(),$("#number_id_dk").val(),$("#address_id_dk").val());
            
            if(localStorage.getItem('arr_login')){
                var login_pas=JSON.parse(localStorage.getItem('arr_login'));
                for(var i=0;i<login_pas.length;i++){
                    if(login_pas[i].user_n==thongtin.user_n){//kiểm tra và thông báo nếu trùng tên đăng nhập
                        alert("User exist . You need resgiter with other username...! ");
                        return ;
                    }
                }
                login_pas.push(thongtin);
                localStorage.setItem('arr_login',JSON.stringify(login_pas));//cập nhật lại mảng
                
            }else{
                var array_first_resgiter=[];
                array_first_resgiter.push(thongtin);
                localStorage.setItem('arr_login',JSON.stringify(array_first_resgiter));
                
            }
            localStorage.setItem('hoten',thongtin.hoten);
            localStorage.setItem("username",thongtin.user_n);
            alert("save imformation success!");
            reset_logout();
            show_name_login();
        }else{
            alert("vui lòng điền đầy đủ thông tin!");
        }
    });
});
    //end xử lý đăng kí
    //khi logout==0 thì có nghĩa là nameuser đang hiển thị 
function logout_name(){
    localStorage.setItem('logout',1);
    document.getElementById('quanly_thongtin_admin').style.display="none";// ẩn quyền quản lý của admin
    document.getElementById('name_savelogin').innerHTML= "<a onclick='show_sign()'>LOG_IN</a>";
}
function reset_logout(){
    localStorage.setItem('logout',0);
}
function show_name_login(){
    if(localStorage.getItem('hoten')&& localStorage.getItem('logout')==0){
        
        var button_logout="<button onclick='logout_name()' style='cursor:pointer;margin-left:10px; border:0.5px solid rgb(163, 192, 245); color:rgb(163, 192, 245);'>logout</button>";
        document.getElementById('name_savelogin').innerHTML=localStorage.getItem('hoten')+button_logout;
        if(localStorage.getItem('hoten')=='admin'){
            document.getElementById('quanly_thongtin_admin').style.display="block";//nếu đăng nhập bằng admin thì hiện cho quản lý thông tin người dùng
        }else{
            document.getElementById('quanly_thongtin_admin').style.display="none";
        }
    }
}
show_name_login();

