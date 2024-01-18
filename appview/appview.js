async function messageDetails(e) {
    e.preventDefault();
    const message = document.getElementById('message').value;
    console.log(message);
    const token = localStorage.getItem('token');

    await axios.post('http://localhost:8081/message',{
        message:message
    },{headers:{'Authorization':token}})
    .then(response=>{
     if(response.status ===200){
        console.log(response.data.text)
        console.log("message sent");
        addMessage(response.data.text);
     }

    })
    .catch(err=>{
        console.log(err);
    })
}

setInterval(getMessage, interval);

async function getMessage() {
    const token = localStorage.getItem('token');
    const parentElem = document.getElementById('allMessage');

    
    try {
        const response = await axios.get('http://localhost:8081/message',{headers:{'Authorization':token}});
        if(response.data.messages){
            showMsg(parentElem,response.data.messages);
        }
        else {
          console.log('no messages');
        }
        
    } catch (error) {
        console.log(error);
        
    }
     
    
}
// function addMessage(text) {
//     const parentElem = document.getElementById('allMessage');
//     const messageDiv = document.createElement('div');
//     messageDiv.textContent = text;
//     parentElem.appendChild(messageDiv);


    
// }


function showMsg(parentElem, messages) {
    // Clear existing content
    parentElem.innerHTML = '';

    // Loop through messages and append to parentElem
    messages.forEach(message => {
        const messageDiv = document.createElement('div');
        messageDiv.textContent = message.message; // You may need to adjust this based on your message structure
        parentElem.appendChild(messageDiv);
    });
}

function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}
function onLoad() {
    const token =localStorage.getItem('token');
    const user = parseJwt(token);
    const name = user.name;
    console.log(user);
    const joined = document.getElementById('joined');
    joined.innerHTML = `${name} joined`;
    
    
}

window.addEventListener('load',onLoad);
window.addEventListener('load',getMessage)