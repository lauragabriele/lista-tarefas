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
  localStorage.setItem('array', JSON.stringify(listTask))
  if (listTask.length > 0) {
    listTask.forEach((el, i) => (render(el, i)))
  }  
}

function addTaskArray() {
  if (getInputValue() == '') {
    window.alert('Adicione uma tarefa:')
    return
  }
  const task = {
    name: getInputValue(),
    id: Math.floor(Math.random() * Date.now()),
    completed: false 
  }
  listTask.push(task)
  clearInput()
  createTaskList()
  storage()
}

function render(_element, index) {
  const listItem = document.getElementById(listTask[index].id);
  const taskId = listTask[index].id
  if (listItem) {
    return
  }
  const baseStructure = {
    leftDiv: createElement('div'),
    rightDiv: createElement('div'),
    task: createElement('span'),
    list: createElement('li'),
  }
  taskCompleted(baseStructure.leftDiv, baseStructure.task, index)
  buildLeftDiv(baseStructure.leftDiv, baseStructure.list,baseStructure.task)
  buildRightDiv(baseStructure.rightDiv, baseStructure.list, index)
  baseStructure.task.innerText = listTask[index].name
  baseStructure.list.setAttribute('id', taskId)
  ul.appendChild(baseStructure.list)
}

function buildRightDiv(div, itemList, index) {
  div.className = 'rightDiv'
  itemList.appendChild(div)
  deleteTask(itemList, listTask, div, index)
  editTask(listTask, index, div)
}

function buildLeftDiv(div, itemList, task){
  div.className = 'leftDiv'
  div.appendChild(task)
  itemList.appendChild(div)
}

function deleteTask(list, listTask, rightDiv, index) {
  const iconDelete = document.createElement('span')
  const deleteButton = document.createElement('button')
  deleteButton.className = 'delete'
  iconDelete.innerText = 'delete'
  iconDelete.classList.add('material-symbols-outlined')
  deleteButton.appendChild(iconDelete)
  rightDiv.appendChild(deleteButton)
  deleteButton.addEventListener('click', () => {
    const confirmDelete = window.confirm('Deseja excluir a tarefa?')
    if (confirmDelete == false) {
      return getInputValue()
    }
    const taskIndex = listTask.findIndex(task=> task.id === (listTask[index].id))
    listTask.splice(taskIndex, 1)
    ul.removeChild(list)
    storage()
   })
}

function editTask(listTask, index, rightDiv) {
  const iconEdit = document.createElement('span')
  const buttonEdit= document.createElement('button')
  buttonEdit.className = 'edit'
  iconEdit.innerText = 'edit'
  iconEdit.classList.add('material-symbols-outlined')
  buttonEdit.value = index
  buttonEdit.appendChild(iconEdit)
  rightDiv.appendChild(buttonEdit)
  buttonEdit.addEventListener('click', () => {
  const toEdit = parseInt(buttonEdit.value)
    if (listTask[toEdit].completed) {
      window.alert('Não é possível editar uma tarefa concluída.')
      return
    }
    const taskEdited = window.prompt('Digite sua nova tarefa:')
    if (taskEdited == null) {
      return
    }
    listTask[toEdit].name = taskEdited
    storage()
    createTaskList
()
  })
}

function taskCompleted(leftDiv, task, index) { 
  const markDone= document.createElement('input')
  markDone.setAttribute('type', 'checkbox')
  const statusTask = listTask[index].completed
  const taskIndex = listTask[index]
  markDone.checked = statusTask
  leftDiv.appendChild(markDone)
  markDone.addEventListener('click', () => {
    task.classList.toggle('checked')
    if (markDone.checked) {
     taskIndex.completed = true
    }
    if(!markDone.checked) {
      taskIndex.completed = false
    }
    storage()
  })
  if (statusTask) {
    task.classList.add('checked')
  }
}

function createTaskList() {
  while (ul.firstChild) {
    ul.removeChild(ul.firstChild)
  }
  listTask.forEach(render)
  return listTask
}


