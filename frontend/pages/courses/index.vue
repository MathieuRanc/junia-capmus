<template>
  <div class="container">
    <h1>Mes cours</h1>
    <ul>
      <CardCourse v-for="course in courses" :key="course.id" :course="course" />
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: mapState({
    courses(state) {
      return state.courses.filter(
        (course) => course.owner === this.$auth.user.id
      )
    },
  }),
  methods: {
    score(course) {
      const score = this.$auth.user.courses.find(
        (userCourse) => userCourse && userCourse.id === course.id
      )
      return score ? score.id : 0
    },
  },
  async fetch() {
    const courses = await this.$axios.$get('courses')
    const subjects = await this.$axios.$get('subjects')
    this.$store.commit('setCourses', courses)
    this.$store.commit('setSubjects', subjects)
  },
}
</script>

<style lang="scss" scoped>
ul {
  list-style: none;
  padding: 0;
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(2, minmax(0, 1fr));
}
</style>
