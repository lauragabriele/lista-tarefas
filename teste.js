const ul = getElementById('ul')
const armazena = localStorage.getItem('array')
const listaTarefas = armazena ? JSON.parse(armazena) : []
console.log(listaTarefas)
if(listaTarefas.length>0){
  listaTarefas.forEach(adicionaNaLista)
}

function getElementById(id) {
  return document.getElementById(id)
}

function itemValue() {
  return getElementById('txt').value
}

function limparInput(item) {
  if (itemValue() == '') {
    window.alert('Não há o que ser excluído!')
  }
  item.value = ''
}

function adicionaItemArray() {
  if (itemValue() == '') {
    window.alert('Adicione uma tarefa')
    return itemValue()
  }
  listaTarefas.push({ name: itemValue(), id: Math.floor(Math.random() * Date.now()), completed: false })
  criarListaTarefas()
  limparInput(getElementById('txt'))
  localStorage.setItem('array', JSON.stringify(listaTarefas))
}

function adicionaNaLista(element, index) {
  const lista = document.createElement('li')
  const divEsquerda = document.createElement('div')
  divEsquerda.className = 'divEsquerda'
  const divDireita = document.createElement('div')
  divDireita.className = 'divDireta'
  const tarefa = document.createElement('span')
  marcarConcluido = tarefaConcluida(divEsquerda, tarefa)
  botaoExcluir = excluiTarefa(lista, listaTarefas, divDireita)
  botaoEditar = editaTarefa(listaTarefas, index, divDireita)
  tarefa.innerText = listaTarefas[index].name
  divEsquerda.appendChild(tarefa)
  lista.appendChild(divEsquerda)
  lista.appendChild(divDireita)
  ul.appendChild(lista)
}

function verificaStorage() {
  const armazena = localStorage.getItem('array')
  if (armazena) {
    listaTarefas.splice(0, listaTarefas.length, ...JSON.parse(armazena))
    criarListaTarefas()
  }
}

function excluiTarefa(lista, listaTarefas, divDireita) {
  const iconExcluir = document.createElement('span')
  const botaoExcluir = document.createElement('button')
  botaoExcluir.className = 'excluir'
  iconExcluir.innerText = 'delete'
  iconExcluir.classList.add('material-symbols-outlined')
  botaoExcluir.appendChild(iconExcluir)
  divDireita.appendChild(botaoExcluir)
  botaoExcluir.addEventListener('click', () => {
    const confirmDelete = window.confirm('Deseja excluir a tarefa?')
    if (confirmDelete == false) {
      return itemValue()
    }
    const excluiItem = listaTarefas.indexOf(parseInt(itemValue()))
    listaTarefas.splice(excluiItem, 1)
    ul.removeChild(lista)
    localStorage.setItem('array', JSON.stringify(listaTarefas))
  })
  return botaoExcluir
}

function editaTarefa(listaTarefas, index, divDireita) {
  const iconEditar = document.createElement('span')
  const botaoEditar = document.createElement('button')
  botaoEditar.className = 'editar'
  iconEditar.innerText = 'edit'
  iconEditar.classList.add('material-symbols-outlined')
  botaoEditar.value = index
  botaoEditar.appendChild(iconEditar)
  divDireita.appendChild(botaoEditar)
  botaoEditar.addEventListener('click', () => {
    editar = listaTarefas.findIndex(element => element.id == botaoEditar.value)
    if (listaTarefas.completed == true) {
      window.alert('Não é possível editar uma tarefa concluída.')
      return itemValue()
    }
    tarefaEditada = window.prompt('Digite sua nova tarefa:')
    tarefa = listaTarefas[index]
    if (tarefaEditada == null) {
      return itemValue()
    }
    var tarefaEditada = { name: tarefaEditada, id: botaoEditar.value, completed: false }
    listaTarefas.splice(editar, 1, tarefaEditada)
    criarListaTarefas()
  })
  return botaoEditar
}

function tarefaConcluida(divEsquerda, tarefa) {
  const marcarConcluido = document.createElement('input')
  marcarConcluido.setAttribute('type', 'checkbox')
  divEsquerda.appendChild(marcarConcluido)
  marcarConcluido.addEventListener('click', () => {
    tarefa.classList.toggle('checked')
    if (marcarConcluido.checked) {
      listaTarefas.completed = true
      return true
    }
    if (!marcarConcluido.checked) {
      listaTarefas.completed = false
      return false
    }
    return marcarConcluido
  })
}

function criarListaTarefas() {
  while (ul.firstChild) {
    ul.removeChild(ul.firstChild)
  }
  listaTarefas.forEach(adicionaNaLista)
  return listaTarefas
}


