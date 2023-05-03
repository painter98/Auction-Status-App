let card = document.getElementById('card');
let data = [];
let url = "https://gauravgitacc.github.io/postAppData/auctionData.json";


function getData(){
    document.getElementById("load").style.display = "block";

    fetch(url)
    .then(response => response.json())
    .then(data => {
        sessionStorage.setItem('myArr',JSON.stringify(data));
        showData(data);
        document.getElementById("load").style.display = "none";
        });
}

if(sessionStorage.getItem("myArr")){
    let myArr = JSON.parse(sessionStorage.getItem("myArr"));
    showData(myArr); 
    data=myArr;
}
else{
    getData();
}

function showData(arr){
    card.innerHTML = '';
    arr.forEach((value)=>{
        card.innerHTML += `
        <div class="container">
            <div id="first">
                <div>  
                    <p class="status ${
                        value.status == "PENDING"
                          ? "yellow"
                          : value.status == "CANCELLED"
                          ? "red"
                          : ""
                      }">${value.status}</p>
                    <p class="case-number">${value.caseNumber}</p>
                </div>
                <p class="date">${value.date}</p>
            </div>
            <hr>
            <div id="second">
                <div>
                    <strong>${value.fromLocation}</strong>
                    <p id="toLoaction">${value.toLocation}</p>
                </div>
                <p>${value.fare}</p>
            </div>
        </div>
        `
});
}

let search = document.getElementById('search');
let filter = document.getElementById('filter');
console.log(filter.value);

search.addEventListener('input',()=>{
    let newArray;

    if(filter.value == 'to Location'){
        newArray = data.filter((value)=>{
            return value.toLocation.toLowerCase().includes(search.value.trim().toLowerCase());
        });
   }
   else if(filter.value == 'status'){
        newArray = data.filter((value)=>{
        return value.status.toLowerCase().includes(search.value.trim().toLowerCase());
        });
    }
    else if(filter.value == 'case'){
        newArray = data.filter((value)=>{
        return value.caseNumber.toLowerCase().includes(search.value.trim().toLowerCase());
        });
    }
    else{
        newArray=data;
    }
    showData(newArray);
})