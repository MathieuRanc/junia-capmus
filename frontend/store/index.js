export const state = () => ({
  courses: [],
  subjects: [],
  schools: [],
})

export const mutations = {
  setCourses(state, courses) {
    state.courses = courses
  },
  setSubjects(state, subjects) {
    state.subjects = subjects
  },
  setSchools(state, schools) {
    state.schools = schools
  },
}

export const getters = {
  isAuthenticated(state) {
    return state.auth.loggedIn
  },

  loggedInUser(state) {
    return state.auth.user
  },
}
