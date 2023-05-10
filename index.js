if(!localStorage.getItem("myLeads")){
    localStorage.setItem("myLeads",JSON.stringify(""));
};
let myLeads = [];
const inputBtn = document.getElementById("input-btn");
const inputEl = document.getElementById("input-el")
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");
const errorMsg = document.getElementById("error-msg");
const saveBtn = document.getElementById("save-btn");
const footerEl = document.getElementById("footer-el")
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));

if(leadsFromLocalStorage){
    myLeads = leadsFromLocalStorage;
    render(myLeads)
    setTimeout(() => {
        deleteBtn.style.display = 'inline-block';
    },500)
};
function funcErr(msg, time){
    errorMsg.textContent = msg
    setTimeout(() =>{
        errorMsg.textContent = ""
    },time)
    inputEl.focus()
    
}

// function del() {
//   const element = document.getElementById("ul-el");
//   element.removeChild(element.firstElementChild);
//   const delItem = myLeads.splice(0,1);
//   localStorage.setItem("myLeads", JSON.stringify(myLeads));

// }

function del() {

    if (confirm("are you sure you want to delete this item")) {
        funcErr("You have succesfully deleted", 2000);
        
    } else {
        funcErr("Unable to delete item", 2000);
    }
    
}


function render(leads){
    ulEl.textContent = "";
    for(let i = 0; i < leads.length; i++){
        const liEl = document.createElement("li");
        liEl.innerHTML = 
        `<a href='${leads[i]}' target='_blank'>${leads[i]}</a>
         <div class="btn-box" onclick="del()">
             <i class="fa fa-trash"></i>
         </div>`;
        ulEl.append(liEl);
    }
}

saveBtn.addEventListener("click",() => {
    chrome.tabs.query({active: true , currentWindow: true},(tabs) => {
        // console.log(tabs[0].url)
        myLeads.push(tabs[0].url);
        localStorage.setItem("myLeads", JSON.stringify(myLeads));
        render(myLeads)
        inputEl.focus()
    })

})

inputBtn.addEventListener("click", () => {
    if(inputEl.value){
        myLeads.push(inputEl.value);
        inputEl.value = "";
        //to save arrays in local storage use JSON.strigify() to convert arrays to string and store
        //use JSON.parse() to convert that array string again to a normal array
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
        inputEl.focus();
        // setTimeout(() => {
        //     deleteBtn.style.display = 'inline-block';
        // },500)
    }else{
        funcErr("Cannot store empty string", 1000)
        // errorMsg.textContent = "Cannot store empty string"
        // setTimeout(() =>{
        //     errorMsg.textContent = ""
        // },1000)
        // inputEl.focus()
    }

});

// deleteBtn.addEventListener("click",(e) => {
//     errorMsg.textContent = "Double click to delete all";
//     setTimeout(() => {
//         errorMsg.textContent = ""
//     },1000)
// })

deleteBtn.addEventListener("click",() => {
    if(!localStorage.getItem("myLeads")){
        funcErr("Can not proceed", 1000)
        // errorMsg.textContent = "Can not proceed"
        // setTimeout(() =>{
        //     errorMsg.textContent = ""
        // },1000)
        // inputEl.focus();
    }else{
        localStorage.clear();
        myLeads = []
        render(myLeads)
        inputEl.focus()
        // setTimeout(() => {
        //     deleteBtn.style.display = 'none';
        // },500)
    }

})
//footerEl.append(`Alright right reserved Copyright by Genius Products @ ${new Date().getFullYear()}`);




