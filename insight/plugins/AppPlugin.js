import Vue from 'vue';
import VueQuillEditor from 'vue-quill-editor';
import VueLazyload from 'vue-lazyload'
import Vuex from "vuex";
import {Cropper} from 'vue-advanced-cropper';
import Hammer from '@/node_modules/hammerjs/hammer.js';
import html2canvas from "html2canvas";
import Quill from '@/node_modules/quill/dist/quill.js';
import Vueditor from "vueditor";
import 'vueditor/dist/style/vueditor.min.css';

Vue.use(VueQuillEditor);
Vue.use(VueLazyload);
Vue.use(Cropper);
Vue.use(Vuex)
let editorConfig = {
    toolbar: ['fontName','fontSize','foreColor','backColor'],
    fontName:[
        {val:'Lato'},
        {val: 'Muli'},
        {val: 'Montserrat'}
    ],
    fontSize:['0.875rem, 1rem, 1.125rem, 1.25rem']
};
Vue.use(Vueditor, editorConfig);