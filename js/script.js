// Elementos del DOM (referencias)
const spanResultado = document.getElementById("spanResultado");
const contenedorBotones = document.querySelector(".contenedorBotones");
const contenedorVentas = document.getElementById("contenedorVentas");

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
  tiendasTotales = Number(prompt('Cuantas tiendas deseas crear?: '));
  for (let i = 1; i <= tiendasTotales; i++) {
    contenedorVentas.append(tienda(`ventasTienda${i}`, `Tienda ${i}:`));
  }
};

// Variables globales
let ventaTotal = 0;
let ventaMayor = 0;
let ventaMenor = 0;
let ventasRegistradas = [];
let tiendasTotales;

// Función que extrae los valores de cada venta
const extraerValorVenta = () => {
  ventasRegistradas = [];
  for (let i = 1; i <= tiendasTotales; i++) {
    const inputVenta = document.getElementById(`ventasTienda${i}`);
    let valorVenta = Number(inputVenta.value);
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

// Programa Principal
contenedorBotones.addEventListener("click", (event) => {
  if (event.target.tagName === "BUTTON") {
    let botonPresionado = event.target.textContent;
    if (botonPresionado === "Calcular") {
      ventasRegistradas = extraerValorVenta();
      ventaTotal = totalVentas(ventasRegistradas);
      ventaMayor = ventaMasAlta(ventasRegistradas);
      ventaMenor = ventaMasBaja(ventasRegistradas);
      spanResultado.textContent = `Total Ventas: ${ventaTotal}\n
                                  Venta mas Alta: ${ventaMayor}\n
                                  Venta más Baja: ${ventaMenor}`;
      spanResultado.style.whiteSpace = "pre-line";
    } else {
      location.reload();
    }
  }
});