<script>
    let total = $state(0)
    let expressao = $state('')
    let expressaoAnterior = $state('')
    let expressaoResultados = $state('')
    let error = $state('')
    const nums = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
    const symbols = ['+', '-', '*', '/']

    function rolarDado(lados, quantidade){
        let res = 0
        for(let i = 0; i < quantidade; i++){
            let num = Math.trunc(Math.random() * (lados+1) + 1)
            num = num > lados ? lados : num
            res += num
        }
        return res
    }

    function rolar(){
        expressaoAnterior = expressao
        expressaoResultados = ''
        error = ''
        let qtd = ''
        let lados = ''
        let lado = false
        let char = ''
        for(let i = 0; i < expressao.length; i++){
            char = expressao[i].toLowerCase()
            if(char == "d"){
                lado = true
            } else if(nums.includes(char) && lado){
                lados += char
            } else if(nums.includes(char) && !lado){
                qtd += char
            } else if(symbols.includes(char) || i == expressao.length-1){
                lado = false
                if(lados != ''){
                    let res = rolarDado(Number(lados), Number(qtd))
                    expressaoResultados += `${String(res)} ${char} `
                } else if(qtd != ''){
                    expressaoResultados += `${String(qtd)} ${char} `
                }
                lados = ''
                qtd = ''
            }
        }
        if(qtd != '' && lados != ''){
            let res = rolarDado(Number(lados), Number(qtd))
            expressaoResultados += `${String(res)}`
        } else if(qtd != ''){
            expressaoResultados += `${String(qtd)}`
        }
        
        try {
            total = Math.trunc(eval(expressaoResultados))
        } catch {
            error = "Formatação inválida."
            expressao = ""
            expressaoAnterior = ""
            expressaoResultados = ""
        }
    }
</script>

<div style="width:90%;" class="input-group position-relative start-50 translate-middle-x text-center">
  <input type="text" class="form-control text-center" bind:value={expressao}>
  <button class="btn btn-primary text-center" onclick={() => rolar()}>ROLAR</button>
</div>
{#if error != ''}
    <p style="color:red;" class="text-center position-relative start-50 translate-middle-x mt-3">{error}</p>
{/if}
<hr>

<div style="height: 60vh; left:50%; position:absolute; transform: translateX(-50%); max-width:100%;" class="container overflow-auto mt-5">
    {#if expressaoResultados != ''}
        <p>Expressão: {expressaoAnterior}</p>
        <p>Resultados: {expressaoResultados}</p>
        <p>Resultado Total: {total}</p>
    {/if}
</div>