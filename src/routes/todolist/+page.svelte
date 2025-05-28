<script>
  import { onMount } from 'svelte';
  import Modal from '$lib/components/Modal.svelte';
  import Toast from '$lib/components/Toast.svelte';
  import ToDoList from '$lib/components/ToDoList.svelte';
  import * as bootstrap from 'bootstrap';

  let novaTarefa = $state('');
  let tarefas = $state([]);
  let tarefasFiltradas = $derived(tarefas.filter(tarefa => tarefa.conteudo.includes(tarefaFiltro)))
  let tarefasPendentes = $derived(tarefasFiltradas.filter(tarefa => tarefa.status == 0));
  let tarefasConcluidas = $derived(tarefasFiltradas.filter(tarefa => tarefa.status == 1));
  let conteudoTarefaEditando = $state('');
  let tarefaEditando = $state();
  let tarefaExcluindo;
  let mensagemToast;
  let tarefasSelecionadas = $state(0);
  let tarefaFiltro = $state("");

  async function adicionarTarefa() {
    if(novaTarefa == ''){
      mensagemToast.show()
      return
    }
    tarefas.push({conteudo: novaTarefa, status: 0})
    novaTarefa = ''
  }

  function editarTarefa(tarefa) {
    tarefaEditando = tarefa
    conteudoTarefaEditando = tarefa.conteudo
  }

  function confirmarEdicao() {
    if(conteudoTarefaEditando == ""){
      Toast.show()
      return
    }
    tarefaEditando.conteudo = conteudoTarefaEditando
    tarefaEditando = undefined
  }

  function cancelarEdicao() {
    tarefaEditando = undefined
  }

  function excluirTarefa(tarefa) {
    tarefaExcluindo = tarefa
  }

  function confirmarExclusao() {
    tarefas.splice(tarefaExcluindo, 1)
  }

  function alterarStatus(tarefa, status) {
    tarefa.status = status
  }

  function marcarTodos(status){
    tarefas.forEach((tarefa) => tarefa.status = status)
  }

  onMount(() => {
    mensagemToast = new bootstrap.Toast('#mensagemToast');
  });
</script>

<div class="container-fluid">
  <div class="row pt-3">
    <button type="submit" class="btn btn-success input-group-text" aria-label="concluir" onclick={() => marcarTodos(1)}>CONCLUIR TODOS</button>
  </div>
  <div class="row pt-1">
    <button type="submit" class="btn btn-warning input-group-text" aria-label="pendente" onclick={() => marcarTodos(0)}>MARCAR TODOS COMO PENDENTE</button>
  </div>
  <div class="pt-2 col position-relative start-30">
    <center>
      <span class="badge text-bg-primary pt">Totais: {tarefas.length}</span>
      <span class="badge text-bg-success">Concluídas: {tarefasConcluidas.length}</span>
      <span class="badge text-bg-warning">Pendentes: {tarefasPendentes.length}</span>
    </center>
  </div>
  <div class="row pt-1">
    <p class="fs-6 text-center mt-2">Mostrar apenas:</p>
    <select class="form-select form-select-sm" aria-label="Small select example" bind:value={tarefasSelecionadas}>
      <option value={0}>Pendentes</option>
      <option value={1}>Concluídas</option>
    </select>
  </div>
  <div class="row pt-2">
    <input class="form-control" placeholder="Pesquisar por..." bind:value={tarefaFiltro}>
  </div>
  <div class="row" style="z-index: 1020;">
    <form class="container-fluid input-group px-4 pt-3" onsubmit={adicionarTarefa}>
      <input class="form-control form-control-lg" placeholder="Nova tarefa" bind:value={novaTarefa} />
      <button type="submit" class="btn btn-primary input-group-text" aria-label="adicionar"> <i class="bi bi-plus-lg"></i> </button>
    </form>
    <Toast msg={'Digite algo!'} />
  </div>
  
  <div class="container-fluid mt-3 pt-1">
    {#if tarefasSelecionadas == 0}
      <ToDoList tarefas={tarefasPendentes} {tarefaEditando} bind:conteudoTarefaEditando {editarTarefa} {confirmarEdicao} {cancelarEdicao} {alterarStatus} {excluirTarefa} />
    {:else}
      <ToDoList tarefas={tarefasConcluidas} {tarefaEditando} bind:conteudoTarefaEditando {editarTarefa} {confirmarEdicao} {cancelarEdicao} {alterarStatus} {excluirTarefa} />
    {/if}
  </div>
</div>
<Modal msg={'Deseja excluir a tarefa?'} acao={confirmarExclusao} />