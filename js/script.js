// Variables globales
// ------------------------------------------------------------------------------
let ventaTotal = 0;
let ventaMayor = 0;
let ventaMenor = 0;
let ventasRegistradas = [];
let tiendasTotales;

// Elementos del DOM (referencias)
// ------------------------------------------------------------------------------
const spanResultado = document.getElementById("spanResultado");
const contenedorBotones = document.querySelector(".contenedorBotones");
const contenedorVentas = document.getElementById("contenedorVentas");

// Funciones
// ------------------------------------------------------------------------------
// Función para generar el parrafo contenedor de tiendas
const tienda = (inputID, textoLabel) => {
  const parrafo = document.createElement("p");
  const label = document.createElement("label");
  const input = document.createElement("input");
  label.setAttribute("for", inputID);
  label.style.margin = "5px";
  label.textContent = textoLabel;
  input.setAttribute("id", inputID);
  input.setAttribute("type", "number");
  input.setAttribute("min", 0);
  parrafo.append(label, input);
  return parrafo;
};

// Función que genera la cantidad de Tiendas Requeridas
const generarTiendas = () => {
  tiendasTotales = Number(prompt("Cuantas tiendas deseas crear?: "));
  if (tiendasTotales === 0) {
    setTimeout(() => {
      alert("El valor mínimo es 1 😒");
      location.reload();
    }, 500);
  } else {
    for (let i = 1; i <= tiendasTotales; i++) {
      contenedorVentas.append(tienda(`ventasTienda${i}`, `Tienda ${i}:`));
    }
  }
};

// Función que extrae los valores de cada venta
const extraerValorVenta = () => {
  ventasRegistradas = [];
  for (let i = 1; i <= tiendasTotales; i++) {
    const inputVenta = document.getElementById(`ventasTienda${i}`);
    let valorVenta = Number(inputVenta.value);
    if (valorVenta < 0) {
      inputVenta.style.border = '2px solid red';
      inputVenta.style.background = 'azure';
      inputVenta.style.color = 'black';
    } else {
      inputVenta.style.border = '';
      inputVenta.style.background = 'azure';
      inputVenta.style.color = 'black';
    }
    ventasRegistradas.push(valorVenta);
  }
  return ventasRegistradas;
};

// Función que calcula el total de las ventas
const totalVentas = (ventasRegistradas) => {
  let total = 0;
  for (let venta of ventasRegistradas) {
    total += venta;
  }
  return total;
};

// Función que calcula la venta más alta
const ventaMasAlta = (ventasRegistradas) => {
  ventaMayor = Math.max(...ventasRegistradas);
  return ventaMayor;
};

// Función que calcula la venta más baja
const ventaMasBaja = (ventasRegistradas) => {
  ventaMenor = Math.min(...ventasRegistradas);
  return ventaMenor;
};

//Funcion que calcula el numero de las tiendas con mayores ventas
const tiendasMayorVenta = (ventasRegistradas) => {
  let mayor;
  let mayoresVentas = [];
  mayor = ventaMasAlta(ventasRegistradas);
  for (let i = 0; i < ventasRegistradas.length; i++) {
    if (ventasRegistradas[i] === mayor) {
      mayoresVentas.push(i + 1);
    }
  }

  for (let tienda of mayoresVentas) {
    const inputVenta = document.getElementById(`ventasTienda${tienda}`);
    inputVenta.style.background = 'green';
    inputVenta.style.color = 'azure';
    inputVenta.style.fontWeight = 'bold';
  }
}

//Funcion que calcula el numero de las tiendas con menores ventas
const tiendasMenorVenta = (ventasRegistradas) => {
  let menor;
  let menoresVentas = [];
  menor = ventaMasBaja(ventasRegistradas);
  for (let i = 0; i < ventasRegistradas.length; i++) {
    if (ventasRegistradas[i] === menor) {
      menoresVentas.push(i + 1);
    }
  }

  for (let tienda of menoresVentas) {
    const inputVenta = document.getElementById(`ventasTienda${tienda}`);
    inputVenta.style.background = 'red';
    inputVenta.style.color = 'azure';
    inputVenta.style.fontWeight = 'bold';
  }
}


// Programa Principal
// ------------------------------------------------------------------------------
contenedorBotones.addEventListener("click", (event) => {
  if (event.target.tagName === "BUTTON") {
    let botonPresionado = event.target.textContent;
    if (botonPresionado === "Calcular") {
      // Extraigo los valores ingresados en los inputs
      ventasRegistradas = extraerValorVenta();
      // verifico si hay valores negativos
      let tieneNegativos = ventasRegistradas.some(x => x < 0);
      // si hay negativos vuelve a esperar correccion de valores
      if (tieneNegativos) {
        spanResultado.style.display = 'none';
        ventasRegistradas = extraerValorVenta();
      } else {
        // si no hay negativos, realiza los cálculos
        spanResultado.style.display = 'block';
        ventaTotal = totalVentas(ventasRegistradas);
        ventaMayor = ventaMasAlta(ventasRegistradas);
        ventaMenor = ventaMasBaja(ventasRegistradas);
        tiendasMayorVenta(ventasRegistradas);
        tiendasMenorVenta(ventasRegistradas);
        spanResultado.textContent = `Total Ventas: ${ventaTotal}`;
        spanResultado.style.whiteSpace = "pre-line";
      }
    } else {
      location.reload();
    }
  }
});
