<template>
  <Nuxt />
</template>

<script>
export default {}
</script>

<style lang="scss">
html {
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  scroll-behavior: smooth;
  overflow-x: hidden;
}
html,
textarea {
  font-family: 'avenir', sans-serif;
}
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}
body {
  margin: 0;
}
h1 {
  font-weight: 900;
  font-size: 40px;
}
a {
  text-decoration: none;
  color: #397ef6;
}
select {
  -webkit-appearance: none;
  -moz-appearance: none;
  text-indent: 1px;
  text-overflow: '';
  position: relative;
}
button {
  cursor: pointer;
  outline: none;
  border: none;
  background-color: #397ef6;
  font-weight: 800;
  font-size: 14px;
  color: #ffffff;
  margin-top: 20px;
  border-radius: 10px;
  padding: 12px 16px;
  &.outline {
    border: solid 1px #397ef6;
    background-color: white;
    color: #397ef6;
  }
}
.container {
  padding: 40px;
}
</style>
