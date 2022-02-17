import { renderTable } from "./renderTable.js";

const activeItems = [];
export const sortTable = (paramSort, sortObject, check) => {
    activeItems.length = 0;
    const bodyTable = document.querySelector('.body__table');
    if (paramSort === 'price') {
        if (check) {
            sortObject.sort((a, b) => a.current_price - b.current_price);
        } else {
            sortObject.sort((a, b) => b.current_price - a.current_price);
        }
    }

    if (paramSort === 'date') {
        sortObject.forEach(item => {
            item.atl_date = new Date(item.atl_date).getTime();
        });
        if (check) {
            sortObject.sort((a, b) => a.atl_date - b.atl_date);
        } else {
            sortObject.sort((a, b) => b.atl_date - a.atl_date);
        }
        sortObject.forEach(item => {
            item.atl_date = new Date(item.atl_date).toDateString();
        });
    }

    while (bodyTable.firstChild) {
        if (bodyTable.lastChild.classList.contains('active')) {
            activeItems.push(bodyTable.lastChild.classList[1]);
        }
        bodyTable.removeChild(bodyTable.lastChild);
    }
    renderTable(sortObject, activeItems);
}