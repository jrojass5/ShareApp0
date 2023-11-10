window.onload=function(){
    verAutenticacion();
    firebase.auth().onAuthStateChanged(res=>{
    seeadmin();
    });
}
// Declara la variable `db`.
const db = firebase.firestore();
async function countAdminUsers(db) {
    // Consulta la colección "Usuarios" y devuelve todos los documentos.
    const query = db.collection("Usuarios").where("roll", "==", "admin");
    const resultado = await query.get();
    // Cuenta el número de documentos devueltos.
    const numeroUsuarios = resultado.docs.length;
    // Crea un array con la información de los usuarios.
    const usuariosAdmin = [];
    // Itera sobre los documentos devueltos.
    resultado.docs.forEach((doc) => {
      // Agrega el documento al array.
    usuariosAdmin.push({
        id: doc.id,
        displayName: doc.data().displayName,
        descripcion: doc.data().descripcion,
        photoURL: doc.data().photoURL,
});
    });
    return usuariosAdmin;
} 
// Define the getUserById() function.
async function getUserById(db, userId) {
    // Get the user document.
    const doc = await db.collection("Usuarios").doc(userId).get();
    // Check if the document exists.
    if (!doc.exists) {
      return null;
    }
    // Get the user data.
    const userData = doc.data();
  
    return userData;
}






async function seeadminoriginal() {
    const usuario = {};
    const db = firebase.firestore();
    // Get the number of admin users.
    const usuariosAdmin = await countAdminUsers(db);
    // If there are no admin users, don't do anything.
    if (usuariosAdmin.length > 0) {
        document.getElementById("Shops").style.display = "flex";
        for (let i = 0; i < usuariosAdmin.length; i++){
        const Shops= document.querySelector('#Shops'); 
        const ShopsItem = document.createElement('a');
        ShopsItem.classList.add('Shop');
        ShopsItem.setAttribute('href', '/user/Seeshop.html');
        Shops.appendChild(ShopsItem);
    // Get the ID of the first admin user.
    const userId = usuariosAdmin[i].id;
    // Get the user data.
    const userInfo = await getUserById(db, userId);
    // Assign the user properties.
    usuario.id = userId;
    usuario.displayName = userInfo.displayName;
    usuario.descripcion = userInfo.descripcion;
    usuario.photoURL = userInfo.photoURL;
    //console.log( usuario.id);
    const imgicon = document.createElement('img');
    imgicon.classList.add('icon');
    imgicon.src = usuario.photoURL;
    ShopsItem.appendChild(imgicon);
    const descripcion = document.createElement('h6');
    descripcion.classList.add('description');
    descripcion.textContent = usuario.descripcion;
    ShopsItem.appendChild(descripcion);
    const seeshop = document.createElement('p');
                seeshop.classList.add('Seeshop');
                seeshop.textContent = 'See shop​';
                ShopsItem.appendChild(seeshop)   
    }
}
}
async function seeadmin() {
    const usuario = {};
    const db = firebase.firestore();
  
    // Get the number of admin users.
    const usuariosAdmin = await countAdminUsers(db);
  
    // If there are no admin users, don't do anything.
    if (usuariosAdmin.length > 0) {
      document.getElementById("Shops").style.display = "flex";
  
      for (let i = 0; i < usuariosAdmin.length; i++) {
        const Shops = document.querySelector("#Shops");
        const ShopsItem = document.createElement("a");
        ShopsItem.classList.add("Shop");
        ShopsItem.setAttribute("href", `/user/Seeshop.html?userId=${usuariosAdmin[i].id}`);
        Shops.appendChild(ShopsItem);
  
        // Get the user ID.
        const userId = usuariosAdmin[i].id;
  
        // Get the user data.
        const userInfo = await getUserById(db, userId);
  
        // Assign the user properties.
        usuario.id = userId;
        usuario.displayName = userInfo.displayName;
        usuario.descripcion = userInfo.descripcion;
        usuario.photoURL = userInfo.photoURL;
  
        // Create the shop item elements.
        const displayname = document.createElement("h6");
        displayname.classList.add("displayname");
        displayname.textContent = usuario.displayName;
        ShopsItem.appendChild(displayname);

        const imgicon = document.createElement("img");
        imgicon.classList.add("icon");
        imgicon.src = usuario.photoURL;
        ShopsItem.appendChild(imgicon);

        const descripcion = document.createElement("h6");
        descripcion.classList.add("description");
        descripcion.textContent = usuario.descripcion;
        ShopsItem.appendChild(descripcion);
  
        const seeshop = document.createElement("p");
        seeshop.classList.add("Seeshop");
        seeshop.textContent = "See shop​";
        ShopsItem.appendChild(seeshop);
      }
    }
  }
  