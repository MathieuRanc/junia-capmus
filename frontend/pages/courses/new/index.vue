<template>
  <div class="new">
    <h1>Création d’un sujet</h1>
    <form @submit.prevent="create">
      <div>
        <label for="name">Épreuve</label>
        <input v-model="body.name" type="text" name="name" id="name" required />
      </div>
      <div>
        <label for="year">Année</label>
        <input
          v-model.number="body.year"
          :min="2000"
          :max="new Date().getFullYear()"
          type="number"
          name="year"
          id="number"
          required
        />
      </div>
      <div>
        <label for="school">École</label>
        <span>
          <select v-model="body.school" name="school" id="school" required>
            <optgroup label="JUNIA">
              <option value="ISEN">ISEN</option>
              <option value="ISA">ISA</option>
              <option value="HEI">HEI</option>
            </optgroup>
          </select>
          <font-awesome-icon icon="chevron-down" />
        </span>
        <!-- <input v-model="body.school" type="text" name="school" id="school" /> -->
      </div>
      <div>
        <label for="subject">Matière</label>
        <input
          v-model="body.subject"
          type="text"
          name="subject"
          id="subject"
          required
        />
      </div>
      <div>
        <label for="difficty">Difficultée</label>
        <span>
          <select
            v-model.number="body.difficulty"
            name="difficty"
            id="difficty"
            required
          >
            <optgroup label="Difficultée">
              <option :value="1">1 - Entraînement</option>
              <option :value="2">2 - Facile</option>
              <option :value="3">3 - Normal</option>
              <option :value="4" selected>4 - Examen</option>
              <option :value="5">5 - Hardcore</option>
            </optgroup>
          </select>
          <font-awesome-icon icon="chevron-down" />
        </span>
      </div>
      <div>
        <label for="type">Type</label>
        <span>
          <select v-model="body.type" name="type" id="type" required>
            <optgroup label="Type">
              <option value="pdf">PDF</option>
              <option value="QCM">QCM</option>
              <option value="questonnary">Questionnaire</option>
            </optgroup>
          </select>
          <font-awesome-icon icon="chevron-down" />
        </span>
      </div>
      <div>
        <label for="promo">Promo</label>
        <input
          v-model="body.promo"
          type="text"
          name="promo"
          id="promo"
          required
        />
      </div>
      <div />
      <input type="submit" value="Créer un sujet" />
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      body: {
        year: new Date().getFullYear(),
        school: this.$auth.user.school,
        difficulty: 4,
        promo: this.$auth.user.promo,
      },
    }
  },
  methods: {
    async create() {
      await this.$axios
        .$post('courses', this.body)
        .then((res) =>
          this.$router.push({
            path: '/courses/new/' + this.body.type,
            query: { id: res.id },
          })
        )
    },
  },
}
</script>

<style lang="scss" scoped>
.new {
  padding: 40px;
}
form {
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  div {
    display: flex;
    flex-direction: column;
    margin-bottom: 16px;
    span {
      position: relative;
      select {
        width: 100%;
      }
      svg {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 12px;
      }
    }
  }
}
div:not(.school, .schools) {
  display: flex;
  flex-direction: column;
}
label {
  font-weight: 500;
  margin-bottom: 6px;
  font-size: 14px;
  color: #000000;
}
input,
select {
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
    margin: auto;
    margin-left: 0;
    padding: 12px 36px;
  }
}
</style>
