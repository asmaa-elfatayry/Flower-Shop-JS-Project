document.getElementById("submit").addEventListener("click", (e)=>{
    e.preventDefault();// not submit but save data to local storage
    let uName = document.getElementById("uname");
    let uMail = document.getElementById("uemail");
    let uSubject = document.getElementById("usubject");
    let uMessage = document.getElementById("con_message");
    if(uName.value && uMail.value && uSubject.value && uMessage.value){
        let messages = localStorage.getItem("messages") ? JSON.parse(localStorage.getItem("messages")) : [];
        messages.push({Name: uName.value, Email: uMail.value, Subject: uSubject.value, Message: uMessage.value });
        localStorage.setItem("messages",JSON.stringify(messages));
    }else{
        Swal.fire("Please enter valid data  ")
    }
    
});