async function groupData(e) {
    e.preventDefault();
    // console.log(e)
    const name = document.getElementById('groupName').value;
    console.log(name);
    const token = localStorage.getItem('token')
    try {
        const response =  await axios.post('http://localhost:8081/group',{name:name},{headers:{'Authorization':token}})
        console.log(response.data)
        if(response.status ===201){
            alert('group created');
            window.location.href = '../appview/appview.html';
        }
    
        
    } catch (error) {
        console.log(error)
    }
    

    
}