import Vue from 'vue'
import { Doughnut } from 'vue-chartjs'

const options = {
  cutoutPercentage: 80,
  aspectRatio: 1,
  responsive: true,
  elements: {
    arc: {
      borderWidth: 0,
    },
  },
  tooltips: { enabled: false },
  hover: { mode: null },
}

Vue.component('doughnut-chart', {
  extends: Doughnut,
  props: ['data'],
  mounted() {
    this.renderChart(this.data, options)
  },
})
