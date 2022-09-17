import Swiper from 'swiper';


function initComponent() {
    new Swiper('.swiper');
    console.log('loading...')
}

export {
    initComponent
}