import './scss/component-webpack-template.basic.scss';
import { qsa } from 'js/helpers';

const component = qsa('[data-js="component-webpack-template"]');

if (component.length) {
    import(/* webpackChunkName: 'component-webpack-example-styles' */ './index.scss');

    component.forEach(async () => {
        const exampleComponentModule = await import(
            /* webpackChunkName: 'component-webpack-example-js' */ './js/component-webpack-template.component'
        );

        exampleComponentModule.initComponent();
    });
}