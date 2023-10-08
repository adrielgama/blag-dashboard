export function formatViews(views: number) {
  if (views >= 1000 && views < 1000000) {
    return (views / 1000).toFixed(1) + 'k'
  } else if (views >= 1000000) {
    return (views / 1000000).toFixed(1) + 'm'
  } else {
    return views.toString()
  }
}
