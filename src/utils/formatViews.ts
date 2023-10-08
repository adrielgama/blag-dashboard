export function formatViews(views: number) {
  if (views === 0) {
    return '0'
  } else if (views >= 1000 && views < 1000000) {
    return (views / 1000).toFixed(1) + 'k'
  } else if (views >= 1000000) {
    return (views / 1000000).toFixed(1) + 'm'
  } else {
    return views.toString().padStart(2, '0')
  }
}
