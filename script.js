const searchForm=document.querySelector('form');
const movieContainer=document.querySelector('.movie-container');
const inputBox=document.querySelector('.inputBox');

const getMovieInfo=async (movie)=>{
    try{
        const myApikey="2ef7f8e3";
        const url=`http://www.omdbapi.com/?&apikey=2ef7f8e3&t=${movie}`;

        const response=await fetch(url);

        if(!response.ok){
            throw new Error("Unable To Fetch Data.");
        }
        const data=await response.json();
        showMovieData(data);
    }
    catch{
        showError("No Movie Found !!!");
    }
}
const showMovieData=(data)=>{
    // Destructuring Data
    movieContainer.innerHTML="";
    movieContainer.classList.remove('noBackground');
    const {Title,imdbRating,Genre,Released,Runtime,Actors,Plot,Poster}=data;
    const movieElement=document.createElement('div');
    movieElement.classList.add("movie-info");
    movieElement.innerHTML=`<h2>${Title}</h2>
                            <p><strong>Rating:</strong>${imdbRating}&#11088</p>`;
    movieContainer.appendChild(movieElement);
    const GenreElement=document.createElement('div');
    GenreElement.classList.add('movie-genre');
    Genre.split(",").forEach(element => {
        const p=document.createElement('p');
        p.innerText=element;
        GenreElement.appendChild(p);
    });
    movieElement.appendChild(GenreElement);
    movieElement.innerHTML+=`<p><strong>Realsed Date: </strong>${Released}</p>
                            <p><strong>Duration: </strong>${Runtime}</p>
                            <p><strong>Cast: </strong>${Actors}}</p>
                            <p><strong>Plot: </strong>${Plot}</p>`;
    const moviePoster=document.createElement('div');
    moviePoster.classList.add("movie-poster");
    moviePoster.innerHTML=`<img src="${Poster}"/>`;
    movieContainer.appendChild(moviePoster);
    movieContainer.appendChild(movieElement);
}

function showError(message){
    movieContainer.innerHTML=`<h2>${message}</h2>`;
    movieContainer.classList.add("noBackground");
}
const handlesubmit=(e)=>{
    e.preventDefault();
    const movieName=inputBox.value.trim();
    if(movieName!==''){
        showError("Fetching Movie Information...");
        getMovieInfo(movieName);
    }
    else{
        showError("Enter Movie Name To Get Movie Information");
    }
};
searchForm.addEventListener('submit',handlesubmit);




