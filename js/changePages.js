const waitForEvent = async (el, event) => {
    return new Promise((resolve) => {
        const cb = (e) => {
            e.stopPropagation();
            el.removeEventListener(event, (e) => cb(e));
            resolve();
        };
        el.addEventListener(event, (e) => cb(e));
    });
};

export const changePages = async (page) => {
    const talbePage = document.querySelector('.table__currencies');
    const graphicPage = document.querySelector('.block__graphs__currencies');

    if (page === 'graphic') {
        talbePage.style.animation = 'hide__page .2s linear forwards';
        await waitForEvent(talbePage, 'animationend');
        talbePage.style.transform = 'scale(.8)';
        talbePage.style.opacity = '0';
        talbePage.style.zIndex = '-100';
        graphicPage.style.animation = 'show__page .2s linear forwards';
        await waitForEvent(graphicPage, 'animationend');
        graphicPage.style.transform = 'scale(1)';
        graphicPage.style.opacity = '1';
        graphicPage.style.zIndex = '100';
    }

    if (page === 'table') {
        graphicPage.style.animation = 'hide__page .2s linear forwards';
        await waitForEvent(graphicPage, 'animationend');
        graphicPage.style.transform = 'scale(.8)';
        graphicPage.style.opacity = '0';
        graphicPage.style.zIndex = '-100';
        talbePage.style.animation = 'show__page .2s linear forwards';
        await waitForEvent(talbePage, 'animationend');
        talbePage.style.transform = 'scale(1)';
        talbePage.style.opacity = '1';
        talbePage.style.zIndex = '100';
    }
}