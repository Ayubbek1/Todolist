let form = document.forms.todo
let container = document.querySelector('.container')
let todos = []
form.onsubmit = (e) => {
    e.preventDefault();

    const {target} = e

    let todo = {
        id: Math.random(),
        title: target.firstElementChild.value,
        isDone: false,
        time: new Date().getHours() + ":" + new Date().getMinutes()
    }

    if(todo.title&&todo.title.trim(" ").length!==0) {
        todos.push(todo)
        form.reset()
        reload(todos)
    } else {
        alert('Титул не может быть пустым!')
    }
    console.log(todo.title.trim(" ").length);
}


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
        // d
        
        title.onclick = () => {

            let mem = title.innerHTML
            title.innerHTML = prompt(`Именить "${title.innerHTML}" на ...`)
            item.title = title.innerHTML
            console.log(item.title);
            item[title] = title.innerHTML
            if (item[title].trim(" ").length==0) {
                title.innerHTML = "Write smth"
                item.title = "Write smth"
                title.style.color = "#b30000"
                mainDiv.style.borderColor = "#b30000"
            }else{
                title.style.color = "black"
                mainDiv.style.borderColor = "#0071E3"
            }

        }
        

        removeBtn.onclick = () => {
            arr.splice(arr.indexOf(item),1)
            removeBtn.parentElement.parentElement.remove()
        }
    }
}
// arr.indexOf(item),arr
function del() {
    
}