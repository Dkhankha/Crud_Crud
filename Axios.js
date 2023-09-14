
function saveData(event){
    event.preventDefault()
    let name=document.getElementById('name').value;
    let email=document.getElementById('email').value;
    let obj={
        "name":name,
        "email":email
    }  
   axios.post('https://crudcrud.com/api/4bfed86e5f0849d9ad449bbfb8a4fb35/appointmentData',obj)
   .then((response) => {
    showUsers(response.data)
    // console.log(response.id)
   })
   .catch((err) => {
    document.body.innerHTML = document.body.innerHTML + "<h4> Something went wrong </h4>";
    console.log(err)
});
}
window.addEventListener('DOMContentLoaded', () => {
    axios.get('https://crudcrud.com/api/4bfed86e5f0849d9ad449bbfb8a4fb35/appointmentData')
    .then((response) => {
       for(var i=0; i<response.data.length; i++){
        showUsers(response.data[i])
       }
       })
       .catch((err) => {
        console.log(err)
    });
})


function editUser(userId) {
    // Get the updated user data from the form fields
    const updatedName = document.getElementById('name').value;
    const updatedEmail = document.getElementById('email').value;
    deleteUser(userId)
}

function deleteUser(userId) {
    axios
      .delete(`https://crudcrud.com/api/4bfed86e5f0849d9ad449bbfb8a4fb35/appointmentData/${userId}`)
      .then((response) => {
        // Handle successful deletion (e.g., show a message)
        console.log(`User with ID ${userId} deleted successfully.`);
      })
      .catch((err) => {
        // Handle errors, such as network issues or failed deletions
        console.log(`Error deleting user with ID ${userId}:`, err);
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
    deletebutton.style.marginLeft = '80px'
    deletebutton.onclick=()=>{
        deleteUser(obj._id);
        parentElem.removeChild(childelem);
    }
    let editbutton=document.createElement('input')
    editbutton.type='button'
    editbutton.value='Edit'
    editbutton.style.marginLeft = '5px'
    editbutton.onclick=()=>{
        editUser(obj._id);
        parentElem.removeChild(childelem)
        document.getElementById('name').value=obj.name
        document.getElementById('email').value=obj.email

    }
    childelem.appendChild(deletebutton)
    childelem.appendChild(editbutton)
    parentElem.appendChild(childelem)
}
