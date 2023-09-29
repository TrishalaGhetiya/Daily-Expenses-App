const backToMyPage = document.getElementById('backToMyPage');

backToMyPage.addEventListener('click', showMyPage);

function showMyPage(e){
    e.preventDefault();
    location.replace('../expense/expense.html');
}