window.addEventListener('load',function()
{
    let user=JSON.parse(sessionStorage.getItem("loggedInUser"))||[];
    let name=document.getElementById("name");
    let email=document.getElementById("email");
    name.innerText=`Name: ${user.name}`;
    email.innerText=`Email: ${user.email}`;


});