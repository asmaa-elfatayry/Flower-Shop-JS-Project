import * as editform from './Authentication.js';
import * as updateprofile from './EditUserProfile.js'

window.addEventListener('load',function()
{
    let user=JSON.parse(sessionStorage.getItem("loggedInUser"))||[];
    let name=document.getElementById("name");
    let email=document.getElementById("email");

    name.innerText=`Name: ${user.name}`;
    email.innerText=`Email: ${user.email}`;
    
    document.getElementById("saveChangesBtn").addEventListener('click',function()
    {
        let name_in=document.getElementsByTagName("input")[0].value;
        let email_in=document.getElementsByTagName("input")[1].value;
        let password_in=document.getElementsByTagName("input")[2].value;
          if ( !editform.valid_name(name_in.trim())) {
            editform.handleTheErrorMessage(0, "this is invalid name, can not contain space");
          }
          else if (updateprofile.isEmailExists(email_in,user.id)) {
            editform.handleTheErrorMessage(1, "This email is already registered. Please use a different email.");
          }
          else if (email_in.trim() == 0 || !editform.isValidEmail(email_in)) {
            editform.handleTheErrorMessage(1, "This email is not a valid email,please try another one.");
          }
          else if (!editform.password_valid(password_in)) {
            editform.handleTheErrorMessage(2, "This is an invalid password. Please make sure it is at least 8 characters long and choose a complex one.");
          } else if (!editform.iscomplexPassword(password_in)) {
            editform.handleTheErrorMessage(2, "This is not a complex password. Please choose a password with at least 8 characters, including letters, digits, and special characters.");
          }
          else{
            const loggedInUser = { id:user.id,name: name_in.trim(), email: email_in, role: "user" };
            sessionStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
            updateprofile.editprofile(user.id,name_in.trim(), email_in, password_in);
            $("#editprofile").modal("hide");
            Swal.fire({
            position: "center",
            icon: "success",
            title: "Data Updated",
            showConfirmButton: false,
            timer: 1500,
          });
          }
    });
    document.getElementById("editProfileUser").addEventListener('click',function()
    {

        const currentUser=updateprofile.getcurrentuser();
        document.getElementsByTagName("input")[0].value=currentUser.name;
        document.getElementsByTagName("input")[1].value=currentUser.email;
        document.getElementsByTagName("input")[2].value=currentUser.password;
    });

   
});