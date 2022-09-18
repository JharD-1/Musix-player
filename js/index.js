const image = document.querySelector('img');
const title = document.querySelector('title');
const artist = document.querySelector('artist');
const music = document.querySelector('audio');
const progessContainer = document.getElementById('progress-conatiner');
const progess = document.getElementById('progress');
const currentTimeEl = document.getElementById('progress-container');
const durationEl = document.getElementById('duration');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

//Music
const songs = [
    {
        name: 'jacnito-1',
        displayName: 'Electric Chill Machine',
        artist: 'Jacinto',
    },
    {
        name: 'jacnito-2',
        displayName: 'Seven Nation Army (Remix)',
        artist: 'Jacinto',
    },
    {
        name: 'jacnito-3',
        displayName: 'Front Row (Remix)',
        artist: 'Metric/Jacinto',
    },
];

//Chexking if Playing
let isPlaying = false;

// Play
function playSong() {
    let isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    music.play()
}

// Pause
function pauseSong() {
    let isPlaying = false;
    music.pause()
}

// Play or Pause Event Listener
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

//Update DOM
function loadSong(song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`
}

//Current Song
let songIndex = 0;

//Previous Song
function prevSong() {
    songIndex--;
    if(songIndex < 0) {
        songIndex = songs.length -1;
    }
    // console.log(songIndex);
    loadSong(songs[songIndex]);
    playSong();
}

//Next Song
function nextSong() {
    songIndex++;
    if(songIndex > songs.length - 1) {
        songIndex = 0;
    }
    // console.log(songIndex);
    loadSong(songs[songIndex]);
    playSong();
}

//On Load -- Select First Song
loadSong(songs[songIndex]);

// Update Progress Bar & Time
function updateProgressBar(e) {
    if (isPlaying) {
        const { duration, currentTime } = e.srcElement;
        console.log(duration, currentTime);
        // Update Progress Bar Width
        const progressPercent = (currentTime / duration) * 100;
        progressPercent.style.width = `${progressPercent}%`;
        // Calculate display for duration
        const durationMinutes = Math.floor(duration / 60);
        console.log('minutes', durationMinutes);
        let durationSeconds = Math.floor(duration % 60);
        if (durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`;
        }
        console.log('seconds', durationSeconds);
        durationEl.textContent = `${durationMinutes}:${durationSeconds}`; 
        // Delay switching duration Element to avoid NaN
        if (durationSeconds) {
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
        }
        // Calculate display for current
        const currentMinutes = Math.floor(currentTime / 60);
        let currentSeconds = Math.floor(currentTimes % 60);
        if (currentSeconds < 10) {
            currentSeconds = `0${currentSeconds}`;
        }
        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`; 
    }
}

// Set Progess Bar
function setProgressBar(e) {
    const width = this.clientWidth;
    console.log('width', width)
    const clickX = e.offsetX;
    console.log ('clickX', clickX);
    const { duration } = music;
    console.log(clickX /width);
    console.log((clickX /width) * duration);
    music.currenttime = (clickX / width) * duration;
}

// Event Listeners
prevBtn.addEventListener('click', prevSong); 
nextBtn.addEventListener('click, nextSong');
music.addEventListener('ended, nextSong');
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);