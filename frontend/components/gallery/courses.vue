<template>
  <div>
    <h3>{{ title }}</h3>
    <ul>
      <CardCourse v-for="course in courses" :key="course.id" :course="course" />
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
}
</script>

<style lang="scss" scoped>
h3 {
  margin: 20px 0 10px 0;
}
ul {
  list-style: none;
  padding: 0;
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  @media screen and (max-width: 800px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  @media screen and (max-width: 1000px) {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
}
</style>
