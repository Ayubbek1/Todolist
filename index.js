let form = document.forms.todo
let container = document.querySelector('.container')
let modal = document.querySelector(".window")
let todos = []
form.onsubmit = (e) => {
    e.preventDefault();

    const {target} = e

    let todo = {
        id: Math.random(),
        title: target.firstElementChild.value,
        isDone: false,
        time: target.lastElementChild.previousSibling.value
    }
    console.log(target.lastElementChild.previousSibling.value);
    if(todo.title&&todo.title.trim(" ").length!==0) {
        todos.push(todo)
        form.reset()
        reload(todos)
    } else {
        alert('Титул не может быть пустым!')
    }
    console.log(todo.title.trim(" ").length);
}
let checkbox = document.querySelector(".check")
let id
let tittle
function reload(arr) {
    container.innerHTML = ""

    for(let item of arr) {
        // a
        let mainDiv = document.createElement('div')
        let topDiv = document.createElement('div')
        let title = document.createElement('span')
        let removeBtn = document.createElement('button')
        let timeSpan = document.createElement('span')
        // b
        mainDiv.classList.add('item')
        topDiv.classList.add('top')
        timeSpan.classList.add('time')
    
        title.innerHTML = item.title
        removeBtn.innerHTML = "x"
        timeSpan.innerHTML = item.time
        // c
        mainDiv.append(topDiv, timeSpan)
        topDiv.append(title, removeBtn)
        container.append(mainDiv)
        title.classList.toggle("line",item.isDone)
        // d
        title.onclick = () =>{
            item.isDone = !item.isDone
            title.classList.toggle("line",item.isDone)
            checkbox.toggleAttribute("checked",item.isDone)
            checkbox.onclick = () =>{
                title.classList.toggle("line",item.isDone)
            }
        }



        title.ondblclick = () => {
            id = item.id
            modal.style.display = "block"
            modal.querySelector("input").value = item.title
            
        }
        

        removeBtn.onclick = () => {
            arr.splice(arr.indexOf(item),1)
            removeBtn.parentElement.parentElement.remove()
        }
    }
}
// arr.indexOf(item),arr
let modalForm = document.querySelector(".modal")
reload(todos)
modalForm.onsubmit = (e) =>{
    e.preventDefault();

    const {
        target
    }=e;
    let fm = new FormData(target)

    let finded = todos.find(item => item.id===id)

    
    fm.forEach((value,key) => {
        finded[key] = value
    });
    console.log(finded);
    modal.style.display = "none"
    reload(todos)
}
console.log(checkbox);
new Date().getHours() + ":" + new Date().getMinutes()