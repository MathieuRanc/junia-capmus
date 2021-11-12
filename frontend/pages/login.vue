<template>
  <div class="login">
    <h3>TOUT COMMENCE ICI</h3>
    <h1>Connection</h1>
    <p>Pas encore membre ? <nuxt-link to="register">S'inscrire</nuxt-link></p>
    <form @submit.prevent="login">
      <input
        v-model="body.username"
        type="text"
        name="username"
        id="username"
        autocomplete="username"
      />
      <input
        v-model="body.password"
        type="password"
        name="password"
        id="password"
        autocomplete="current-password"
      />
      <input type="submit" value="Se connecter" />
    </form>
  </div>
</template>

<script>
export default {
  layout: 'guest',
  data() {
    return {
      body: { username: '', password: '' },
      error: null,
    }
  },
  methods: {
    async login() {
      await this.$axios.$post('login', this.body).then((res) => {
        this.$auth.strategy.token.set(res.access_token)
        this.$router.push('dashboard')
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.login {
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
  form {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: stretch;
    div:not(.school, .schools) {
      display: flex;
      flex-direction: column;
    }
    label {
      font-weight: 500;
      font-size: 14px;
      color: #000000;
    }
    input {
      margin-bottom: 20px;
      outline: none;
      border: 1px solid #b4b4b9;
      border-radius: 10px;
      padding: 12px 16px;
      &[type='submit'] {
        cursor: pointer;
        font-weight: 800;
        font-size: 14px;
        color: white;
        border: none;
        background-color: #397ef6;
      }
    }
  }
}
.schools {
  display: flex;
  flex-direction: row;
  margin-top: 8px;
  .school {
    display: flex;
    flex-direction: row;
    justify-content: center;
    label {
      margin: 0 20px 0 2px;
    }
  }
}
</style>
