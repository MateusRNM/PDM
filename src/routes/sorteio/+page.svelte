<script>
    import Numeros from "./Numeros.svelte";
    import Dados from "./Dados.svelte";
    let aba = $state(0)
</script>

<div class="btn-group mt-3 position-absolute start-50 translate-middle-x" role="group" aria-label="Basic radio toggle button group">
    <input type="radio" class="btn-check" name="btnradio" id="btnradio1" autocomplete="off" checked onchange={() => aba = 0}>
    <label class="btn btn-outline-primary" for="btnradio1">Números</label>
    <input type="radio" class="btn-check" name="btnradio" id="btnradio2" autocomplete="off" onchange={() => aba = 1}>
    <label class="btn btn-outline-primary" for="btnradio2">Dados</label>
</div>

<div style="top: 18%;" class="container position-absolute start-50 translate-middle-x">
    {#if aba == 0}
        <Numeros/>
    {:else if aba == 1}
        <Dados/>
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
</style>