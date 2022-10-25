<template>
  <div class="container">
    <h1>
      {{ course.name }} - <b>{{ course.subject }}</b> {{ course.promo }}
      {{ course.year }}
    </h1>
    <div v-for="exercise in course.content" :key="exercise.id" class="question">
      <div v-html="$md.render(exercise.question)" />
      {{ exercise }}
      <details v-if="exercise.answer && exercise.answer !== ''">
        <summary>
          Voir la réponse |
          <nuxt-link to="">Proposer une meilleure réponse</nuxt-link>
        </summary>
        <p class="answer" v-html="$md.render(exercise.answer)" />
      </details>
      <div v-else>
        Pas de réponse disponible |
        <nuxt-link to="">Proposer une réponse</nuxt-link>
      </div>
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
  background-color: lightgray;
}
[type='checkbox'] {
  position: absolute;
  left: -100vw;
}
label {
  display: flex;
}
.answer-button {
  background-color: rgb(98, 98, 187);
  color: white;
  padding: 16px 24px;
  margin: 0 auto;
  border-radius: 10px;
  cursor: pointer;
}
</style>
