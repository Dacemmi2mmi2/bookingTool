import { renderList } from "./renderList.js";
import { renderTable } from "./renderTable.js";
import { renderGraph } from "./graph.js";
import { sortTable } from "./sortTable.js";
import { exportToCsv } from "./exportCsv.js";
import { changePages } from "./changePages.js";

export let dataAllCoins;
const urlApiAllCoins = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=30d';
const requestAllCoins = () => {
    return new Promise(resolve => {
        fetch(urlApiAllCoins, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        }).then((response) => {
            if(response.ok) {
                response.json().then((dataCoins) => {
                    dataAllCoins = dataCoins;
                    resolve(dataAllCoins);
                });
            }
        });
    });
}

export let dataCoin;
const urlApiCoin = 'https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=30&interval=daily';
export const requestCoin = (urlApiCoin) => {
    return new Promise(resolve => {
        fetch(urlApiCoin, {
            method: 'GET',
            headers: {
                'Content-Type': 'aplication/json',
                'Access-Control-Allow-Origin': '*'
            }
        }).then((response) => {
            if(response.ok) {
                response.json().then((dataCoin) => {
                    resolve(dataCoin);
                });
            }
        });
    });
}

const controlButtons = [...document.querySelectorAll('.controls__buttons div')];
const [currencies, sortDate, sortPrice, toCsv, toGraphicPage] = controlButtons;

sortPrice.addEventListener('click', () => {
    sortPrice.classList.toggle('expensive');
    sortTable('price', dataAllCoins, sortPrice.classList.contains('expensive'));
}, false);

sortDate.addEventListener('click', () => {
    sortDate.classList.toggle('old');
    sortTable('date', dataAllCoins, sortDate.classList.contains('old'));
}, false);

toCsv.addEventListener('click', exportToCsv, false);

toGraphicPage.addEventListener('click', () => {
    changePages('graphic');
}, false);

const btnShowTablePage = document.querySelector('.page__table');
btnShowTablePage.addEventListener('click', () => {
    changePages('table');
}, false);

const listCurrensies = document.querySelector('.list__currencies');
const hideListCurrencies = document.querySelector('.list__currencies .hide__list');
currencies.addEventListener('click', () => {
    listCurrensies.style.top = '0';
    toGraphicPage.style.backgroundColor = 'gray';
    toGraphicPage.style.pointerEvents = 'none';
});
hideListCurrencies.addEventListener('click', () => {
    listCurrensies.style.top = '-120%';
    toGraphicPage.style.backgroundColor = '#039';
    toGraphicPage.style.pointerEvents = 'auto';
});

const activeValuesTable = ['btc', 'eth', 'xlm'];
const activeValuesGraphic = ['btc'];
const wrapperCurrenciesTable = document.querySelector('.list__currencies .wrapper');
const wrapperCurrenciesGraphs = document.querySelector('.list__graphs .wrapper');
export const staticDataAllCoin = [];

const requestApi = async () => {
    dataAllCoins = await requestAllCoins();
    dataCoin = await requestCoin(urlApiCoin);
    dataAllCoins.forEach(item => staticDataAllCoin.push(item));

    renderList(dataAllCoins, wrapperCurrenciesTable, activeValuesTable);
    renderList(dataAllCoins, wrapperCurrenciesGraphs, activeValuesGraphic);
    renderTable(dataAllCoins, activeValuesTable);
    renderGraph(dataCoin, false, 'bitcoin');

    controlButtons.forEach((item) => {
        item.style.backgroundColor = '#039';
        item.style.pointerEvents = 'auto';
    });
}
requestApi();

// document.addEventListener('click', (e) => {
//     console.log(e.target.parentElement)
// }, false);