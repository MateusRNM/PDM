<script>
    let qtd = $state(1)
    let min = $state(0)
    let max = $state(1000000)
    let apenasint = $state(true)
    let nums = $state([])

    function gerar(){
        nums = []
        for(let i = 0; i < qtd; i++){
            let num = Math.random() * (max - min + 1) + min
            num = Number(num.toFixed(3))
            if(apenasint){
                num = Math.floor(num)
            }
            nums.push(num)
        }
    }
</script>

<div class="input-group mb-3">
    <span class="input-group-text" id="inputGroup-sizing-default">Quantidade</span>
    <input type="number" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" bind:value={qtd}>
</div>
<div class="input-group mb-3">
    <span class="input-group-text" id="inputGroup-sizing-default">Número mínimo</span>
    <input type="number" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" bind:value={min}>
</div>
<div class="input-group mb-3">
    <span class="input-group-text" id="inputGroup-sizing-default">Número máximo</span>
    <input type="number" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" bind:value={max}>
</div>

<div class="form-check position-relative start-50 translate-middle-x">
  <input class="form-check-input" type="checkbox" id="checkDefault" bind:checked={apenasint}>
  <label class="form-check-label" for="checkDefault">Gerar apenas números inteiros</label>
</div>
<button class="btn btn-primary mt-2 position-relative start-50 translate-middle-x" onclick={gerar}>GERAR</button>
<hr>
<div style="height: 35vh;" class="container overflow-auto">
    {#if nums.length != 0}
        <center><p>Números gerados:</p></center>
        <ul>
            {#each nums as num}
                <li>{num}</li>
            {/each}
        </ul>
    {/if}
</div>

<style>
    span {
        width: 42vw;
    }
    input {
        text-align: center;
    }
    label {
        width: 80vw;
    }
</style>