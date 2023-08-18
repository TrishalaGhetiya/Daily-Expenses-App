const signUpForm = document.getElementById('signUpForm');
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const email = document.getElementById('email');
const pass = document.getElementById('pass');

signUpForm.addEventListener('submit', createUser);

async function createUser(e)
{
    e.preventDefault();
    let user = {
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        password: pass.value
    }
    try{
        const res = await axios.post('http://localhost:3000/signup', user);
        console.log(res);
        firstName.value='';
        lastName.value='';
        email.value='';
        pass.value='';
        window.location.replace('../login/login.html');
    }
    catch(err){
        console.log(err);
        firstName.value='';
        lastName.value='';
        email.value='';
        pass.value='';
    }
}
