<template>
  <div class="container">
    <h1>
      {{ course.name }} - <b>{{ course.subject }}</b> {{ course.promo }}
      {{ course.year }}
    </h1>
    <div v-for="exercise in course.content" :key="exercise.id" class="question">
      <div v-html="$md.render(exercise.question)"></div>
      <v-if></v-if>
      <input type="checkbox" name="answers" :id="'answer' + exercise.id" />
      <label :for="'answer' + exercise.id">Voir la réponse</label>
      <div class="answer" v-html="$md.render(exercise.answer)"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      course: {},
    }
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
.question {
  margin: 0;
  margin-bottom: 30px;
}
[type='checkbox'] {
  position: absolute;
  left: -100vw;
}
</style>
