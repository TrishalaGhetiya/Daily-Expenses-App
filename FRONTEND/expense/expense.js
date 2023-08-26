const limit = 2;
const expenseForm = document.getElementById('expenseForm');
const amount = document.getElementById('amount');
const description = document.getElementById('description');
const category = document.getElementById('category');
const expenseList = document.getElementById('expenseList');
const premium = document.getElementById('premium');
const premiumStatus = document.getElementById('premiumStatus');
const leaderBoard = document.getElementById('leaderBoard');
const totalExpense = document.getElementById('totalExpense');
const logout = document.getElementById('logout');
const report = document.getElementById('report');
const pagination = document.getElementById('pagination');
const expenseData = [];

expenseForm.addEventListener('submit', addExpense);
expenseList.addEventListener('click', updateExpense);
premium.addEventListener('click', getPremiumMembership);
leaderBoard.addEventListener('click', showLeaderBoard);
logout.addEventListener('click', userLogout);
report.addEventListener('click', download);

async function download(e){
    e.preventDefault();
    try{
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:3000/download', {headers: {'Authorization': token}})
        console.log(res);
        if(res.status === 200){
            var a = document.createElement('a');
            a.href = res.data.fileURL;
            a.download = 'myexpense.csv';
            a.click();
            alert('your file has downloaded!'); 
        }
    }
    catch(err){
        console.log(err);
    }
    //location.replace('../Report/report.html');
}

function userLogout(e){
    e.preventDefault();
    window.location.replace('../login/login.html');
}

function showLeaderBoard(e){
    e.preventDefault();
    window.location.replace('../premium/premium.html');
}

function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

function showPremiumMessage(){
    premium.style.visibility="hidden";
    premiumStatus.innerHTML = 'You are a Premium member now.';
    leaderBoard.style.visibility = "visible";
    report.style.visibility = "visible";

}

window.addEventListener('DOMContentLoaded', async() => {
    try{
        const token = localStorage.getItem('token');
        const decodedToken = parseJwt(token);
        if(decodedToken.isPremium === true){
            showPremiumMessage();
        }
        var page = 1;
        const res = await axios.get(`http://localhost:3000/get-expenses/?page=${page}&limit=${limit}`, {headers: {'Authorization': token}});
        showPagination(res.data.count);
        //console.log(res.data.rows);
        for(let i=0;i<res.data.rows.length;i++)
        {
            showNewExpenseOnScreen(res.data.rows[i]);
            expenseData.push(res.data.rows[i]);
        }
    }
    catch(err){
        console.log(err);
    }
})

function showPagination(pages){
    const numberOfButtons = Math.ceil(pages/limit);
    for(let i=1;i<=numberOfButtons;i++){
        const btn = document.createElement('button');
        btn.innerHTML = i;
        btn.className = `btn${i}`;
        btn.addEventListener('click', () => getExpenses(i));
        pagination.appendChild(btn);
        //console.log(btn.className);
    }
    //console.log(numberOfButtons);
}

async function getExpenses(currentPage){
    try{
        const token = localStorage.getItem('token');
        const res = await axios.get(`http://localhost:3000/get-expenses/?page=${currentPage}&limit=${limit}`, {headers: {'Authorization': token}});
        console.log(res);
        for(let i=0;i<res.data.rows.length;i++)
        {
            showNewExpenseOnScreen(res.data.rows[i]);
            expenseData.push(res.data.rows[i]);
        }
    }
    catch(err){
        console.log(err);
    }
}

function showNewExpenseOnScreen(data){
    const deleteBtn = document.createElement('button');
    deleteBtn.className='btn btn-sm btn-danger delete float-right';
    deleteBtn.appendChild(document.createTextNode('X'));

    const editButton = document.createElement('button');
    editButton.className= 'btn btn-sm btn-success float-right edit';
    editButton.appendChild(document.createTextNode('Edit'));

    const li = document.createElement('li');
    li.className = 'name';
    li.appendChild(document.createTextNode(`${data.description}`));
    li.appendChild(document.createTextNode(' - '));
    li.appendChild(document.createTextNode(`${data.amount}`));
    li.appendChild(document.createTextNode(' - '));
    li.appendChild(document.createTextNode(`${data.category}`));
    li.appendChild(deleteBtn);
    li.appendChild(editButton);

    totalExpense.innerHTML=`${data.user.total_Expense}`;

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
            const token = localStorage.getItem('token');
            const res = axios.post('http://localhost:3000/add-expenses', expenses, {headers: {'Authorization': token}});
            location.reload();
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
                            const token = localStorage.getItem('token');
                            const res = await axios.delete(`http://localhost:3000/delete-expense/${expenseData[i].id}`,
                            {headers: {'Authorization': token}, 
                            data: {
                                'amount': expenseData[i].amount, 
                                'total_Expense' : expenseData[i].user.total_Expense
                            }
                        });
                        console.log(res);
                        }
                        catch(err){
                            console.log(err);
                        } 
                        break;
                    }        
                }
                expenseList.removeChild(li);
                location.reload();
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
                        const token = localStorage.getItem('token');
                        const result = axios.delete(`http://localhost:3000/delete-expense/${expenseData[i].id}`, {headers: {'Authorization': token}});
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

async function getPremiumMembership(e){
    e.preventDefault();
    const token = localStorage.getItem('token');
    try{
        const res = await axios.get('http://localhost:3000/getPremiumMembership', {headers: {'Authorization': token}});
        //console.log(res.data);
        var options = {
            "key": res.data.key_id,
            "order_id": res.data.rzpOrder.id,
            "handler": async function (res) {
                await axios.post('http://localhost:3000/updateTransactionStatus', {
                    order_id: options.order_id,
                    payment_id: res.razorpay_payment_id
                }, {headers: {'Authorization': token}})

                alert('Enjoy your premium membership');
                showPremiumMessage();
            }
        };
        const rzp1 = new Razorpay(options);
        rzp1.open();
        e.preventDefault();

        rzp1.on('payment.failed', function (response) {
            console.log(response);
            alert('something went wrong');
        })
    }
    catch(err){
        console.log(err);
    }
}

