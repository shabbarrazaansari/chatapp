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
        // addMessage(response.data.text);
     }

    })
    .catch(err=>{
        console.log(err);
    })
}

// setInterval(getMessage, 1000);

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
        messageDiv.classList = 'sentmessage';
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
function isAdmin(){
    const token =localStorage.getItem('token');
    axios.get('http://localhost:8081/getgroup',{headers:{'Authorization':token}})
    .then(response=>{
        console.log(response.data)
        showGroup(response.data);
    })
    .catch(err=>{
        console.log(err)
    })
}

function showGroup(group) {
    console.log(group);
    if(group.length===0){
        return;
    }
    
    const parentElem = document.getElementById("groupadded");
    const heading = document.createElement('h3');
    heading.textContent = 'Groups';
    parentElem.appendChild(heading);
    

   for (let i=0;i<group.length;i++){
    const anchor = document.createElement('a');
    console.log(group[i].id)
    anchor.href = `../specificGroup/specificGroup.html?groupId=${group[i].id}&groupName=${group[i].name}`;

    const child = document.createElement('div');
    child.style.border = '1px solid #ccc';
        child.style.padding = '10px';
        child.style.margin = '5px';
        child.style.backgroundColor = '#f0f0f0';
    child.innerHTML = `${group[i].name}`;
    anchor.appendChild(child);
    parentElem.appendChild(anchor);

   }
    // child.innerHTML = `$`

}

window.addEventListener('load',onLoad);
window.addEventListener('load',getMessage)
window.addEventListener('load',isAdmin)
