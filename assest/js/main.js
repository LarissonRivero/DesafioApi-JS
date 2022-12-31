const url = 'https://mindicador.cl/api/';
const filterMonedas = ['dolar', 'euro', 'uf', 'utm'];

const converCase = (str) => {
  return str.code.charAt(0).toUpperCase() + str.code.slice(1);
};

//Obtener Información de la API
const getMonedas = async () => {
  const solApi = await fetch(url);
  const respApi = await solApi.json();

const listMonedas = filterMonedas.map((monedas) => {
  return{
    code:respApi[monedas].codigo,
    value:respApi[monedas].valor,
  };
});
// Mostar Monedas
const list = document.getElementById('cantidadMonedas');
  listMonedas.forEach((monedas) => {
    const opcion = document.createElement('option');
      opcion.value = monedas.value;
      opcion.textContent = capitalize(monedas.code);
      list.appendChild(opcion);
  });

console.log(listMonedas);
};

//Calculo del total a pagar
const resultadoMonedas = (acound, monedas) => {

}
resultadoMonedas()