let dataSet;
const loadData = () =>{
    fetch("../data.json")
    .then(res => res.json())
    .then(data => {
        dataSet = data;
        displayData(data)
    })
}
const displayData = (data) =>{
    const homepageContent = document.getElementById('homepage-content');
    data.forEach(element =>{
        const {id,img, price, name} = element;
        const div = document.createElement('div');
        div.classList.add('card', 'bg-base-100', 'shadow-2xl');
        div.innerHTML = `
            <div class="p-4">
            <figure><img src="${img}" class="rounded-lg w-full h-[300px]" alt="Shoes" /></figure>
            </div>
            <div class="card-body">
            <div class="flex justify-between items-center">
                <h2 class="card-title">${name}</h2>
                <div>
                    <span class="mr-2"><i class="fa-solid fa-heart"></i></span>
                    <span><i class="fa-regular fa-square-minus text-red-600"></i></span>
                </div>
            </div>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <h3 class="card-title">Price : $<span>${price}</span></h2>
            <div class="card-actions justify-between">
                <label for="my-modal-3" class="btn btn-primary btn-outline modal-button" onclick="handleModal('${id}')">
                    <i class="fa-solid fa-circle-info mr-2"></i> DETAILS
                </label>
                <button onclick="handleBuyNow('${id}')" class="btn btn-secondary btn-outline"><i class="fa-solid fa-lock mr-2"></i> Buy Now</button>
            </div>
            </div>
        `;
        homepageContent.appendChild(div);
    }); 
}

const handleModal = id =>{
    const product = dataSet.find( item => item.id === id);
    const {name, price, img} = product;
    const modalContainer = document.getElementById('modal-info');
    modalContainer.innerHTML = `
        <div class="py-4 flex flex-col gap-3">
            <img src="${img}" class="w-full h-[300px] rounded-xl" alt="">
            <h1 class="text-xl font-bold"><span class="text-violet-600">PRODUCT:</span> ${name}</h1>
            <p class="text-lg text-gray-400">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aut voluptas repellendus praesentium doloremque, voluptatem possimus maxime omnis quos, dolorem vel cum non. Sequi nam culpa dolorem laboriosam earum! Veritatis porro ab architecto quo atque tempora nihil nisi, quas unde odit!</p>
            <h1 class="text-xl font-bold text-violet-600">PRODUCT:</h1>
            <p class="text-lg text-gray-700">Feature1, Feature2, Feature3, Feature4</p>
            <h1 class="text-xl font-bold"><span class="text-violet-600">PRICE :</span> $<span>${price}</span></h1>
        </div>
    
    `
}
let count = 0;
let newPrice = 0;
let tax = 0;
let totalPrice = 0;

const handleBuyNow = (id) =>{
    const product = dataSet.find( item => item.id === id);
    const {name, price, img} = product;
    const cartItemsContainer = document.getElementById('cart-items-container');
    const div = document.createElement('div');
    div.classList.add('border-2', 'border-red-400', 'bg-gray-200', 'rounded-lg', 'flex', 'justify-between', 'items-center', 'px-2');
    div.innerHTML = `
        <img src="${img}" class="w-[15%] rounded-lg py-2" alt="">
        <p>${name}</p>
        <p class="border-2 border-black rounded px-3 py-1">1</p>
        <i class="fa-solid fa-trash text-red-600 text-xl cursor-pointer"></i>
    `;
    cartItemsContainer.appendChild(div);

    count++;
    newPrice = price + newPrice;
    tax = newPrice * 0.1;
    totalPrice = newPrice - tax;
    document.getElementById('product-count').innerText = count;
    document.getElementById('total-product').innerText = count;
    document.getElementById('price').innerText = newPrice;
    document.getElementById('tax').innerText = tax;
    document.getElementById('total-price').innerText = totalPrice;
}
const removeAllOrder = () =>{
    count = 0;
    newPrice = 0;
    tax = 0;
    totalPrice = 0;
    document.getElementById('cart-items-container').innerHTML = '';
    document.getElementById('product-count').innerText = count;
    document.getElementById('total-product').innerText = count;
    document.getElementById('price').innerText = newPrice;
    document.getElementById('tax').innerText = tax;
    document.getElementById('total-price').innerText = totalPrice;
}
loadData();