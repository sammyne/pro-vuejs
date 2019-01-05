export default {
  update(el, binding) {
    if (binding.value > 100) {
      el.classList.add('red', 'white-text')
    } else {
      el.classList.remove('red', 'white-text')
    }
  },
}
