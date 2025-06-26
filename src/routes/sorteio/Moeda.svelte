<script>
    import cara from '$lib/assets/cara.png'
    import coroa from '$lib/assets/coroa.png'
    import flipSound from '$lib/coin-flip.mp3'
    let resultado = $state(-1)
    let sound = $state(null)
    function girar(){
        sound = new Audio(flipSound).play()
        resultado = Math.trunc(Math.random() * 2)
    }
</script>

<div class="container text-center position-absolute start-50 translate-middle-x">
    <button class="btn btn-primary mb-5" onclick={girar}>GIRAR</button><br>
    {#if resultado != -1}
        <img src={resultado == 0 ? cara : coroa} alt="">
        <p>{resultado == 0 ? 'Cara' : 'Coroa'}</p>
    {/if}
</div>
