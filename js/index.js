
window.onload=function(){
    verAutenticacion();
}
function iniciarSesion(){
    var email=document.getElementById("txtcorreoIngresar").value;
    var password=document.getElementById("txtcontraIngresar").value;
    firebase.auth().signInWithEmailAndPassword(email,password).then(res=>{

        const user = firebase.auth().currentUser;
        firebase.firestore().collection("Usuarios").doc(user.uid).get().then(doc => {
        const role = doc.data().roll;
        // Redirigir al usuario
        if (role === "admin") {
            document.location.href = "/Admin/Admin.html";
        } else {
            document.location.href = "/user/home.html";
        }
        }); 
        //IMAGEN
        if(res.user.photoURL!=null){
            document.getElementById("imgFotoUsuario").src=res.user.photoURL;
        }else{
            document.getElementById("imgFotoUsuario").src="https://firebasestorage.googleapis.com/v0/b/shareapp-60048.appspot.com/o/img%2FNoPhoto.png?alt=media&token=78808cbe-73a9-406a-b6fb-1be3a0b1075d&_gl=1*1uo5jd0*_ga*NjY2Nzc1NDgwLjE2OTQ1NjEzMTU.*_ga_CW55HF8NVT*MTY5ODEyNDIyMy40Ni4xLjE2OTgxMjQ1MzQuNDIuMC4w";
        }

    }).catch(err=>{
        document.getElementById("alertErrorLogueo").style.display="block";
        document.getElementById("alertErrorLogueo").innerHTML=err;
    });
}
function abrirModalRegistro(){
    document.getElementById("alertaErrorRegistro").style.display="none";
    document.getElementById("alertaErrorRegistro").innerHTML="";
}
function authGoogle(){
    const providerGoogle= new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(providerGoogle).then(res=>{
        //saco todo el objeto
        var user= res.user;

        return firebase.firestore().collection("Usuarios").doc(user.uid)
        .get().then(el=>{

            var inf= el.data();
            //Es su primera vez
            if(inf==null || inf==undefined){
                //Insercion
                return firebase.firestore().collection("Usuarios").doc(user.uid).set({
                    nombre: res.additionalUserInfo.profile.given_name,
                    apellido:  res.additionalUserInfo.profile.family_name,
                    email:user.email,
                    displayName: user.displayName,
                    photoURL:user.photoURL,
                    provider:res.additionalUserInfo.providerId,
                    phoneNumber: user.phoneNumber==null ? "": user.phoneNumber,
                    descripcion: user.descripcion==null?"":user.descripcion,
                    roll:"user",
                }).then(respuesta=>{
                    document.location.href="/user/home.html";
                }).catch(err=>{
                    alert("Ocurrio un error al registrarlo en base de datos");
                })

                //Ya existe (no registro bd el usuario)
            }else{
                const user = firebase.auth().currentUser;
                firebase.firestore().collection("Usuarios").doc(user.uid).get().then(doc => {
                const role = doc.data().roll;

                // Redirigir al usuario
                if (role === "admin") {
                    document.location.href = "/Admin/Admin.html";
                } else {
                    document.location.href = "/user/home.html";
                }
                });

            }

        })


        //console.log(res);
   
    }).catch(err=>{
        alert(err);
    });

}
function authGithub(){
    const providerGithub= new firebase.auth.GithubAuthProvider();
    firebase.auth().signInWithPopup(providerGithub).then(res=>{
        var usuario= res.user;
        return firebase.firestore().collection("Usuarios").doc(usuario.uid)
        .get().then(el=>{
              var inf=  el.data();
              //Primera vez y no existe en base de datos
              if(inf==null || inf==undefined){
                    var userName= res.additionalUserInfo.username;
                    return firebase.firestore().collection("Usuarios").doc(usuario.uid)
                    .set({
                        nombre:"",
                        apellido:"",
                        email:usuario.email,
                        displayName:userName,
                        photoURL:usuario.photoURL,
                        provider:res.additionalUserInfo.providerId,
                        phoneNumber: user.phoneNumber==null ?"": user.phoneNumber,
                        descripcion: user.descripcion==null?"":user.descripcion,
                        roll:"user",
                    }).then(res=>{
                        document.location.href="/user/home.html";
                    }).catch(err=>{
                        alert(err);
                    })
              }else{
                const user = firebase.auth().currentUser;
                firebase.firestore().collection("Usuarios").doc(user.uid).get().then(doc => {
                const role = doc.data().roll;

                // Redirigir al usuario
                if (role === "admin") {
                    document.location.href = "/Admin/Admin.html";
                } else {
                    document.location.href = "/user/home.html";
                }
                });
              }
        })

      
    }).catch(err=>{
        alert(err);
    });


}
function authMicrosoft(){
    var providerMicrosoft = new firebase.auth.OAuthProvider('microsoft.com');
    firebase.auth().signInWithPopup(providerMicrosoft).then(res=>{
        //saco todo el objeto
        var user= res.user;
        return firebase.firestore().collection("Usuarios").doc(user.uid)
        .get().then(el=>{
            var inf= el.data();
            //Es su primera vez
            if(inf==null || inf==undefined){
                //Insercion
                return firebase.firestore().collection("Usuarios").doc(user.uid).set({
                    email:user.email,
                    displayName: user.displayName,
                    photoURL:user.photoURL,
                    provider:res.additionalUserInfo.providerId,
                    phoneNumber: user.phoneNumber==null ? "":user.phoneNumber,
                   descripcion: user.descripcion==null?"":user.descripcion,
                   roll:"user",
                }).then(respuesta=>{
                    document.location.href="/user/home.html";
                }).catch(err=>{
                    alert("Ocurrio un error al registrarlo en base de datos");
                })

                //Ya existe (no registro bd el usuario)
            }else{
                const user = firebase.auth().currentUser;
                firebase.firestore().collection("Usuarios").doc(user.uid).get().then(doc => {
                const role = doc.data().roll;

                // Redirigir al usuario
                if (role === "admin") {
                    document.location.href = "/Admin/Admin.html";
                } else {
                    document.location.href = "/user/home.html";
                }
                });
            }

        })


        //console.log(res);
   
    }).catch(err=>{
        alert(err);
    });
}
function createUser(){
    var displayName=document.getElementById("txtDisplayName").value;
    var email=document.getElementById("txtcorreo").value;
    var password=document.getElementById("txtcontra").value;
    if(displayName==""){
        document.getElementById("alertaErrorRegistro").style.display="block";
        document.getElementById("alertaErrorRegistro").innerHTML="Debe ingresar un display Name";
        return;
    }
    firebase.auth().createUserWithEmailAndPassword(email,password)
      .then(res=>{

        var usuario= res.user;
         return res.user.updateProfile({
              displayName:displayName
          }).then(profile=>{
            alert("Se registro correctamente");
            document.getElementById("btnCancelar").click();
            firebase.auth().signOut();

               //Guardo informacion en base de datos
          return firebase.firestore().collection("Usuarios").doc(usuario.uid)
          .set({
              nombre:"",
              apellido:"",
              email:email,
              displayName:usuario.displayName,
              photoURL:usuario.photoURL,
              provider:res.additionalUserInfo.providerId,
              phoneNumber:usuario.phoneNumber==null?"":usuario.phoneNumber,
              descripcion:usuario.descripcion==null?"":usuario.descripcion,
              roll:"user"
          }).then(res=>{
              document.location.href="/";
          }).catch(err=>{
              alert(err);
          })
          }).catch(err=>{
              alert(err);
          })
      }).catch(err=>{
            alert(err);
      });
}
function LimpiarDatos(){
    //class Limpiar
    var controles= document.getElementsByClassName("limpiar");
    var ncontroles= controles.length;
    for(var i=0;i<ncontroles;i++){
      controles[i].value="";
    }
  }