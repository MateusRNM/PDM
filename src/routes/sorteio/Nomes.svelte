<script>
    let lista = $state([])
    let roletados = $state([])
    let nome = $state('')
    let erro = $state('')
    let indiceEditando = $state(-1)
    let nomeEditando = $state('')
    let removerRoletados = $state(false)
    let quantidade = $state(1)

    function adicionar(){
        erro = ""
        if(nome == ''){
            erro = "Digite algo!"
            return
        }
        lista.push(nome)
        nome = ""
    }

    function editar(){
        if(nomeEditando == ''){
            erro = "Digite algo!"
            return
        }
        lista[indiceEditando] = nomeEditando
        indiceEditando = -1
    }

    function remover(i){
        lista.splice(i, 1)
    }

    function roletar(){
        if(quantidade > lista.length){
            erro = "Quantidade de nomes menor do que a quantidade desejada."
            return
        } else if(quantidade <= 0){
            erro = "Digite uma quantidade maior do que 0."
            return
        }
        erro = ""
        roletados = []
        for(let i = 0; i < quantidade; i++){
            let random = Math.floor(Math.random() * lista.length)
            roletados.push(lista[random])
            if(removerRoletados){
                lista.splice(random, 1)
            }
        }
    }
</script>

<div class="container text-center">
    <div class="input-group mb-3">
        <span class="input-group-text" id="inputGroup-sizing-default">Nome</span>
        <input type="text" class="form-control" bind:value={nome} onkeypress={(e) => {if(e.key == 'Enter'){adicionar()}}}>
        <button class="btn btn-success" onclick={adicionar}>+</button>
    </div>
    {#if erro != ''}<p style="color:red;">{erro}</p>{/if}
    <hr>
    <div style="max-height:15vh;" class="container text-center overflow-auto">
        {#each lista as item, i}
            <div class="input-group mb-2">
                {#if i != indiceEditando}
                    <input type="text" class="form-control" value={item} readonly>
                    <button class="btn btn-warning" onclick={() => {indiceEditando = i; nomeEditando = item;}}><i class="bi bi-pencil-fill"></i></button>
                    <button class="btn btn-danger" onclick={() => remover(i)}>-</button>
                {:else}
                    <input type="text" class="form-control" bind:value={nomeEditando} onkeypress={(e) => {if(e.key == 'Enter'){editar()}}}>
                    <button class="btn btn-danger" onclick={() => indiceEditando = -1}><i class="bi bi-x-lg"></i></button>
                    <button class="btn btn-success" onclick={editar}><i class="bi bi-check-lg"></i></button>
                {/if}
            </div>
        {/each}
    </div>
    {#if lista.length != 0}<hr>{/if}
    <button class="btn btn-primary mb-3" onclick={roletar}>ROLETAR</button>
    <div style="width:60%;" class="input-group mb-3 position-relative start-50 translate-middle-x">
        <span class="input-group-text" id="inputGroup-sizing-default">Quantidade</span>
        <input type="numeric" class="form-control text-center" bind:value={quantidade}>
    </div>
    <div class="form-check position-relative start-50 translate-middle-x">
        <input class="form-check-input" type="checkbox" id="checkDefault" bind:checked={removerRoletados}>
        <label class="form-check-label" for="checkDefault">Remover nomes roletados</label>
    </div>
    <div style="max-height:15vh;" class="container text-center overflow-auto">
        <ul>
            {#each roletados as item}
                <li>{item}</li>
            {/each}
        </ul>
    </div>
</div>