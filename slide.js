 var sli_show=1;
 function slide_trangchu(){
     var number_class_sli= document.getElementsByClassName("sli");

     for(var i=0;i<number_class_sli.length;i++){
        number_class_sli[i].style.display='none';
    }
    number_class_sli[sli_show-1].style.display='block';
    sli_show++;
    
    if(sli_show==number_class_sli.length+1){
        sli_show=1;
    }
    setTimeout(slide_trangchu,9000);
 }
 slide_trangchu();
  function slide_chitiet_combo() {
    var number_class_sli= document.getElementsByClassName("sli");
    
    for(var i=0;i<number_class_sli.length;i++){
      number_class_sli[i].innerHTML=" <div class='thongtin_slide'>"+
                                   " <div class='content_price_sli'>"+
                                    " <h2>Combo banh kieng </h2>"+
                                     "<h3>Total:299k</h3>"+
                                    " <input type='button' value='Details'>"+
                                    " </div>"+
                                    "</div>";
   }

  }

  slide_chitiet_combo();