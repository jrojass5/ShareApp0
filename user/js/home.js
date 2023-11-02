window.onload=function(){
    verAutenticacion();
    firebase.auth().onAuthStateChanged(res=>{
        seeadmin();
    });
}
function seeadmin(){

}