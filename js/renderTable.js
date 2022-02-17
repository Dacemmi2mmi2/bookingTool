const precitionPercent = (percent) => {
    return `${Number(percent).toPrecision(3)}%`;
}

const parsePrise = (prise) => {
    return prise.toLocaleString('en-US', { style: 'currency', currency: 'USD'});    
}

const parseDate = (date) => {
    return new Date(date).toDateString();
}

const table = document.querySelector('.body__table');
const titleTables = Array.from(document.querySelectorAll('.titles__table div'));

export const renderTable = (data, activeValues) => {
    for (let i = 0; i < data.length; i++) {
        const tr = document.createElement('div');
        tr.style.display = 'none';
        tr.classList.add('tr', data[i].symbol);
        table.appendChild(tr);
        const valuesDataForTable = {
            0: data[i].name,
            1: parsePrise(data[i].current_price),
            2: parsePrise(data[i].total_volume),
            3: parsePrise(data[i].market_cap),
            4: precitionPercent(data[i].price_change_percentage_30d_in_currency),
            5: parseDate(data[i].atl_date)
        }
        for (let j = 0; j < activeValues.length; j++) {
            if (data[i].symbol === activeValues[j]) {
                tr.style.display = 'flex';
                tr.classList.add('active');
            }
        }
        for (let j = 0; j < titleTables.length; j++) {
            const td = document.createElement('div');
            td.classList.add('td');
            let valueText = valuesDataForTable[j];
            if (!j) {
                const img = document.createElement('img');
                img.setAttribute('src', data[i].image);
                td.appendChild(img);
            }
            const text = document.createTextNode(valueText);
            td.appendChild(text);
            tr.appendChild(td);
        }
    }
}