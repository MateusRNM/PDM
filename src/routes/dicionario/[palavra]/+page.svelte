<script>
    import { dicionario } from "$lib/dicionario";
    import { page } from "$app/state";
	import { goto } from "$app/navigation";
    let palavra = $state(page.params.palavra)
    let definicoes = $state(dicionario.get(palavra))
</script>

{#if definicoes}
    <center>
        <h3 class="mt-5 mb-5">{palavra}</h3>
        <h3>DEFINIÇÕES:</h3>
    </center>

    <div style="height: 51vh;" class="container overflow-auto mt-3">
        <ol class="list-group list-group-numbered">
            {#each definicoes as definicao}
                <li class="list-group-item"><p class="mb-3">{definicao}</p></li>
            {/each}
        </ol>
    </div>
{:else}
    <center><h4 class="mt-5">PALAVRA "{palavra}" NÃO ENCONTRADA.</h4></center>
{/if}

<button type="button" class="btn btn-primary position-absolute start-50 translate-middle-x mt-3" onclick={() => goto('/dicionario/')}>VOLTAR</button>

<style>
    @font-face {
        font-family: 'fonte';
        src: url('../../../lib/fonts/font.otf');
    }
    * {
        font-family: 'fonte';
    }
    p {
        text-align: justify;
    }
    button {
        font-family: 'fonte';
        width: 35%;
        height: 6vh;
    }
</style>