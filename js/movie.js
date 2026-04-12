// movie.js

console.log("movie.js loaded 🎬");

const API_KEY = "5b6a34320cc159f27eb3f5d1ff58f923";

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
            <div style="width:200px;">
                <img src="${img}" style="width:100%; border-radius:8px;">
                <h6>${movie.title}</h6>
                <p>⭐ ${movie.vote_average}</p>
            </div>
        `;
    });
}