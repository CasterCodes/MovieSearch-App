//the omdbapi object
const omdb = {
    //method to request movie bt movie title
    getMovieByTitle: function (movie) {
        //get movie by title 
        const movies = fetch(`http://www.omdbapi.com/?s=${movie}&apikey=aec1aae8`)
            .then(res => res.json())
            .then(res => res)
            .catch(error => error)
        return movies;
    },
    //method to request single movie by id
    getMovieById: function (id) {
        //get movie by id 
        const movies = fetch(`http://www.omdbapi.com/?i=${id}&apikey=aec1aae8`)
            .then(res => res.json())
            .then(res => res)
            .catch(error => error)
        return movies;
    }
}
//user interface object
const UI = {
    //method to display movies
    ShowMovies: function (movies) {
        console.log(movies);
        let output = '';
        movies.forEach((movie) => {
            output += `<div class="col-md-3 mt-5">
              <div class=" card card-body text-center">
                  <img src="${movie.Poster}" alt="">
                  <div class='jumbtron'>
                    <h3 class='btn'>${movie.Title}</h3>
                  </div>
                  <a href="#" class="btn btn-info" value ='' id='movieinfo' onclick="selectedMovie('${movie.imdbID}')">View Movie Details</a>
                  
              </div>
          </div>`

        })
        document.querySelector('#movies').innerHTML = output;
    },
    //method to display single movie
    ShowMovie: function (movie) {
        let output = `
        <div class="row">
            <div class="col-md-4">
              <div class='card card-body'>
              <img src="${movie.Poster}" alt="" class='image-fluid'>  
             </div>
            </div>
            <div class="col-md-6">
                <h1>${movie.Title}</h1>
                <div class="">
                    <ul class="list-group">
                        <li class="list-group-item">Genre : <strong>${movie.Genre}</strong></li>
                        <li class="list-group-item">Type : <strong>${movie.Type}</strong></li>
                        <li class="list-group-item">Languages : <strong>${movie.Language}</strong></li>
                        <li class="list-group-item">Released : ${movie.Released}</li>
                        <li class="list-group-item">Rated : ${movie.Rated}</li>
                        <li class="list-group-item">IMDB Ratings : ${movie.imdbRating}</li>
                        <li class="list-group-item">Director : ${movie.Director}</li>
                        <li class="list-group-item">Writer : ${movie.Writer}</li>
                        <li class="list-group-item">Actors : ${movie.Actors}</li>
                    </ul>
                </div>
            </div>
        </div>
        <div class='panel panel-body mt-2'>
          <h1>Plot</h1>
          <p>${movie.Plot}</p>
          <a href="http://imdb.com/title/${movie.imdbID}" class="btn btn-info" value ='' >View on IMDB</a>
          <a href="index.html" class="btn btn-primary" value =''>Back To Site</a>
        </div>
    
    `     //add the output above to the site
        document.querySelector('#movie').innerHTML = output;
    },
    // a method to show an alert if one exists
    showAlert: function (alert, className) {
        //create an element
        const div = document.createElement('div');
        //assign a className to the created element above
        div.className = className;
        //create a textNode
        const text = document.createTextNode(alert);
        //append the created textNode to the div
        div.appendChild(text);
        const form = document.querySelector('#searchForm');
        const container = document.querySelector('#alertContainer');
        //insert the div to the site
        form.insertBefore(div, container);
        setTimeout(() => {
            document.querySelector('.alert').remove();
        }, 2000)
    }


}
document.querySelector('#searchForm').addEventListener('submit', (e) => {
    //get the form input
    const search = document.querySelector('#search').value;
    //get the response  from the method getMovieByTitle()
    omdb.getMovieByTitle(search).then(res => {
        // the actual movie data
        const movies = res.Search;

        // ui object with a method showMovies Taking the response of the  getMoviesByTitle as it parameter;
        UI.ShowMovies(movies);


    }).catch(error => {
        UI.showAlert(`Movie ${search} was not found.Please search for another movie`, 'alert alert-danger')
    })
    e.preventDefault();
})
//fucntion to get the movie id
function selectedMovie(id) {
    // set the movie id  to the session storage
    sessionStorage.setItem('movieId', id);
    //open a new window 
    window.location = 'movie.html'
    return false;
}
function getMovie() {
    // get the movie id store in session Storage
    const movieId = sessionStorage.getItem('movieId');
    //call the getMovieId function and pass the movie id as a parameter
    omdb.getMovieById(movieId).then(res => {
        const movie = res;
        //call the show movie method from the ui object
        UI.ShowMovie(movie);
    });
}
