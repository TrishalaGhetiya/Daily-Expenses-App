const loginForm = document.getElementById('loginForm');
const email = document.getElementById('email');
const pass = document.getElementById('pass');
const register = document.getElementById('register');

loginForm.addEventListener('submit', loginUser);

register.addEventListener('click', signupUser);

function signupUser(e){
    e.preventDefault();
    window.location.replace('../signUp/signup.html');
}

async function loginUser(e){
    e.preventDefault();
    let user = {
        email: email.value,
        pass: pass.value
    }
    try{
        const res = await axios.post('http://localhost:3000/login', user);
        console.log(res);
        email.value='';
        pass.value='';
        window.location.replace('../expense/expense.html');
    }
    catch(err){
        console.log(err);
        email.value='';
        pass.value='';
    }

}