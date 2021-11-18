<template>
  <div class="container">
    <h1>Modifier les questions</h1>
    <h2>Description</h2>
    <table>
      <thead>
        <tr>
          <th>Épreuve</th>
          <th>Année</th>
          <th>École</th>
          <th>Matière</th>
          <th>Difficultée</th>
          <th>Promo</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{{ course.name }}</td>
          <td>{{ course.year }}</td>
          <td>{{ course.school }}</td>
          <td>{{ course.subject }}</td>
          <td>{{ course.difficulty }}</td>
          <td>{{ course.promo }}</td>
        </tr>
      </tbody>
    </table>
    <h2>Questions</h2>
    <div v-if="!saved" class="save">
      <button class="cancel" @click="cancel">Annuler</button>
      <button @click="save">Sauvegarder</button>
    </div>
    <transition-group name="list" class="questions" tag="div">
      <div
        v-for="(question, i) in exercise"
        :key="question.id"
        class="question"
      >
        <button class="del" @click="remove(i)" tabindex="-1">
          <font-awesome-icon icon="trash" />
        </button>
        <div class="chevrons">
          <button v-if="i > 0" @click="swap(i - 1, i)" tabindex="-1">
            <font-awesome-icon icon="chevron-up" />
          </button>
          <button v-else tabindex="-1" disabled>
            <font-awesome-icon icon="chevron-up" />
          </button>
          <button
            v-if="i < exercise.length - 1"
            @click="swap(i, i + 1)"
            tabindex="-1"
          >
            <font-awesome-icon icon="chevron-down" />
          </button>
          <button v-else tabindex="-1" disabled>
            <font-awesome-icon icon="chevron-down" />
          </button>
        </div>
        <div class="fields">
          <div class="question-field">
            <label :for="'question' + i">Question {{ i + 1 }}</label>
            <textarea
              v-model="question.question"
              type="text"
              name="question"
              :id="'question' + i"
              autocomplete="off"
            />
          </div>
          <div class="answers">
            <label :for="'answer' + i">Réponse</label>
            <textarea
              v-model="question.answer"
              type="text"
              name="answer"
              :id="'answer' + i"
              :ref="'answer' + i"
              autocomplete="off"
            />
          </div>
        </div>
      </div>
    </transition-group>
    <div class="add">
      <font-awesome-icon
        icon="plus-circle"
        @click="
          exercise.push({
            id: nextId(),
            tips: '',
            active: true,
            answer: '',
            question: '',
            explanation: '',
          })
        "
      />
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'courses',
  data() {
    return {
      course: {},
      exercise: [],
      lastExercise: [],
      currentId: 0,
    }
  },
  computed: {
    saved() {
      return this.lastExercise == JSON.stringify(this.exercise)
    },
  },
  beforeMount() {
    if (!this.$route.query.id) {
      this.$router.push({
        path: '/courses',
      })
    }
  },
  async fetch() {
    const course = await this.$axios.$get('courses/' + this.$route.query.id)
    this.lastExercise = JSON.stringify(course.content)
    this.course = course
    this.exercise = course.content
    this.currentId = this.exercise.length + 1
  },
  methods: {
    async save() {
      await this.$axios.$patch('courses/' + this.$route.query.id, {
        content: this.exercise,
      })
      this.lastExercise = JSON.stringify(this.exercise)
    },
    nextId() {
      this.currentId += 1
      return this.currentId - 1
    },
    cancel() {
      this.exercise = JSON.parse(this.lastExercise)
    },
    correctQuestionClass(question, index) {
      if (question.multiple) {
        if (question.answers[index].correct) return 'green'
        else return ''
      } else {
        if (question.correct === index) return 'green'
        else return ''
      }
    },
    remove(i) {
      this.exercise.splice(i, 1)
    },
    swap(x, y) {
      let rows = [this.exercise[x], this.exercise[y]]
      this.exercise.splice(Math.min(x, y), 2, rows[1], rows[0])
    },
    focusAnswer(i) {
      let input = this.$refs['answer' + i]
      if (input) input[0].focus()
    },
    addAnswer(el, i, j) {
      if (el.answers.length < 6) {
        if (j + 1 === el.answers.length) {
          el.answers.splice(j + 1, 0, { text: null, correct: false })
        }
        this.$nextTick(() => {
          let input = this.$refs[`answer${i}-${j + 1}`]
          if (input) input[0].focus()
        })
      }
    },
    deleteAnswer(el, i, j) {
      if (el.answers[j].text === null) {
        if (el.answers.length > 2) {
          el.answers.splice(j, 1)
          this.$nextTick(() => {
            let input = this.$refs[`answer${i}-${j - 1}`]
            if (input) input[0].focus()
          })
        }
      } else if (el.answers[j].text === '') el.answers[j].text = null
    },
    focusInput(event, id) {
      event.getElementById(id).focus()
    },
  },
}
</script>

