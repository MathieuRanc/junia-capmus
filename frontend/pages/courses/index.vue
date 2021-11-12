<template>
  <div>
    { "id": 1, "name": "Partiel", "year": 2021, "school": "ISEN", "subject":
    "Cybersécurité", "difficulty": 4, "type": "QCM", "owner": 22 }
    <ul>
      <nuxt-link
        v-for="course in courses"
        :key="course.id"
        :to="'courses/' + course.id"
        tag="li"
      >
        {{
          `${course.name} ${course.subject} ${course.year} ${course.difficulty} ${course.type}`
        }}
      </nuxt-link>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: mapState({
    courses(state) {
      return state.courses
    },
    subjects(state) {
      return state.subjects
    },
  }),
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
  padding: 40px;
  gap: 10px;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  li {
    cursor: pointer;
  }
}
</style>
