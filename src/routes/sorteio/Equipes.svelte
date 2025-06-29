<script>
    let lista = $state([])
    let equipesGeradas = $state([])
    let participantesRestantes = $state([])
    let nome = $state('')
    let erro = $state('')
    let indiceEditando = $state(-1)
    let nomeEditando = $state('')
    let quantidadeEquipes = $state(2)
    let quantidadeMembros = $state(2)

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

    function gerar(){
        erro = ""
        if(lista.length < quantidadeEquipes*quantidadeMembros){
            erro = "Quantidade de participantes insuficiente para formar equipes com a configuração atual."
            return
        }
        equipesGeradas = []
        let indicesRoletados = []
        for(let i = 0; i < quantidadeEquipes; i++){
            equipesGeradas.push([])
            for(let j = 0; j < quantidadeMembros; j++){
                let random = Math.floor(Math.random() * lista.length)
                do {
                    random = Math.floor(Math.random() * lista.length)
                } while(indicesRoletados.includes(random))
                equipesGeradas[equipesGeradas.length-1].push(lista[random])
                indicesRoletados.push(random)
            }
        }
        participantesRestantes = lista.filter((_, i) => !indicesRoletados.includes(i))
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
    <button class="btn btn-primary mb-3" onclick={gerar}>GERAR EQUIPES</button>
    <div class="input-group mb-3 position-relative start-50 translate-middle-x">
        <span style="width: 78%;" class="input-group-text" id="inputGroup-sizing-default">N. de equipes</span>
        <input type="numeric" class="form-control text-center" bind:value={quantidadeEquipes}>
    </div>
    <div class="input-group mb-3 position-relative start-50 translate-middle-x">
        <span style="width: 78%;" class="input-group-text" id="inputGroup-sizing-default">N. de membros por equipe</span>
        <input type="numeric" class="form-control text-center" bind:value={quantidadeMembros}>
    </div>
    <div style="max-height:15vh;" class="container text-center overflow-auto">
        {#each equipesGeradas as equipe, i}
            <h4>Equipe {i+1}:</h4>
            <ul>
                {#each equipe as membro}
                    <li>{membro}</li>
                {/each}
            </ul>
        {/each}
        {#if participantesRestantes.length != 0}
            <h4>Participantes restantes:</h4>
            <ul>
                {#each participantesRestantes as participante}
                    <li>{participante}</li>
                {/each}
            </ul>
        {/if}
    </div>
</div>