<template>
  <div v-if="$auth.user" class="container">
    <h1>Salut {{ $auth.user.username }} 👋</h1>
    <h2>Chaud pour réviser ?</h2>
    <GalleryCourses title="Favorits" :courses="favoritesCourses" />
    <GalleryCourses title="Mes sujets" :courses="suggestedCourses" />
    <GalleryCourses title="Autres sujets" :courses="otherCourses" />
  </div>
</template>

<script>
export default {
  computed: {
    favorites() {
      return this.$auth.user.courses
        .filter((course) => course.favorite)
        .map((course) => course.id)
    },
    favoritesCourses() {
      return this.$store.state.courses.filter((course) =>
        this.favorites.includes(course.id)
      )
    },
    suggestedCourses() {
      this.$store.state.courses
      return this.$store.state.courses.filter(
        (course) =>
          !this.favorites.includes(course.id) &&
          course.promo === this.$auth.user.promo &&
          course.school === this.$auth.user.school
      )
    },
    otherCourses() {
      return this.$store.state.courses.filter(
        (course) =>
          !this.favorites.includes(course.id) &&
          (course.promo !== this.$auth.user.promo ||
            course.school !== this.$auth.user.school)
      )
    },
  },
  async fetch() {
    const courses = await this.$axios.$get('courses')
    this.$store.commit('setCourses', courses)
  },
}
</script>

<style lang="scss" scoped></style>
