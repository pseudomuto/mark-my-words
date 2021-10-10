<script>
  import { onMount } from 'svelte'

  export let file;
  let name;
  let html

  onMount(() => {
    ipc.onReloaded((_, entry) => {
      name = entry.name,
      html = entry.html
    })

    setTimeout(() => ipc.reload(file), 500)
  })
</script>

<main>
  {#if name}
  <h1>{name}</h1>
  <div>{@html html}</div>
  {:else}
  Loading...
  {/if}
</main>

<style>
main {
  border: 1px solid #d0d7de;
  border-radius: 6px;
  margin-left: 0;
  margin-right: 0;
}

h1 {
  font-size: 14px;
  font-weight: 600;
  padding: 8px;
}

</style>
