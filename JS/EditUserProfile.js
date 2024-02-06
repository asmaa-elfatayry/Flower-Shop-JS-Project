export function getcurrentuser()
{
    const users=JSON.parse(sessionStorage.getItem("loggedInUser"))||[];
    return users;

}
export function editprofile(id,name, email, password)
{
     const users=JSON.parse(localStorage.getItem("userData"))||[];
     const index=users.findIndex(user=>user.id==id);
     users[index].name=name;
     users[index].email=email;
     users[index].password=password;
     localStorage.setItem("userData",JSON.stringify(users));
     updatesessionstorage(id);
}
export function updatesessionstorage(id)
{
     const newusers=JSON.parse(localStorage.getItem("userData"))||[];
     const updateuser=newusers.find(user=>user.id==id);
     sessionStorage.setItem("loggedInUser",JSON.stringify(updateuser));
}

export function isnewPassworMatchOld(id,password)
{
     const users=JSON.parse(localStorage.getItem("userData"))||[];
     const currentuser=users.find(user=>user.id==id);
     let pass=currentuser.password;
     return pass==password;
}
export function correctOldUserpassword(id,password)
{    
     const users=JSON.parse(localStorage.getItem("userData"))||[];
     const currentuser=users.find(user=>user.id==id);
     let pass=currentuser.password;
     return pass==password;
}

export function isEmailExists(email,id)
{
 const users=JSON.parse(localStorage.getItem("userData"))||[];
 return users.some(user=>user.email===email && user.id!=id);
}

