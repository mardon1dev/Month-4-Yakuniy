const form = document.querySelector(".add-user");
const username = document.getElementById("username");
const password = document.getElementById("password");

const token = prompt();

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    myLogin();
})
function myLogin(){
    if (username.value.trim()==="") {
        username.classList.add("red")
    }

    if (password.value.trim()==="") {
        password.classList.add("red")
    }

    if (username.value.trim()!=="" && password.value.trim()!=="") {
        username.classList.add("green");
        password.classList.add("green");
        setTimeout(() => {
            window.location.href = (token, "register.html");
            username.value=''
            password.value=""
        }, 500);
        
    } else {
        if (username.value.trim()=="" || password.value.trim()=="") {
            alert("To'g'ri ma'lumot kirit")
        }
        else{
        location.reload()
        }
    }


}

