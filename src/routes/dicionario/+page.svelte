<script>
    let palavra = $state('')
    let dicionario = $state()
    let filtrados = $state([])

    function filtrar(){
        if (palavra == ''){
            filtrados = dicionario
            return
        }
        filtrados = dicionario.filter((termo) => termo.startsWith(palavra))
    }
</script>

<div class="container mt-5">
    <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Digite uma palavra..." bind:value={palavra} onchange={filtrar}>
    </div> 
    <hr>
    <ul>
        
    </ul>
</div>

<style>

</style>