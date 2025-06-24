<script>
    import Numeros from "./Numeros.svelte";
    let aba = $state(0)
</script>

<div class="btn-group mt-3 position-absolute start-50 translate-middle-x" role="group" aria-label="Basic radio toggle button group">
    <input type="radio" class="btn-check" name="btnradio" id="btnradio1" autocomplete="off" checked onchange={() => aba = 0}>
    <label class="btn btn-outline-primary" for="btnradio1">Números</label>
</div>

<div style="top: 18%;" class="container position-absolute start-50 translate-middle-x">
    {#if aba == 0}
        <Numeros/>
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