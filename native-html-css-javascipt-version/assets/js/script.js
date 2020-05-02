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