const expenseForm = document.getElementById('expenseForm');
const amount = document.getElementById('amount');
const description = document.getElementById('description');
const category = document.getElementById('category');
const expenseList = document.getElementById('expenseList');
const expenseData = [];

expenseForm.addEventListener('submit', addExpense);
expenseList.addEventListener('click', updateExpense);

window.addEventListener('DOMContentLoaded', async() => {
    try{
        const res = await axios.get('http://localhost:3000');
        console.log(res.data);
        for(let i=0;i<res.data.length;i++)
        {
            showNewExpenseOnScreen(res.data[i]);
            expenseData.push(res.data[i]);
        }
    }
    catch(err){
        console.log(err);
    }
})

function showNewExpenseOnScreen(data){
    const deleteBtn = document.createElement('button');
    deleteBtn.className='btn btn-sm btn-danger delete float-right';
    deleteBtn.appendChild(document.createTextNode('X'));

    const editButton = document.createElement('button');
    editButton.className= 'btn btn-sm btn-success float-right edit';
    editButton.appendChild(document.createTextNode('Edit'));

    const li = document.createElement('li');
    li.appendChild(document.createTextNode(`${data.description}`));
    li.appendChild(document.createTextNode(' - '));
    li.appendChild(document.createTextNode(`${data.amount}`));
    li.appendChild(document.createTextNode(' - '));
    li.appendChild(document.createTextNode(`${data.category}`));
    li.appendChild(deleteBtn);
    li.appendChild(editButton);

    expenseList.appendChild(li);
}

async function addExpense(e){
    e.preventDefault();
    if(amount.value==='' || description.value==='' || category.value==='')
    {
        msg.innerHTML="Please enter all fields";
        setTimeout(() => msg.remove(),3000);
    }
    else
    {
        const deleteBtn = document.createElement('button');
        deleteBtn.className='btn btn-sm btn-danger delete float-right';
        deleteBtn.appendChild(document.createTextNode('X'));

        const editButton = document.createElement('button');
        editButton.className= 'btn btn-sm btn-success float-right edit';
        editButton.appendChild(document.createTextNode('Edit'));

        const li = document.createElement('li');
        li.appendChild(document.createTextNode(`${description.value}`));
        li.appendChild(document.createTextNode(' - '));
        li.appendChild(document.createTextNode(`${amount.value}`));
        li.appendChild(document.createTextNode(' - '));
        li.appendChild(document.createTextNode(`${category.value}`));
        li.appendChild(deleteBtn);
        li.appendChild(editButton);

        expenseList.appendChild(li);
        let expenses = {
            description : description.value,
            amount : amount.value,
            category : category.value
        };
        try{
            const res = axios.post('http://localhost:3000/add-expenses', expenses);
            console.log('Expense added');
            amount.value='';
            description.value='';
            category.value='';
        }
        catch(err){
            console.log(err)
            amount.value='';
            description.value='';
            category.value='';
        } 
    }
}

async function updateExpense(e){
    if(e.target.classList.contains('delete'))
        {
            if(confirm('Sure??'))
            {
                const li = e.target.parentElement;
                const delExpense = li.firstChild.textContent;
                for(let i=0;i<expenseData.length;i++)
                {
                    if(expenseData[i].description === delExpense)
                    {
                        try{
                            const res = await axios.delete(`http://localhost:3000/delete-expense/${expenseData[i].id}`);
                            console.log(res);
                        }
                        catch(err){
                            console.log(err);
                        } 
                        break;
                    }        
                }
                expenseList.removeChild(li);
            }
        }
        if(e.target.classList.contains('edit'))
        {
            const li1 = e.target.parentElement;
            const updatedExpense = li1.firstChild.textContent;
            for(let i=0;i<expenseData.length;i++)
            {
                if(expenseData[i].description === updatedExpense)
                {
                    description.value=expenseData[i].description;
                    amount.value=expenseData[i].amount;
                    category.value = expenseData[i].category;
                    try{
                        const result = axios.delete(`http://localhost:3000/delete-expense/${expenseData[i].id}`);
                        console.log(result);
                    }
                    catch(err){
                        console.log(err)
                    }
                    break;
                }              
            }
            expenseList.removeChild(li1);   
        }
}

