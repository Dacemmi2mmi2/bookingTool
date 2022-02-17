import { requestCoin } from "./index.js";
import { renderGraph } from "./graph.js";

const changeGrahpicCurrency = async (idCurrency) => {
    // console.log(idCurrency)
    const apiCoin = `https://api.coingecko.com/api/v3/coins/${idCurrency}/market_chart?vs_currency=usd&days=30&interval=daily`;
    const newValuePrice = await requestCoin(apiCoin);
    renderGraph(newValuePrice, true, idCurrency);
}

const addRemoveCurrency = (itemOfList) => {
    const allItemsTable = Array.from(document.querySelectorAll('.body__table div.tr'));
    if (itemOfList.classList.contains('active')) {
        allItemsTable.forEach((item) => {
            if (itemOfList.classList[0] === item.classList[1]) {
                item.style.display = 'flex';
                item.classList.add('active');
            }
        });
    } else {
        allItemsTable.forEach((item) => {
            if (itemOfList.classList[0] === item.classList[1]) {
                item.style.display = 'none';
                item.classList.remove('active');
            }
        });
    }
}

export const renderList = (data, parent, activeValues) => {
    const ul = document.createElement('ul');
    parent.appendChild(ul);
    for (let i = 0; i < data.length; i++) {
        const li = document.createElement('li');
        ul.appendChild(li);

        const img = document.createElement('img');
        img.setAttribute('src', data[i].image);
        li.appendChild(img);

        const paragraph = document.createElement('p');
        const nameCriptoValute = document.createTextNode(data[i].name);
        paragraph.appendChild(nameCriptoValute);
        li.appendChild(paragraph);

        const showActive = document.createElement('div');
        const textActive = document.createTextNode('✓');
        showActive.appendChild(textActive);
        li.appendChild(showActive);

        if (activeValues.length === 1) {
            li.classList.add(data[i].id);
            li.addEventListener('click', () => {
                changeGrahpicCurrency(li.classList[0]);
            }, false);
        } else {
            li.classList.add(data[i].symbol);
            li.addEventListener('click', () => {
                li.classList.toggle('active');
                addRemoveCurrency(li, data);
            }, false);

            for (let j = 0; j < activeValues.length; j++) {
                if (data[i].symbol === activeValues[j]) {
                    li.classList.add('active');
                }
            }
        }
    }
} 
