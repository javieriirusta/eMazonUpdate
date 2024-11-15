// Crear un carrito de compras simple utilizando JavaScript, HTML y CSS.
// El carrito debe permitir agregar productos, eliminarlos y mostrar un resumen de la
// compra.
// Se utilizarán clases para representar los productos y el carrito.
// Se emplearán métodos de arreglos para gestionar los productos en el carrito.
// Se implementará una interfaz de usuario básica utilizando HTML y CSS.
// Estructura del Proyecto:
// • index.html: Contiene el HTML básico para la lista de productos y el carrito.
// • style.css: Contiene los estilos CSS para darle formato a la página.
// • script.js: Contiene el código JavaScript para la lógica del carrito de compras.

// Creo la clase Item indicando la cantidad 0, esto es para contabilizar 
 // la cantidad de productos agregue el usuario.
class Item {
    constructor (id, nombre, precio){
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
    }
     // Creo el metodo vaciarProductos() para resetear el contador a 0
        // cuando me sea necesario.
}

// Creo la clase Producto que hereda propiedades y metodos de Item.
class Producto extends Item {
    constructor(id, nombre, precio) {
        super(id, nombre, precio);
        this.cantidad = JSON.parse(localStorage.getItem(`cantidad_${id}`)) || 0;
    }

   // guardarCantidad() {
   //     localStorage.setItem(`cantidad_${this.id}`, JSON.stringify(this.cantidad));
   // }

    borrarCantidad() {
        localStorage.removeItem(`cantidad_${this.id}`);
    }
}

// Defino los objetos de la clase Producto

const producto1 = new Producto('1','Led TCL 42"', 429999);
const producto2 = new Producto('2','Led LG 55" 4K', 2899999);
const producto3 = new Producto('3','Aire Acondicionado BGH 5500', 1249999);
const producto4 = new Producto('4','Lavarropas Automatico Concept DREAN', 638999);
const producto5 = new Producto('5','Motorola E14 Verde 64 Gb', 199999);
const producto6 = new Producto('6','Freidora De Aire Easyfryer-9000 TELEFUNKEN', 209999);
const producto7 = new Producto('7','Notebook Asus TUF', 2000000);
const producto8 = new Producto('8','Notebook HP Victus', 2100000);
const producto9 = new Producto('9','MSI Crosshair', 2009999);
const producto10 = new Producto('10','Colchón Taurus', 799000);

function cantidadCarrito() {
    document.getElementById("cantidadCarrito").innerHTML = Carrito1.cantidad;
    }
// Creo la clase carrito y sus metodos. El constructor tiene un array
// vacío donde se le agregarán los productos. También le agrego un contador
// para saber cuantos objetos tiene el carrito.

class carrito {
    constructor() {
        this.carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        this.cantidad = parseInt(localStorage.getItem('cantidadCarrito')) || 0;
        this.carrito.forEach(producto => this.publicarCarrito(producto));
        if(this.cantidad>0){
            const mensajeDefault = document.getElementById('mensajeDefault');
            mensajeDefault.remove();
        }
        this.actualizarCantidadCarrito();
        this.botonVaciarCarrito();
        this.botonComprar();
    }
        // Este metodo primero verifica que si no hay nada en el carrito
        // vacía el div. 
        // Agrega al carrito el producto entrante mediante .push
        // Suma 1 al contador del carrito.
        
