<script>
	let resultado = $state('');
	let itens = $state([]);
	let indiceEditando = $state(-1);
	let item = $state('');
	let itemEditando = $state('');
	let erro = $state('');

	function adicionar() {
		erro = '';
		if (item == '') {
			erro = 'Digite algo!';
			return;
		}
		itens.push(item);
		item = '';
	}

	function editar() {
		if (itemEditando == '') {
			erro = 'Digite algo!';
			return;
		}
		itens[indiceEditando] = itemEditando;
		indiceEditando = -1;
	}

	function remover(i) {
		itens.splice(i, 1);
	}
</script>

<div class="container text-center">
	<div class="input-group mb-3">
		<span class="input-group-text" id="inputGroup-sizing-default">item</span>
		<input
			type="text"
			class="form-control"
			bind:value={item}
			onkeypress={(e) => {
				if (e.key == 'Enter') {
					adicionar();
				}
			}}
		/>
		<button class="btn btn-success" onclick={adicionar}>+</button>
	</div>
	{#if erro != ''}<p style="color:red;">{erro}</p>{/if}
	<hr />
	<div style="max-height:15vh;" class="container text-center overflow-auto">
		{#each itens as item, i}
			<div class="input-group mb-2">
				{#if i != indiceEditando}
					<input type="text" class="form-control" value={item} readonly />
					<button
						class="btn btn-warning"
						onclick={() => {
							indiceEditando = i;
							itemEditando = item;
						}}><i class="bi bi-pencil-fill"></i></button
					>
					<button class="btn btn-danger" onclick={() => remover(i)}>-</button>
				{:else}
					<input
						type="text"
						class="form-control"
						bind:value={itemEditando}
						onkeypress={(e) => {
							if (e.key == 'Enter') {
								editar();
							}
						}}
					/>
					<button class="btn btn-danger" onclick={() => (indiceEditando = -1)}
						><i class="bi bi-x-lg"></i></button
					>
					<button class="btn btn-success" onclick={editar}><i class="bi bi-check-lg"></i></button>
				{/if}
			</div>
		{/each}
	</div>
	{#if itens.length != 0}<hr />{/if}
</div>