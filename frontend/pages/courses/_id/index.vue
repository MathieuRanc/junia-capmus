<template>
  <div class="container">
    <!-- {{ course }}
    <hr />
    {{ $auth.user }}
    <hr />
    {{ score }}
    <hr /> -->
    <h1>
      {{ course.name }} - <b>{{ course.subject }}</b> {{ course.promo }}
      {{ course.year }}
    </h1>
    <client-only>
      <doughnut-chart
        class="chart"
        :data="{
          datasets: [
            {
              data: [score, 100 - score],
              backgroundColor: ['#6dc67b', '#deede4'],
              hoverOffset: 4,
            },
          ],
        }"
      />
    </client-only>
    <nuxt-link :to="course.id + '/test'">Commencer</nuxt-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      course: {},
    }
  },
  computed: {
    score() {
      const score = this.$auth.user.courses.find(
        (userCourse) => userCourse && userCourse.id === this.course.id
      )
      return score ? score.id : 0
    },
  },
  async fetch() {
    this.course = await this.$axios.$get('courses/' + this.$route.params.id)
  },
}
</script>

<style lang="scss" scoped>
h1 {
  font-weight: 500;
  b {
    font-weight: 900;
  }
}
.chart {
  max-height: 100px;
  max-width: 100px;
}
</style>
