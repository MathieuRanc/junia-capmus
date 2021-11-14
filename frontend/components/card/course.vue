<template>
  <nuxt-link v-if="course" class="course" :to="'courses/' + course.id" tag="li">
    <div class="score">
      <doughnut-chart
        class="chart"
        :data="{
          datasets: [
            {
              data: [score(course), 100 - score(course)],
              backgroundColor: ['#6dc67b', '#deede4'],
              hoverOffset: 4,
            },
          ],
        }"
        :options="chartOptions"
      />
      <div>{{ score(course) }}%</div>
    </div>
    <div class="description">
      <h3>{{ course.subject }}</h3>
      <div class="infos">
        <div>
          <font-awesome-icon icon="graduation-cap" />
          <span>{{ course.type }}</span>
        </div>
        <div>
          <font-awesome-icon icon="calendar-alt" />
          <span>{{ course.year }}</span>
        </div>
        <div>
          <font-awesome-icon icon="users" />
          <span>{{ course.promo }}</span>
        </div>
        <div>
          <font-awesome-icon icon="school" />
          <span>{{ course.school }}</span>
        </div>
      </div>
      <div class="bottom">
        <button>Ouvrir</button>
        <Difficulty :difficulty="course.difficulty" />
      </div>
    </div>
  </nuxt-link>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: {
    course: {
      type: Array,
      default: null,
    },
  },
  data() {
    return {
      chartOptions: {
        cutoutPercentage: 80,
        aspectRatio: 1,
        responsive: true,
        elements: {
          arc: {
            borderWidth: 0,
          },
        },
        tooltips: { enabled: false },
        hover: { mode: null },
      },
    }
  },
  methods: {
    score(course) {
      const score = this.$auth.user.courses.find(
        (userCourse) => userCourse && userCourse.id === course.id
      )
      return score ? score.id : 0
    },
  },
}
</script>

<style lang="scss" scoped>
ul {
  li {
    cursor: pointer;
  }
}
.course {
  background-color: #f9f8fd;
  box-shadow: 10px 10px 20px 2px rgba(149, 143, 174, 0.35);
  border-radius: 10px;

  padding: 20px;
  display: flex;
  h3 {
    margin-bottom: 10px;
  }
  .infos {
    color: #bababa;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    div {
      margin-bottom: 10px;
    }
    svg {
      position: absolute;
      transform: translateX(calc(-50% + 8px));
    }
    span {
      margin-left: 20px;
      margin-right: 20px;
    }
  }
  .score {
    margin-right: 10px;
    text-align: center;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    div {
      font-style: normal;
      font-weight: 500;
      font-size: 30px;
      color: #44994c;
    }
  }
  .chart {
    height: 100px;
    width: 100px;
  }
  .description {
    flex-grow: 1;
    button {
      background-color: #6ac977;
      border-radius: 4px;
      padding: 10px 36px;
      font-size: 18px;
      font-style: normal;
      font-weight: 200;
    }
  }
  .bottom {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }
}
</style>
