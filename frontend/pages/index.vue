<template>
  <div class="index">
    <h3>TOUT COMMENCE ICI</h3>
    <h1>Bienvenu sur JuniaCampus</h1>
    <div class="buttons">
      <nuxt-link to="register" tag="button">Créer un compte</nuxt-link>
      <nuxt-link to="login" tag="button" class="outline"
        >Se connecter</nuxt-link
      >
    </div>
  </div>
</template>

<script>
export default {
  layout: 'guest',
}
</script>

<style lang="scss" scoped>
.index {
  min-height: 100vh;
  padding: 40px;
  width: 50%;
  h3 {
    font-size: 14px;
    font-weight: 900;
    color: #bababa;
  }
  h1 {
    font-weight: 900;
    font-size: 40px;
    color: #000000;
  }
  p {
    font-weight: 500;
    font-size: 14px;
    color: #bababa;
    margin-bottom: 20px;
  }
}
.buttons {
  display: flex;
  flex-direction: column;
}
</style>
