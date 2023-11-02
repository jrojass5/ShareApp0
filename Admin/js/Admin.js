//icon favorite----------------------------------------
const heartIcon = document.getElementById('Favorite');
let isHeart = false;
heartIcon.addEventListener('click', function () {
    // Alterna entre los iconos y colores
    if (isHeart) {
        heartIcon.setAttribute('name', 'heart-outline');
        heartIcon.style.color = ''; // Restaura el color original
    } else {
        heartIcon.setAttribute('name', 'heart');
        heartIcon.style.color = 'red';
    }
    // Invierte el estado
    isHeart = !isHeart;
});
//-------------------------------------------------------
