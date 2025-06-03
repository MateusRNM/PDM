<script>
    import BotaoCalculadora from "$lib/components/src/lib/components/BotaoCalculadora.svelte";
    let expressao = $state("")
    
    function addChar(char){
        expressao += char
    }

    function clear(){
        expressao = ""
    }
</script>

<div class="position-absolute start-50 top-50 translate-middle border border-3 border-black p-2">
	<div class="container text-center"></div>
	<table>
        <tbody>
            <tr>
                <td><BotaoCalculadora symbol="C" func={clear} color="btn-warning"/></td>
                <td><BotaoCalculadora symbol="(" func={addChar} color="btn-secondary"/></td>
                <td><BotaoCalculadora symbol=")" func={addChar} color="btn-secondary"/></td>
                <td><BotaoCalculadora symbol="/" func={addChar} color="btn-secondary"/></td>
            </tr>
            <tr>
                <td><BotaoCalculadora symbol="7" func={addChar} color="btn-dark"/></td>
                <td><BotaoCalculadora symbol="8" func={addChar} color="btn-dark"/></td>
                <td><BotaoCalculadora symbol="9" func={addChar} color="btn-dark"/></td>
                <td><BotaoCalculadora symbol="X" func={addChar} color="btn-secondary"/></td>
            </tr>
            <tr>
                <td><BotaoCalculadora symbol="4" func={addChar} color="btn-dark"/></td>
                <td><BotaoCalculadora symbol="5" func={addChar} color="btn-dark"/></td>
                <td><BotaoCalculadora symbol="6" func={addChar} color="btn-dark"/></td>
                <td><BotaoCalculadora symbol="-" func={addChar} color="btn-secondary"/></td>
            </tr>
            <tr>
                <td><BotaoCalculadora symbol="1" func={addChar} color="btn-dark"/></td>
                <td><BotaoCalculadora symbol="2" func={addChar} color="btn-dark"/></td>
                <td><BotaoCalculadora symbol="3" func={addChar} color="btn-dark"/></td>
                <td style="height: 0;" rowspan="2"><BotaoCalculadora symbol="+" color="btn-secondary"/></td>
            </tr>
            <tr>
                <td><BotaoCalculadora symbol="0" func={addChar} color="btn-dark"/></td>
                <td><BotaoCalculadora symbol="." func={addChar} color="btn-dark"/></td>
                <td><BotaoCalculadora symbol="=" color="btn-success"/></td>
            </tr>
        </tbody>
    </table>
</div>
