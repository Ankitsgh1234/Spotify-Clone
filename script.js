
console.log('Let\'s write JavaScript');
let curentSong = new Audio();
let songs;
let currFolder;

function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "Invalid input";
    }
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');
    return `${formattedMinutes}:${formattedSeconds}`;
}
async function getSongs(folder) {
    currFolder=folder
    let a = await fetch(`http://127.0.0.1:5500/${folder}/`);
    let response = await a.text();
    let div = document.createElement("div");
    div.innerHTML = response;

    let anchors = div.getElementsByTagName("a"); // Fixed variable name
    let songs = [];

    for (let index = 0; index < anchors.length; index++) {
        const element = anchors[index]; // Fixed extra space in array indexing
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split(`/${folder}/`)[1]);
        }
    }
    return songs;
}
const playMusic = (track, pause = false) => {
    // let audio =new Audio("/songs/"+track)


    curentSong.src = `/${currFolder}/` + track
    if (!pause) {
        curentSong.play()
        play.src = "img/pause.svg"
    }
    document.querySelector(".songinfo").innerHTML = decodeURI(track)
    document.querySelector(".songtime").innerHTML = "00:00/00:00"

}
async function main() {
    songs = await getSongs("songs/pun");

    playMusic(songs[0], true)

    let songUL = document.querySelector(".songList").getElementsByTagName("ul")[0];
    for (const song of songs) {
        songUL.innerHTML = songUL.innerHTML + ` <li><img class="invert" width="34" src="img/music.svg" alt="">
                            <div class="info">
                                <div> ${song.replaceAll("%20", " ")}</div>
                                <div>Ankit kumar singh</div>
                            </div>
                            <div class="playNow">
                                 <span>Play Now</span>
                                <img class="invert" src="img/play.svg" alt="">
                            </div> </li>` ;
    }

    Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", element => {
            console.log(e.querySelector(".info").firstElementChild.innerHTML)
            playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim())
        })
    })

    play.addEventListener("click", () => {
        if (curentSong.paused) {
            curentSong.play()
            play.src = "img/pause.svg"
        }
        else {
            curentSong.pause()
            play.src = "img/play.svg"
        }
    })

    // Listen fo time update finction
    curentSong.addEventListener("timeupdate", () => {
        console.log(curentSong.currentTime, curentSong.duration)
        document.querySelector(".songtime").innerHTML = `${secondsToMinutesSeconds(curentSong.currentTime)}/${secondsToMinutesSeconds(curentSong.duration)}`

        document.querySelector(".circle").style.left = (curentSong.currentTime / curentSong.duration) * 100 + "%"
    })

    // Add event to seek bar  
    document.querySelector(".seekbar").addEventListener("click", e => {
        let precent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        document.querySelector(".circle").style.left = precent + "%";
        curentSong.currentTime = (curentSong.duration * precent) / 100;
    })
    // Add an event listener for Hamburger
    document.querySelector(".hamburger").addEventListener("click", () => {
        document.querySelector(".left").style.left = "0";
        document.querySelector(".left").style.width = "344px";
    })

    // Add an event listener for close hamburger
    document.querySelector(".close").addEventListener("click", () => {
        document.querySelector(".left").style.left = "-110%";
        // document.querySelector(".left").style.width="444px";
    })

    // Add an event listener to previous and next
    previous.addEventListener("click", () => {
        console.log("Previous clicked")
        let index = songs.indexOf(curentSong.src.split("/").slice(-1)[0])
        if ((index - 1) >=0) {
            playMusic(songs[index - 1])
        }    })
    next.addEventListener("click", () => {
        console.log("next clicked")
        let index = songs.indexOf(curentSong.src.split("/").slice(-1)[0])
        if ((index + 1) < songs.length  ) {
            playMusic(songs[index + 1])
        }
    })
    // Add an event to volume 
    document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change",(e)=>{
        console.log("Setting volume to ", e.target.value)
        curentSong.volume=parseInt(e.target.value)/100

    })
    
    // Load the playlist whenever the card is clicked 04:11:30;


}

main();