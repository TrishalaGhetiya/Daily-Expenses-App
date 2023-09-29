const forgotPassword = document.getElementById('forgotPassword');
const errorMessage = document.getElementById('errorMessage');
const backToLogin = document.getElementById('backToLogin');
const email = document.getElementById('email');

forgotPassword.addEventListener('submit', getEmail);
backToLogin.addEventListener('click', getLoginPage);

function getLoginPage(e){
    e.preventDefault();
    location.replace('../login/login.html');
}

async function getEmail(e){
    try{
        e.preventDefault();
        const data = {
            email: email.value
        }
        const res = await axios.post('http://localhost:3000/forgotPassword', data);
        console.log(res);
    }
    catch(err){
        console.log(err);
    }
    

}