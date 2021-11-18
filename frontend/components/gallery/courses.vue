<template>
  <div v-if="courses.length > 0">
    <h3>{{ title }}</h3>
    <transition-group name="list-complete" tag="ul">
      <CardCourse
        class="list-complete-item"
        v-for="course in courses"
        :key="course.id"
        :course="course"
      />
    </transition-group>
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
  grid-template-columns: repeat(1, minmax(0, 1fr));
  @media screen and (min-width: 800px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  @media screen and (min-width: 1200px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
  @media screen and (min-width: 1500px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}
.list-complete-item {
  transition: all 1s;
  display: inline-block;
  margin-right: 10px;
}
.list-complete-enter,
.list-complete-leave-to {
  opacity: 0;
}
.list-complete-leave-active {
  position: absolute;
}
</style>
