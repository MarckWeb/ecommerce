const productContainer = document.getElementById('product')
const imageBig = document.querySelector('.product__big-image')
const containerThumbs = document.getElementById('product__thumb')


containerThumbs.addEventListener('click', (e) => {
    if(e.target.tagName === 'IMG'){
        //accede a la src de la imagen
        const imagenSrc = e.target.src;
        console.log(imagenSrc)
       //accede al ultimo / del string
        const indexImage = imagenSrc.lastIndexOf('/');
       //obtine el nombre de la imagen
        const nameImage = imagenSrc.substring(indexImage + 1);
        //cambiamos src a imagen 
        imageBig.src = `./img/tennis/${nameImage}`
        
    }
})

//CONTENEDOR COLORES INPUTS
const containerColors = document.getElementById('property-color')

containerColors.addEventListener('click', (e) => {
    //verificamos si es input
    if(e.target.tagName === 'INPUT'){
        //cambiamos rul de image big por el valor del input
        imageBig.src = `./img/tennis/${e.target.value}.png`
    }
})

//CONTENEDOR CONTADOR PRODUCTO
const addAmount = productContainer.querySelector('#add-amount');
const substractAmount = productContainer.querySelector('#substract-amount')
const inputCount = productContainer.querySelector('.product__amount')

addAmount.addEventListener('click', () => {
    inputCount.value = parseInt(inputCount.value) + 1;
})

substractAmount.addEventListener('click', () => {
    if(parseInt(inputCount.value) > 1){
        inputCount.value = parseInt(inputCount.value) - 1;
    }
})