const signUpForm = document.getElementById('signUpForm');
const userName = document.getElementById('userName');
const email = document.getElementById('email');
const pass = document.getElementById('pass');
const confirmPass = document.getElementById('confirmPass');

signUpForm.addEventListener('submit', createUser);

async function createUser(e)
{
    e.preventDefault();
    if(pass.value!=confirmPass.value){
        alert('Check your Password');
        pass.value='';
        confirmPass.value='';
    }
    else{
        let user = {
            userName: userName.value,
            email: email.value,
            password: pass.value
        }
        try{
            const res = await axios.post('http://localhost:3000/signup', user);
            console.log(res);
            userName.value='';
            email.value='';
            pass.value='';
            confirmPass.value='';
        }
        catch(err){
            console.log(err);
            userName.value='';
            email.value='';
            pass.value='';
            confirmPass.value='';
        }
    }
}