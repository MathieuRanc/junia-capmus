export default function ({ route, redirect }) {
  if (!route.query.id) {
    redirect({ name: 'courses' })
  }
}
