var user_login=[];
    //open and close page quan ly
    function open_admin_user_inf_div(){
        var array_inf=JSON.parse(localStorage.getItem('arr_login'));
        if(document.getElementById("thong_tin_login").style.display=="block"){
            document.getElementById("thong_tin_login").style.display="none";
        }else{
            document.getElementById("thong_tin_login").style.display="block";
            if(array_inf.length==0){
                alert("Don't username!!!");
                row_n.innerHTML="Don't have User_name!!!"
            }
        }
        
    }

    //delete button function xóa dữ liệu username localStore
    function delete_inf(index){
        var array_inf=JSON.parse(localStorage.getItem('arr_login'));
        var id_table_body=document.getElementById("body_table_information");
        
        while(id_table_body.rows.length>0){
            id_table_body.deleteRow(0);
          }   

        for(var i=0;i<array_inf.length;i++){
            if(index==i){
                for(var j=i;j<array_inf.length-1;j++){
                    array_inf[j].hoten=array_inf[j+1].hoten;
                    array_inf[j].user_n=array_inf[j+1].user_n;
                    array_inf[j].pw=array_inf[j+1].pw;
                    array_inf[j].mail=array_inf[j+1].mail;
                    array_inf[j].number_phone=array_inf[j+1].number_phone;
                    array_inf[j].address=array_inf[j+1].address;
                    array_inf[j].payment=array_inf[j+1].payment;
                }
            }
        }
        array_inf.length--;
        localStorage.setItem('arr_login',JSON.stringify(array_inf));
        alert("delete success!!");
        var row_update=document.getElementById("update_inf_table");
        while(row_update.rows.length>0){
            row_update.deleteRow(0);//xóa bảng thông tin cần update khi xóa (vì có thể xóa object đối tượng đang chuẩn bị update thì giá trị index sẽ bị ảnh hưởng )
        }

         show_inf_admin();
    }
    //end delete button function 


    //save thông tin khi update
    function save_update(index){
        var array_inf=JSON.parse(localStorage.getItem('arr_login'));
        for(var  i=0;i<array_inf.length;i++){
            if(index==i){//lưu thông tin từ các input update vào mảng
                if(document.getElementById('update_hoten').value){
                    array_inf[i].hoten=document.getElementById('update_hoten').value;
                }
                if(document.getElementById('update_username').value){
                    array_inf[i].user_n=document.getElementById('update_username').value;
                }
                if(document.getElementById('update_pw').value){
                    array_inf[i].pw=document.getElementById('update_pw').value;
                }
                if(document.getElementById('update_mail').value){
                    array_inf[i].mail=document.getElementById('update_mail').value;
                }
                if(document.getElementById('update_phone').value){
                    array_inf[i].number_phone=document.getElementById('update_phone').value;
                }
                if(document.getElementById('update_address').value){
                    array_inf[i].address=document.getElementById('update_address').value;
                }
                if(document.getElementById('update_payment').value){
                    array_inf[i].payment=document.getElementById('update_payment').value;
                }
                alert(" update success!!");
                break;
            }
        }

        localStorage.setItem('arr_login',JSON.stringify(array_inf));//đưa lên lại lên localStore
        show_inf_admin();
      

    }
    //end save function
    function exit_update(){
        var row_update=document.getElementById("update_inf_table");
        while(row_update.rows.length>0){
            row_update.deleteRow(0);
        }
    }
    //update value
    function update_inf(index){
        
        var array_inf=JSON.parse(localStorage.getItem('arr_login'));
        var row_update=document.getElementById("update_inf_table");
        for(var i=0;i<array_inf.length;i++){
            if(i==index){
                while(row_update.rows.length>0){
                    row_update.deleteRow(0);
                }
                //them các input để update giá trị
                var row_n=row_update.insertRow(0);
                var cell_a=row_n.insertCell(0);
                var cell_s=row_n.insertCell(1);
                var cell_d=row_n.insertCell(2);
                var cell_f=row_n.insertCell(3);
                var cell_g=row_n.insertCell(4);
                var cell_h=row_n.insertCell(5);
                var cell_price=row_n.insertCell(6);
                var cell_add=row_n.insertCell(7);
                var cell_exit=row_n.insertCell(8);

                cell_a.innerHTML="<input type='text' id='update_hoten'>";
                cell_s.innerHTML="<input type='text' id='update_username'>";
                cell_d.innerHTML="<input type='text' id='update_pw'>";
                cell_f.innerHTML="<input type='email' id='update_mail'>";
                cell_g.innerHTML="<input type='number' id='update_phone'>";
                cell_h.innerHTML="<input type='text' id='update_address'>";
                cell_price.innerHTML="<input type='number' id='update_payment'>";
                cell_add.innerHTML="<input type='button' value='Update' onclick=save_update("+i+")>";
                cell_exit.innerHTML="<input type='button' value='Exit' onclick=exit_update("+i+")>";//xóa các hàng trong phần update
              //end thêm các input trống

              //hiển thị thông tin cần update
                var row_add=row_update.insertRow(0);
                var cell_0=row_add.insertCell(0);
                var cell_1=row_add.insertCell(1);
                var cell_2=row_add.insertCell(2);
                var cell_3=row_add.insertCell(3);
                var cell_4=row_add.insertCell(4);
                var cell_5=row_add.insertCell(5);
                var cell_6=row_add.insertCell(6);

                cell_0.innerText=array_inf[i].hoten;
                cell_1.innerText=array_inf[i].user_n;
                cell_2.innerText=array_inf[i].pw;
                cell_3.innerText=array_inf[i].mail;
                cell_4.innerText=array_inf[i].number_phone;
                cell_5.innerText=array_inf[i].address;
                cell_6.innerText=array_inf[i].payment;
               //end hiển thị thông tin cần update
               break;
            }
        }
    }
    //end update value 


