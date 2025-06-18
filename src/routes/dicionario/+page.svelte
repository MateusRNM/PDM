<script>
	import { dicionario } from '$lib/dicionario';
	let palavra = $state('');
	let filtrados = $state([]);
	let ordemAlfabetica = $state(true);
    let palavraDoDia = $state("")

	function filtrar() {
		if (palavra == '') {
			filtrados = dicionario.keys().toArray().splice(0, 50)
		} else {
			filtrados = dicionario
				.keys()
				.filter((termo) => termo.toLowerCase().startsWith(palavra.toLowerCase()))
				.toArray()
				.splice(0, 50)
		}
        if(ordemAlfabetica){
            filtrados.sort()
        }
	}

    function randomizarPalavra(){
        let arr = dicionario.keys().toArray()
        palavraDoDia = arr[Math.trunc(Math.random() * arr.length)]
    }

    filtrar()
    randomizarPalavra()
</script>

<div class="container mt-5">
    Palavra do dia: <a href={`/dicionario/${palavraDoDia}`}>{palavraDoDia}</a>
    <hr/>
	<div class="input-group mb-3">
		<input
			type="text"
			class="form-control"
			placeholder="Digite uma palavra..."
			bind:value={palavra}
			oninput={filtrar}
		/>
	</div>
	<div class="form-check">
		<input
			class="form-check-input"
			type="checkbox"
			bind:checked={ordemAlfabetica}
            onchange={filtrar}
			id="checkDefault"
		/>
		<label class="form-check-label" for="checkDefault">Ordem Alfabética</label>
	</div>
	<hr />
	<div style="height:52vh;" class="container overflow-auto">
		<ul class="list-group">
			<center>
				{#each filtrados as palavra}
					<li class="list-group-item"><a href={`/dicionario/${palavra}`}>{palavra}</a></li>
				{/each}
			</center>
		</ul>
	</div>
</div>

<style>
	@font-face {
		font-family: 'fonte';
		src: url('../../lib/fonts/font.otf');
	}
	a {
		text-decoration: none;
		color: rgb(255, 255, 255);
	}
	* {
		font-family: fonte;
	}
</style>
