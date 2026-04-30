// movie.js

console.log("movie.js loaded 🎬");

const API_KEY = "5b6a34320cc159f27eb3f5d1ff58f923";

loadPopularMovies();

async function loadPopularMovies(){

    try{

        let url = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`;

        let res = await fetch(url);

        let data = await res.json();

        console.log("Popular Movies:", data);

        showPopularMovies(data.results);

    }catch(err){

        console.error(err);

    }
}

function showPopularMovies(movies){

    let container = document.getElementById("popularMovies");

    container.innerHTML = "";

    movies.forEach(movie => {

        let img = movie.poster_path
            ? "https://image.tmdb.org/t/p/w300" + movie.poster_path
            : "https://via.placeholder.com/300x450";

        container.innerHTML += `
        
            <div
                onclick="showMovieDetail(
                    '${movie.title}',
                    '${img}',
                    '${movie.release_date}',
                    '${movie.vote_average}',
                    \`${movie.overview}\`
                )"

                style="
                    width:200px;
                    cursor:pointer;
                    transition:0.3s;
                "
            >

                <img
                    src="${img}"
                    style="
                        width:100%;
                        border-radius:10px;
                    "
                >

                <h6 class="text-white mt-2">
                    ${movie.title}
                </h6>

                <p class="text-white">
                    ⭐ ${movie.vote_average}
                </p>

            </div>
        `;
    });
}

document.addEventListener("DOMContentLoaded", function(){

    const form = document.getElementById("searchForm");

    if(form){
        form.addEventListener("submit", async function(e){
            e.preventDefault();

            let query = document.getElementById("searchInput").value;

            if(!query){
                alert("Nhập tên phim!");
                return;
            }

            try{
                let url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`;

                let res = await fetch(url);
                let data = await res.json();

                console.log(data);

                if(data.results){
                    displayMovies(data.results);
                }else{
                    alert("Không tìm thấy phim!");
                }

            }catch(err){
                console.error(err);
                alert("Lỗi kết nối API!");
            }
        });
    }
});

function displayMovies(movies){
    let container = document.getElementById("movieList");
    container.innerHTML = "";

    if(!movies || movies.length === 0){
        container.innerHTML = "<p>Không có phim 😢</p>";
        return;
    }

    movies.forEach(movie => {

        let img = movie.poster_path 
            ? "https://image.tmdb.org/t/p/w300" + movie.poster_path
            : "https://via.placeholder.com/300x450";

        container.innerHTML += `
            <div 
                onclick="showMovieDetail(
                    '${movie.title}',
                    '${img}',
                    '${movie.release_date}',
                    '${movie.vote_average}',
                    \`${movie.overview}\`
                )"
                style="
                    width:200px;
                    cursor:pointer;
                    transition:0.3s;
                "
            >
                <img 
                    src="${img}" 
                    style="
                        width:100%;
                        border-radius:10px;
                    "
                >

                <h6>${movie.title}</h6>
                <p>⭐ ${movie.vote_average}</p>
            </div>
        `;
    });
}

function showMovieDetail(title, image, date, rating, overview){

    let oldModal = document.getElementById("movieModal");

    if(oldModal){
        oldModal.remove();
    }

    document.body.innerHTML += `
        <div 
            id="movieModal"
            style="
                position:fixed;
                top:0;
                left:0;
                width:100%;
                height:100%;
                background:rgba(0,0,0,0.8);
                display:flex;
                justify-content:center;
                align-items:center;
                z-index:9999;
            "
        >
            <div 
                style="
                    background:#141414;
                    color:white;
                    width:80%;
                    max-width:800px;
                    border-radius:15px;
                    overflow:hidden;
                    position:relative;
                "
            >

                <button 
                    onclick="closeMovieModal()"
                    style="
                        position:absolute;
                        top:10px;
                        right:15px;
                        background:red;
                        border:none;
                        color:white;
                        padding:8px 12px;
                        border-radius:50%;
                        cursor:pointer;
                    "
                >
                    X
                </button>

                <div style="display:flex; gap:20px; padding:20px;">

                    <img 
                        src="${image}" 
                        style="
                            width:250px;
                            border-radius:10px;
                        "
                    >

                    <div>
                        <h2>${title}</h2>

                        <p><b>📅 Release:</b> ${date}</p>

                        <p><b>⭐ Rating:</b> ${rating}</p>

                        <p style="margin-top:20px;">
                            ${overview || "Không có mô tả"}
                        </p>
                    </div>

                </div>

            </div>
        </div>
    `;
}
function closeMovieModal(){
    document.getElementById("movieModal").remove();
}

