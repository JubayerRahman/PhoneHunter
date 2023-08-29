const showButton = document.getElementById("showButton")
const loder = document.getElementById("loder")
let showAll= false
const searchFiend = document.getElementById("searchFiend")
    const searchValue = searchFiend.value;
const loadPhones =(Phonename)=>{
    const url = `https://openapi.programming-hero.com/api/phones?search=${Phonename}`
    fetch(url)
    .then(res => res.json())
    .then(data => {
        const mainData = data
        const phone= data.data
        showData(mainData, phone , showAll)
    })
}

const showData =(mainData, PhoneData , showAll)=>{
    const phoneContainer = document.getElementById("phoneContainer")
    const error = document.getElementById("error")
    console.log(mainData)
    const errorMessage = document.createElement("div")
    if(mainData.status===false){
        console.log("I am working")
        errorMessage.innerHTML =`
        <p class="text-[black] text-3xl text-center">Sorry, The api Dont have any phone by this name </p>
        `
        error.appendChild(errorMessage)
    }
    if(mainData.status===true){
        error.textContent=""
    }
    phoneContainer.textContent=""
    if(PhoneData.length>12){
        if(!showAll){
            PhoneData = PhoneData.slice(0,12)
            showButton.classList.remove("hidden")
        }
    }else{
        showButton.classList.add("hidden")
    }
    let i = 0
    PhoneData.forEach(element => {
        i ++
        const PhoneCard = document.createElement('div');
        PhoneCard.innerHTML=`
        <div class="card bg-base-100 shadow-xl p-5">
        <figure><img src="${element.image}" alt="Shoes" /></figure>
        <div class="card-body">
            <h2 class="card-title mb-[20px] text-center">${element.phone_name}</h2>
            <div class="card-actions justify-center">
            <!-- You can open the modal using ID.showModal() method -->
            
                <button class="btn" onclick="a${i}.showModal()">Show Details</button>
                <dialog id="a${i}" class="modal">
                <form method="dialog" class="modal-box flex flex-col items-center justify-center">
                    <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    <img class="mb-[20px]" src="${element.image}"></img>
                    <div class="bg-gray-400 w-[100%] h-[2px] mb-[20px]"></div>
                    <h3 class="font-[500] text-lg text-left w-[100%]">Brand: ${element.brand}</h3>
                    <h3 class="font-[500] text-lg text-left w-[100%]">Model name: ${element.phone_name}</h3>
                    <h3 class="font-[500] text-lg text-left w-[100%]">price: Api Dont Know Price</h3>
                </form>
                </dialog>
            </div>
        </div>
        </div>`
        phoneContainer.appendChild(PhoneCard)
    });
    loder.classList.add("hidden")
}

const searchFunction =()=>{
    loder.classList.remove("hidden")
    showAll = false
    const searchValue = searchFiend.value;
    if(searchValue===""){
        alert("enter a name")
    } else{
        console.log(searchValue)
    }
    loadPhones(searchValue)
}

const showAllFunction =()=>{
    // const showButton = document.getElementById("showButton")
    showAll = true
    const searchValue = searchFiend.value;
    if(searchValue===""){
        loadPhones("iphone" , showAll)
        showButton.classList.add("hidden")
    }
    else{
        loadPhones(searchValue , showAll)
        showButton.classList.add("hidden")
    }
}

loadPhones("iphone" , showAll)