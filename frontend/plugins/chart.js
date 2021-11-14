import Vue from 'vue'
import { Doughnut } from 'vue-chartjs'

Vue.component('doughnut-chart', {
  extends: Doughnut,
  props: ['data', 'options'],
  mounted() {
    this.renderChart(this.data, this.options)
  },
})
