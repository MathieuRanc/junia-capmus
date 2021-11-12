<template>
  <div>
    {{ course }}
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

<style lang="scss" scoped></style>
