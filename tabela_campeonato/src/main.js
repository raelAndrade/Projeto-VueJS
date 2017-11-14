import Vue from 'vue'
import {Time} from './time';
import _ from 'lodash';

require('style-loader!css-loader!bootstrap/dist/css/bootstrap.min.css');
require('bootstrap');
let meuVue = new Vue({
  el: '#app',
  data: {

    order:{
      keys: ['pontos', 'gm', 'gs'],
      sort: ['desc', 'desc', 'asc']
    },

    filter: '',

    colunas: ['nome', 'pontos','gm', 'gs','saldo'],

    times: [
      new Time("Palmeiras", require('./assets/Palmeiras.png')),
      new Time("América MG", require('./assets/AmericaMineiro.png')),
      new Time("Atlêtico MG", require('./assets/AtleticoMineiro.png')),
      new Time("Atlêtico PR", require('./assets/AtleticoParanaense.png')),
      new Time("Botafogo", require('./assets/Botafogo.png')),
      new Time("Chapecoense", require('./assets/Chapecoense.png')),
      new Time("Coritiba", require('./assets/Coritiba.png')),
      new Time("Cruzeiro", require('./assets/Cruzeiro.png')),
      new Time("Figueirense", require('./assets/Figueirense.png')),
      new Time("Flamengo", require('./assets/Flamengo.png')),
      new Time("Fluminense", require('./assets/Fluminense.png')),
      new Time("Grêmio", require('./assets/Gremio.png')),
      new Time("Internacional", require('./assets/Internacional.png')),
      new Time("Ponte Preta", require('./assets/PontePreta.png')),
      new Time("Santa Cruz", require('./assets/SantaCruz.png')),
      new Time("Santos", require('./assets/Santos.png')),
      new Time("São Paulo", require('./assets/SaoPaulo.png')),
      new Time("Corinthians", require('./assets/Corinthians.png')),
      new Time("Sport", require('./assets/Sport.png')),
      new Time("Vitória", require('./assets/Vitoria.png')),
    ],
    novoJogo: {
      casa: {
        time: null,
        gols: 0
      },
      fora: {
        time: null,
        gols: 0
      }
    },

    view: 'tabela',
  },

  methods: {
    fimJogo(){
      let timeAdversario = this.novoJogo.fora.time;
      let gols = +this.novoJogo.casa.gols;
      let golsAdversario = +this.novoJogo.fora.gols;
      this.novoJogo.casa.time.fimJogo(timeAdversario, gols, golsAdversario);
      this.showView('tabela');
    },
    createNovoJogo(){
      let indexCasa = Math.floor(Math.random() * 20),
          indexFora = Math.floor(Math.random() * 20);

      this.novoJogo.casa.time = this.times[indexCasa];
      this.novoJogo.casa.gols = 0;
      this.novoJogo.fora.time = this.times[indexFora];
      this.novoJogo.fora.gols = 0;
      this.showView('novojogo');
    },
    showView(view){
      this.view = view;
    },
    sortBy(coluna){
      this.order.keys = coluna;
      this.order.sort = this.order.sort == 'desc' ? 'asc' : 'desc';
    }
  },

  computed: {
    timesFiltered(){
      let colecao =  _.orderBy(this.times, this.order.keys, this.order.sort);

      return _.filter(colecao, item => {
        return item.nome.indexOf(this.filter) >= 0;
      });
    }
  },

  filters: {
    saldo(time){
      return time.gm - time.gs;
    },
    ucwords(value){
      return value.charAt(0).toUpperCase() + value.slice(1);
    }
  }

});
// meuVue.teste = "Outro valor";
// meuVue.outroVariavel = "valor";
// console.log(meuVue);
