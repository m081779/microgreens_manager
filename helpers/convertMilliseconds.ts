function convertMiliseconds (
  miliseconds: number,
  format?: 's' | 'm' | 'h' | 'd'
) {
  var days, hours, minutes, seconds, total_hours, total_minutes, total_seconds

  total_seconds = Math.floor(miliseconds / 1000)
  total_minutes = Math.floor(total_seconds / 60)
  total_hours = Math.floor(total_minutes / 60)
  days = Math.floor(total_hours / 24)

  seconds = total_seconds % 60
  minutes = total_minutes % 60
  hours = total_hours % 24

  switch (format) {
    case 's':
      return { [format]: total_seconds }
    case 'm':
      return { [format]: total_minutes }
    case 'h':
      return { [format]: total_hours }
    case 'd':
      return { [format]: days }
    default:
      return { d: days, h: hours, m: minutes, s: seconds }
  }
}

export default convertMiliseconds
