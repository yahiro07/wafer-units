<script lang="ts">
  let count: number = $state(0);
  const increment = () => {
    count += 1;
  };
</script>

<button type="button" class="counter" onclick={increment}>
  Count is {count}
</button>

<style>
  .counter {
    padding: 4px;
    background: yellow;
  }
</style>
