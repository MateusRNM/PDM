<script>
    import { dicionario } from "$lib/dicionario";
    let palavra = $state('')
    let filtrados = $state(dicionario.keys())

    function filtrar(){
        if (palavra == ''){
            filtrados = dicionario.keys()
            return
        }
        filtrados = dicionario.keys().filter((termo) => termo.startsWith(palavra))
    }
</script>

<div class="container mt-5">
    <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Digite uma palavra..." bind:value={palavra} oninput={filtrar}>
    </div> 
    <hr>
    <div style="height:65vh;" class="container overflow-auto">
        <ul class="list-group">
            <center>
                {#each filtrados as palavra}
                    <li class="list-group-item"><a href={`/dicionario/${palavra}`} >{palavra}</a></li>
                {/each}
            </center>
        </ul>
    </div>
</div>

<style>
    @font-face {
        font-family: 'fonte';
        src: url('../../lib/fonts/font.otf');
    }
    a {
        text-decoration: none;
        color: rgb(255, 255, 255);
    }
    * {
        font-family: fonte;
    }
</style>