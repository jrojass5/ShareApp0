window.onload=function(){
    verAutenticacion();
    firebase.auth().onAuthStateChanged(res=>{
        MyCart();  
    });
}

function MyCart() {
    var userClient = firebase.auth().currentUser.uid;
    const collectionRefC = firebase.firestore().collection("Usuarios").doc(userClient).collection("mycarts");
    collectionRefC.onSnapshot((snapshot) => {
        let totalPrice = 0;
        if (snapshot.size > 0) {
      // Iterar sobre los documentos en la colección
      snapshot.forEach((doc) => {
        // Obtener el valor del campo Productpric y sumarlo a totalPrice
        const productPrice = doc.data().Productpric || 0; // Asegurarse de manejar el caso si Productpric no está definido
        totalPrice += productPrice;
    });

            let p = document.createElement('p');
            p.textContent = snapshot.size;
            document.getElementById('rigth').appendChild(p);
          
            let pt = document.createElement('p');
            pt.textContent = 'Retirar en un punto de entrega';
            document.getElementById('rigth').appendChild(pt);
            
            let ptotal = document.createElement('p');
            ptotal.classList.add('ptotal');
            ptotal.textContent = '$'+totalPrice;
            document.getElementById('total').appendChild(ptotal);
            document.getElementById("idCarts").style.display = "flex";
            const Ndocuments = snapshot.size;
              for (let i = 0; i < Ndocuments; i++) {
                let cardsli = document.createElement('li');
                cardsli.classList.add('product');
                document.getElementById('ulcarts').appendChild(cardsli);
                  const docName = snapshot.docs[i].id;
                  const imgurl = snapshot.docs[i].data().imgurl;
                  const Productpric = snapshot.docs[i].data().Productpric;
                  const Drescriptio = snapshot.docs[i].data().Drescriptio;
                  const DateofExpir = snapshot.docs[i].data().DateofExpir;
                  const idunit = snapshot.docs[i].data().idunit;
                  const img = document.createElement('img');
                  img.classList.add('img');
                  img.src = imgurl;
                  cardsli.appendChild(img);

                  const  details= document.createElement('div');
                  details.classList.add('details');
                  cardsli.appendChild( details);
                  
                  const h5=document.createElement('h5');
                  h5.classList.add('card-text');
                  h5.textContent=Drescriptio;
                  details.appendChild(h5);

                  const h = document.createElement('h5');
                  h.classList.add('h');
                  h.textContent = '$'+ Productpric;
                  details.appendChild(h);

                  const h6 = document.createElement('h6');
                  h6.classList.add('h6');
                  h6.textContent = DateofExpir;
                  details.appendChild(h6);

                  const button = document.createElement('button');
                  button.classList.add('btn', 'btn-primary');
                  button.textContent = 'Cancel';
                  button.addEventListener('click', function(event) {
                    var userClient = firebase.auth().currentUser.uid;
                    const doc = firebase.firestore().collection("Usuarios").doc(userClient).collection("mycarts").doc(docName);
                  // Eliminamos el documento de la colección "favorites"
                  doc.delete().then(() => {
                    alert("Se ha cancelado"+Drescriptio);
                  }).catch((error) => {
                      console.error("Error al eliminar el documento:", error);
                  });
                  });
                  details.appendChild(button);
                
                }
        }
});
}