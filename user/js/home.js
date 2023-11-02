window.onload=function(){
    verAutenticacion();
    firebase.auth().onAuthStateChanged(res=>{
        seeadmin();
    });
}
function seeadmin(){
    const collectionRef = firebase.firestore().collection("Usuarios");
const userCount = collectionRef.docCount();
console.log(`Hay ${userCount} usuarios en la colección Usuarios.`);
}