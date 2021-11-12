<template>
  <div class="register">
    <h3>TOUT COMMENCE ICI</h3>
    <h1>S’inscrire à JuniaCampus</h1>
    <p>Déja membre ? <nuxt-link to="login">Se connecter</nuxt-link></p>
    <form @submit.prevent="register">
      <div>
        <label for="username">Nom d'utilisateur</label>
        <input
          v-model="body.username"
          type="text"
          name="username"
          id="username"
          autocomplete="given-name"
          placeholder="exemple"
        />
      </div>
      <div>
        <label for="email">Email</label>
        <input
          v-model="body.email"
          type="text"
          name="email"
          id="email"
          autocomplete="username"
          placeholder="exemple@student.junia.com"
        />
      </div>
      <div>
        <label>École</label>
        <div class="schools">
          <div v-for="(school, i) in schools" :key="i" class="school">
            <input
              v-model="body.school"
              type="radio"
              name="school"
              :id="school"
              :value="school"
            />
            <label :for="school">{{ school }}</label>
          </div>
        </div>
      </div>
      <div>
        <label for="password">Mot de passe</label>
        <input
          v-model="body.password"
          type="password"
          name="password"
          id="password"
          autocomplete="new-password"
          placeholder="Le mot de passe doit contenir au moins 8 caractères"
        />
      </div>
      <div>
        <label for="confirm-password">Confirmer le mot de passe</label>
        <input
          v-model="body.confirmPassword"
          type="password"
          name="confirm-password"
          id="confirm-password"
          autocomplete="new-password"
          placeholder="Merci de confirmer ton mot de passe"
        />
      </div>
      <input type="submit" value="Créer un compte" />
    </form>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  layout: 'guest',
  computed: mapState({
    schools(state) {
      return state.schools
    },
  }),
  async fetch() {
    const schools = await this.$axios.$get('schools')
    this.$store.commit('setSchools', schools)
  },
  data() {
    return {
      body: {},
      otherSchool: null,
    }
  },
  methods: {
    register() {
      if (
        this.body.username &&
        this.body.email &&
        this.body.password &&
        this.body.confirmPassword &&
        this.body.school &&
        this.body.password.length > 8 &&
        this.body.password === this.body.confirmPassword
      ) {
        let data = (({ username, email, password, school }) => ({
          username,
          email,
          password,
          school,
        }))(this.body)
        if (data.school === 'other') {
          data.school = this.otherSchool
        }
        console.log(data)

        this.$axios
          .$post('register', data)
          .then(() => this.$router.push('/register/confirm'))
          .catch((err) => log.error(err))
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.register {
  width: 50%;
  min-height: 100vh;
  padding: 40px;
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
  margin: 8px 0 20px 0;
  .school {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    label {
      margin-right: 20px;
      padding-left: 4px;
      cursor: pointer;
    }
    input {
      cursor: pointer;
      margin: 0;
    }
  }
}
</style>
