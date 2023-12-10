window.onload=function(){
    verAutenticacion();
    firebase.auth().onAuthStateChanged(res=>{
    seeadmin();
    favorites();
  
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
async function seeadmin() {
  const usuario = {};
  const db = firebase.firestore();

  // Get the number of admin users.
  const usuariosAdmin = await countAdminUsers(db);

  // If there are no admin users, don't do anything.
  if (usuariosAdmin.length > 0) {
    document.getElementById("bodyShops").style.display = "block";
    let currentShopsContainer;
    
    for (let i = 0; i < usuariosAdmin.length; i++) {
      if (i % 3 === 0) {
        // Cada tercer elemento, crea un nuevo contenedor Shops
        currentShopsContainer = document.createElement("div");
        currentShopsContainer.classList.add("Shops");
        document.getElementById('bodyShops').appendChild(currentShopsContainer);
      }

      const Shops = currentShopsContainer;
      const ShopsItem = document.createElement("a");
      ShopsItem.classList.add("Shop");
      ShopsItem.setAttribute("href", `/user/Seeshop.html?=${usuariosAdmin[i].id}`);
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
const searchForm = document.getElementById('searchForm');

searchForm.addEventListener('submit', async (event) => {
  event.preventDefault(); // Prevenir el envío predeterminado del formulario

  const bodyCards = document.getElementById('bodyCards');
  while (bodyCards.firstChild) {
    bodyCards.removeChild(bodyCards.firstChild);
  }
  const searchTerm = document.getElementById('searchTermInput').value;
  if (searchTerm === '') {
    return; // Salir de la función si el campo está vacío
  }
  const db = firebase.firestore();
  const usuario = {};
  let hasMatches = false;
  const usuariosAdmin = await countAdminUsers(db);
  if (usuariosAdmin.length > 0) {
    for (let i = 0; i < usuariosAdmin.length; i++) {
        const userId = usuariosAdmin[i].id;
        const collectionRefC = firebase.firestore().collection("Usuarios").doc(userId).collection("Cards");
        collectionRefC.onSnapshot(async (snapshot) => {
         // Get the user ID.
          const userId = usuariosAdmin[i].id;
         // Get the user data.
          const userInfo = await getUserById(db, userId);
          usuario.id = userId;
          usuario.displayName = userInfo.displayName;
          usuario.photoURL = userInfo.photoURL;
          document.getElementById("bodyShops").style.display = "none";
          document.getElementById("bodyCards").style.display = "block";
          let hasCreatedCardsDiv = false;
          const Ndocuments = snapshot.size;
          let currentDocumentIndex = 0;
            for (let i = 0; i < Ndocuments; i++) {
                const imgurl = snapshot.docs[i].data().url;
                const Productpric = snapshot.docs[i].data().Productprice;
                const Drescriptio = snapshot.docs[i].data().Drescription;
                const DateofExpir = snapshot.docs[i].data().DateofExpiry;
                const idunit = snapshot.docs[i].data().idunits;
                // Realizar la verificación de búsqueda aquí
                const docName = snapshot.docs[i].id;
                if (docName.toLowerCase().includes(searchTerm.toLowerCase())) {//compara documento por documento... 
                  if (!hasCreatedCardsDiv) {
                    // Crear el div principal solo una vez
                    infoadmin=document.createElement('div')
                    infoadmin.classList.add('infoadmin')
                    document.getElementById('bodyCards').appendChild(infoadmin);
                    info=document.createElement('div')
                    info.classList.add('info')
                    infoadmin.appendChild(info);
                    const img2 = document.createElement('img');
                    img2.classList.add('card-img-admin');
                    img2.src = userInfo.photoURL;
                    info.appendChild(img2);
                    const p= document.createElement('p');
                    p.classList.add('p')
                    p.textContent = userInfo.displayName;
                    info.appendChild(p);
                    
                    cardsDiv = document.createElement('div');
                    cardsDiv.classList.add('cards');
                    infoadmin.appendChild(cardsDiv);                 
                    hasCreatedCardsDiv = true;
                  }
                  if (currentDocumentIndex < 5) {
                    // Procesar el documento actual en el div existente
                    const imgurl = snapshot.docs[i].data().url;
                    const Productpric = snapshot.docs[i].data().Productprice;
                    const Drescriptio = snapshot.docs[i].data().Drescription;
                    const DateofExpir = snapshot.docs[i].data().DateofExpiry;
                    const idunit       =snapshot.docs[i].data().idunits;
                    const cardId = snapshot.docs[i].id;
                    const card = document.createElement('div');
                    card.classList.add('card');
                    cardsDiv.appendChild(card);
                    const img = document.createElement('img');
                    img.classList.add('card-img-top');
                    img.src = imgurl;
                    card.appendChild(img);
                    const heartIcon = document.createElement('ion-icon');
                    heartIcon.classList.add('favorite');
                    heartIcon.name = 'heart-outline';
                    heartIcon.id = 'Favorite'+i;
                    card.appendChild(heartIcon);

// Obtener la información del card desde el localStorage
const storedCardInfoJSON = localStorage.getItem(cardId);
// Si hay información almacenada, restaurar el estado del corazón y cualquier otra información que desees mostrar
if (storedCardInfoJSON) {
    const storedCardInfo = JSON.parse(storedCardInfoJSON);
    // Restaurar el estado del corazón
    if (storedCardInfo.isHeart) {
        heartIcon.setAttribute('name', 'heart');
        heartIcon.style.color = 'red';
    }
    // Puedes acceder a otras propiedades del storedCardInfo para mostrar información adicional
    // Por ejemplo: storedCardInfo.Productpric, storedCardInfo.Drescriptio, etc.
    console.log(storedCardInfo.Drescriptio);
}
// Agregar un evento de clic al corazón
heartIcon.addEventListener('click', function () {
    // Cambiar el estado del corazón
    let isHeart = !storedCardInfoJSON || !JSON.parse(storedCardInfoJSON).isHeart;
    if (isHeart) {
    heartIcon.setAttribute('name', 'heart');
    heartIcon.style.color = 'red';
    var userClient=firebase.auth().currentUser.uid;
    const doc = firebase.firestore().collection("Usuarios").doc(userClient).collection("favorites").doc(docName);
    doc.set({
    imgurl: imgurl,
    Productpric: Productpric,
    Drescriptio: Drescriptio,
    DateofExpir: DateofExpir,
    idunit: idunit,
    usersupplier:userId,
    Namesupplier:userInfo.displayName,
    });
    } else {
      heartIcon.setAttribute('name', 'heart-outline');
      heartIcon.style.color = '';
      var userClient = firebase.auth().currentUser.uid;
      const doc = firebase.firestore().collection("Usuarios").doc(userClient).collection("favorites").doc(docName);
    // Eliminamos el documento de la colección "favorites"
    doc.delete().then(() => {
    }).catch((error) => {
        console.error("Error al eliminar el documento:", error);
    });
    }
  
    // Obtener la información del card
    const cardInfo = {  
      isHeart: isHeart
    };
    // Convertir el objeto a cadena JSON
    const cardInfoJSON = JSON.stringify(cardInfo);
    // Almacenar la información del card en el localStorage con una clave única para cada icono
    localStorage.setItem(cardId, cardInfoJSON);
    // Eliminar la información del localStorage si el corazón vuelve a su estado original
    if (!isHeart) {
      localStorage.removeItem(cardId);
    }
  });
                    // Info de la tarjeta
                    const cardinfo = document.createElement('div');
                    cardinfo.classList.add('card-body');
                    card.appendChild(cardinfo);

                    const h5 = document.createElement('h5');
                    h5.classList.add('card-title');
                    h5.textContent = Productpric;
                    cardinfo.appendChild(h5);

                    const p = document.createElement('p');
                    p.classList.add('card-text');
                    p.textContent = Drescriptio;
                    cardinfo.appendChild(p);

                    const h6 = document.createElement('h6');
                    h6.classList.add('h6');
                    h6.textContent = 'Units:_'+idunit+'______'+DateofExpir;
                    cardinfo.appendChild(h6);

                
                        
                    // Botón
                    const button = document.createElement('button');
                    button.classList.add('btn', 'btn-primary');
                    button.textContent = 'Add';
                    const icon = document.createElement('ion-icon');
                    icon.name = 'cart-outline';
                    button.appendChild(icon);
                   
                    // Añadir evento click al botón
button.addEventListener('click', function(event) {
  var userClient=firebase.auth().currentUser.uid;
  const doc = firebase.firestore().collection("Usuarios").doc(userClient).collection("mycarts").doc(cardId);
  doc.set({
  imgurl: imgurl,
  Productpric: Productpric,
  Drescriptio: Drescriptio,
  DateofExpir: DateofExpir,
  idunit: idunit,
  usersupplier:userId,
  Namesupplier:userInfo.displayName,
  });
  alert("Añadido al carrito: "+Drescriptio);
});
cardinfo.appendChild(button);
                    currentDocumentIndex++;
                } else {
                    // Crear un nuevo div para los demás documentos
                    cardsDiv = document.createElement('div');
                    cardsDiv.classList.add('cards');
                    document.getElementById('bodyCards').appendChild(cardsDiv);
                    currentDocumentIndex = 0;
                    i--; // Decrementar el contador para procesar el mismo documento nuevamente en el nuevo div
                }
                }
          
        }
      });
    }
  } 
});

function favorites(){
  var userClient = firebase.auth().currentUser.uid;
  const collectionRefC = firebase.firestore().collection("Usuarios").doc(userClient).collection("favorites");
  collectionRefC.onSnapshot((snapshot) => {
    if(snapshot.size > 0){
      document.getElementById("faoritesCards").style.display = "block";
      const Ncards = snapshot.size;
      
      for (let i = 0; i < Ncards; i++) {
        let cardsli = document.createElement('li');
      cardsli.classList.add('favoritecard');
      document.getElementById('dropdownmenucardsfavorites').appendChild(cardsli);
                    const imgurl = snapshot.docs[i].data().imgurl;
                    const Productpric = snapshot.docs[i].data().Productpric;
                    const Drescriptio = snapshot.docs[i].data().Drescriptio;
                    const DateofExpir = snapshot.docs[i].data().DateofExpir;
                    const idunit       =snapshot.docs[i].data().idunit;
                    const Namedmin=snapshot.docs[i].data().Namesupplier;
                    const cardId = snapshot.docs[i].id;
                    const img = document.createElement('img');
                    img.classList.add('imgcardfavorite');
                    img.src = imgurl;
                    cardsli.appendChild(img);
                    const infocard= document.createElement('div');
                    infocard.classList.add('infocard');
                    cardsli.appendChild( infocard);
                    //<p class="p">ARROZ ESTÁNDAR 2500G</p>
                    const pDescrip=document.createElement('p');
                    pDescrip.classList.add('p');
                    pDescrip.textContent=Drescriptio;
                    infocard.appendChild(pDescrip);
                    const pprecie=document.createElement('p');
                    pprecie.classList.add('p');
                    pprecie.textContent=Productpric;
                    infocard.appendChild(pprecie);
                    const padmin=document.createElement('p');
                    padmin.classList.add('p');
                    padmin.textContent=Namedmin;
                    infocard.appendChild(padmin);
                    const pDelete=document.createElement('p');
                    pDelete.classList.add('Delete');
                    pDelete.textContent='Delete';
                    pDelete.addEventListener('click', () => {
                    const doc = firebase.firestore().collection("Usuarios").doc(userClient).collection("favorites").doc(cardId);
                    // Eliminamos el documento de la colección "favorites"
                    doc.delete().then(() => {
                      localStorage.removeItem(cardId);
                      alert("Eliminaste: "+Drescriptio+ ""+"de tus favoritos");
                    }).catch((error) => {
                        console.error("Error al eliminar el documento:", error);


                    });
                  });
infocard.appendChild(pDelete);
const liElement = document.createElement('li');
const hrElement = document.createElement('hr');
hrElement.classList.add('dropdown-divider');
liElement.appendChild(hrElement);
document.getElementById('dropdownmenucardsfavorites').appendChild(liElement);
            
      }
  
    }   
  
  });
  
}



