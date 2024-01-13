 async function loginData(e) {
    e.preventDefault();
    const b = document.getElementsByTagName('body');
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    // console.log(email);
    const details = {
        email:email,
        password:password
    }
     
    try {
        const response = await axios.post('http://localhost:8081/login',details)
        // console.log(response)

        if(response.status===200){
            alert('login successfull');

        }
        else{
            document.body.innerHTML +=`<div style ="color:red">${response.data.message}</div>`
        }
    } catch (error) {
        // console.log(error);
        document.body.innerHTML +=`<div style ="color:red">${error.response.data.message}</div>`
        
    }
    

    
    
}