function getElementById(id) {
  return document.getElementById(id)
}

var mostraItens = getElementById('mostraItens')
var ul = getElementById('ul')

var tarefas = []
var item = getElementById('txt')

function getSelectValue() {
  var tarefa = item.value
  return tarefa
}
function limpar() {
  item.value = ""
}

function criarLista() {
  var itemAdicionado = getSelectValue()
  tarefas.push(itemAdicionado)
  while (ul.firstChild) {
    ul.removeChild(ul.firstChild)
  }
  for (var i = 0; i < tarefas.length; i++) {
    var lista = document.createElement('li')
    var botaoExcluir = document.createElement('button')
    var botaoEditar = document.createElement('button')
    botaoExcluir.addEventListener("click", () => {
      const removed = tarefas.find((element => element = itemAdicionado))
      console.log(tarefas)
      console.log(removed)
      tarefas.splice(removed, 1)
      criarLista()
    })
    document.body.appendChild(botaoEditar)
    document.body.appendChild(botaoExcluir)
    botaoEditar.innerText = 'Editar'
    botaoExcluir.innerText = 'Excluir'
    lista.innerText = tarefas[i]
    lista.appendChild(botaoExcluir)
    lista.appendChild(botaoEditar)
    ul.appendChild(lista)
    limpar()
  }
}

function editarTarefa() {
  window.alert('deu certoooooooooo')
}