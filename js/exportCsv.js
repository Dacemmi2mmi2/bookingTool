export const exportToCsv = () => {
    const tableTitles = [...document.querySelectorAll('.titles__table div')]
    .map(item => `"${item.textContent}"`);

    const tableItems = [...document.querySelectorAll('.body__table div.tr')]
    .map(item => {
        if (item.classList.contains('active')) {
            return [...item.querySelectorAll('div.td')].map(element => {
                return `"${element.textContent}"`;
            });
        }
    })
    .filter(item => item);

    const dataCsv = [tableTitles, ...tableItems];
    let strCsv = '';

    dataCsv.forEach(item => strCsv = strCsv + item.join(',') + '\n');
    const blob = new Blob([strCsv], { type: 'text/csv' });
    const link = document.createElement('a');

    link.href = URL.createObjectURL(blob);
    link.download = 'currencies.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(blob);
}