const leaderBoard = document.getElementById('leaderBoard');
const backToMyPage = document.getElementById('backToMyPage');

backToMyPage.addEventListener('click', gotToMyPage);

window.addEventListener('DOMContentLoaded', async () => {
    try{
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:3000/showLeaderBoard', {headers: {'Authorization': token}})
        console.log(res);
        for(let i=0;i<res.data.length;i++)
        {
            showLeaderBoardOnScreen(res.data[i]);
        }
    }
    catch(err){
        console.log(err);
    }
})

function showLeaderBoardOnScreen(data){
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(`${data.firstName}`));
    li.appendChild(document.createTextNode(' - '));
    li.appendChild(document.createTextNode(`${data.total_Expense}`));
    leaderBoard.appendChild(li);
}

function gotToMyPage(e){
    e.preventDefault();
    location.replace('../expense/expense.html');
}