<script>
    let expressao = $state("")
    
    function addChar(char){
        expressao += char
    }

    function clear(){
        expressao = ""
    }

    function calcular(){

    }
</script>

<div class="position-absolute start-50 top-50 translate-middle border border-3 border-black p-1 rounded">
	<div class="container text-center">
        <input type="text" class="form-control" disabled={true} bind:value={expressao}>
    </div>
	<table>
        <tbody>
            <tr>
                <td><button type="button" class="btn w-100 h-100 border border-3 border-black rounded btn-warning" onclick={clear}>C</button></td>
                <td><button type="button" class="btn w-100 h-100 border border-3 border-black rounded btn-secondary" onclick={() => addChar("(")}>(</button></td>
                <td><button type="button" class="btn w-100 h-100 border border-3 border-black rounded btn-secondary" onclick={() => addChar(")")}>)</button></td>
                <td><button type="button" class="btn w-100 h-100 border border-3 border-black rounded btn-secondary" onclick={() => addChar("/")}>/</button></td>
            </tr>
            <tr>
                <td><button type="button" class="btn w-100 h-100 border border-3 border-black rounded btn-dark" onclick={() => addChar("7")}>7</button></td>
                <td><button type="button" class="btn w-100 h-100 border border-3 border-black rounded btn-dark" onclick={() => addChar("8")}>8</button></td>
                <td><button type="button" class="btn w-100 h-100 border border-3 border-black rounded btn-dark" onclick={() => addChar("9")}>9</button></td>
                <td><button type="button" class="btn w-100 h-100 border border-3 border-black rounded btn-secondary" onclick={() => addChar("X")}>X</button></td>
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
        src: url('../../lib/font.otf');
    }
    * {
        font-family: 'font';
    }
    input {
        width: 9.4rem;
        height: 2.5rem;
        margin-bottom: 8%;
        margin-top: 8%;
        text-align: center;
    }
</style>