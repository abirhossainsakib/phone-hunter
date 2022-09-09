const loadPhone = async(searchText, datalimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data, datalimit);
}

const displayPhones = (phones, datalimit) =>{
    const phonesContainer = document.getElementById('phones-container');
    phonesContainer.yextContent = '';
    const showAll =  document.getElementById('show-all');
    if(datalimit && phones.length > 12){
        phones = phones.slice(0, 12);
       showAll.classList.remove('d-none');
    }
    else{
        showAll.classList.add('d-none');
    }

    const noPhone = document.getElementById('no-found-message');
    if(phones.length === 0){
        noPhone.classList.remove('d-none');
    }
    else{
        noPhone.classList.add('d-none');
    }
    phones.forEach(phone =>{
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `<div class="card p-4">
        <img src="${phone.image}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${phone.phone_name}</h5>
          <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
          <button onclick="loadPhonesDetails('${phone.slug}')" href="#" class="btn btn-primary">Show Details</button>
        </div>`;
        phonesContainer.appendChild(phoneDiv);
    });
    toggleSpinner(false);
}

const processSearch = (datalimit) =>{
    toggleSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhone(searchText, datalimit);
}

document.getElementById('btn-search').addEventListener('click', function(){
  processSearch(12);
})

document.getElementById('search-field').addEventListener('keypress', function(e){
    console.log(e.key);
    if (e.key === 'Enter'){
        processSearch(12);
    }
})

const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if(isLoading){
        loaderSection.classList.remove('d-none')
    }
    else{
        loaderSection.classList.add('d-none');
    }
}


document.getElementById('btn-show-all').addEventListener('click', function(){
    processSearch();
})

const loadPhonesDetails = async id =>{
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    console.log(data.data);
}

// loadPhone();