    agregarProducto(producto) {
        if (this.cantidad === 0) {
            document.getElementById("carritoOculto").innerHTML = '';
        }
        const index = this.carrito.findIndex(item => item.id === producto.id);
        if (index === -1) {
            producto.cantidad = 1;
            this.carrito.push(producto);
        } else {
            this.carrito[index].cantidad += 1;
        }
        this.cantidad +=1;
        this.publicarCarrito(producto);
        this.guardarCarrito();
        this.actualizarCantidadCarrito();
        this.guardarCantidadCarrito();
       
    }
    eliminarProducto(producto) {
        const index = this.carrito.findIndex(item => item.id === producto.id);
        if (index !== -1 && this.carrito[index].cantidad > 0) {
            this.carrito[index].cantidad -= 1;
            this.cantidad -= 1;
            // Si la cantidad llega a 0, eliminamos el producto del carrito
            if (this.carrito[index].cantidad === 0) {
                this.carrito.splice(index, 1);
                const verificacion = document.getElementById("element" + producto.id);
                if (verificacion) {
                    verificacion.remove(); // Elimina el elemento visualmente
                }
            } else {
                // Si la cantidad es mayor que 0, actualizamos la cantidad en el DOM
                this.publicarCarrito(producto);
            }
            // Actualizar la cantidad total de productos en el carrito y guardarlo en localStorage
            this.cantidad = this.carrito.reduce((total, item) => total + item.cantidad, 0);
    
            // Guardamos el carrito y la nueva cantidad total en localStorage
            this.guardarCarrito();
            this.guardarCantidadCarrito();
    
            // Actualizar la cantidad visualmente en el carrito
            this.actualizarCantidadCarrito();
            if (this.carrito.length === 0) {
                this.borrarTodo();
                localStorage.clear();
            }
        }
        
    }
    vaciarCarrito() {
        this.carrito = [];
        this.cantidad = 0;
        this.guardarCarrito();
        this.actualizarCantidadCarrito();
        this.borrarTodo();
        localStorage.clear();
    }
     publicarCarrito(producto) {
        const carritoOculto = document.getElementById("carritoOculto");
        const verificacion = document.getElementById("element"+producto.id);
        if (verificacion) {
            // Si el producto ya existe, actualizamos su cantidad
            const index = this.carrito.findIndex(item => item.id === producto.id)
            let actualizarNumero = document.getElementById(producto.nombre + "elementCantidad");
            actualizarNumero.textContent = this.carrito[index].cantidad;
        } 
        else {
            // Si el producto no existe, lo agregamos al carrito visualmente
            const element = document.createElement("div");
            const elementNombre = document.createElement("div");
            const elementImagen = document.createElement("img");
            let elementCantidad = document.createElement("div");
            const elementBotonmenos = document.createElement("button");
            const elementBotonmas = document.createElement("button");
            element.className = "element";
            element.id ="element"+producto.id;
            elementNombre.id = "elementNombre";
            elementCantidad.id = producto.nombre + "elementCantidad";
            elementImagen.id = "elementImagen";
            elementImagen.src = 'img/'+producto.id + '.jpg';
            elementNombre.textContent = producto.nombre;
            elementCantidad.textContent = producto.cantidad;
            elementBotonmenos.textContent = "-";
            elementBotonmenos.id = "botonmenos";
            elementBotonmenos.addEventListener('click', () => {
                this.eliminarProducto(producto);
            });
            elementBotonmas.textContent = "+";
            elementBotonmas.id = "botonmas";
            elementBotonmas.addEventListener('click', () => {
                this.agregarProducto(producto);
            });

            carritoOculto.appendChild(element);
            element.appendChild(elementImagen);
            element.appendChild(elementNombre);
            element.appendChild(elementBotonmenos);
            element.appendChild(elementCantidad);
            element.appendChild(elementBotonmas);
        }
        this.botonComprar();
        this.botonVaciarCarrito();
    }
    botonVaciarCarrito() {
            const botonVaciar = document.getElementById("botonVaciar");
            let vaciarBoton = document.getElementById("vaciarCarrito");
            if (this.cantidad > 0 && !vaciarBoton) {
                vaciarBoton = document.createElement("button");
                vaciarBoton.id = "vaciarCarrito";
                vaciarBoton.textContent = "Vaciar carrito";
                vaciarBoton.onclick = () => this.vaciarCarrito();
                botonVaciar.appendChild(vaciarBoton);
            }
        }
    botonComprar() {
            const botonComprar = document.getElementById("botonComprar");
            let comprarBoton = document.getElementById("comprarProducto");
            if (this.cantidad > 0 && !comprarBoton) {
                comprarBoton = document.createElement("button");
                comprarBoton.id = "comprarProducto";
                comprarBoton.textContent = "Comprar";
                comprarBoton.onclick = () => {
                this.generarResumen();
                window.location.href = "payment.html";
                }
                botonComprar.appendChild(comprarBoton);
        }
    }
    generarResumen() {
        const resumenCompra = document.getElementById("resumenCompra");
        if (resumenCompra){
        let total = 0;
        for (let producto of this.carrito) {
            let subtotal = producto.cantidad*producto.precio;
            total = total + subtotal;
            const listaProductos = document.createElement("div");
            const nombreProducto = document.createElement("p");
            const cantidadProducto = document.createElement("p");
            const precioProducto = document.createElement("p");
            const imgProducto = document.createElement("img");
            listaProductos.id = "nombreProductoResumen";
            imgProducto.src ='img/'+producto.id+'.jpg';
            imgProducto.id = "imagenProductoResumen";
            cantidadProducto.textContent =`Cantidad: ${producto.cantidad}`
            nombreProducto.textContent =producto.nombre;
            precioProducto.textContent=`Precio: $${producto.precio}`
            resumenCompra.appendChild(imgProducto);
            resumenCompra.appendChild(nombreProducto);
            resumenCompra.appendChild(cantidadProducto);
            resumenCompra.appendChild(precioProducto);
            }
        const totalCompra = document.getElementById("totalCompra");
        const totalCompratext = document.createElement("p");
        const comprarBoton =document.createElement("button");
        totalCompratext.id="totalCompras";
        totalCompratext.textContent = `Total: $${total}`;
        comprarBoton.textContent="Confirmar compra";
        comprarBoton.id="confirmarComprarProducto";
        comprarBoton.onclick= () => {
            this.vaciarCarrito();
            const mensajeOculto = document.getElementById("confirmarCompra");
            const header = document.getElementById('header');
            const footer = document.getElementById('footer');
            const container = document.getElementById('container');
            header.style.visibility = 'hidden'; 
            footer.style.visibility ='hidden';
            container.style.visibility ='hidden';
            mensajeOculto.style.visibility = 'visible';
        }
        totalCompra.appendChild(totalCompratext);
        totalCompra.appendChild(comprarBoton);
            }
        }
    actualizarCantidadCarrito() {
        const cantidadElement = document.getElementById('cantidadCarrito');
        if (cantidadElement) {
            cantidadElement.innerHTML = this.cantidad;
        }
    }
    borrarTodo() {
        document.getElementById("carritoOculto").innerHTML = '<p id="mensajeDefault">No hay elementos en el carrito</p>';
        document.getElementById("botonVaciar").innerHTML = '';
        document.getElementById("botonComprar").innerHTML = '';
    }
    guardarCarrito() {
        localStorage.setItem('carrito', JSON.stringify(this.carrito));
    }
    guardarCantidadCarrito() {
        localStorage.setItem('cantidadCarrito', this.cantidad.toString());
    }
}
// Creo el carrito mediante un objeto, no es necesario definir más carritos.

