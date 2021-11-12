<template>
  <div class="page">
    <div class="hero">
      <div class="title">
        <h2>JuniaCampus.</h2>
        <p>
          Tout ce dont tu as besoin pour réussir tes partiels<br />
          centralisé dans un seul endroit<br />
          JuniaCampus c’est aussi un projet gratuit, open source et
          collaboratif<br />
          Accéder au <a href="">GitHub</a> pour collaborer sur le projet
        </p>
      </div>
      <img src="../assets/illustration_accueil.svg" alt="" />
    </div>
    <Nuxt />
  </div>
</template>

<script>
export default {
  layout: 'guest',
}
</script>

<style lang="scss" scoped>
.page {
  display: flex;
  min-height: 100vh;
}
.hero,
.register {
  width: 50%;
}
.hero {
  background-color: #f7faff;
  display: flex;
  flex-direction: column;
  padding: 60px;
  justify-content: space-between;
  .title {
    padding: 0 40px;
    h2 {
      color: #397ef6;
      font-size: 30px;
      font-weight: 900;
      margin-bottom: 20px;
    }
    p {
      font-size: 14px;
      color: #bababa;
      font-weight: 500;
    }
  }
}
</style>
