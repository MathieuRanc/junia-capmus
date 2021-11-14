<template>
  <div class="difficulty" v-if="difficulty === 1">
    <h4>Entraînement</h4>
    <div id="difficulty1">1</div>
  </div>
  <div class="difficulty" v-else-if="difficulty === 2">
    <h4>Facile</h4>
    <div id="difficulty2">2</div>
  </div>
  <div class="difficulty" v-else-if="difficulty === 3">
    <h4>Normal</h4>
    <div id="difficulty3">3</div>
  </div>
  <div class="difficulty" v-else-if="difficulty === 4">
    <h4>Examen</h4>
    <div id="difficulty4">4</div>
  </div>
  <div class="difficulty" v-else-if="difficulty === 5">
    <h4>Hardcore</h4>
    <div id="difficulty5">5</div>
  </div>
</template>

<script>
export default {
  props: {
    difficulty: {
      type: Number,
      default: 1,
    },
  },
}
</script>

<style lang="scss" scoped>
.difficulty {
  display: flex;
  align-items: center;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  #difficulty1,
  #difficulty2,
  #difficulty3,
  #difficulty4,
  #difficulty5 {
    margin-left: 10px;
    font-size: 18px;
    font-weight: 900;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    height: 40px;
    width: 40px;
  }
}
#difficulty1 {
  background-color: #397ef6;
}
#difficulty2 {
  background-color: #6dc67b;
}
#difficulty3 {
  background-color: #ff7f00;
}
#difficulty4 {
  background-color: #eb4545;
}
#difficulty5 {
  background-color: #000000;
}
</style>
