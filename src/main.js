import Vue from 'vue'
import Vuex from 'vuex'
import BootstrapVue from "bootstrap-vue"
// import App from './App.vue';


Vue.use(Vuex);
Vue.use(BootstrapVue);



const store = new Vuex.Store({
    state: {
        modalCmp: null
    },
    mutations: {
        toggleModal (state, name) {
          this.state.modalCmp = name;
        },
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
  <div>modaL</div>
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
        this.$store.commit('toggleModal', name);
      }
    }
});

const modalCmp = new Vue({
    el: '#modal',
    name: 'modal',
    store,
    template: `
      <b-modal ref="modal" @hidden="hideModal">
        <component v-bind:is="cmp"></component>
      </b-modal>
    `,
    computed: {
      cmp () {
        return this.$store.state.modalCmp;
      }
    },
    methods: {
        hideModal () {
            this.$store.commit('toggleModal', null);
        }
    },
    watch: {
        cmp (val) {
            this.$refs.modal[val ? 'show' : 'hide']();
        }
    }
});






