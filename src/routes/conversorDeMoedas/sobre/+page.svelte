<script>
    import img from '$lib/assets/imagem.jpg';
    import { goto } from '$app/navigation';
</script>

<div id="topBar">
    <center><h1>SOBRE O AUTOR DA PÁGINA</h1></center>
</div>

<div id="infoBox">
    <img src={img} alt="" />
    <center><h2>Mateus Ribeiro Neves Martins</h2></center>
    <center><p class="text">Estudante de informática no IFMS-TL. <br> Gosto de jogos, programação, música, RPG e entre outras coisas.</p></center>
    <button class="button" style="background-color: gold;" onclick={() => goto("/conversorDeMoedas")}>VOLTAR AO INÍCIO</button><br>
</div>

<style>
    :global(body){
      background-color: white;
    }
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
    h2 {
        position: relative;
        top: 72%;
        left: 50%;
        transform: translate(-50%, 0);
    }
    img {
        width: 30%;
        height: 50%;
        position: relative;
        top: 20%;
        left: 50%;
        transform: translate(-50%, -50%);
        border: 4px black solid;
        border-radius: 200px;
        box-shadow: 0px 0px 5px 5px chartreuse;
    }
    #topBar {
        background-color: chartreuse;
        height: 10vh;
        width: 100%;
        position: fixed;
        top: 0px;
        border: 2px black solid;
    }
    #infoBox {
        position: fixed;
        width: 40%;
        height: 50%;
        top: 40%;
        left: 50%;
        border: 5px black solid;
        transform: translate(-50%, -50%);
        padding: 2%;
        border-radius: 8px;
        box-shadow: 10px 5px 5px chartreuse;
    }
    .text { 
        font-size: 20px;
    }
    .button {
        border: none;
        box-shadow: 5px 5px 5px chartreuse;
        border-radius: 6px;
        width: 20%;
        height: 20%;
        margin-top: 2%;
        margin-left: 50%;
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

    @media(max-width: 1600px) {
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
        h2 {
            position: absolute;
            top: 27%;
            left: 50%;
        }
        img {
            width: 100px;
            height: 100px;
            position: relative;
            top: 15%;
            left: 50%;
            border: 4px black solid;
            border-radius: 200px;
            box-shadow: 0px 0px 5px 5px chartreuse;
        }
        #topBar {
            background-color: chartreuse;
            height: 10vh;
            width: 100%;
            position: fixed;
            top: 0px;
            border: 2px black solid;
        }
        #infoBox {
            position: absolute;
            width: 95%;
            height: 70%;
            top: 50%;
            left: 50%;
            border: 5px black solid;
            transform: translate(-50%, -50%);
            padding: 1%;
            border-radius: 8px;
            box-shadow: 10px 5px 5px chartreuse;
        }
        .text { 
            font-size: 20px;
            position: absolute;
            top: 40%;
            left: 50%;
            text-align: center;
            transform: translateX(-50%);
        }
        .button {
            position: relative;
            border: none;
            box-shadow: 5px 5px 5px chartreuse;
            border-radius: 6px;
            width: 40%;
            height: 10%;
            top: 85%;
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