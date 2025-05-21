<script>
    import { request, moedas } from '$lib/exchangerateAPI.js';
    import { goto } from '$app/navigation';

    const meses = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    let value1 = $state(null)
    let value2 = $state(null)
    let selectValue1 = $state('')
    let selectValue2 = $state('')
    let bandeira1 = $state('')
    let bandeira2 = $state('')
    let coinData = $state({})
    let dataCot = $state("")

    async function makeRequest(){
        if(selectValue1 == "" || selectValue2 == "" || selectValue1 == undefined || selectValue2 == undefined){
            return
        }

        coinData = await request(selectValue1)
        dataCot = formatarData(coinData.time_last_update_utc)
        convert(1)
    }

    function convert(n){
        if(selectValue1 == "" || selectValue2 == "" || selectValue1 == undefined || selectValue2 == undefined){
            return
        }

        const convertConst = coinData.conversion_rates[selectValue2]
        
        if(n == 1){
            value2 = (value1 * convertConst).toFixed(2)
        } else {
            value1 = (value2 / convertConst).toFixed(2)
        }
    }

    function inverterMoedas(){
        if(selectValue1 == "" || selectValue2 == "" || selectValue1 == undefined || selectValue2 == undefined){
            return
        }
        let temp = value1
        value1 = value2
        value2 = temp

        temp = document.getElementsByClassName('select')[0].innerHTML
        document.getElementsByClassName('select')[0].innerHTML = document.getElementsByClassName('select')[1].innerHTML
        document.getElementsByClassName('select')[1].innerHTML = temp

        temp = selectValue1
        selectValue1 = selectValue2
        selectValue2 = temp

        temp = bandeira1
        bandeira1 = bandeira2
        bandeira2 = temp
        
        makeRequest()
    }

    function formatarData(dataOriginal){
        let dataFinal = ""
        dataOriginal = dataOriginal.split(' ')
        dataOriginal[0] = dataOriginal[0].replace(',', '')
        dataOriginal[5] = "UTC"
        let mes = 0
        let dia = ""
        for(let i = 0; i < meses.length; i++){
            if(meses[i] == dataOriginal[2]){
                mes = i+1
                break
            }
        }
        if(mes < 10){
            mes = "0" + String(mes)
        }

        if(dataOriginal[0] == "Mon"){
            dia = "Segunda-feira"
        } else if(dataOriginal[0] == "Tue"){
            dia = "Terça-feira"
        } else if(dataOriginal[0] == "Wed"){
            dia = "Quarta-feira"
        } else if(dataOriginal[0] == "Thu"){
            dia = "Quinta-feira"
        } else if(dataOriginal[0] == "Fri"){
            dia = "Sexta-feira"
        } else if(dataOriginal[0] == "Sat"){
            dia = "Sábado"
        } else {
            dia = "Domingo"
        }

        dataFinal = `${dia}, ${dataOriginal[1]}/${mes}/${dataOriginal[3]} - ${dataOriginal[4]} ${dataOriginal[5]}`
        return dataFinal
    }
    
</script>

<div id="topBar">
    <center><h1>CONVERSOR DE MOEDAS</h1></center>
</div>

