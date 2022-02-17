import { dataAllCoins } from "./index.js";

let chart;
let nameCurrency;
const selectName = (idCurrency) => {
    // console.log(staticDataAllCoin);
    // console.log(idCurrency);
    for (let i = 0; i < dataAllCoins.length; i++) {
        if (dataAllCoins[i].id === idCurrency) {

            nameCurrency = dataAllCoins[i].name;
            console.log(nameCurrency, 'nameCurrency')
            break;
        }
    }
}

export const renderGraph = (dataCoin, destroy, idCurrency) => {
    selectName(idCurrency);
    destroy && destroyChart();
    
    const dataCoinPrice = dataCoin;
    const ctx = document.querySelector('#graphic__price').getContext('2d');
    const gragientBg = ctx.createLinearGradient(0, 0, 0, 700);
    gragientBg.addColorStop(0, 'rgba(0, 51, 153, .3');
    gragientBg.addColorStop(1, 'white');

    const labels = [];
    dataCoinPrice.prices.forEach((item) => {
        labels.push(new Date(item[0]).toDateString());
    });

    const prices = [];
    dataCoinPrice.prices.forEach((item) => {
        prices.push(item[1]);
    })
        
    const config = {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: nameCurrency,
                    backgroundColor: gragientBg,
                    borderColor: '#039',
                    borderWidth: 2,
                    pointRadius: 3,
                    pointHoverRadius: 6,
                    data: prices,
                    tension: 0.3,
                    fill: true,
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: nameCurrency,
                    color: '#039',
                    font: {
                        size: 24,
                        family: 'Montserrat Medium'
                    }
                },
                legend: {
                    display: false,
                    labels: {
                        font: {
                            size: 24
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        color: 'transparent',
                        borderColor: '#669',
                        tickColor: '#669',
                    }
                },
                y: {
                    grid: {
                        color: 'transparent',
                        borderColor: '#669',
                        tickColor: '#669',
                    }
                },
            }
        } 
    }
    const myChart = new Chart(ctx, config);
    chart = myChart;
}

const destroyChart = function () {
    chart.destroy();
}