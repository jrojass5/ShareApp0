window.onload=function(){
    verAutenticacion();
    firebase.auth().onAuthStateChanged(res=>{
        verificarFrontpage();
        RemovefrontPage();
    });
}
function imgfronpage(e) {
    var file = e.files[0];
    var reader = new FileReader();
    reader.onloadend = function() {
        if (!file.type.match("image.*")) {
            alert("Solo se pueden subir imágenes.");
            return;
        }

        document.getElementById("idimgFronpage").src = reader.result;
    };
    reader.readAsDataURL(file);
}
function guardarfrontpage() {
    var img = document.getElementById("fileimgFrontpage").files[0];
    var user = firebase.auth().currentUser;
    if (user) {
        // Crea la ruta completa con la carpeta "UserAdmin", el nombre de usuario y "fronpage"
        var ref = firebase.storage().ref("UserAdmin/" + user.displayName + "/Frontpage/" + img.name);
        var subImg = ref.put(img);
        subImg.on("state_changed", () => {}, (err) => {
            alert(err);
        }, () => {
            subImg.snapshot.ref.getDownloadURL().then(url => {
                // Puedes hacer algo con la URL de la imagen aquí si es necesario
                alert("Se subió la imagen de la página principal correctamente");
                cerrarPopup(); // Asegúrate de definir la función cerrarPopup si no está definida.
                // Obtener el ID del documento del usuario actual
                const userUid = user.uid;
                // Obtener el nombre de la imagen
                const imgName = img.name;
                // Obtener el documento existente
                const doc = firebase.firestore().collection("Usuarios").doc(userUid).collection("Frontpage").doc(imgName);
                // Actualizar el documento existente con la nueva URL de la imagen
                if (doc.exists) {
                    doc.update({
                        url: url
                    });
                    
                } else {
                    // Crear un nuevo documento si no existe
                    doc.set({
                        url: url
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
function cerrarPopup() {
    // Código para cerrar tu cuadro modal o realizar otras acciones al cerrar.
    console.log("Popup cerrado");
}
function verificarFrontpage() {
    // Obtener el ID del usuario actual
    const userUid = firebase.auth().currentUser.uid;
    // Obtener una referencia a la colección "Frontpage" del usuario actual
    const collectionRef = firebase.firestore().collection("Usuarios").doc(userUid).collection("Frontpage");

    // Crear un oyente para escuchar cambios en la colección
    collectionRef.onSnapshot((snapshot) => {
        // Si la colección tiene documentos, establecer el estado del elemento "holamundo" en "block"
        if (snapshot.size > 0) {
            document.getElementById("carruselExampleIndicators").style.display = "block";
//__________________________________________________________________________________________________________  
                        // Obtener el elemento de indicadores del carrusel
                        const carouselIndicators = document.querySelector('.carousel-indicators');
                        // Crear un nuevo botón de indicador
                        const indicatorButton = document.createElement('button');
                        // Establecer los atributos del botón de indicador
                        indicatorButton.type = 'button';
                        indicatorButton.dataset.bsTarget = '#carruselExampleIndicators';
                        indicatorButton.dataset.bsSlideTo = '0';
                        indicatorButton.classList.add('active', 'carousel-indicator', 'aria-current');
                        indicatorButton.setAttribute('aria-label', 'Diapositiva 1');
                        // Agregar el botón de indicador al elemento de indicadores del carrusel
                        carouselIndicators.appendChild(indicatorButton);
//____________________________________________________________________________________________________________
               // Obtener el primer documento de la colección
               const doc = snapshot.docs[0];
               // Obtener la URL de la imagen
               const imgUrl = doc.data().url
                        // Obtener el elemento `carousel-inner`
                        const carouselInner = document.querySelector('.carousel-inner');
                        // Crear un nuevo elemento `carousel-item`
                        const carouselItem = document.createElement('div');
                        // Establecer los atributos del elemento `carousel-item`
                        carouselItem.classList.add('carousel-item', 'active');
                        // Crear un nuevo elemento `img`
                        const img = document.createElement('img');
                        // Establecer los atributos del elemento `img`
                        img.src =imgUrl; // La URL de la imagen
                        img.classList.add('d-block', 'w-100');
                        // Agregar el elemento `img` al elemento `carousel-item`
                        carouselItem.appendChild(img);
                        // Agregar el elemento `carousel-item` al elemento `carousel-inner`
                        carouselInner.appendChild(carouselItem);
                        if (snapshot.size > 1) {
                            document.getElementById("carousel-control-prev").style.display = "block";
                            document.getElementById("carousel-control-next").style.display = "block";
                            //_________________________________________________________________________________________________
                            // Obtener el número de imágenes
                            const numImages = snapshot.size;
                            // Crear un bucle para iterar sobre las imágenes
                            for (let i = 2; i <= numImages; i++) {
                                // Obtener la URL de la imagen
                                const imgUrl = snapshot.docs[i - 1].data().url;
                                // Crear un botón de indicador
                                const button = document.createElement('button');
                                button.type = 'button';
                                button.dataset.bsTarget = '#carruselExampleIndicators';
                                button.dataset.bsSlideTo = i-1;
                                button.classList.add('carousel-indicator', 'aria-current');
                                button.setAttribute('aria-label', 'Diapositiva ' + i);
                                // Agregar el botón de indicador al elemento de indicadores del carrusel
                                carouselIndicators.appendChild(button);
                                // Crear un elemento `carousel-item`
                                const carouselItem = document.createElement('div');
                                carouselItem.classList.add('carousel-item');
                                // Crear un nuevo elemento `img`
                                const img = document.createElement('img');
                                img.src = imgUrl; // La URL de la imagen
                                img.classList.add('d-block', 'w-100');
                                // Agregar el elemento `img` al elemento `carousel-item`
                                carouselItem.appendChild(img);
                                // Agregar el elemento `carousel-item` al elemento `carousel-inner`
                                carouselInner.appendChild(carouselItem);
                            }             
                        }
            else{
            }
            
        } else {
            // Si la colección no tiene documentos, establecer el estado del elemento "holamundo" en "none"
            document.getElementById("carruselExampleIndicators").style.display = "none";
        }
    });
}
function RemovefrontPage() {
    // Obtener el ID del usuario actual
    const userUid = firebase.auth().currentUser.uid;
    // Obtener una referencia a la colección "Frontpage" del usuario actual
    const collectionRef = firebase.firestore().collection("Usuarios").doc(userUid).collection("Frontpage");
    // Crear un oyente para escuchar cambios en la colección
    collectionRef.onSnapshot((snapshot) => {
        if (snapshot.size > 0) {
            document.getElementById("Button Delete frontpage").style.display = "block";
            const numImages = snapshot.size;
            for (let i = 1; i <= numImages; i++) {
            // Obtener el primer documento de la colección
            const docu = snapshot.docs[i - 1];
            const imagurl = docu.data().url;
            const imgUrl  = docu.data().url;
            const imgRef = firebase.storage().refFromURL(imgUrl);
            const  modalBody = document.querySelector('#modal-body-RemovefrontPage');
            const bodyItem = document.createElement('div');
            bodyItem.classList.add('RemovefrontPage');
            const Img = document.createElement('img');
            Img.classList.add('img');
            Img.src = imagurl;
            const ionicon=document.createElement('ion-icon');
            ionicon.classList.add('ion-icon');
            ionicon.setAttribute('name', 'trash');
            ionicon.addEventListener('click',()=>{
                imgRef.delete().then(() => {
                    // Eliminar el documento de la colección después de eliminar la imagen de Cloud Storage
                    collectionRef.doc(docu.id).delete();
                    alert("ha sido eliminado exitosamente.");
                }).catch(err => {
                    alert(err);
                });
            });
            bodyItem.appendChild(Img);
            bodyItem.appendChild(ionicon);
            modalBody.appendChild(bodyItem);    
            }
        }else{
            document.getElementById("Button Delete frontpage").style.display = "none";
        }
    });
}


