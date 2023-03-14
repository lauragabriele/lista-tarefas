const mostraItens = getElementById('mostraItens')
const ul = getElementById('ul')
const listaTarefas = []

function getElementById(id) {
  return document.getElementById(id)
}

function getArrayValue() {
  return getElementById('txt').value
}
function limpar(item) {
  item.value = ""
}

function adicionaItemArray() {
  listaTarefas.push({ name: getArrayValue(), id: listaTarefas.length, completed: false })
  console.log(getArrayValue())
  criarListaTarefas()
  limpar(getElementById('txt'))
}

function adicionaNaLista(element, index) {
  const lista = document.createElement('li')
  const botaoExcluir = document.createElement('button')
  const iconEditar = document.createElement('span')
  const botaoEditar = document.createElement('button')
  const marcarConcluido=document.createElement('input')
  const iconExcluir = document.createElement('span')
  iconEditar.innerText = 'edit'
  iconEditar.classList.add('material-symbols-outlined')
  iconExcluir.innerText = 'delete'
  iconExcluir.classList.add('material-symbols-outlined')
  marcarConcluido.setAttribute('type', 'checkbox')
  marcarConcluido.addEventListener("click", () => {
    lista.classList.toggle('checked')

  })
  botaoEditar.value = index
  botaoExcluir.addEventListener("click", () => {
    const excluiItem = listaTarefas.indexOf(parseInt(getArrayValue()))
    console.log(excluiItem)
    listaTarefas.splice(excluiItem, 1)
    ul.removeChild(lista)
  })
  botaoEditar.addEventListener("click", () => {
    const teste = parseInt(botaoEditar.value);
    console.log(listaTarefas)
    editar = listaTarefas.findIndex(element => element.id == botaoEditar.value )
    tarefaEditada = window.prompt('Digite sua nova tarefa:')
    var tarefaEditada = { name: tarefaEditada, id: botaoEditar.value, completed: false }
    listaTarefas.splice(editar, 1, tarefaEditada)
    criarListaTarefas()
  })
 
  botaoEditar.appendChild(iconEditar)
  botaoExcluir.appendChild(iconExcluir)
  lista.innerText = listaTarefas[index].name
  lista.appendChild(marcarConcluido)
  lista.appendChild(botaoExcluir)
  lista.appendChild(botaoEditar)
  ul.appendChild(lista)
}

console.log(listaTarefas)
function criarListaTarefas() {
  while (ul.firstChild) {
    ul.removeChild(ul.firstChild)
  }
  const todo = (listaTarefas, index, array) => {
    console.log(index, listaTarefas, array)
  }
  listaTarefas.forEach(adicionaNaLista)
  return listaTarefas
}
