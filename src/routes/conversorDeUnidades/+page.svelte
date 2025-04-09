<script>
    import { tiposDeMedidas } from '$lib/data';
    import { goto } from '$app/navigation';
    import peso from '$lib/assets/peso.png';
    import capacidade from '$lib/assets/capacidade.png';
    import comprimento from '$lib/assets/comprimento.png';
    import tempo from '$lib/assets/tempo.png';
    import computacao from '$lib/assets/computacao.png';
    import temperatura from '$lib/assets/temperatura.png';
    import velocidade from  '$lib/assets/velocidade.png';
    import area from '$lib/assets/area.png';
    import volume from '$lib/assets/volume.png';
    import pressao from '$lib/assets/pressao.png';

    const images = [peso, capacidade, comprimento, tempo, computacao, temperatura, velocidade, area, volume, pressao]
</script>

<center><h1>CONVERSOR DE UNIDADES</h1></center>

<div class="box">
    {#each tiposDeMedidas as item, i}
        <div class="item" onclick={async () => {
            await localStorage.setItem("dados", JSON.stringify({ id: item.id, tipo: item.nome }))
            goto('/conversorDeUnidades/converter')
        }}>
            <center>
                <img class="itemImg" src={images[i]} alt="">
                <p>{item.nome}</p>
            </center>
        </div>
    {/each}
</div>

<style>
* {
    font-family: 'Trebuchet MS';
    color: white;
}
:global(body) {
    background-color: rgb(46, 44, 44);
}
h1 {
    margin-top: 2%;
}
.box {
    position: absolute;
    top: 50%;
    transform: translate(0px, -50%);
    flex-wrap: wrap;
    flex-direction: row;
    display: flex;
    overflow: auto;
    max-height: 460px;
    width: 100%;
    padding: 6%;
}
.item {
    border-radius: 16px;
    background-color: rgb(65, 63, 63);
    width: 120px;
    height: 120px;
    box-shadow: 0 0 40px black;
    margin: 5%;
}
.itemImg {
    width: 50px;
    height: 50px;
    margin-top: 20%;
    object-fit: contain;
}
</style>