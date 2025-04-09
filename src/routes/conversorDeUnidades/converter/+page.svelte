<script>
    import { onMount } from "svelte";
    import { medidas } from "$lib/data";
	import { goto } from "$app/navigation";
    let medidasDoTipo = $state(null)
    let dados = $state(null)
    let medida1 = $state(0)
    let medida2 = $state(1)
    let valor1 = $state(0)
    let valor2 = $state(0)

    onMount(() => {
        dados = JSON.parse(localStorage.getItem("dados"))
        medidasDoTipo = medidas[dados.id]
    })

    function invert(){
        let temp = medida1
        medida1 = medida2
        medida2 = temp

        temp = valor1
        valor1 = valor2
        valor2 = temp
    }

    function converter(input){
        if(input == 0){
            if(dados.tipo == "Temperatura"){
                valor2 = converterTemperatura(Number(valor1), medida1, medida2)
                return
            }
            valor2 = (valor1 * medidasDoTipo[medida1].fatorConversao/medidasDoTipo[medida2].fatorConversao).toFixed(4)
        
        } else {
            if(dados.tipo == "Temperatura"){
                valor1 = converterTemperatura(Number(valor2), medida2, medida1)
                return
            }
            valor1 = (valor2 * medidasDoTipo[medida2].fatorConversao/medidasDoTipo[medida1].fatorConversao).toFixed(4)
        }
    }

    function converterTemperatura(valor, medidaInicial, medidaFinal){
        if(medidaInicial == medidaFinal){
            return valor.toFixed(4)
        }

        let temperatura = 0
        if(medidaInicial == 0){
            if(medidaFinal == 1){
                temperatura = (valor-32) / 1.8
            } else {
                temperatura = (valor-32) / 1.8 + 273.15
            }
        } else if(medidaInicial == 1){
            if(medidaFinal == 0){
                temperatura = valor*1.8 + 32
            } else {
                temperatura = valor + 273.15
            }
        } else {
            if(medidaFinal == 0){
                temperatura = (valor-273.15)*1.8 + 32
            } else {
                temperatura = valor-273.15
            }
        }

        return temperatura.toFixed(4)
    }
</script>

<center><h1>CONVERTER {dados == null ? "" : dados.tipo.toUpperCase()}</h1></center>

<div class="inputBox" style="margin-bottom: 20%;">
    <input type="numeric" bind:value={valor1} oninput={() => converter(0)}>
    <div class="select">
        <p class="selectedName">{medidasDoTipo != null ? medidasDoTipo[medida1].nome : ""}</p>
        <div class="select-list">
            {#each medidasDoTipo as medida, i}
                <div class={i == medida1 ? "select-item item-selected" : "select-item"} onclick={() => {
                    medida1 = i
                    converter(1)
                }}>
                    {medida.nome}
                </div>
            {/each}
        </div>
    </div>
</div>

<button class="invertBtn" onclick={invert}>⇄</button>

<div class="inputBox">
    <input type="numeric" bind:value={valor2} oninput={() => converter(1)}>
    <div class="select">
        <p class="selectedName">{medidasDoTipo != null ? medidasDoTipo[medida2].nome : ""}</p>
        <div class="select-list">
            {#each medidasDoTipo as medida, i}
                <div class={i == medida2 ? "select-item item-selected" : "select-item"} onclick={() => {
                    medida2 = i
                    converter(0)
                }}>
                    {medida.nome}
                </div>
            {/each}
        </div>
    </div>
</div>

<button class="mainBtn" onclick={() => goto('/conversorDeUnidades')}>VOLTAR AO INÍCIO</button>

<style>
* {
    font-family: 'Trebuchet MS';
    color: white;
}
:global(body) {
    background-color: rgb(46, 44, 44);
}
.inputBox {
    background-color: rgb(65, 63, 63);
    border: 5px solid black;
    border-radius: 8px;
    width: 98%;
    height: 4rem;
    box-shadow: 0 00 8px black;
}
input {
    background-color: rgb(65, 63, 63);
    border: none;
    outline: none;
    height: 90%;
    width: 100%;
    padding-left: 2%;
    font-size: 15px;
}
.select {
    border: 4px solid black;
    position: relative;
    left: 68%;
    top: -80%;
    width: 100px;
    height: 3rem;
    border-radius: 8px;
}
.select-list {
    border: 4px solid black;
    position: relative;
    left: -3%;
    top: 20%;
    width: 100%;
    max-height: 100px;
    overflow: auto;
    border-radius: 8px;
    visibility: hidden;
    box-shadow: 0 00 8px black;
}
.select-item {
    text-align: center;
    background-color: rgb(34, 34, 34);
    font-size: 13px;
    width: 100%;
    height: 40px;
}
.item-selected {
    background-color: rgb(65, 64, 64);
}
.select:hover .select-list {
    visibility: visible;
}
.selectedName {
    position: relative;
    text-align: center;
    font-size: 13px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
.invertBtn{
    outline: 0;
    width: 20%;
    height: 3rem;
    background-color: rgb(34, 34, 34);
    border: none;
    border-radius: 14px;
    position: relative;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    font-size: 22px;
    box-shadow: 0 00 8px black;
    margin-bottom: 5%;
}
.invertBtn:active {
    scale: 1.05;
}
.mainBtn {
    outline: 0;
    width: 50%;
    height: 3rem;
    background-color: rgb(34, 34, 34);
    border: none;
    border-radius: 14px;
    position: absolute;
    left: 50%;
    top: 90%;
    transform: translate(-50%, -50%);
    font-size: 16px;
    box-shadow: 0 00 8px black;
    margin-bottom: 5%;
}
.mainBtn:active {
    scale: 1.05;
}
</style>
