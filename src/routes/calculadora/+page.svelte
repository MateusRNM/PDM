<script>
    import typingSound from '$lib/typeSound.mp3'
    let expressao = $state("")
    let soundOn = $state(true)
    let sound = null
    const chars = [".", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
    
    function addChar(char){
        typeSound()
        if(expressao == "ERRO") expressao = ""
        expressao += char
    }

    function removeChar(){
        typeSound()
        if(expressao == "ERRO"){
            expressao = ""
            return
        }
        expressao = expressao.substr(0, expressao.length-1)
    }

    function clear(){
        typeSound()
        expressao = ""
    }

    function invertSignal(){
        typeSound()
        if(expressao == "ERRO"){
            expressao = ""
            return
        }
        let expr = expressao.split('')
        for(let i = expr.length-1; i >= 0; i--){
            if(expr[i] == "-"){
                expr[i] = "+"
                expressao = expr.join('')
                return 
            } else if(expr[i] == "+"){
                expr[i] = "-"
                expressao = expr.join('')
                return
            } else if(expr[i] == "x" || expr[i] == "/" || expr[i] == "^" || expr[i] == "%" || expr[i] == "("){
                let expr1 = expr.slice(0, i+1)
                expr1 += "-"
                let expr2 = expr.slice(i+1, expr.length)
                expr1 = expr1.concat(expr2)
                expressao = expr1.replaceAll(",", "")
                return
            }
        }
        expressao = "-" + expr.join('')
    }

    function arredondar(){
        typeSound()
        if(expressao == "ERRO"){
            expressao = ""
            return
        }
        let expr = expressao.split('')
        let num = ""
        for(let i = expr.length-1; i >= 0; i--){
            if(!chars.includes(expr[i])){
                let numRounded = String(Math.round(Number(num))).split('')
                console.log(numRounded)
                let x = 0
                for(; i < numRounded.length; x++){
                    expr[i+x] = numRounded[x]
                }
                if (numRounded.length > num.length){
                    expr.splice(i+x+1, numRounded.length - num.length)
                }
                break
            } else {
                num += expr[i]
            }
        }
        expressao = expr.join('')
    }

    function calcular(){
        typeSound()
        if(expressao == "ERRO"){
            expressao = ""
            return
        }
        if(expressao == "") return
        let expressaoFormatada = expressao.replaceAll('x', '*').replaceAll('%', '/100').replaceAll('^', '**')
        expressaoFormatada = expressaoFormatada.replace(/-(\d+)\*\*(-?\d+)/g, '(-$1)**$2')
        expressaoFormatada = expressaoFormatada.replace(/√(-?\d+)/g, '($1)**0.5')
        try {
            expressao = String(eval(expressaoFormatada))
        } catch {
            expressao = "ERRO"
        }
    }

    function typeSound(){
        if(!soundOn) return
        sound = new Audio(typingSound)
        sound.playbackRate = 1.2
        sound.volume = 0.6
        sound.play()
    }
</script>

<button class="btn btn-outline-info btn-sm position-relative top-0 start-50 mt-4 translate-middle-x text-center" onclick={() => soundOn = !soundOn}>
    {#if soundOn}
        <i style="font-size:25px;" class="bi bi-volume-down-fill"></i>
    {:else}
        <i style="font-size:25px;" class="bi bi-volume-mute-fill"></i>
    {/if}
</button>

<div class="position-absolute start-50 top-50 translate-middle border border-3 border-black p-1 rounded">
	<div class="container text-center">
        <input type="text" class="form-control" readonly bind:value={expressao}>
    </div>
	<table>
        <tbody>
            <tr>
                <td><button type="button" class="btn w-100 h-100 border border-3 border-black rounded btn-danger" onclick={removeChar}>-</button></td>
                <td><button type="button" class="btn w-100 h-100 border border-3 border-black rounded btn-secondary" onclick={() => addChar("^")}>^</button></td>
            </tr>
            <tr>
                <td><button type="button" class="btn w-100 h-100 border border-3 border-black rounded btn-warning" onclick={clear}>C</button></td>
                <td><button type="button" class="btn w-100 h-100 border border-3 border-black rounded btn-secondary" onclick={() => invertSignal()}><i class="bi bi-plus-slash-minus"></i></button></td>
                <td><button type="button" class="btn w-100 h-100 border border-3 border-black rounded btn-secondary" onclick={() => arredondar()}>≈</button></td>
                <td><button type="button" class="btn w-100 h-100 border border-3 border-black rounded btn-secondary" onclick={() => addChar("√")}>√</button></td>
            </tr>
            <tr>
                <td><button type="button" class="btn w-100 h-100 border border-3 border-black rounded btn-secondary" onclick={() => addChar("%")}>%</button></td>
                <td><button type="button" class="btn w-100 h-100 border border-3 border-black rounded btn-secondary" onclick={() => addChar("(")}>(</button></td>
                <td><button type="button" class="btn w-100 h-100 border border-3 border-black rounded btn-secondary" onclick={() => addChar(")")}>)</button></td>
                <td><button type="button" class="btn w-100 h-100 border border-3 border-black rounded btn-secondary" onclick={() => addChar("/")}>/</button></td>
            </tr>
            <tr>
                <td><button type="button" class="btn w-100 h-100 border border-3 border-black rounded btn-dark" onclick={() => addChar("7")}>7</button></td>
                <td><button type="button" class="btn w-100 h-100 border border-3 border-black rounded btn-dark" onclick={() => addChar("8")}>8</button></td>
                <td><button type="button" class="btn w-100 h-100 border border-3 border-black rounded btn-dark" onclick={() => addChar("9")}>9</button></td>
                <td><button type="button" class="btn w-100 h-100 border border-3 border-black rounded btn-secondary" onclick={() => addChar("x")}>x</button></td>
            </tr>
            <tr>
                <td><button type="button" class="btn w-100 h-100 border border-3 border-black rounded btn-dark" onclick={() => addChar("4")}>4</button></td>
                <td><button type="button" class="btn w-100 h-100 border border-3 border-black rounded btn-dark" onclick={() => addChar("5")}>5</button></td>
                <td><button type="button" class="btn w-100 h-100 border border-3 border-black rounded btn-dark" onclick={() => addChar("6")}>6</button></td>
                <td><button type="button" class="btn w-100 h-100 border border-3 border-black rounded btn-secondary" onclick={() => addChar("-")}>-</button></td>
            </tr>
            <tr>
                <td><button type="button" class="btn w-100 h-100 border border-3 border-black rounded btn-dark" onclick={() => addChar("1")}>1</button></td>
                <td><button type="button" class="btn w-100 h-100 border border-3 border-black rounded btn-dark" onclick={() => addChar("2")}>2</button></td>
                <td><button type="button" class="btn w-100 h-100 border border-3 border-black rounded btn-dark" onclick={() => addChar("3")}>3</button></td>
                <td style="height: 0;" rowspan="2"><button type="button" class="btn w-100 h-100 border border-3 border-black rounded btn-secondary" onclick={() => addChar("+")}>+</button></td>
            </tr>
            <tr>
                <td><button type="button" class="btn w-100 h-100 border border-3 border-black rounded btn-dark" onclick={() => addChar("0")}>0</button></td>
                <td><button type="button" class="btn w-100 h-100 border border-3 border-black rounded btn-dark" onclick={() => addChar(".")}>.</button></td>
                <td><button type="button" class="btn w-100 h-100 border border-3 border-black rounded btn-success" onclick={calcular}>=</button></td>
            </tr>
        </tbody>
    </table>
</div>

<style>
    @font-face {
        font-family: 'font';
        src: url('../../lib/fonts/font.otf');
    }
    @font-face {
        font-family: 'displayFont';
        src: url('../../lib/fonts/Calculator.ttf');
    }
    * {
        font-family: 'displayFont';
        font-size: 18px;
    }
    input {
        width: 9.4rem;
        height: 2.5rem;
        margin-bottom: 8%;
        margin-top: 8%;
        text-align: center;
        letter-spacing: 1px;
        font-family: 'displayFont';
        font-size: 23px;
    }
</style>