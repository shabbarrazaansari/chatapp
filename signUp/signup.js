async function signupDetails(e) {
    e.preventDefault();
    // console.log(e);
    const p = document.getElementsByTagName('body')
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const phone = document.getElementById('phone').value;

    console.log(name)
    const obj = {name:name,email:email,password:password,phone:phone}

    try {
         await axios.post('http://localhost:8081/signup',obj)
         .then(result=>{
            document.getElementById('name').value ='';
             document.getElementById('email').value = '';
             document.getElementById('password').value = '';
             document.getElementById('phone').value ='';
             console.log(result.status)
             console.log(result)
             if (result.status===201) {
                alert('Login successful');
                window.location.href = '  ../login/login.html';
            }
            //  console.log(result.data);
            //  if(result.data.success===false)
            else{
                document.body.innerHTML +=`<div style ="color:red">${result.data.message}</div>`
             }
             
        

         })
        
        
    } catch (error) {
        p.innerHTML+=`error.response.data.message`
    }

    

    
}