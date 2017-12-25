import Vue from 'vue';
import SimpleForm from './components/SimpleForm.vue';

const app = new Vue({
  el: '#app',
  components: {
    SimpleForm,
  },
  template: `
  <SimpleForm />
  `
});