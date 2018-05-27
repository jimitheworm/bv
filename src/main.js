import Vue from 'vue'
import Vuex from 'vuex'
// import App from './App.vue';


Vue.use(Vuex);



const store = new Vuex.Store({
    state: {
        modalCmp: null
    },
    mutations: {
        showModal (state, name) {
          this.state.modalCmp = name;
        }
    }
})

const test = Vue.component('test', {
  template: `<a href="" @click.prevent="consoleLog">test</a>`,
    methods: {
      consoleLog () {
        console.log('test');
      }
    }
});

const modal = Vue.component('modal', {
    template: `
  <b-modal>
  <component v-bind:is="current"></component>
</b-modal>
  `,
    computed: {
      current () {
        console.log(this.$store.state.modalCmp);
        return this.$store.state.modalCmp;
      }
    }
})


const app = new Vue({
    el: '#app',
    // provide the store using the "store" option.
    // this will inject the store instance to all child components.
    store,
    template: `
    <div class="app">
      <a href="" @click.prevent="showModal('modal')">show</a>
    </div>
  `,
    methods: {
      showModal (name) {
        this.$store.commit('showModal', name);
      }
    }
});

const modalCmp = new Vue({
    el: '#modal',
    name: 'modal',
    store,
    template: `<div>{{ cmp }}</div>`,
    computed: {
      cmp () {
        return this.$store.state.modalCmp;
      }
    }
});






