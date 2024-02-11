window.addEventListener("DOMContentLoaded", function () {  
document.getElementById("submit").addEventListener("click", (e) => {
    e.preventDefault();
    if(sessionStorage.getItem("loggedInUser")) {
        let uName = document.getElementById("uname").value.trim();
        let uMail = document.getElementById("uemail").value.trim();
        let uSubject = document.getElementById("usubject").value.trim();
        let uMessage = document.getElementById("con_message").value.trim();
        
        // Regular expression for email validation
        let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (uName !== '' && uMail !== '' && uSubject !== '' && uMessage !== '') {
            if (emailRegex.test(uMail)) {
                
                let messages = localStorage.getItem("messages") ? JSON.parse(localStorage.getItem("messages")) : [];
                let Lastid = messages.length;
                messages.push({Id: Lastid, Name: uName, Email: uMail, Subject: uSubject, Message: uMessage});
                localStorage.setItem("messages", JSON.stringify(messages));
                
                // Clear input fields after successful submission
                document.getElementById("uname").value = '';
                document.getElementById("uemail").value = '';
                document.getElementById("usubject").value = '';
                document.getElementById("con_message").value = '';
            } else {
                Swal.fire("Please enter a valid email address");
            }
        } else {
            Swal.fire("Please enter valid data");
        }
    } 
    else {
        Swal.fire("please login first!");
        document.querySelector("button.swal2-confirm.swal2-styled").addEventListener("click", function () {
            window.location.href = "login.html";
        });
    }
})
});