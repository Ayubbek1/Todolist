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
        time: new Date().getHours() + ":" + new Date().getMinutes()  
    }
    if(todo.title&&todo.title.trim(" ").length!==0) {
        todos.push(todo)
        form.reset()
        reload(todos)
    } else {
        alert('Титул не может быть пустым!')
    }
    
}
let checkbox = document.querySelector(".check")
let id
let timee
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
        let second = false
        title.onclick = () =>{
            item.isDone = !item.isDone
            title.classList.toggle("line",item.isDone)

        }
        checkbox.onclick = () =>{
            if(second){
                item.isDone = !item.isDone
                second = false
                title.classList.remove("line",item.isDone)
                console.log(1);
            }else{
                item.isDone = !item.isDone
                second=true
                title.classList.add("line",item.isDone)
                console.log(2);
            }
        }



        title.ondblclick = () => {
            timee = item.time
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
let cur_time = new Date().getHours() + ":" + new Date().getMinutes()
console.log(modalForm);
reload(todos)
let q = modalForm.querySelector(".body").lastElementChild.value
modalForm.onsubmit = (e) =>{
    e.preventDefault();

    const {
        target
    }=e;
    let fm = new FormData(target)

    let finded = todos.find(item => item.id===id)

    // console.log(target.querySelector(".body").lastElementChild.value.slice(0,2));

    console.log(finded.time);


    fm.forEach((value,key) => {
        finded[key] = value
    });
    modal.style.display = "none"
    if(target.querySelector(".body").lastElementChild.value.slice(0,2)> cur_time.slice(0,2)){
        alert("Можно выбрать только прошлое")
        finded.time = cur_time
        modal.style.display = "block"
    }else{
        target.querySelector(".body").lastElementChild.value = q
    }
    reload(todos)

}

