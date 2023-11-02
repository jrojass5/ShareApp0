window.onload=function(){
    verAutenticacion();
    firebase.auth().onAuthStateChanged(res=>{
        cargarPerfil();
    });
}
function cambiarFoto(archivo){
    var file= archivo.files[0];
    var reader=new FileReader();
    reader.onloadend=function(){
        //Dentro de aca
        document.getElementById("imgFoto").src= reader.result;
    }
    reader.readAsDataURL(file);
  //
}
function EditarPerfil(){
    //Es normal (firestore)
   var displayName= document.getElementById("txtDisplayName").value;
   var nombre= document.getElementById("txtnombre").value;
   var apellido= document.getElementById("txtapellido").value;
   var email= document.getElementById("txtemail").value;
   var descripcion= document.getElementById("txtdescripcion").value;
   var phoneNumber=document.getElementById("txtphoneNumber").value;
   //Una insercion especial
   var foto= document.getElementById("imgFoto").src;
   
    firebase.firestore().collection("Usuarios").doc(user).update({
        displayName:displayName,
        nombre:nombre,
        apellido:apellido,
        email:email,
        descripcion:descripcion,
        phoneNumber:phoneNumber,
    }).then(res=>{
        var objFoto=document.getElementById("foto");
        //La ruta del archivo seleccionado
        var foto=objFoto.value;
        //Halla elegido un archivo
        if(foto!=null && foto!=""){
        
            var ref= firebase.storage().ref("UserAdmin/"+displayName+"/"+"Photo icon"+objFoto.name);
            var archivo= objFoto.files[0];
            var refFoto=   ref.put(archivo);
            refFoto.on("state_changed",()=>{},(err)=>{alert(err)},()=>{

                refFoto.snapshot.ref.getDownloadURL().then(url=>{
                    firebase.firestore().collection("Usuarios").doc(user).update({
                        photoURL:url
                    }).then(respuesta=>{
                        alert("Se actualizo correctamente");
                    }).catch(err=>{
                        alert(err);
                    })
                });
            });
        }
        //si es que no elegio nada
        else{
            alert("Se edito correctamente");
        }
    })
    
    .catch(err=>{
        alert(err);
    })
}
var user;
function cargarPerfil(){
    user= firebase.auth().currentUser.uid;
    firebase.firestore().collection("Usuarios").doc(user).get().then(resultado=>{
        var res= resultado.data();
        document.getElementById("txtDisplayName").value= res.displayName;
        document.getElementById("txtnombre").value= res.nombre;
        document.getElementById("txtapellido").value= res.apellido;
        document.getElementById("txtemail").value= res.email;
        document.getElementById("txtdescripcion").value= res.descripcion;
        document.getElementById("imgFoto").src= res.photoURL;
    }).catch(err=>{
        alert(err);
    })
}


