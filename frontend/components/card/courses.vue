<template>
  <!-- { "id": 1, "name": "Partiel", "year": 2021, "school": "ISEN", "subject": "Cybersécurité", "difficulty": 4, "type": "QCM", "owner": 22, "promo": "M1" }  -->
  <li>
    <h4>{{ course.name }}</h4>
    {{ score }}
  </li>
</template>

<script>
export default {
  props: {
    course: {
      type: Object,
      default: {},
    },
  },
  computed: {
    score() {
      return this.$auth.user.courses.find(
        (course) => course.id === this.course.id
      ).score
    },
  },
}
</script>

<style lang="scss" scoped></style>
