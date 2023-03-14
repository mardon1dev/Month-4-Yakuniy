
const form = document.querySelector(".add-user");
const firstName = document.getElementById("firstname");
const lastName = document.getElementById("lastname");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmpassword");
const validateEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


function isEmail(email) {
    return validateEmail.test(email);
}
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    myFun()

})
function myFun(){
    if(firstName.value.trim()===''){
        firstName.classList.add("red")
    }
    else{
        firstName.classList.add("green")
 
    }
    if (lastName.value.trim()==='') {
        lastName.classList.add("red")
    } else {
        lastName.classList.add("green")
       
    }
    if (email.value.trim()==='') {
        email.classList.add("red")
    } else{
        email.classList.add("green")
    }
    if (password.value.trim()==='') {
        password.classList.add("red")
    }else if(password.value.trim()!== confirmPassword.value.trim())
    password.classList.add("red")
    
    else {
        password.classList.add("green")
    }
    if (confirmPassword.value.trim()==='') {
        confirmPassword.classList.add("red")
    } else if (password.value.trim()!== confirmPassword.value.trim()) {
        
        confirmPassword.classList.add("red")
   
    }else{
        confirmPassword.classList.add("green")
    }

    if (firstName.value.trim()!=='' && lastName.value.trim()!=="" && email.value.trim()!=="" && password.value.length>5) {
        const token = `68786844dgf64r4gr6a4g`
        window.location.href = (token, "blog.html")
        alert("Are you sure to send your identification to us?")
    } 
    else{
        password.classList.add("red")
        confirmPassword.classList.add("red")
        alert("To'g'ri ma'lumot kirit")
    }
    firstName.value=''
    lastName.value=''
    email.value=''
}




