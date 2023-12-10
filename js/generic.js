const firebaseConfig = {
  apiKey: "AIzaSyD6aWPrJwzu0-Uo7vbFRq3cYsoEWywEQzU",
  authDomain: "shareapp-60048.firebaseapp.com",
  databaseURL: "https://shareapp-60048-default-rtdb.firebaseio.com",
  projectId: "shareapp-60048",
  storageBucket: "shareapp-60048.appspot.com",
  messagingSenderId: "704194173131",
  appId: "1:704194173131:web:b0917fb9049c67ab17234e",
  measurementId: "G-YG1EWKR08G"
};
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
// Ejecutar la función verAutenticacion() cuando la página se carga
window.onload = verAutenticacion;
function verAutenticacion(){
      firebase.auth().onAuthStateChanged(res=>{
          if( document.getElementById(""));
              firebase.firestore().collection("Usuarios").doc(res.uid).get().then(resultado=>{
              var res= resultado.data();
              if(res.displayName!=null){
                document.getElementById("lblNombreUsuario").innerHTML="¡Welcome! "+res.displayName;
              }else{
                document.getElementById("lblNombreUsuario").innerHTML="¡Welcome! "+res.email;
              }if(res.displayName!=null){
                document.getElementById("lblNombreUsuario2").innerHTML="¡Welcome! "+res.displayName;
              }else{
                document.getElementById("lblNombreUsuario2").innerHTML="¡Welcome! "+res.email;
              }
              if(res.photoURL!=null){
                document.getElementById("imgFotoUsuario").src=res.photoURL;
              }else{
                document.getElementById("imgFotoUsuario").src="https://firebasestorage.googleapis.com/v0/b/shareapp-60048.appspot.com/o/img%2FNoPhoto.png?alt=media&token=78808cbe-73a9-406a-b6fb-1be3a0b1075d&_gl=1*1uo5jd0*_ga*NjY2Nzc1NDgwLjE2OTQ1NjEzMTU.*_ga_CW55HF8NVT*MTY5ODEyNDIyMy40Ni4xLjE2OTgxMjQ1MzQuNDIuMC4w";
              } if(res.photoURL!=null){
                document.getElementById("imgFotoUsuario2").src=res.photoURL;
              }else{
                document.getElementById("imgFotoUsuario2").src="https://firebasestorage.googleapis.com/v0/b/shareapp-60048.appspot.com/o/img%2FNoPhoto.png?alt=media&token=78808cbe-73a9-406a-b6fb-1be3a0b1075d&_gl=1*1uo5jd0*_ga*NjY2Nzc1NDgwLjE2OTQ1NjEzMTU.*_ga_CW55HF8NVT*MTY5ODEyNDIyMy40Ni4xLjE2OTgxMjQ1MzQuNDIuMC4w";
              }          
            });
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
  function Salir(){
    firebase.auth().signOut().then(res=>{
      document.location.href="/";
    }).catch(err=>{
      alert(err);
    })
  }