var button_tang=0;
var button_giam=0;
var loc_ten='';
var loca_user='';
function function_inc_price(){
    button_tang=1;
    button_giam=0;
    show_inf_admin();
}

function function_dec_price() {
    button_giam=1;
    button_tang=0;
    show_inf_admin();
}
    //show thong tin login
    function show_inf_admin(){
        var array_inf=JSON.parse(localStorage.getItem("arr_login"));

        for(var i=0;i<array_inf.length;i++){
            add_in_user(array_inf[i].user_n,i);//vị trí các user trên localStore và array_inf sau khi sắp xếp
        }

        if(button_giam==1){
            var tg={};
                for(var i = 0; i < array_inf.length-1; i++){
                    for(var j = i + 1; j < array_inf.length; j++){
                        if(parseInt(array_inf[i].payment) > parseInt(array_inf[j].payment)){
                    
                            tg = array_inf[i];
                            array_inf[i] = array_inf[j];//sắp xếp tăng dần
                            array_inf[j] = tg;        
                        }
                    }
                }
        }else if(button_tang==1){
            var tg={};
            for(var i = 0; i < array_inf.length-1; i++){
                for(var j = i + 1; j < array_inf.length; j++){
                    if(parseInt(array_inf[i].payment) < parseInt(array_inf[j].payment)){
                
                        tg = array_inf[i];
                        array_inf[i] = array_inf[j];// sắp xếp giảm dần
                        array_inf[j] = tg;        
                    }
                }
            }
        }

        var id_table_body=document.getElementById("body_table_information");
        while(id_table_body.rows.length>0){
            id_table_body.deleteRow(0);
        }

        for(var i=0;i<array_inf.length;i++){
            if(array_inf[i].user_n.toLocaleLowerCase().indexOf(document.getElementById('username_loc').value.toLocaleLowerCase())!=-1){
                var row_n=id_table_body.insertRow(0);//thêm hàng cho table
                var cell_0=row_n.insertCell(0);
                var cell_1=row_n.insertCell(1);
                var cell_2=row_n.insertCell(2);
                var cell_3=row_n.insertCell(3);
                var cell_4=row_n.insertCell(4);
                var cell_5=row_n.insertCell(5);
                var cell_6=row_n.insertCell(6);
                var cell_update=row_n.insertCell(7);
                var cell_del=row_n.insertCell(8);

                cell_0.innerText=array_inf[i].hoten;
                cell_1.innerText=array_inf[i].user_n;
                cell_2.innerText=array_inf[i].pw;
                cell_3.innerText=array_inf[i].mail;
                cell_4.innerText=array_inf[i].number_phone;
                cell_5.innerText=array_inf[i].address;
                cell_6.innerText=array_inf[i].payment;
               
                for(var j=0;j<user_login.length;j++){
                    if(array_inf[i].user_n==user_login[j].user_n){
                        cell_update.innerHTML="<input type='button' value='Update' onclick='update_inf("+user_login[j].update_del+")'>";//user_login[j].update_del (chỉ số vị trí user tren localStore) đc xem như id phân biệt thông tin trong mảng 1 cách dễ dàng
                        cell_del.innerHTML="<input type='button' value='Delete' onclick='delete_inf("+user_login[j].update_del+")'>";// user_login[j].update_del (chỉ số vị trí user tren localStore) đc xem như id phân biệt thông tin trong mảng 1 cách dễ dàng
                    }
                }
            }    
        }
    }
   show_inf_admin();
    //end show thong tin

    function add_in_user(user_name,i){
        var temp={};
        temp.user_n=user_name;
        temp.update_del=i;//hệ số giúp đồng bộ array_inf và localStore sau khi giải thuật sắp xếp thực hiện
        user_login.push(temp);
        
    }