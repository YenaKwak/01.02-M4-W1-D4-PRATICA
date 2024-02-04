// fetch("https://striveschool-api.herokuapp.com/api/deezer/search?q=eminem")
// .then((response) => response.json()) 
// .then((json) => console.log(json)) 
// .catch((err) => console.log("Error detected: ", err) );


// fetch("https://striveschool-api.herokuapp.com/api/deezer/search?q=metallica")
// .then((response) => response.json()) 
// .then((json) => console.log(json)) 
// .catch((err) => console.log("Error detected: ", err) );


// fetch("https://striveschool-api.herokuapp.com/api/deezer/search?q=queen")
// .then((response) => response.json()) 
// .then((json) => console.log(json)) 
// .catch((err) => console.log("Error detected: ", err) );



document.addEventListener("DOMContentLoaded", function() {
    const searchInput = document.getElementById('searchField');
    const searchResultTitle = document.getElementById('searchResultTitle');
    const searchResultsContainer = document.getElementById('searchResult');
    const buttonSearch = document.getElementById('button-search');
    const findText = document.querySelector('.searchResultContainer h5');


    searchInput.addEventListener("keydown", async (e) => {
        if (e.key === 'Enter') {
            findText.remove();
            e.preventDefault();
            search();
        }
    });

    buttonSearch.addEventListener("click", search)



    async function search() {
        const value = searchInput.value.trim();
        if (value === '') {
            alert('Please insert something.');
            return; 
        }
        console.log('Run searching:', value);
        searchInput.value = '';
        searchResultTitle.classList.add('d-block');
        

        try {
            const response = await fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${value}`);
            if (!response.ok) throw new Error(`HTTP error status: ${response.status}`);
            const data = await response.json();
            console.log(data);
            updateUI(data.data);
        } catch (err) {
            console.error("Error: ", err);
        }
    }


    function updateUI(items) {
        searchResultsContainer.innerHTML = '';
        items.forEach(item => {
            const card = createCard(item);
            searchResultsContainer.appendChild(card);
            searchResultTitle.classList.remove('d-block');
            });
        
    }

    function createCard(item) {
        const card = document.createElement('div');
        card.classList.add('col-xl-4', 'col-lg-6', 'col-md-6', 'col-sm-12', 'my-3');
        card.innerHTML = `
            <div class="card offset-2 transparent-background" style=width: 18rem;">
                <img src="${item.album.cover}" class="card-img-top rounded mx-auto my-3" alt="${item.title}">
                <div class="card-body text-center mx-1">
                    <h5 class="card-title">${item.title}</h5>
                    <p class="card-text" style="font-weight: bold;">${item.artist.name}</p>
                </div>
            </div>
        `;
        return card;
    }
});

