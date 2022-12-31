const url = 'https://mindicador.cl/api';
const filterCurrencies = ['dolar', 'euro', 'uf', 'utm'];
const selectWithCurrencies = document.getElementById('currency');
const divResult = document.getElementById('result')

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

//Obtener Información de la API
const getCurrencies = async () => {
  try{
    const reqCurrencies = await fetch(url);
    const resData = await reqCurrencies.json();

    const currencyList = filterCurrencies.map((currency) => {
      return{
        code: resData[currency].codigo,
        value: resData[currency].valor,
      };
    });
    // Mostar Monedas
    currencyList.forEach((localCurrency) => {
      const option = document.createElement('option');
        option.value = localCurrency.value;
        option.text = capitalize(localCurrency.code);
        selectWithCurrencies.appendChild(option);
    });
  } catch (error) {
    console.log(error);
    alert('Error al Obtener las Monedas');
  }

};

//Calculo del total a pagar
const calcResult = (acound, currency) => {
  divResult.innerHTML = `$ ${(acound/currency).toFixed(2)}`
};

       //Mostrar Grafico
  const drawChart = async (currency) => {
  try {
    reqChart = await fetch(`${url}/${currency}`);
    dataChart = await reqChart.json();

    const serieToChart = dataChart.serie.slice(0, 10);

    //grafico
    const data = {
      labels: serieToChart.map((item) => item.fecha.substring(0, 10)),
      datasets: [
        {
          label: currency,
          data: serieToChart.map((item) => item.valor),
          fill: false,
        },
      ],
    };
    const config = {
      type: 'line',
      data: data,
    };
    const chartDom = document.getElementById('chart');
    chartDom.classList.remove('d-none');
    new Chart(chartDom, config);
  } catch (error) {
    alert('Error al obetener la Data');
  }
};

document.getElementById('btn').addEventListener('click', () => {
const acoundMonedas = document.getElementById('cantidadMonedas').value;
  if (acoundMonedas === '') {
    alert ('Debes Ingresar un Monto')
      return;
  }
    const currencySelected = selectWithCurrencies.value;
    const codeCurrencySelected = selectWithCurrencies.options[selectWithCurrencies.selectedIndex].text.toLowerCase();

    calcResult(acoundMonedas, currencySelected);
    drawChart(codeCurrencySelected);
});
getCurrencies();


