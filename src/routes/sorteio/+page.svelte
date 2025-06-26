<script>
    import Numeros from "./Numeros.svelte";
    import Dados from "./Dados.svelte";
    import Moeda from "./Moeda.svelte";
    import Nomes from "./Nomes.svelte";
    import Roleta from "./Roleta.svelte";
    let aba = $state(0)
</script>

<select class="form-select mb-3 mt-3" bind:value={aba}>
  <option value={0}>Números</option>
  <option value={1}>Dados</option>
  <option value={2}>Girar Moeda</option>
  <option value={3}>Nomes</option>
  <option value={4}>Roleta</option>
</select>

<div style="top: 18%;" class="container position-absolute start-50 translate-middle-x">
    {#if aba == 0}
        <Numeros/>
    {:else if aba == 1}
        <Dados/>
    {:else if aba == 2}
        <Moeda/>
    {:else if aba == 3}
        <Nomes/>
    {:else if aba == 4}
        <Roleta/>
    {/if}
</div>

<style>
    @font-face {
        font-family: 'font';
        src: url('../../lib/fonts/font.otf');
    }
    * {
        font-family: 'font';
        font-weight: 100;
    }
    label {
        font-size: 15px;
    }
</style>