<script>
    import pencilSound from '$lib/pencilSound.mp3'
    import 'bootstrap/dist/css/bootstrap.css';
    import 'bootstrap-icons/font/bootstrap-icons.css';
    import * as bootstrap from 'bootstrap';
    let tabuleiro = $state([["", "", ""], ["", "", ""], ["", "", ""]])
    let rodada = $state(1)
    let status = $state(0) // 0 = Vez do jogador 1 (X); 1 = Vez do jogador 2 (O); 2 = Partida finalizada;
    let resultado = $state()
    let audio = $state(null)
    let erro = $state()
    const colors = ["#0349fc", "#d10a3f", "#787878"]

    function jogar(i, j){
        erro = ""
        if(status == 2) return
        if(tabuleiro[i][j] != ""){
            const el = document.getElementById(`casa-${i}${j}`)
            el.style.animationPlayState = "running"
            erro = "Casa já ocupada!"
            return
        } 
        audio = new Audio(pencilSound).play()
        tabuleiro[i][j] = status == 0 ? "X" : "O"
        status = status == 0 ? 1 : 0
        verificarResultado()
        if(status != 2) rodada += 1
    }

    function resetar(){
        tabuleiro = [["", "", ""], ["", "", ""], ["", "", ""]]
        status = 0
        rodada = 1
    }

    function verificarResultado(){
        const j1vencedor = tabuleiro[0][0] == "X" && tabuleiro[0][1] == "X" && tabuleiro[0][2] == "X" || 
                           tabuleiro[1][0] == "X" && tabuleiro[1][1] == "X" && tabuleiro[1][2] == "X" || 
                           tabuleiro[2][0] == "X" && tabuleiro[2][1] == "X" && tabuleiro[2][2] == "X" || 
                           tabuleiro[0][0] == "X" && tabuleiro[1][0] == "X" && tabuleiro[2][0] == "X" || 
                           tabuleiro[0][1] == "X" && tabuleiro[1][1] == "X" && tabuleiro[2][1] == "X" || 
                           tabuleiro[0][2] == "X" && tabuleiro[1][2] == "X" && tabuleiro[2][2] == "X" || 
                           tabuleiro[0][0] == "X" && tabuleiro[1][1] == "X" && tabuleiro[2][2] == "X" ||
                           tabuleiro[2][0] == "X" && tabuleiro[1][1] == "X" && tabuleiro[0][2] == "X"

        const j2vencedor = tabuleiro[0][0] == "O" && tabuleiro[0][1] == "O" && tabuleiro[0][2] == "O" || 
                           tabuleiro[1][0] == "O" && tabuleiro[1][1] == "O" && tabuleiro[1][2] == "O" || 
                           tabuleiro[2][0] == "O" && tabuleiro[2][1] == "O" && tabuleiro[2][2] == "O" || 
                           tabuleiro[0][0] == "O" && tabuleiro[1][0] == "O" && tabuleiro[2][0] == "O" || 
                           tabuleiro[0][1] == "O" && tabuleiro[1][1] == "O" && tabuleiro[2][1] == "O" || 
                           tabuleiro[0][2] == "O" && tabuleiro[1][2] == "O" && tabuleiro[2][2] == "O" || 
                           tabuleiro[0][0] == "O" && tabuleiro[1][1] == "O" && tabuleiro[2][2] == "O" ||
                           tabuleiro[2][0] == "O" && tabuleiro[1][1] == "O" && tabuleiro[0][2] == "O"
        if(j1vencedor){
            status = 2
            resultado = 0
            return
        } else if(j2vencedor) {
            status = 2
            resultado = 1
            return
        }
        if(rodada == 9){
            status = 2
            resultado = 2
        }
    }
</script>

<div class="container mt-5">
    <center><p>Rodada: {rodada}</p></center>
    <table class="table text-center">
        <tbody>
            {#each tabuleiro as linha, i}
                <tr>
                    {#each linha as casa, j}
                        <td 
                            class={j >= 1 ? "lines" : ""} style={i != 2 ? "" : "border-bottom-width:0px;"} 
                            onanimationiteration={(el) => { el.srcElement.style.animationPlayState = "paused" }} 
                            id={`casa-${i}${j}`}>
                             <button style={`color: ${casa == "X" ? colors[0] : colors[1]};`} class="casa" onclick={() => jogar(i, j)}>
                                {casa}
                            </button>
                        </td>
                    {/each}
                </tr>
            {/each}
        </tbody>
    </table>
    
    {#if status == 2}
        <center><p style={`color: ${colors[resultado]};`}>{resultado == 2 ? 'Empate!' : `Jogador ${resultado+1} venceu!`}</p></center>
    {:else}
        <center><p style={`color: ${colors[status]};`}>{`Vez do jogador ${status+1}.`}</p></center>
    {/if}
    {#if status == 2}
        <center><button class="btn btn-primary mt-3" onclick={resetar}>JOGAR NOVAMENTE</button></center>
    {/if}
    {#if erro != ""}
        <center><p style="color:red;">{erro}</p></center>
    {/if}
</div>

<style>
    @font-face {
		font-family: 'fonte';
		src: url('../../lib/fonts/font.otf');
	}
	* {
		font-family: fonte;
	}
    .casa {
        position: relative;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        font-size: 25px;
        width: 100%;
        height: 100%;
        border: none;
        background: none;
    }
    td {
        width: 40vw;
        max-width: 40vw;
        height: 13vh;
        max-height: 13vh;
        animation-name: anim;
        animation-iteration-count: infinite;
        animation-duration: 1.2s;
        animation-play-state: paused;
    }
    .lines {
        border-left-width: 1px; 
        border-bottom-width: 1px;
    }
    table {
        height: 35vh;
    }
    @keyframes anim {
        0% {
            background-color: "";
        }
        50% {
            background-color: rgb(163, 8, 8);
        }
        100% {
            background-color: "";
        }
    }
</style>