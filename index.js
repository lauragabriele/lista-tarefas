const ul = getElementById('ul')
const listTask =  localStorage.getItem('array') ? JSON.parse(localStorage.getItem('array')) : []
storage()

function getElementById(id) {
  return document.getElementById(id)
}

function createElement(id) {
  return document.createElement(id)
}

function getInputValue() { 
  return getElementById('txt').value
}

function clearInput(item = getElementById('txt')) {
  if (item.value === '') {
    window.alert('Não há o que ser excluído!')
  }
  item.value = ''
}

function storage(){
  const storage = localStorage.getItem('array')
  localStorage.setItem('array', JSON.stringify(listTask))
  if (listTask.length > 0) {
    listTask.forEach((el, i) => (render(el, i)))
  }  
}

function addTaskArray() {
  if (getInputValue() == '') {
    window.alert('Adicione uma tarefa')
    return
  }
  const task = {
    name: getInputValue(),
    id: Math.floor(Math.random() * Date.now()),
    completed: false 
  }
  listTask.push(task)
  clearInput()
  criarListaTarefas()
  storage(listTask)
}

function render(_element, index) {
  const listItem = document.getElementById(listTask[index].id);
  if (listItem) {
    return
  }
  const baseStructure = {
    divEsquerda: createElement('div'),
    divDireita: createElement('div'),
    tarefa: createElement('span'),
    lista: createElement('li'),
  }
  tarefaConcluida(baseStructure.divEsquerda, baseStructure.tarefa, index)
  buildLeftDiv(baseStructure.divEsquerda, baseStructure.lista,baseStructure.tarefa)
  buildRightDiv(baseStructure.divDireita, baseStructure.lista, index)
  baseStructure.tarefa.innerText = listTask[index].name
  baseStructure.lista.setAttribute('id', listTask[index].id)
  ul.appendChild(baseStructure.lista)
}

function buildRightDiv(div, itemList, index) {
  div.className = 'divDireta'
  itemList.appendChild(div)
  excluiTarefa(itemList, listTask, div, index)
  editaTarefa(listTask, index, div)
}

function buildLeftDiv(div, itemList, task){
  div.className = 'divEsquerda'
  div.appendChild(task)
  itemList.appendChild(div)
}

function excluiTarefa(lista, listTask, divDireita, index) {
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
    const tarefaIndex = listTask.findIndex(tarefa => tarefa.id === (listTask[index] && listTask[index].id))
    listTask.splice(tarefaIndex, 1)

    ul.removeChild(lista)
    storage(listTask) 
   })
}

function editaTarefa(listTask, index, divDireita) {
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
    if (listTask[editar].completed) {
      window.alert('Não é possível editar uma tarefa concluída.')
      return
    }
    const tarefaEditada = window.prompt('Digite sua nova tarefa:')
    if (tarefaEditada == null) {
      return
    }
    listTask[editar].name = tarefaEditada
    storage(listTask)
    criarListaTarefas()
  })
}

function tarefaConcluida(divEsquerda, tarefa, index) {
  const marcarConcluido = document.createElement('input')
  marcarConcluido.setAttribute('type', 'checkbox')
  const estadoTarefa = listTask[index].completed
  marcarConcluido.checked = estadoTarefa
  divEsquerda.appendChild(marcarConcluido)
  marcarConcluido.addEventListener('click', () => {
    tarefa.classList.toggle('checked')
    if (marcarConcluido.checked) {
      listTask[index].completed = true
    }
    else {
      listTask[index].completed = false
    }
    storage()
  })
  if (estadoTarefa) {
    tarefa.classList.add('checked')
  }
}

function criarListaTarefas() {
  while (ul.firstChild) {
    ul.removeChild(ul.firstChild)
  }
  listTask.forEach(render)
  return listTask
}


