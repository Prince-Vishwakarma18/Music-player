let songs = [
  {
    songTitle: "Ik Bagal",
    songArtist: "Piyush Mishra",
    file: "songs/Ik Bagal Gangs Of Wasseypur.mp3",
    image: "songsImg/Ik-Bagal.jpg"
  },
  {
    songTitle: "Kamado Tanjiro No Uta",
    songArtist: "Go Shiina",
    file: "songs/kamado_tanjiro_no_uta.mp3",
    image: "songsImg/demon slayer.jpg"
  },
  {
    songTitle: "Suzume",
    songArtist: "Mixkit Artist",
    file: "songs/Suzume.mp3",
    image: "songsImg/suzume cover.jpeg"
  },
  {
    songTitle: "Nee Singam Dhan",
    songArtist: "A.R. Rahman, Sid Sriram",
    file: "songs/Nee Singam Dhan (PenduJatt.Com.Se).mp3",
    image: "songsImg/nee-singam-dhan.jpg"
  },
  {
    songTitle: "On My Way",
    songArtist: "Alan Walker, Sabrina Carpenter, Farruko",
    file: "songs/On My Way.mp3",
    image: "songsImg/onmyway.jpeg"
  },
  {
    songTitle: "Die With a Smile",
    songArtist: " Lady Gaga and Bruno Mars",
    file: "songs/Die with smile.mp3",
    image: "songsImg/Die With A Smile Cover.jpg"
  },
];

// Select DOM elements
let thumbnail = document.querySelector(".thumbnail");
let songTitle = document.querySelector(".song-title");
let songArtist = document.querySelector(".songArtist");
let volumeSlider = document.querySelector("#volume");
let progressBar = document.querySelector("#progress");

const currentTimeDisplay = document.getElementById("currentTime");
const durationDisplay = document.getElementById("duration");

let playBtn = document.querySelector(".play")
let playBtnI = document.querySelector(".play i");
let prevBtn = document.querySelector(".prev");
let nextBtn = document.querySelector(".next");

let playlistUl = document.querySelector("#playlist")
let audio = document.querySelector("audio");

let currentSongIndex = 0;

songs.forEach((song, index) => {
  let li = document.createElement("li");
  li.textContent = song.songTitle;
  li.dataset.index = index;
  playlistUl.appendChild(li);
});

let playLists = document.querySelectorAll("#playlist li");
playLists.forEach((item, index) => {
  item.addEventListener("click", () => {
    currentSongIndex = index;
    loadSong(index);
    playSong();
  });
});

// Load song 
function loadSong(index) {
  let song = songs[index];
  songTitle.textContent = song.songTitle;
  songArtist.textContent = song.songArtist;
  thumbnail.src = song.image;
  audio.src = song.file;

  playLists.forEach((item, i) => {
    item.classList.toggle("active", i === index);
  });
}

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}
audio.addEventListener("loadedmetadata", () => {
  durationDisplay.textContent = formatTime(audio.duration);
});

// Update current time while playing
audio.addEventListener("timeupdate", () => {
  currentTimeDisplay.textContent = formatTime(audio.currentTime);
});
// Play and Pause functions
function playSong() {
  audio.play();
  playBtnI.classList.replace("fa-play", "fa-pause");
}

function pauseSong() {
  audio.pause();
  playBtnI.classList.add("fa-pause", "fa-play");
}

// Toggle play/pause
playBtn.addEventListener("click", () => {
  if (audio.paused) {
    playSong();
  } else {
    pauseSong();
  }
});

// Next/Prev buttons
nextBtn.addEventListener("click", () => {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  loadSong(currentSongIndex);
  playSong();
});

prevBtn.addEventListener("click", () => {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  loadSong(currentSongIndex);
  playSong();
});

// Update progress bar
audio.addEventListener("timeupdate", () => {
  const percent = (audio.currentTime / audio.duration) * 100;
  progressBar.value = percent || 0;
});

// Seek when progress is changed
progressBar.addEventListener("input", () => {
  audio.currentTime = (progressBar.value / 100) * audio.duration;
});

// Volume control
volumeSlider.addEventListener("input", () => {
  audio.volume = volumeSlider.value / 100;
});

// Playlist click
playLists.forEach((item, index) => {
  item.addEventListener("click", () => {
    currentSongIndex = index;
    loadSong(index);
    playSong();
  });
});

// Auto play next when song ends
audio.addEventListener("ended", () => {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  loadSong(currentSongIndex);
  playSong();
});

// Load first song initially
loadSong(currentSongIndex);
