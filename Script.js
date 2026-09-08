let correntSong = new Audio();
let songs;
let currFolder;
let previousVolume = 0.5;
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

async function getSongs(folder) {
    currFolder = folder;
    let a = await fetch(`http://127.0.0.1:5500/${folder}/`)
    let response = await a.text();
    let div = document.createElement('div')
    div.innerHTML = response;
    let as = div.getElementsByTagName('a')
    songs = []
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith('.mp3')) {
            songs.push(element.href.split(`/${folder}/`)[1])
        }
    }
    let songUL = document.querySelector('.songlist').getElementsByTagName('ul')[0]
    songUL.innerHTML = ''
    for (const song of songs) {
        songUL.innerHTML += `<li>
                            <img class="invert" src="img/music.svg" alt="">
                            <div class="info">
                                <div><p>${song.replaceAll('%20', ' ')}</p></div>
                                <div><p>Gourav</p></div>

                            </div>
                            <div class="playnow">
                                <span>Play Now</span>
                            <img  class="" src="img/play.svg" alt="">
                            </div>
                        </li>
    `;
    }


    //attact an event lister to each song
    Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e => {
        e.addEventListener('click', () => {
            let songName = e.querySelector(".info p").innerText;
            playMusic(songName);
        });
    });

}

const playMusic = (track, pause = false) => {
    correntSong.src = `/${currFolder}/` + track
    if (!pause) {
        correntSong.play()
        play.src = 'img/pause.svg'
    }

    document.querySelector('.songinfo').innerHTML = decodeURI(track)
    document.querySelector('.songtime').innerHTML = "00:00/00:00"
}

async function displayAlbums() {

    let a = await fetch(`http://127.0.0.1:5500/songs/`)
    let response = await a.text();

    let div = document.createElement('div')
    div.innerHTML = response;

    let anchors = div.getElementsByTagName("a")
    let cardcontainer = document.querySelector('.cardcontainer')

    let array = Array.from(anchors)
    for (let index = 0; index < array.length; index++) {

        const e = array[index];

        if (e.href.includes("/songs/")) {

            let parts = e.href.split("/songs/")

            if (parts[1]) {

                let folder = parts[1].replace("/", "")

                let a = await fetch(`songs/${folder}/info.json`)
                let response = await a.json();

                cardcontainer.innerHTML += `
            <div data-folder="${folder}" class="card">
                        <div  class="play">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="black" fill="black" class="icon">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
                            </svg>
                        </div>

                         <img src="songs/${folder}/cover.jpg" height = '200px',>
                <h3>${response.title}</h3>
                <p>${response.description}</p>
                    </div>
            `
            }
        }
    }

    Array.from(document.getElementsByClassName('card')).forEach(e => {

        e.addEventListener('click', async item => {

            await getSongs(`songs/${item.currentTarget.dataset.folder}`)
            playMusic(songs[0])

            if (window.innerWidth <= 900) {
                document.querySelector('.left').style.left = '-110%'
            }

        })

    })

}
async function main() {
    await getSongs("songs/ncs");
    playMusic(songs[0], true)

    //display all song folder card
    displayAlbums();
    // attach an eventlister to play next and previous song
    play.addEventListener("click", () => {
        if (correntSong.paused) {
            correntSong.play()
            play.src = 'img/pause.svg'
        }
        else {
            correntSong.pause()
            play.src = 'img/play.svg'
        }
    })

    //listen for time update event
    correntSong.addEventListener('timeupdate', () => {
        const duration = Number.isFinite(correntSong.duration) ? correntSong.duration : 0
        document.querySelector(".songtime").innerHTML = `${formatTime(correntSong.currentTime)} / ${formatTime(duration)}`
        document.querySelector(".circle").style.left = duration ? (correntSong.currentTime / duration) * 100 + "%" : "0%"
    })

    correntSong.addEventListener('ended', () => {
        let index = songs.indexOf(correntSong.src.split('/').slice(-1)[0])
        if ((index + 1) < songs.length) playMusic(songs[index + 1])
        else {
            correntSong.currentTime = 0
            play.src = 'img/play.svg'
        }
    })

    // Seekbar se song aage piche krna
    document.querySelector('.seekbar').addEventListener('click', e => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        document.querySelector(".circle").style.left = percent + "%";
        correntSong.currentTime = ((correntSong.duration) * percent) / 100
    })

    //Drawable sidebar
    document.querySelector('.hamburder').addEventListener('click', () => {
        document.querySelector('.left').style.left = '0'
    })

    //Drawable sidebar close
    document.querySelector('.close').addEventListener('click', () => {
        document.querySelector('.left').style.left = '-100%'
    })

    //seekbar Previous button
    previous.addEventListener('click', () => {
        let index = songs.indexOf(correntSong.src.split('/').slice(-1)[0])
        if ((index - 1) >= 0) {
            playMusic(songs[index - 1])
        }
    })

    //seekbar Next button
    next.addEventListener('click', () => {
        let index = songs.indexOf(correntSong.src.split('/').slice(-1)[0])
        if ((index + 1) < songs.length) {
            playMusic(songs[index + 1])
        }
    })
    // volume slider
    let rangeInput = document.querySelector('.range input')

    rangeInput.addEventListener('input', (e) => {
        correntSong.volume = e.target.value / 100
        if (correntSong.volume > 0) previousVolume = correntSong.volume
        document.querySelector('.volume>img').src = correntSong.volume === 0 ? 'img/mute.svg' : 'img/volume.svg'
    })

    // mute button
    document.querySelector('.volume>img').addEventListener('click', e => {

        if (e.target.src.includes("volume.svg")) {

            e.target.src = e.target.src.replace('volume.svg', 'mute.svg')
            previousVolume = correntSong.volume || 0.5
            correntSong.volume = 0
            rangeInput.value = 0

        }
        else {

            e.target.src = e.target.src.replace('mute.svg', 'volume.svg')
            correntSong.volume = previousVolume
            rangeInput.value = previousVolume * 100

        }

    })

}

main();
