// user input box
let userInput = document.getElementById('user-input');
// Add button
const newTodo = document.querySelector('.Add-userinput');

// div container
const addLi = document.querySelector('#added-list');

// Event listener for "New Todo" button
newTodo.addEventListener('click',()=>{
    if(userInput.value !== ''){
        // Create an outer container for a new todo item
        const outerDiv = document.createElement('div');
        outerDiv.className = 'outer-div';
        outerDiv.innerHTML=`
        <div class="delete-btn">
            <i class="fa-solid fa-trash fa-xl" onclick=deleteButton(this)></i>
        </div>`;
        // create a container for title display.
        const plans = document.createElement('div');
        plans.className = 'second-inner-div';
        plans.innerHTML =`
        <h3>${userInput.value}</h3>
        `;
        userInput.value='';
        outerDiv.appendChild(plans);
        // create a container for adding new Todo items
        const planInput = document.createElement('div'); 
        planInput.className = 'first-inner-div';
        outerDiv.appendChild(planInput);
        addLi.appendChild(outerDiv);
        const text = document.createElement('input');
        text.type = 'text';
        planInput.appendChild(text);
        const button = document.createElement('i');
        button.className = 'fa-solid fa-plus';
        planInput.appendChild(button);

        // Event Listener for adding todoItems
        button.addEventListener('click',()=>{
            if(text.value !== ''){
                const innerDiv = document.createElement('div');
                innerDiv.className='inner-container'
                innerDiv.innerHTML= `
                <li>${text.value}</li>
                <div>
                <i class="fa-regular fa-circle fa-xl" style="color: black;" onclick='isComplete(this,false)'></i>
                <i class="fa-regular fa-pen-to-square fa-xl" onclick='editItem(this)'></i>
                <i class="fa-regular fa-trash-can fa-xl" onclick='deleteItem(this)' style="color: red;"></i>
                </div>
                `; 
                outerDiv.appendChild(innerDiv);
                text.value='';
            }
        })
    }
})

// A function for marking items as completed
function isComplete(param, condition){
    if(!condition){
        param.nextElementSibling.style.display='none';
        param.parentNode.previousElementSibling.style.textDecoration = 'line-through';
        param.className = 'fa-solid fa-circle-check fa-xl';
        param.style.color='#e7820d';
        param.setAttribute('onclick','isComplete(this,true)');
    }else{
        param.nextElementSibling.style.display='inline';
        param.parentNode.previousElementSibling.style.textDecoration = 'none';
        param.className = 'fa-regular fa-circle fa-xl';
        param.style.color='black';
        param.setAttribute('onclick','isComplete(this,false)');
    }
}


// A function for editing todoItems
function editItem(params){
    // retrieve an elements
    let arr = Array.from(params.parentNode.parentNode.children);
    const input = document.createElement('input');
    input.type='text';
    input.placeholder='Enter plans';
    const text = arr[0].textContent;
    input.value = `${text}`;
    arr[0].replaceWith(input);
    // create an Save icon
    const saveButton = document.createElement('i');
    saveButton.className = 'fa-solid fa-floppy-disk fa-xl';
    params.parentNode.appendChild(saveButton);
    params.style.display='none';
    params.nextElementSibling.style.display = 'none';
    params.previousElementSibling.style.display='none';
    // Event Listener for saving updates
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

// A function for deleting Todo
function deleteButton(param){
    addLi.removeChild(param.parentNode.parentNode);
}
// A function for deleting todoItems.
function deleteItem(params){
    params.parentNode.parentNode.parentNode.removeChild(params.parentNode.parentNode);
}