function imgcard(e) {
    var file = e.files[0];
    var reader = new FileReader();
    reader.onloadend = function() {
        if (!file.type.match("image.*")) {
            alert("Solo se pueden subir imágenes.");
            return;
        }

        document.getElementById("idimgcard").src = reader.result;
    };
    reader.readAsDataURL(file);
}
function cerrarPopup() {
}
function guardarcard() {
    var user = firebase.auth().currentUser;
    var nombre= document.getElementById("idnombre").value;
    var Productprice= document.getElementById("idProductprice").value;
    var Drescription= document.getElementById("idDrescription").value;
    var DateofExpiry= document.getElementById("idDateofExpiry").value;
    var img = document.getElementById("fileImagecard").files[0];
    if (user) {
        // Crea la ruta completa con la carpeta "UserAdmin", el nombre de usuario y "fronpage"
        var ref = firebase.storage().ref("UserAdmin/" + user.displayName + "/Cards/"+img.name);
        var subImg = ref.put(img);
        subImg.on("state_changed", () => {}, (err) => {alert(err);}, () => {
            subImg.snapshot.ref.getDownloadURL().then(url => {
                // Puedes hacer algo con la URL de la imagen aquí si es necesario
                alert("Se subieron los datos correctamente");
                // Asegúrate de definir la función cerrarPopup si no está definida.
                cerrarPopup(); 
                // Obtener el ID del documento del usuario actual
                const userUid = user.uid;
                // Obtener el nombre de la imagen
                const imgName = img.name;
                // Obtener el documento existente
                const doc = firebase.firestore().collection("Usuarios").doc(userUid).collection("Cards").doc(nombre);
                // Actualizar el documento existente con la nueva URL de la imagen
                if (doc.exists) {
                    doc.update({
                        Productprice:Productprice,
                        Drescription:Drescription,
                        DateofExpiry:DateofExpiry,
                        url: url,
                    });
                    
                } else {
                    // Crear un nuevo documento si no existe
                    doc.set({
                        Productprice:Productprice,
                        Drescription:Drescription,
                        DateofExpiry:DateofExpiry,
                        url: url,
                    });
                }
                
            }).catch(err => {
               
                alert(err);
            });
        });
        
    } else {
        alert("Debes iniciar sesión.");
    }
  
}
function verificarcards() {
    // Obtener el ID del usuario actual
    const userUid = firebase.auth().currentUser.uid;
    // Obtener una referencia a la colección "Frontpage" del usuario actual
    const collectionRef = firebase.firestore().collection("Usuarios").doc(userUid).collection("Cards");
    // Crear un oyente para escuchar cambios en la colección
    collectionRef.onSnapshot((snapshot) => {
        // Si la colección tiene documentos, establecer el estado del elemento "holamundo" en "block"
        if (snapshot.size > 0) {
            document.getElementById("bodyCards").style.display = "block";
                // Obtener el número de documentos
                const Ndocuments = snapshot.size;
                // Crear un div para los demás documentos
                let cardsDiv = document.createElement('div');
                cardsDiv.classList.add('cards');
                document.getElementById('bodyCards').appendChild(cardsDiv);
                // Mantener un índice de documento actual
                let currentDocumentIndex = 0;
                // Crear un bucle para iterar sobre los documentos
                for (let i = 0; i < Ndocuments; i++) {
                    if (currentDocumentIndex < 5) {
                        // Procesar el documento actual en el div existente
                        const imgurl = snapshot.docs[i].data().url;
                        const Productpric = snapshot.docs[i].data().Productprice;
                        const Drescriptio = snapshot.docs[i].data().Drescription;
                        const DateofExpir = snapshot.docs[i].data().DateofExpiry;
                        
                        const card = document.createElement('div');
                        card.classList.add('card');
                        cardsDiv.appendChild(card);
                        const img = document.createElement('img');
                        img.classList.add('card-img-top');
                        img.src = imgurl;
                        card.appendChild(img);
                        const docs = snapshot.docs[i];
                        const imgrl  = docs.data().url;                       
                        const imgRef = firebase.storage().refFromURL(imgrl);
                        const ionicon=document.createElement('ion-icon');
                        ionicon.classList.add('favorite');
                        ionicon.setAttribute('name', 'trash');
                        ionicon.addEventListener('click',()=>{
                            imgRef.delete().then(() => {
                                // Eliminar el documento de la colección después de eliminar la imagen de Cloud Storage
                                collectionRef.doc(docs.id).delete();
                                alert("ha sido eliminado exitosamente.");
                            }).catch(err => {
                                alert(err);
                            });
                        })
                        card.appendChild(ionicon);
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
                        h6.textContent = DateofExpir;
                        cardinfo.appendChild(h6);
                        
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
                       //}else{}    
             }
});
}