<style lang="scss" scoped>
textarea {
  resize: vertical;
}
.question {
  transition: all 300ms;
  display: inline-block;
  position: relative;
  // position: absolute;
  // max-height: 1000px;
  margin-bottom: 40px;
}
.list-enter,
.list-leave-to {
  opacity: 0;
  // max-height: 0;
  // position: absolute;
  margin-bottom: 0;
}
.container {
  padding: 60px;
}
h1 {
  margin-bottom: 20px;
}
h2 {
  margin-bottom: 10px;
}
table {
  width: 100%;
  margin-bottom: 40px;
  border-collapse: collapse;
  border-radius: 10px;
  background-color: #fbfbfb;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  th,
  td {
    padding: 8px 24px;
    text-align: center;
  }
}
.save {
  z-index: 100;
  position: fixed;
  top: 40px;
  right: 80px;
  button {
    margin-left: 8px;
    background-color: #6ac977;
    padding: 12px 36px;
    &:disabled {
      background-color: #b3e3ba;
      cursor: default;
    }
    &.cancel {
      background-color: white;
      border: rgb(158, 158, 158) solid 1px;
      color: rgb(158, 158, 158);
    }
  }
}
.question {
  background: #fbfbfb;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;

  display: flex;
  .del {
    margin: 0;
    position: absolute;
    top: 0;
    right: 20px;
    transform: translateY(-50%);
    border-radius: 100px;
    background-color: #f0f0f0;
    aspect-ratio: 1/1;
    color: #c51948;
  }
  .chevrons {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    button {
      margin: 0;
      background: none;
      color: rgb(136, 136, 136);
      transition: background-color 500ms;
      &:disabled {
        color: lightgray;
      }
    }
  }
  .fields {
    transition: all 500ms;
    padding: 20px;
    padding-left: 10px;
    border-left: solid 1px lightgray;
    flex-grow: 1;
    label {
      font-weight: 500;
      font-size: 14px;
    }
    .question-field {
      display: flex;
      flex-direction: column;
      width: 100%;
    }
    input,
    textarea {
      padding: 16px 24px;
      background-color: #ffffff;
      border: 1px solid #b4b4b9;
      border-radius: 4px;
    }
  }
}
input,
textarea {
  outline-color: rgb(158, 158, 158);
}
.answers {
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(1, minmax(0, 1fr));

  padding-top: 16px;
  .answer {
    display: flex;
    input[type='text'],
    textarea {
      transition: all 200ms;
      flex-grow: 1;
      &.green {
        border-color: #6ac977;
        color: white;
        background-color: #6ac977;
        outline-color: #459e51;
      }
    }
    .check {
      margin: auto;
      margin-left: 10px;
    }
  }
}
.add {
  text-align: center;
  margin-bottom: 100px;
  svg {
    text-align: center;
    cursor: pointer;
    font-size: 40px;
    color: #459e51;
    transition: color 200ms;
    &:hover {
      color: #2c7c37;
    }
    &:not(:last-child) {
      margin-right: 20px;
    }
  }
}
</style>
