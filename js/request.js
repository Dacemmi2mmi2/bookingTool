const urlApiAllCoins = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=30d';
const urlApiCoin = 'https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=30&interval=daily';
export let dataAllCoins;

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
                    console.log(dataCoins);
                    dataAllCoins = dataCoins;
                    renderListCoins(dataAllCoins);
                    renderTable(dataAllCoins);
                    resolve();
                });
            }
        });
    });
}

const requestCoin = () =>{
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
                    console.log(dataCoin);
                    renderGraph(dataCoin);
                    resolve();
                });
            }
        });
    });
}
