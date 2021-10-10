import FileWindow from './FileWindow.svelte'

export default new FileWindow({
  target: document.body,
  props: {
    file: document.location.hash.substring(1)
  }
})
