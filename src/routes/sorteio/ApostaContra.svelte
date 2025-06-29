<script>
	let min = $state(1);
	let max = $state(100);
	let aposta = $state(50);
	let userRes = $state(-1);
	let sysRes = $state(-1);
	let win = $state(null);
	let erro = $state('');

	function apostar() {
        erro = ""
        if(min > max){
            erro = "Número mínimo maior do que o máximo."
            return
        } else if(aposta < min || aposta > max){
            erro = "O número de aposta deve estar dentro do intervalo."
            return
        } else if(max - min < 3){
            erro = "A diferença entre o valor mínimo e máximo deve ser igual ou maior que 3."
            return
        }
		do {
			userRes = Math.floor(Math.random() * (max - min + 1) + min);
			sysRes = Math.floor(Math.random() * (max - min + 1) + min);
		} while (userRes == sysRes);
		win = Math.abs(aposta - userRes) < Math.abs(aposta - sysRes);
	}
</script>

<div style="max-height: 71vh;" class="container text-center overflow-auto">
	<center><h5>Intervalo:</h5></center>

	<div class="input-group mb-3 mt-3">
		<span style="width:55%;" class="input-group-text">Número mínimo</span>
		<input type="numeric" class="form-control text-center" bind:value={min} />
	</div>

	<div class="input-group mb-3">
		<span style="width:55%;" class="input-group-text">Número máximo</span>
		<input type="numeric" class="form-control text-center" bind:value={max} />
	</div>
	<hr />
	<div class="input-group mb-3">
		<span style="width:55%;" class="input-group-text">Número da aposta</span>
		<input type="numeric" class="form-control text-center" bind:value={aposta} />
	</div>

	<center><button class="btn btn-primary mb-3" onclick={apostar}>APOSTAR</button></center>
    <p style="color:red; text-align:justify;">{erro}</p>

	{#if win != null}
		<p>Seu resultado: {userRes}</p>
		<p>Resultado do sistema: {sysRes}</p>
		<p style={`color:${win ? 'green' : 'red'};`}>
			{win ? 'Você ganhou a aposta!' : 'Você perdeu a aposta!'}
		</p>
		<hr />
	{/if}

	<p style="text-align:justify;">
		Explicação: será gerado um número aleatório para você e outro para o sistema dentro do intervalo
		especificado. Caso o seu número seja mais próximo do número da aposta, você ganha.
	</p>
</div>
