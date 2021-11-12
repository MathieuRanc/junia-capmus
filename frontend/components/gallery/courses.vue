<template>
  <div>
    <h3>{{ title }}</h3>
    <ul>
      <CardCourses
        v-for="course in courses"
        :key="course.id"
        :course="course"
      />
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
    },
    courses: {
      type: Array,
      default: [],
    },
  },
  computed: {
    scores() {
      return this.courses
    },
  },
}
</script>

<style lang="scss" scoped></style>
