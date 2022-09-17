import inView from "in-view";

inView.offset(-200);
inView('.swiper')
    .once('enter', () => {
        import(/* webpackChunkName: 'swiper-styles' */ './index.scss');
        import(/* webpackChunkName: 'swiper-script' */ './js/swiper.component.js').then((module) =>{
            module.initComponent();
        });
});
