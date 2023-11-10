
//------optener user id--------------------------------------------------------------------------------
const userId = window.location.search.substring(1).split("=")[1];


//para FrontPage---------------------------------------------------------------------------------------
const collectionRef = firebase.firestore().collection("Usuarios").doc(userId).collection("Frontpage");
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


//para cards-------------------------------------------------------------------------------------------
const collectionRefC = firebase.firestore().collection("Usuarios").doc(userId).collection("Cards");
// Crear un oyente para escuchar cambios en la colección
collectionRefC.onSnapshot((snapshot) => {
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

                    const heartIcon = document.createElement('ion-icon');
                    heartIcon.classList.add('favorite');
                    heartIcon.name = 'heart-outline';
                    heartIcon.id = 'Favorite'+i;
                    card.appendChild(heartIcon);

// Add event listener for the heart icon
heartIcon.addEventListener('click', function () {
    let isHeart = false;
    if (heartIcon.name === 'heart-outline') {
        heartIcon.setAttribute('name', 'heart');
        heartIcon.style.color = 'red';
        isHeart = true;
    } else {
        heartIcon.setAttribute('name', 'heart-outline');
        heartIcon.style.color = '';
        isHeart = false;
    }
    // Store the heart state in local storage
    localStorage.setItem('isHeart_' + i, isHeart.toString()); // Store the heart state with a unique key for each icon
});
// Check local storage for the heart state
const storedIsHeart = localStorage.getItem('isHeart_' + i);
if (storedIsHeart === 'true') {
    heartIcon.setAttribute('name', 'heart');
    heartIcon.style.color = 'red';
}
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

                    // Botón
                    const button = document.createElement('button');
                    button.classList.add('btn', 'btn-primary');
                    button.textContent = 'Add';
                    const icon = document.createElement('ion-icon');
                    icon.name = 'cart-outline';
                    button.appendChild(icon);
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
                   //}else{}    
         }
});
