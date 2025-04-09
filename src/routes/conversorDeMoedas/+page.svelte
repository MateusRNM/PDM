<script>
    import { goto } from '$app/navigation';
    import { moedas } from '$lib/exchangerateAPI';
</script>

<div id="topBar">
    <center><h1>CONVERSOR DE MOEDAS</h1></center>
</div>

<div class="textBox">
    <center><p class="text">Faça conversão de moedas automaticamente. Valores sempre atualizados.</p></center>
    <button class="button" style="background-color: gold;" onclick={() => goto("conversorDeMoedas/converter")}>CONVERTER</button><br>
    <button class="button" style="background-color: cyan;" onclick={() => goto("conversorDeMoedas/sobre")}>SOBRE O AUTOR</button>
</div>

<div class="moedasBox">
    <center><h3><font color="gold">{moedas.length}</font> <font color="chartreuse">MOEDAS</font> DISPONÍVEIS: <br> (CLIQUE NO NOME PARA SABER MAIS SOBRE A MOEDA)</h3></center>
    
    <center>
        {#each moedas as moeda}
            <a class="text" target="_blank" href={`https://www.google.com/search?q=${moeda.nome.replace(' ', '+')}+${moeda.value}`}>{moeda.nome}</a><br>
        {/each}
    </center>
</div>

<style>
    @font-face {
        font-family: Imp;
        src: url('../lib/assets/impact.ttf')
    }
    * {
        font-family: Imp;
    }
    h1 {
        margin-top: 1%;
    }
    a {
        color: inherit;
        text-decoration-line: none;
    }
    #topBar {
        background-color: chartreuse;
        height: 10vh;
        width: 100%;
        position: fixed;
        top: 0px;
        border: 2px black solid;
    }
    .textBox {
        position: absolute;
        width: 50%;
        height: 40%;
        top: 40%;
        left: 50%;
        border: 5px black solid;
        transform: translate(-50%, -50%);
        padding: 1%;
        border-radius: 8px;
        box-shadow: 10px 5px 5px chartreuse;
    }
    .moedasBox {
        position: absolute;
        width: 50%;
        height: 30%;
        top: 80%;
        left: 50%;
        border: 5px black solid;
        transform: translate(-50%, -50%);
        padding: 1%;
        border-radius: 8px;
        box-shadow: 10px 5px 5px chartreuse;
        overflow: auto;
    }
    .text { 
        font-size: 20px;
        width: fit-content;
        height: fit-content;
        transition: background-color 0.2s linear;
        border-radius: 4px;
    }
    .text:hover {
        background-color: chartreuse;
        cursor: pointer;
    }
    .button {
        position: relative;
        border: none;
        box-shadow: 5px 5px 5px chartreuse;
        border-radius: 6px;
        width: 20%;
        height: 20%;
        margin-top: 2%;
        left: 50%;
        transform: translateX(-50%);
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
        a {
            color: inherit;
            text-decoration-line: none;
        }
        #topBar {
            background-color: chartreuse;
            height: 10vh;
            width: 100%;
            position: fixed;
            top: 0px;
            border: 2px black solid;
        }
        .textBox {
            position: absolute;
            width: 95%;
            height: 40%;
            top: 40%;
            left: 50%;
            border: 5px black solid;
            transform: translate(-50%, -50%);
            padding: 1%;
            border-radius: 8px;
            box-shadow: 10px 5px 5px chartreuse;
        }
        .moedasBox {
            position: absolute;
            width: 95%;
            height: 30%;
            top: 80%;
            left: 50%;
            border: 5px black solid;
            transform: translate(-50%, -50%);
            padding: 1%;
            border-radius: 8px;
            box-shadow: 10px 5px 5px chartreuse;
            overflow: auto;
        }
        .text { 
            font-size: 20px;
            width: fit-content;
            height: fit-content;
            transition: background-color 0.2s linear;
            border-radius: 4px;
        }
        .text:hover {
            background-color: chartreuse;
            cursor: pointer;
        }
        .button {
            position: relative;
            border: none;
            box-shadow: 5px 5px 5px chartreuse;
            border-radius: 6px;
            width: 60%;
            height: 20%;
            margin-top: 2%;
            left: 50%;
            transform: translateX(-50%);
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
    }
</style>