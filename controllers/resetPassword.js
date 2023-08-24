const pass = document.getElementById('password');
const resetPassword = document.getElementById('resetPassword');

resetPassword.addEventListener('submit', changePassword);

async function changePassword(e){
    e.preventDefault();
    try{
        const data = {
            password: pass.value
        }
        const res = await axios.post('http://localhost:3000/updatePassword/', data)
        console.log(res);
    }
    catch(err){
        console.log(err);
    }
}

