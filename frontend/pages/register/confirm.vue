<template>
  <div>
    <img src="../../assets/3d-fluency-email-send.png" alt="plane mail" />
    <p>
      Veuillez confirmer votre mail en cliquant sur le lien envoyé sur votre
      mail, il est possible que le mail se retrouve dans les indésirables ou les
      spams
    </p>
    <nuxt-link to="/login" tag="button">Se connecter</nuxt-link>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
div {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}
img {
  height: 50px;
  width: 50px;
  object-fit: contain;
  position: relative;
  animation-name: send;
  animation-duration: 3s;
  animation-timing-function: cubic-bezier(1, 0, 1, 1);
  transform: translate(50vw, -50vh);
}
@keyframes send {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(50vw, -50vh);
  }
}
</style>
