<script>
	import spinSound from '$lib/spin.mp3'
	let itens = $state([]);
	let indiceEditando = $state(-1);
	let item = $state('');
	let itemEditando = $state('');
	let erro = $state('');
	let removerRoletados = $state(false);
	let sound = $state(null)

	let paleta = $state([]);
	const tema = {
		spinDuration: 5,
		pointerColor: 'black'
	};
	let rotacao = $state(0);
	let girando = $state(false);
	let vencedor = $state(null);
	let vencedorCor = $state('transparent');
	let rodaElemento = $state();
	const numItems = $derived(itens.length);
	const anguloFatia = $derived(360 / numItems);
	const cssVars = `--spin-duration: ${tema.spinDuration}s; --ponteiro-color: ${tema.pointerColor};`;

	function adicionar() {
		if (girando) return;
		erro = '';
		if (item == '') {
			erro = 'Digite algo!';
			return;
		}
		itens.push(item);
		item = '';
	}

	function editar() {
		if (girando) return;
		if (itemEditando == '') {
			erro = 'Digite algo!';
			return;
		}
		itens[indiceEditando] = itemEditando;
		indiceEditando = -1;
	}

	function remover(i) {
		if (girando) return;
		itens.splice(i, 1);
	}

	function girar() {
		sound = new Audio(spinSound).play()
		const anguloAleatorio = Math.random() * 360;
		const ciclos = 5 + Math.random() * 5;
		const rotacaoFinal = ciclos * 360 + anguloAleatorio + rotacao;
		vencedor = null;
		vencedorCor = 'transparent';
		girando = true;
		rotacao = rotacaoFinal;
	}

	function onParar() {
		girando = false;
		const anguloAtual = rotacao % 360;
		const indice = Math.floor(((270 - anguloAtual + 360) % 360) / anguloFatia);
		vencedor = itens[indice];
		vencedorCor = paleta[indice];
		if (removerRoletados) remover(indice);
	}

	$effect(() => {
		if (paleta.length > itens.length) {
			paleta.length = itens.length;
		}

		const coresFaltando = itens.length - paleta.length;
		if (coresFaltando > 0) {
			for (let i = 0; i < coresFaltando; i++) {
				let corHex;
				do {
					corHex = '#' + Math.floor(Math.random() * 16777216).toString(16).padStart(6, '0');
				} while (paleta.includes(corHex));
				paleta.push(corHex); 
			}
		}

		const roda = rodaElemento
		if (roda) {
			roda.addEventListener('transitionend', onParar);
			return () => {
				roda.removeEventListener('transitionend', onParar);
			};
		}
	});

	function calcularCoordenadasPorAngulo(angulo) {
		const anguloEmRadianos = (angulo * Math.PI) / 180;
		return [90 + 90 * Math.cos(anguloEmRadianos), 90 + 90 * Math.sin(anguloEmRadianos)];
	}

	function calcularPathFatia(anguloInicial, anguloFinal) {
		const [inicioX, inicioY] = calcularCoordenadasPorAngulo(anguloInicial);
		const [fimX, fimY] = calcularCoordenadasPorAngulo(anguloFinal);
		const arco = anguloFinal - anguloInicial > 180 ? 1 : 0;
		return `M 90,90 L ${inicioX},${inicioY} A 90,90 0 ${arco} 1 ${fimX},${fimY} Z`;
	}
</script>

<div style="max-height:70vh; overflow:auto;" class="container text-center">
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
	<div class="form-check position-relative start-50 translate-middle-x">
		<input
			class="form-check-input"
			type="checkbox"
			id="checkDefault"
			bind:checked={removerRoletados}
		/>
		<label class="form-check-label" for="checkDefault">Remover itens roletados</label>
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
	<div class="container-roleta" style={cssVars}>
		{#if vencedor}
			<h2 class="resultado" style="background-color: {vencedorCor};">
				Resultado: {vencedor}
			</h2>
		{/if}
		{#if itens.length > 1}
			<div class="ponteiro"></div>
			<div class="roleta" bind:this={rodaElemento} style="transform: rotate({rotacao}deg);">
				<svg viewBox="0 0 180 180" preserveAspectRatio="xMidYMid meet">
					{#each itens as item, i}
						{@const startAngle = i * anguloFatia}
						{@const endAngle = (i + 1) * anguloFatia}
						{@const textAngle = startAngle + anguloFatia / 2}
						{@const [textX, textY] = calcularCoordenadasPorAngulo(textAngle)}
						<g>
							<path d={calcularPathFatia(startAngle, endAngle)} fill={paleta[i]} />
							<text
								x={textX}
								y={textY + 10}
								fill="white"
								font-size="13"
								text-anchor="middle"
								dominant-baseline="middle"
								transform="rotate({textAngle + 90}, {textX}, {textY})"
							>
								{item.length > 10 ? item.slice(0, 9) + '…' : item}
							</text>
						</g>
					{/each}
				</svg>
			</div>
			<button onclick={girar} disabled={girando} class="btn btn-primary mt-2"
				>{girando ? 'Girando...' : 'Girar!'}</button
			>
		{/if}
	</div>
</div>

<style>
	.container-roleta {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		font-size: clamp(10px, 2.5vw, 16px);
		height: 40vh;
	}
	.roleta {
		width: 65%;
		aspect-ratio: 1 / 1;
		position: relative;
		transition: transform var(--spin-duration) cubic-bezier(0.25, 0.1, 0.25, 1);
	}
	.ponteiro {
		width: 0;
		height: 0;
		border-left: 1.5em solid transparent;
		border-right: 1.5em solid transparent;
		border-top: 2.5em solid var(--ponteiro-color);
		position: relative;
		z-index: 10;
		top: 1.2em;
		margin-bottom: -1.2em;
	}
	svg {
		width: 100%;
		height: 100%;
	}
	.resultado {
		height: 5vh;
		padding: 0.8em 1.2em;
		font-size: 1.1em;
		border-radius: 0.5em;
		color: white;
		text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
		transition: background-color 0.3s ease;
	}
</style>
