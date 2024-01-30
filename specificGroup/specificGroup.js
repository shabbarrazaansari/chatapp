const urlParams = new URLSearchParams(window.location.search);

const groupName = urlParams.get('groupName');
const groupId = urlParams.get('groupId');

 async function messageDetails(e) {
    e.preventDefault();
    const message = document.getElementById('message').value;
    console.log(message);
    const token = localStorage.getItem('token');
    // Get the URL parameters

console.log(urlParams.get("groupName"));

group(groupName);

// Get the value of the 'groupId' parameter
const groupId = urlParams.get('groupId');


// Now you can use the groupId as needed
console.log('Group ID:', groupId);
try {
    const sentMsg = await axios.post('http://localhost:8081/groupmsg',{
    message:message,
    id:groupId
},{headers:{'Authorization':token}})
showMsg(sentMsg.data.message)

console.log(sentMsg.data.message);
    
} catch (error) {
    console.log(error);
}
    
}
function showMsg(data) {
    console.log(data)

    const msg = document.getElementById('allMessage');
    msg.innerText='';
    const div = document.createElement('div');
    div.innerText = `${data}`;
    msg.appendChild(div);


    
}
 async function onLoad() {
    const msg =document.getElementById('allMessage');
    msg.innerText ='';
    const token = localStorage.getItem('token');
    group(groupName)
    try {

       const data = await axios.get(`http://localhost:8081/groupmsg/${groupId}`,{headers:{'Authorization':token}});
       console.log(data);
       for (let i=0;i<data.data.length;i++)
       {
        const div = document.createElement('div');
        div.innerText = `${data.data[i].message}`;
        msg.appendChild(div);
       }

        
    } catch (error) {
        console.log(error);
    }

   
    
}
function group(groupname){
    console.log(groupname);
    const name = document.getElementById('groupname');
    name.innerText = '';
    name.innerHTML =`${groupname}`;
}
document.getElementById('btn1').addEventListener('click',()=>{
    document.getElementById('searchbox').style.display = 'block';
    document.getElementById('btn3').style.display = 'block'

    document.getElementById('btn3').addEventListener('click',async (req,res)=>{
        const searchName = document.getElementById('search').value;
       
        console.log(searchName);
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get(`http://localhost:8081/search/${searchName}/${groupId}`,{headers:{'Authorization':token}});
            console.log(response.data);
            if(response){
                document.getElementById('btn3').style.display = 'none'

            }
            
           getName(response);

            
        } catch (error) {
            console.log(error);
        }


       
    })
})
document.getElementById('btn2').addEventListener('click',()=>{
    document.getElementById('searchbox').style.display = 'none';
    const ul = document.getElementById('searchresult');
    document.getElementById('search').value = ''
    ul.innerText = '';


    


})

function getName(res) {
    const ul = document.getElementById('searchresult');
    ul.innerText = '';
    console.log(res);
    const child = document.createElement('div');
    // console.log(res.data.data.isAdmin);
    // const btnAdd = document.createElement('button');

    if (res.status===201){
        if(res.data.isAdmin===true){
            console.log(res);
            child.innerText = `${res.data.message}`;
            ul.appendChild(child);
            return;
    
    
    
        }
        if (!res.data.isAdmin){
            console.log(res.data.data);
            const btnAdd = document.createElement('button');
            btnAdd.innerText = `${res.data.message}`;
            child.appendChild(btnAdd);
            
            btnAdd.addEventListener('click',async ()=>{
                try {
                    
                    const adminDone = await axios.post(`http://localhost:8081/admin/${res.data.data.id}`,{headers:{'Authorization':token}});
                    console.log(adminDone[0]);
                    child.removeChild(btnAdd);
                    child.innerText = 'user is admin now';

                    
                } catch (error) {
                    console.log(error);
                }
                

            })
            ul.appendChild(child);
            
    
        }

    }
    
    else if(res.status===200) {
        console.log(res.data)
        const btnAdd = document.createElement('button');
        const token = localStorage.getItem('token');
        btnAdd.innerText = 'add to group';
        child.innerText = `${res.data.name}`;
        child.appendChild(btnAdd);

        btnAdd.addEventListener('click',async ()=>{
        
            try {
                const token = localStorage.getItem('token');
                console.log(res.data.data)
                console.log(token);
                const msg = await axios.post(`http://localhost:8081/add/${res.data.id}/${groupId}`,{headers:{'Authorization':token}});
                console.log(msg);
                btnAdd.innerHTML = '';
                if(msg.status===200){
                    child.innerText = `added to group`;

    
                }
                // if()
                
    
                
            } catch (error) {
                console.log(error);
            }
    
           
        })
        ul.appendChild(child)
        
    }
   

    
    
   
    

}

document.getElementById('info').addEventListener('click',async ()=>{
    
    const token = localStorage.getItem('token');
    try {
        const userData = await axios.get(`http://localhost:8081/groupmember/${groupId}`,{headers:{'Authorization':token}});
        console.log(userData.data);
        userlist(userData.data);

    } catch (error) {
        console.log(error);
    }
       
}

)
function userlist(res) {
    const ul = document.getElementById('userslist');
    ul.innerText = '';
    for (let index = 0; index < res.length; index++) {
        const element = document.createElement('li');
        element.style.display = 'inline'
        element.innerText =`${res[index].name} , `;
        ul.appendChild(element)
        
    }
    
}
   

// window.addEventListener('load',
//     group(groupName)
// );
// setInterval(onLoad, 1000);
// window.addEventListener('load',groupInfo)
window.addEventListener('load',onLoad)