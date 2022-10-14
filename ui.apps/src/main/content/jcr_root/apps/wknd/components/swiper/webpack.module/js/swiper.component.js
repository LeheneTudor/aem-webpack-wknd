import Swiper from 'swiper';

function initComponent() {
    const swiper = new Swiper('.swiper');
    const slides = [...document.querySelectorAll('.swiper-slide')];

    slides.forEach(slide => {
        slide.addEventListener('click', async () => {
            const lgModule = await import(/* webpackChunkName: 'lightgallery-module' */ './swiper.lightgallery');

            lgModule.initGallery(swiper)
        })
    })
}

export {
    initComponent
}