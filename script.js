var apiUrl = 'https://api.lyrics.ovh';
var load = `<div class ="spinner-border text-light" role = "status">
            <span class ="sr-only"> Loading.. </span>
            </div>`


document.getElementById("inputForm").addEventListener('submit', start);

function start (e){
    resetField();
    document.getElementById("search-result").innerHTML =load;
    var searchInput = document.getElementById("text-search").value;
    console.log(searchInput)
    

    var fetchUrl = `https://api.lyrics.ovh/suggest/${searchInput}`;

    fetch(fetchUrl)
    .then(res => res.json())
    .then(data=>{
        if(data){
            displaySuggestion(data);
            document.getElementById("search-result").innerText = "Yeah we got your Result"
        }
        else{
            document.getElementById("search-result").innerText = "Sorry!!"
        }
         })
        .catch(err => {
            console.log(err);
            document.getElementById("search-result").innerText = "Sorry!!"
           })

    e.preventDefault();
}
    
    function displaySuggestion(allData){
    let data = allData.data;
    console.log(data);

    let list = [];
    for (let i = 0; i < 10; i++) {
        const item = {
            title: data[i].title, 
            albumTitle: data[i].album.title, 
            albumImage: data[i].album.cover_small,
            artistImage: data[i].artist.name,
            artistImage: data[i].artist.picture_small
        }

        list.push(item);
        
    }


    console.log(list);

    let display = document.getElementById("display-result");
    display.innerHTML = "";
    document.querySelector('.single-result').style.display = "block";

    for (let i = 0; i < list.length; i++) {
        let {title, albumImage, albumTitle, artistName, artistImage} = list[i];

        title = title.replace(/'/g, " ");
        artistName = artistName.replace(/'/g, " ");

        display.innerHTML +=
            `<div class ="col-md-6 result ">
                <h3 class="lyrics-name"><span id="title">${title}</span></h3>
                <p class="author lead">Artist : <span id="artistName">${artistName}</span></p>
                <p class="author lead">Album : <span id="albumTitle">${albumTitle}</span></p>
            </div>

            <div class ="col-md-3">
            <img src="${artistImage}" class="img-fluid">
            <img src="${albumImage}" class="img-fluid">
             </div>

             <div class= "col-md-3 text-md-right text-center">
             <a href="#/" onclick = "getLyrics('${title}', '${artistName}', '${albumImage}','${artistImage}')" class="btn btn-success">Get Lyrics</a>
             </div>

             <div class="bottom-line"></div>` 

        }

        }
   
        const getLyrics = (title, artistName, albumImage, artistImage) => {

            console.log(title, artistName);
            var fetchUrl = `https://api.lyrics.ovh/v1/${artistName}/${title}`;
            console.log(fetchUrl)

            document.getElementById("song-image").innerHTML =load;

            fetch(fetchUrl)
            .then(res => res.ok ? res.json() : console.log(res.status))
            .then(data => displayLyrics(data, title, artistName, albumImage, artistImage))
            .catch(err => console.log(err))

        }

        const displayLyrics = (data, title, artistName, albumImage, artistImage) =>{
            document.querySelector('.single-result').style.display ="none";
            document.getElementById("song-image").innerHTML = `<img src="${albumImage}" class ="img-fluid"><img src="${artistImage}"class ="img-fluid">`
            document.getElementById("get-title").innerText =title;
            document.getElementById("get-artist").innerText = " - "+ artistName;
            document.getElementById("get-lyrics").innerText = "";
            document.getElementById("search-result").innerText = "";

            if(data == undefined){
                    document.getElementById("get-lyrics").innerText = "Sorry!! Lyrics ins not found.";
            }
            else if(data.lyrics){
                document.getElementById("get-lyrics").innerText = data.lyrics;

            }
            else{
                document.getElementById("get-lyrics").innerText = "Sorry!! Lyrics ins not found.";
            }

        }

        const resetField = () =>{
            document.getElementById("song-image").innerHTML = "";
            document.getElementById("search-result").innerText = "";
            document.getElementById("display-result").innerText = "";
            document.getElementById("get-title").innerText ="";
            document.getElementById("get-artist").innerText ="";
            document.getElementById("get-lyrics").innerText = "";
        }