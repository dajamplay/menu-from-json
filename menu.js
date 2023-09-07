const rootElementMenu = document.querySelector('#menu');
const menuStates = Array();
const menuTitleStates = Array();
const delayAnimate = 700;
const animation = animator();

async function fetchMenuItems() {

    renderCloseButton();

    const loadingElem = renderLoading();

    const dataMenu = await getMenuFromFakeApi(3000);

    removeElem(loadingElem);

    renderMenu(dataMenu);
}

function renderMenu(jsonMenu, prevItemTitle) {

    resetMenu(jsonMenu);

    renderCloseButton();

    renderContactsLink();

    if (menuStates.length > 0) renderPrevButton();

    const menuTitle = (prevItemTitle !== undefined) ? prevItemTitle : 'Каталог';
    renderMenuTitle(menuTitle.toUpperCase());

    renderList(jsonMenu);

    animation.fade.in(document.querySelector('.menu__title'));
    animation.slide.in(document.querySelector('.menu__list'));
}

function resetMenu(currentMenu) {
    rootElementMenu.innerHTML = '';
}

function renderLoading() {
    const loadingElem = document.createElement('span');
    loadingElem.classList.add('loader');
    rootElementMenu.appendChild(loadingElem);
    return loadingElem;
}

function removeElem(elem) {
    elem.remove();
}

function renderList(jsonMenu) {
    const ul = document.createElement("ul");

    ul.classList.add('menu__list');

    jsonMenu.forEach( (item) => {

        if (item.children !== undefined) {
            renderMenuItemWithChildren(ul, item, jsonMenu)
        } else {
            renderMenuItem(ul, item);
        }

    });

    rootElementMenu.appendChild(ul);
}

function renderMenuItem(ul, item) {
    const li = document.createElement("li")
    const a = document.createElement("a")

    a.href = item.url;
    a.text = item.title;
    a.classList.add('menu__list__item');

    li.appendChild(a);
    ul.appendChild(li);
}

function renderMenuItemWithChildren(ul, item, jsonMenu) {
    const li = document.createElement("li")
    const a = document.createElement("a")
    const aNext = document.createElement("a")

    a.href = item.url;
    a.text = item.title;
    a.classList.add('menu__list__item');

    aNext.text = ' >>>';
    aNext.classList.add('menu__list__item__next-link');
    aNext.addEventListener( 'click' , (e) => {
        e.preventDefault();

        menuStates.push(jsonMenu);
        menuTitleStates.push(item.title);

        animation.fade.out(document.querySelector('.menu__title'))
        animation.slide.right(document.querySelector('.menu__list')).then( () => renderMenu(item.children, item.title));

    });

    li.appendChild(a);
    li.appendChild(aNext);
    ul.appendChild(li);
}

function renderPrevButton() {
    const prev = document.createElement("a");

    prev.text = '< Вернуться назад';

    prev.classList.add('menu__prev-link');

    prev.addEventListener( 'click', (e) => {
        e.preventDefault();
        menuTitleStates.pop();
        const menuTitleArray = menuTitleStates[menuTitleStates.length - 1];

        animation.fade.out(document.querySelector('.menu__title'));
        animation.slide.left(document.querySelector('.menu__list')).then(() => renderMenu(menuStates.pop(), menuTitleArray));
    });

    rootElementMenu.appendChild(prev);
}

function renderCloseButton() {
    const closeBtn = document.createElement("a");

    closeBtn.text = "Закрыть |||";
    closeBtn.classList.add('menu__close-menu-btn');
    closeBtn.addEventListener( 'click', (e) => {
        e.preventDefault();
        animation.menu.close(rootElementMenu);
    })

    rootElementMenu.appendChild(closeBtn);
}

function renderContactsLink() {
    const a = document.createElement("a");

    a.text = "Наши контакты".toUpperCase();
    a.classList.add('menu__contacts-link');

    rootElementMenu.appendChild(a);
}

function renderMenuTitle(text) {
    const title = document.createElement("span");

    title.innerText = text;
    title.classList.add('menu__title');

    rootElementMenu.appendChild(title);
}

function showMenu() {
    animation.menu.open(rootElementMenu);
}

// Animation
function animator() {
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

    return {
        slide: {
            left: async (elem) => {
                if (elem === null) return;
                elem.classList.remove('animate--slide--in');
                elem.classList.remove('animate--slide--right');
                elem.classList.add('animate--slide--left');
                elem.style.left = '-100vw';
                await delay(delayAnimate);
            },
            right: async (elem, cb) => {
                if (elem === null) return;
                elem.classList.remove('animate--slide--in');
                elem.classList.remove('animate--slide--right');
                elem.classList.add('animate--slide--right');
                elem.style.left = '200vw';
                await delay(delayAnimate);
            },
            in: async (elem, cb) => {
                if (elem === null) return;
                elem.classList.remove('animate--slide--left');
                elem.classList.remove('animate--slide--right');
                elem.classList.add('animate--slide--in');
                elem.style.left = '15px';
                await delay(delayAnimate);
            }
        },
        fade: {
            in: async (elem) => {
                if (elem === null) return;
                elem.style.opacity = '100%';
                elem.classList.add('animate--fade--in');
                await delay(delayAnimate);
            },
            out: async (elem, cb) => {
                if (elem === null) return;
                elem.style.opacity = '0%';
                elem.classList.add('animate--fade--out');
                await delay(delayAnimate);
            }
        },
        menu : {
            open: (elem) => {
                elem.classList.remove('animate--menu--open');
                elem.classList.remove('animate--menu--close');
                elem.classList.add('animate--menu--open');
                elem.style.left = '0vw';
            },
            close: (elem) => {
                elem.classList.remove('animate--menu--open');
                elem.classList.remove('animate--menu--close');
                elem.classList.add('animate--menu--close');
                elem.style.left = '-100vw';
            }
        }
    }
}

fetchMenuItems().then( () => {
    console.log('Menu is loaded.');
});