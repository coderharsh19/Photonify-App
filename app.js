const submitBtn = document.querySelector('.form-button');
const formInput = document.querySelector('.form-input')

const photoDiv = document.querySelector('.photo-container');

const auth = "563492ad6f9170000100000151f5e06769ee40a8b3a62cd5e5b8cb46";

const URL = 'https://api.pexels.com/v1/curated?per_page=15&page=1';

let searchInput;



////// Event listeners
formInput.addEventListener('input', updateInput)


function updateInput(e){
    searchInput = e.target.value;
}



submitBtn.addEventListener('click', (e)=>{
    e.preventDefault();

    searchPhotos(searchInput);


})



//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////


/// To fetch API
async function fetchApi(url){
    const searchFetch = await fetch(url, {
            method:'GET',
            headers:{
                Accept: 'Application/json',
                Authorization: auth
        }
    });

    const data = await searchFetch.json();

    return data;
}

////// To fetch picture data
function fetchPhotos(data){
    data.photos.forEach((image)=>{
    const imageCard = document.createElement('div');
    imageCard.classList.add('imageCard');
    imageCard.innerHTML=`
          <img src="${image.src.landscape}"></img>
            <div class="photoData">
                <p><span> Photographer</span> : ${image.photographer}</p>
                <p><span> Portfolio</span> : <a href="${image.photographer_url}" target="_blank"> Find here more <a/></p> 

                <p><span> Download</span> : <a href="${image.src.original}" target="_blank"> Click here <a/></p>
            </div>
        `
        // console.log(image.user.links.html);
    photoDiv.append(imageCard);
        
    })
}




////////////////////////////////////////  Search images based on user query ////////////////
async function searchPhotos(query){
    
    const data = await fetchApi(`https://api.pexels.com/v1/search?query=${query}&per_page=20`);

    console.log(data);

    clear();
    fetchPhotos(data);

}



////////////////////    Display curated images on homepage
async function displayPictures(){
    
    const data = await fetchApi(URL);
    console.log(data);

    fetchPhotos(data);
}

displayPictures();




/////////////////////// To clear screen after search

function clear(){
    photoDiv.innerHTML = "";
    formInput.value= "";
}


