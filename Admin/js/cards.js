function imgcard(e){
    var file= e.files[0];
    var reader=new FileReader();
    reader.onloadend=function(){
        document.getElementById("idimgcard").src= reader.result;
    }
    reader.readAsDataURL(file);
}
