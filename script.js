// user input box
let userInput = document.getElementById('user-input');
// Add button
const newTodo = document.querySelector('.Add-userinput');

// div container
const addLi = document.querySelector('#added-list');

newTodo.addEventListener('click',()=>{
    if(userInput.value !== ''){
        const outerDiv = document.createElement('div');
        outerDiv.className = 'outer-div';
        outerDiv.innerHTML=`
        <div class="delete-btn">
            <i class="fa-solid fa-trash fa-xl" onclick=deleteButton(this)></i>
        </div>`;
        const planInput = document.createElement('div'); 
        planInput.className = 'first-inner-div';
        outerDiv.appendChild(planInput);
        addLi.appendChild(outerDiv);
        const plans = document.createElement('div');
        plans.className = 'second-inner-div';
        plans.innerHTML =`
        <h3>${userInput.value}</h3>
        `;
        userInput.value='';
        outerDiv.appendChild(plans);
        const text = document.createElement('input');
        text.type = 'text';
        planInput.appendChild(text);
        const button = document.createElement('i');
        button.className = 'fa-solid fa-plus';
        planInput.appendChild(button);

        button.addEventListener('click',()=>{
            if(text.value !== ''){
                const innerDiv = document.createElement('div');
                innerDiv.className='inner-container'
                innerDiv.innerHTML= `
                <li>${text.value}</li>
                <div>
                <i class="fa-regular fa-circle fa-xl" onclick='isComplete(this,false)'></i>
                <i class="fa-regular fa-pen-to-square fa-xl" onclick='editItem(this)'></i>
                <i class="fa-regular fa-trash-can fa-xl" onclick='deleteItem(this)' style="color: red;"></i>
                </div>
                `; 
                plans.appendChild(innerDiv);
                text.value='';
            }
        })
    }
})

function isComplete(param, condition){
    const iconElement = document.createElement('i');
    if(!condition){
        param.nextElementSibling.style.display='none';
        param.parentNode.previousElementSibling.style.textDecoration = 'line-through';
        iconElement.className = 'fa-solid fa-circle-check fa-xl';
        iconElement.style.color='#e7820d';
        iconElement.setAttribute('onclick','isComplete(this,true)');
        param.replaceWith(iconElement);
    }else{
        param.nextElementSibling.style.display='inline';
        param.parentNode.previousElementSibling.style.textDecoration = 'none';
        iconElement.className = 'fa-regular fa-circle fa-xl';
        iconElement.setAttribute('onclick','isComplete(this,false)');
        param.replaceWith(iconElement);
    }
}


function deleteButton(param){
    addLi.removeChild(param.parentNode.parentNode);
}


function editItem(params){

    console.log(params.parentNode.parentNode.children);

    let arr = Array.from(params.parentNode.parentNode.children);
    const input = document.createElement('input');
    input.type='text';
    input.placeholder='Enter plans';
    const text = arr[0].textContent;
    input.value = `${text}`;
    arr[0].replaceWith(input);
    const saveButton = document.createElement('i');
    saveButton.className = 'fa-solid fa-floppy-disk fa-xl';
    params.parentNode.appendChild(saveButton);
    params.style.display='none';
    params.nextElementSibling.style.display = 'none';
    params.previousElementSibling.style.display='none';
    saveButton.addEventListener('click',function(){
        params.style.display='inline';
        params.nextElementSibling.style.display = 'inline';
        params.previousElementSibling.style.display='inline';
        saveButton.style.display='none';
        const newLi = document.createElement('li');
        newLi.textContent = `${input.value}`;
        input.replaceWith(newLi);
    })
}

function deleteItem(params){
    params.parentNode.parentNode.parentNode.removeChild(params.parentNode.parentNode);
}