let tabs = document.querySelector('.tabs');
let tabButtons = tabs.querySelectorAll('[role="tab"]');
let tabPanels = Array.from(tabs.querySelectorAll('[role="tabpanel"]'));

document.onload = loadinAnimaion();

function loadinAnimaion() {
    let loading = document.querySelector('.loading');
    let fadeEffect = setInterval(function () {
        if (!loading.style.opacity) {
            loading.style.opacity = 1;
        }
        if (loading.style.opacity > 0) {
            loading.style.opacity -= 0.1;
            if (loading.style.opacity == 0) {
                loading.classList.add('hidden')
            }

        } else {
            clearInterval(fadeEffect);
        }
    }, 250);
}



function handleTabClick(event) {
    //hide all tab panels
    tabPanels.forEach(function (panel) {
        panel.hidden = true
    })

    //mark all tabs as un selected
    tabButtons.forEach(button => {
        button.setAttribute('aria-selected', 'false')
    })
    //mark the clicked tab as selected
    event.currentTarget.setAttribute('aria-selected', 'true')

    //find the associated tab panel an show it
    let id = event.currentTarget.id;

    let tabPanel = tabPanels.find(panel => panel.getAttribute('aria-labelledby') === id);
    tabPanel.hidden = false;
}

tabButtons.forEach(button => button.addEventListener('click', handleTabClick))