const Carrito1 = new carrito();

// Esta funcion actualiza el contador del carrito.



// Esta funcion agrega un EventListener que al hacer click
// en el icono del carrito me muestra el carrito.
const iconoCarrito = document.getElementById("carritoIcono");
const carritoOculto = document.getElementById("carritoLateral");
function mostrarCarrito() {
    iconoCarrito.addEventListener("click", () => {
        
        if (carritoOculto.style.opacity === "0") {
            carritoOculto.style.opacity = "1";
            carritoOculto.style.visibility = "visible";
         
        }
        else {
            carritoOculto.style.opacity = "0";
            carritoOculto.style.visibility = "hidden";
        }
    })
}
mostrarCarrito();

// Manejar el clic en el ícono del carrito para desplegar/ocultar el carrito lateral
const carritoIcono = document.getElementById('carritoIcono').addEventListener('click', function(e) {
    e.preventDefault();
    const carritoLateral = document.getElementById('carritoLateral');
    carritoLateral.classList.toggle('mostrar');
    
    iconoCarrito.innerHTML='';
    iconoCarrito.innerHTML='<span id="icono-carrito" class="icono-carrito">🛒</span><span class="cantidadCarrito" id="cantidadCarrito">'+Carrito1.cantidad+'</span>';
    this.style.backgroundColor = "#333";

    // Si el carrito se oculta, también esconder el mensaje de compra
    if (carritoLateral.classList.contains('mostrar')) {
        
    this.style.backgroundColor = "#ffffff00";
    iconoCarrito.innerHTML='';
    iconoCarrito.innerHTML='<span id="botonCerrar">x</span>';
    ///const botonCerrar = document.getElementById('botonCerrar');
    ///botonCerrar.onclick = () => Carrito1.actualizarCantidadCarrito();
    }
});
addEventListener("load", (event) => {
    const resumenCompra = document.getElementById("resumenCompra");
    if (resumenCompra){
        Carrito1.generarResumen();
    }
});
const menuhamburger = document.getElementById("menuhamburger").addEventListener('click', () => {
    const listamenu = document.getElementById("listaMenu");
    if (listamenu.style.marginTop === "0%") {
        listamenu.style.marginTop = "-100px";
    } else {
        listamenu.style.marginTop = "0%";
    }
});