<div class="box">
    <div class="currencyBox">
        
        <div class="currency">
            <center><h2>{selectValue1}</h2></center>
            <center><input class="valueInput" type="numeric" bind:value={value1} onchange={() => convert(1)}></center>

            <img class="boxImg" src={bandeira1} alt="" hidden={bandeira1 == '' ? true : false}>

            <div class="dropdown">
                <div class="dropdown-select">
                    <span class="select">SELECIONE UMA MOEDA</span>
                </div>

                <div class="dropdown-list">
                    {#each moedas as moeda}
                        <div class={selectValue1 == moeda.value ? "dropdown-list-item item-selected" : "dropdown-list-item"} value={moeda.value} onclick={(e) => { 
                            selectValue1 = e.target.value
                            bandeira1 = moeda.bandeira
                            document.getElementsByClassName('select')[0].innerHTML = moeda.nome
                            makeRequest()
                        }}> <img src={moeda.bandeira} alt="" value={moeda.value}> {moeda.nome}</div>
                    {/each}
                </div>
            </div>
        </div>

        <button class="button invertButton" onclick={inverterMoedas}>⇄</button>

        <div class="currency currency2">
            <center><h2>{selectValue2}</h2></center>
            <center><input class="valueInput" type="numeric" bind:value={value2} onchange={() => convert(2)}></center>

            <img class="boxImg" src={bandeira2} alt="" hidden={bandeira2 == '' ? true : false}>

            <div class="dropdown">
                <div class="dropdown-select">
                    <span class="select">SELECIONE UMA MOEDA</span>
                </div>

                <div class="dropdown-list">
                    {#each moedas as moeda}
                        <div class={selectValue2 == moeda.value ? "dropdown-list-item item-selected" : "dropdown-list-item"} value={moeda.value} onclick={(e) => { 
                            selectValue2 = e.target.value
                            bandeira2 = moeda.bandeira
                            document.getElementsByClassName('select')[1].innerHTML = moeda.nome
                            makeRequest()
                        }}> <img src={moeda.bandeira} alt="" value={moeda.value}> {moeda.nome}</div>
                    {/each}
                </div>
            </div>
        </div>
        
        <button class="button" style="background-color: gold;" onclick={() => goto("/conversorDeMoedas")}>VOLTAR AO INÍCIO</button><br>
    </div>
</div>

<span hidden={dataCot == "" ? true : false}>DATA DA ÚLTIMA COTAÇÃO: {dataCot}</span>

<style>
    :global(body){
      background-color: white;
    }
    @font-face{
        font-family: Imp;
        src: url("../../lib/assets/impact.ttf");
    }
    * {
        font-family: Imp;
    }
    h1 {
        margin-top: 1%;
    }
    span{
        font-size: 19px;
        position: absolute;
        top: 95%;
        left: 1%;
        color: black;
    }
    .button {
        position: relative;
        left: 50%;
        top: 20%;
        border: none;
        box-shadow: 5px 5px 5px chartreuse;
        border-radius: 6px;
        width: 20%;
        height: 20%;
        transform: translateX(-50%);
    }
    .invertButton {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: fit-content;
        height: fit-content;
        font-size: 30px;
    }
    #topBar {
        background-color: chartreuse;
        height: 10vh;
        width: 100%;
        position: fixed;
        top: 0px;
        border: 2px black solid;
    }
    .box {
        position: absolute;
        width: 50%;
        height: 60%;
        top: 45%;
        left: 50%;
        border: 5px black solid;
        transform: translate(-50%, -50%);
        padding: 1%;
        border-radius: 8px;
        box-shadow: 10px 5px 5px chartreuse;
    }
    .currencyBox {
        position: relative;
        width: 99%;
        height: 99%;
        padding: 1%;
    }
    .currency {
        position: relative;
        top: 20%;
        left: 5%;
        width: 40%;
        height: 50%;
        border: 3px black solid;
        padding: 1%;
        border-radius: 8px;
    }
    .currency2 {
        left: 55%;
        top: -30%;
    }
    .valueInput {
        border: 3px black solid;
        padding: 1%;
        border-radius: 8px;
        text-align: center;
        color: black;
    }
    .dropdown {
        position: absolute;
        top: 120%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 80%;
    }
    .dropdown:hover .dropdown-list {
        opacity: 1;
        visibility: visible;
    }
    .dropdown-select {
        padding: 2%;
        border-radius: 4px;
        background-color: white;
        border: 3px black solid;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 16px;
        cursor: pointer;
    }
    .dropdown-list {
        border-radius: 4px;
        border: 3px black solid;
        background-color: white;
        margin-top: 1.5%;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.2s linear, visibility 0.2s linear;
        overflow: auto;
        width: 100%;
        height: 10rem;
    }
    .dropdown-list-item {
        padding-left: 2%;
        padding-top: 2%;
        font-size: 16px;
        cursor: pointer;
        background-color: white;
        border-radius: 4px;
        transition: background-color 0.3s linear;
    }
    .dropdown-list-item:hover {
        padding-left: 4%;
        background-color: chartreuse;
    }
    .select {
        position: relative;
        left: 50%;
        transform: translateX(-50%);
    }
    .item-selected {
        background-color: gold;
    }
    @keyframes pulse {
        0% {
            transform: scale(1) translateX(-50%);
        }

        100% {
            transform: scale(1.05) translateX(-50%);
        }
    }
    .button:hover {
        animation-name: pulse;
        animation-duration: 0.5s;
        animation-timing-function: ease-in-out;
        animation-iteration-count: infinite;
        animation-direction: alternate;
        color: white;
    }
    .invertButton:hover {
        animation-name: none;
        transform: scale(1.1) translate(-50%, -50%);
        color: gold;
    }
    img {
        width: 50px;
        height: 50px;
        object-fit: contain;
    }
    .boxImg {
        position: relative;
        left: 50%;
        top: 20%;
        transform: translate(-50%, -50%);
        border: 3px black solid;
        border-radius: 6px;
    }
    @media(max-width: 960px) {
        @font-face {
            font-family: Imp;
            src: url('../../lib/assets/impact.ttf')
        }
        * {
            font-family: Imp;
        }
        h1 {
            margin-top: 1%;
        }
        span{
            font-size: 16px;
            position: absolute;
            top: 75%;
            left: 50%;
            transform: translate(-50%, 0);
            margin-top: 1%;
            margin-bottom: 1%;
            color: black;
        }
        .button {
            position: relative;
            left: 50%;
            top: 43%;
            border: none;
            box-shadow: 5px 5px 5px chartreuse;
            border-radius: 6px;
            width: 40%;
            height: 20%;
        }
        .invertButton {
            position: absolute;
            left: 50%;
            top: 85%;
            transform: translate(-50%, -50%);
            width: 40px;
            height: 40px;
            font-size: 25px;
            margin: 0px;
            color: black;
            transition: transform 0.3s ease;
            animation: none;
        }
        #topBar {
            visibility: hidden;
            height: 0px;
            width: 0px;
        }
        .box {
            position: absolute;
            width: 90%;
            height: 60%;
            top: 35%;
            left: 50%;
            border: 5px black solid;
            transform: translate(-50%, -50%);
            padding: 1%;
            border-radius: 8px;
            box-shadow: 10px 5px 5px chartreuse;
        }
        .currencyBox {
            position: relative;
            width: 100%;
            height: 100%;
        }
        .currency {
            position: relative;
            top: 20%;
            left: 1%;
            width: 46%;
            height: 50%;
            border: 3px black solid;
            padding: 1%;
            border-radius: 8px;
        }
        .currency2 {
            left: 55%;
            top: -30%;
        }
        .valueInput {
            border: 3px black solid;
            padding: 1%;
            border-radius: 8px;
            text-align: center;
            width: 80%;
            color: black;
        }
        .dropdown {
            position: absolute;
            top: 131%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 88%;
        }
        .dropdown:hover .dropdown-list {
            opacity: 1;
            visibility: visible;
        }
        .dropdown-select {
            padding: 2%;
            border-radius: 4px;
            background-color: white;
            border: 3px black solid;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 16px;
            cursor: pointer;
            margin-bottom: 15%;
        }
        .dropdown-list {
            border-radius: 4px;
            border: 3px black solid;
            background-color: white;
            opacity: 0;
            visibility: hidden;
            transition: opacity 0.2s linear, visibility 0.2s linear;
            overflow: auto;
            width: 100%;
            height: 10rem;
        }
        .dropdown-list-item {
            padding-left: 1%;
            padding-top: 2%;
            margin-top: 6%;
            border-top: 3px solid black;
            border-bottom: 3px solid black;
            font-size: 16px;
            cursor: pointer;
            background-color: white;
            border-radius: 0px;
            text-align: center;
            transition: background-color 0.3s linear;
            width: 100%;
        }
        .dropdown-list-item:hover {
            padding-left: 1%;
            background-color: chartreuse;
        }
        .select {
            position: relative;
            left: 50%;
            transform: translateX(-50%);
        }
        .item-selected {
            background-color: gold;
        }
        @keyframes pulse {
            0% {
                transform: scale(1) translateX(-50%);
            }

            100% {
                transform: scale(1.05) translateX(-50%);
            }
        }
        @keyframes click {
            0% {
                transform: scale(1) translate(-50%, -50%);
                color: black;
            }

            25% {
                transform: scale(1.1) translate(-50%, -50%);
                color: gold;
            }

            100% {
                transform: scale(1) translate(-50%, -50%);
                color: black;
            }
        }
        .button:hover:not(.invertButton) {
            animation-name: pulse;
            animation-duration: 0.5s;
            animation-timing-function: ease-in-out;
            animation-iteration-count: infinite;
            animation-direction: alternate;
            color: white;
        }
        .invertButton:active {
            animation: click 0.3s ease;
        }
        img {
            width: 45px;
            height: 45px;
            object-fit: contain;
        }
        .boxImg {
            position: relative;
            left: 50%;
            top: 15%;
            transform: translate(-50%, -50%);
            border: 3px black solid;
            border-radius: 6px;
        }
    }

    @media(max-height: 668px){
        .currency {
            height: 95%;
            top: 0px;
        }
        .currency2 {
            left: 55%;
            top: -95%;
        }
        .invertButton {
            position: absolute;
            top: 115%;
        }
    }
</style>