
function saveData(event){
    event.preventDefault()
    let name=document.getElementById('name').value;
    let email=document.getElementById('email').value;
    let obj={
        "name":name,
        "email":email
    }  
   axios.post('https://crudcrud.com/api/4edc25d4d58848728b4b4f20db709230/appointmentData',obj)
   .then((response) => {
    showUsers(response.data)
    // console.log(response)
   })
   .catch((err) => {
    document.body.innerHTML = document.body.innerHTML + "<h4> Something went wrong </h4>";
    console.log(err)
});
}
function showUsers(obj){
    let parentElem=document.getElementById('users');
    let childelem =document.createElement('li');
    childelem.appendChild(document.createTextNode(`${obj.name}: ${obj.email}`))
    parentElem.appendChild(childelem);
    
    let deletebutton=document.createElement('input');
    deletebutton.type='button';
    deletebutton.value='delete';
    deletebutton.onclick=()=>{
        parentElem.removeChild(childelem)
    }
    let editbutton=document.createElement('input')
    editbutton.type='button'
    editbutton.value='Edit'
    editbutton.onclick=()=>{
        parentElem.removeChild(childelem)
        document.getElementById('name').value=obj.name
        document.getElementById('email').value=obj.email

    }



    childelem.appendChild(deletebutton)
    childelem.appendChild(editbutton)
    parentElem.appendChild(childelem)
}