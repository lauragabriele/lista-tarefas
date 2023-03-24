const ul = getElementById('ul')
const storage = localStorage.getItem('array')
const listaTarefas = storage ? JSON.parse(storage) : []
if (listaTarefas.length > 0) {
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

function addTarefaArray() {
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
  marcarConcluido = tarefaConcluida(divEsquerda, tarefa, index)
  botaoExcluir = excluiTarefa(lista, listaTarefas, divDireita, index)
  botaoEditar = editaTarefa(listaTarefas, index, divDireita)
  tarefa.innerText = listaTarefas[index].name
  divEsquerda.appendChild(tarefa)
  lista.appendChild(divEsquerda)
  lista.appendChild(divDireita)
  ul.appendChild(lista)
}

function excluiTarefa(lista, listaTarefas, divDireita, index) {
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
    const tarefaIndex = listaTarefas.findIndex(tarefa => tarefa.id === (listaTarefas[index] && listaTarefas[index].id))
    listaTarefas.splice(tarefaIndex, 1)

    ul.removeChild(lista)
    localStorage.setItem('array', JSON.stringify(listaTarefas))
  })
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
    const editar = parseInt(botaoEditar.value)
    if (listaTarefas[editar].completed) {
      window.alert('Não é possível editar uma tarefa concluída.')
      return
    }
    const tarefaEditada = window.prompt('Digite sua nova tarefa:')
    if (tarefaEditada == null) {
      return
    }
    listaTarefas[editar].name = tarefaEditada
    localStorage.setItem('array', JSON.stringify(listaTarefas))
    criarListaTarefas()
  })
}
function tarefaConcluida(divEsquerda, tarefa, index) {
  const marcarConcluido = document.createElement('input')
  marcarConcluido.setAttribute('type', 'checkbox')
  const estadoTarefa = listaTarefas[index].completed
  marcarConcluido.checked = estadoTarefa
  divEsquerda.appendChild(marcarConcluido)
  marcarConcluido.addEventListener('click', () => {
    tarefa.classList.toggle('checked')
    if (marcarConcluido.checked) {
      listaTarefas[index].completed = true
    }
    else {
      listaTarefas[index].completed = false
    }
    localStorage.setItem('array', JSON.stringify(listaTarefas))
  })
  if (estadoTarefa) {
    tarefa.classList.add('checked')
  }
}

function criarListaTarefas() {
  while (ul.firstChild) {
    ul.removeChild(ul.firstChild)
  }
  listaTarefas.forEach(adicionaNaLista)
  return listaTarefas
}


