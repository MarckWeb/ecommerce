import data from './data/data'
const btnOpen = document.querySelectorAll('[data-accion = "open-car"]');
const containerShopping = document.getElementById('shopping');
const btnClose = document.querySelectorAll('[data-accion = "close-car"]')

//section shopping
const addProductCar = document.getElementById('add-product-car')
const product = document.getElementById('product')
let allShopping = []
//formato moneda internacional
const moneyFormat = new Intl.NumberFormat('es-ES', {style: 'currency', currency: 'EUR'})

//notificacion container
const notification = document.getElementById('notification')

const renderCompras = () => {
    containerShopping.classList.add('shopping--active')
    //controla error de llamada cada vez sale un item
    const prevShoppings = containerShopping.querySelectorAll('.shopping__product')
    prevShoppings.forEach(shopping => shopping.remove());

    let total = 0;

    //preguntamso si el array tiene datos
    if(allShopping.length < 1){
        //agreganos la clase el father
        containerShopping.classList.add('shopping-vacio');
    } else {
        //eliminamos la clase
        containerShopping.classList.remove('shopping-vacio');
        //recorremos el el array de datos de compra
        allShopping.forEach(shopping => {
            data.products.forEach(db => {
                if(db.id === shopping.id){
                    shopping.price = db.price
                   total += db.price * shopping.amount
                }
            })
           
            //traemos todos las imagenes para luego cambiar las rutas o src
            let thumbsSrc = document.querySelectorAll('.product__thumb-img')[0].src;
            if(shopping.color === 'rojo'){
                thumbsSrc = './img/thumbs/rojo.png'
            }
            if(shopping.color === 'amarillo') {
                thumbsSrc = './img/thumbs/amarillo.png'
            }
    
            //creo plantilla html
            const itemShopping = 
            `<section class="shopping__product-info">
            <img class="shopping__product-thumb" src="${thumbsSrc}" alt="">
            <div>
                <p class="shopping__product-name"><span class="shopping__product-amount">${shopping.amount} x</span>
                    ${shopping.title}</p>
    
                <p class="shopping__product-property">
                    Tamaño:<span>${shopping.size}</span> Color:<span>${shopping.color}</span>
                </p>
            </div>
            </section>
            <section class="shopping__product-review">
            <button class="shopping__product-close-btn" data-accion="eliminar-item-carrito">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                    viewBox="0 0 16 16">
                    <path
                        d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z" />
                </svg>
            </button>
            <p class="shopping__product-price">${moneyFormat.format(shopping.price * shopping.amount) }</p>
            </section>`
    
            //creo una etiqueta contenedora
            const containerItem = document.createElement('article')
            containerItem.classList.add('shopping__product')
            //inserto la plantilla creada
            containerItem.innerHTML = itemShopping
    
            //y inserto la etiqueta creada article
            containerShopping.querySelector('.shopping__body').appendChild(containerItem)
    
        })  
    }
    containerShopping.querySelector('.shopping__total').innerText = moneyFormat.format(total); 
}

//abrir compras
btnOpen.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault()
        renderCompras();
    })
});

//cerra compras
btnClose.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault()
        containerShopping.classList.remove('shopping--active')
    })
})

addProductCar.addEventListener('click', () => {
    const id = product.dataset.productId;
    const title = product.querySelector('#product__name').innerText;
    const amount = parseInt(product.querySelector('#product__amount').value);
    //dentro del contenedor seleccionamos el que tenga activado el atributo checked
    const color = product.querySelector('#property-color  input:checked').value;
    const size = product.querySelector('#property-size input:checked').value;
    
    if(allShopping.length > 0){
        let duplicateShopping = false
        
        allShopping.forEach(elem => {
            if(elem.id === id && elem.title === title && elem.color === color && elem.size === size){
                elem.amount += amount
                duplicateShopping = true
            }
        })
//si es verdadero entrara y si es falso no 
//si aumenta la cantidad sera false 
//si no entra pro condicion cantidad sera true
        if(!duplicateShopping) {
            allShopping.push({
                id: id,
                title: title,
                amount: amount,
                color: color,
                size: size
            })
        }
    }else{
        allShopping.push({
            id: id,
            title: title,
            amount: amount,
            color: color,
            size: size
        })
    }


    let thumbs = document.querySelectorAll('.product__thumb-img')[0].src
    if(color === 'rojo'){
        thumbs = './img/thumbs/rojo.png'
    } else if ( color === 'amarillo'){
        thumbs = './img/thumbs/amarillo.png'
    }

    notification.querySelector('img').src = thumbs

    //sector notificacion
    notification.classList.add('notification--active')

    setTimeout(() => notification.classList.remove('notification--active'), 5000)
})

containerShopping.addEventListener('click', (e) => {
    //si existe este btn pregunta si tiene un data con la propiedad accion y si es igual a eliminar-item-carrito
    if(e.target.closest('button')?.dataset.accion === "eliminar-item-carrito"){
        //encontrar padre cercano al btn
        const producto = e.target.closest('.shopping__product')
        const indexItem = [...containerShopping.querySelectorAll('.shopping__product')].indexOf(producto)
        console.log(indexItem)
       
        //guardadmos el item filtardo en el mismo array
        allShopping = allShopping.filter((item, index)=> {
            
            //si el index del seleccionado es diferente a todo retirnar los item no diferentes
            if(index !== indexItem){
                return item;
            }
        });
      renderCompras()
    }

   
})

//boton comprar
document.getElementById('shopping__btn-buy').addEventListener('click', () => {
    console.log(allShopping)
})



