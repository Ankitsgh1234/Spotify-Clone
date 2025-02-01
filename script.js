
console.log('Let\'s write JavaScript');
let curentSong=new Audio();


async function getSongs() {
    let a = await fetch("http://127.0.0.1:5500/songs/");
    let response = await a.text();
    let div = document.createElement("div");
    div.innerHTML = response;

    let anchors = div.getElementsByTagName("a"); // Fixed variable name
    let songs = [];

    for (let index = 0; index < anchors.length; index++) {
        const element = anchors[index]; // Fixed extra space in array indexing
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split("/songs/")[1]);
        }
    }
    return songs;
}
const playMusic= (track)=>{
// let audio =new Audio("/songs/"+track)
curentSong.src="/songs/"+track
curentSong.play()
play.src="img/pause.svg"    

}
async function main() {
    let songs = await getSongs();

    let songUL = document.querySelector(".songList").getElementsByTagName("ul")[0];
    for (const song of songs) {
        songUL.innerHTML = songUL.innerHTML + `  
            <li>
                            <img class="invert" src="img/music.svg" alt="">
                            <div class="info">
                                <div> ${song.replaceAll("%20", " ")}</div>
                                <div>Ankit kumar singh</div>
                            </div>
                            <div class="playNow">
                                 <span>Play Now</span>
                                <img class="invert" src="img/play.svg" alt="">
                            </div> </li>` ;
    }

Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e=>{
    e.addEventListener("click",element=>{
    console.log(e.querySelector(".info").firstElementChild.innerHTML)
    playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim())
})
})

play.addEventListener("click",()=>{
    if(curentSong.paused){
        curentSong.play()
        play.src="img/pause.svg"
    }
    else{
        curentSong.paused()
        play.src="img/play.svg"
    }
})
    
}

main();