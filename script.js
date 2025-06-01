var arr = [
  { songName: "Valam", url: "./songs/Valam.mp3", img: "./images/valam.jpg" },
  { songName: "Humnava", url: "./songs/Humnava.mp3", img: "./images/humnava.jpg" },
  { songName: "Dekha Hazaro Dafa", url: "./songs/dekha.mp3", img: "./images/rustom.jpg" },
  { songName: "Humsafar", url: "./songs/Humsafar.mp3", img: "./images/humsafar.jpg" }
];

let playlist = document.getElementById("playlist");
let img = document.getElementById("image");
let pl = document.getElementById("pl");
let fore = document.getElementById("fore");
let back = document.getElementById("back");
let pg = document.getElementById("progress")
let mp = document.getElementById("mp")

let audio = new Audio();
let currentIndex = 0; 
let flag = 0;

function mainFunction() {
  let clutter = "";
  arr.forEach(function (elem, index) {
    clutter += `
    <div class="songs" id="${index}">
    <img src="${elem.img}" alt="">
    <h3>${elem.songName}</h3>
    </div>`;
  });
  playlist.innerHTML = clutter;
}

mainFunction();

audio.addEventListener('timeupdate', () => {
  if (!isNaN(audio.duration)) {
    let progress1 = parseInt((audio.currentTime / audio.duration) * 100);
    pg.value = progress1;
  }
})

  audio.addEventListener("play", () => {
        img.classList.add("rotate");
    });

    audio.addEventListener("pause", () => {
        img.classList.remove("rotate");
    });

    audio.addEventListener("ended", () => {
        img.classList.remove("rotate");
    });

pg.addEventListener('change' , ()=>{
    audio.currentTime = pg.value * audio.duration / 100;
})

playlist.addEventListener("click", function (dets) {
  if (dets.target.closest(".songs")) {
    currentIndex = parseInt(dets.target.closest(".songs").id);
    playSong(currentIndex);
    mp.style.background = `linear-gradient(135deg,rgb(185, 19, 114) 10%, #6B0F1A 100%)`
  }
});

pl.addEventListener("click", function () {
  if (flag == 0) {
    audio.play();
    pl.innerHTML = `<i class="ri-pause-mini-line"></i>`;
    flag = 1;
  } else {
    audio.pause();
    pl.innerHTML = `<i class="ri-play-mini-fill"></i>`;
    flag = 0;
  }
});

back.addEventListener("click", function () {
  currentIndex = (currentIndex - 1 + arr.length) % arr.length;
  playSong(currentIndex);
});

fore.addEventListener("click", function () {
  currentIndex = (currentIndex + 1) % arr.length;
  playSong(currentIndex);
});

function playSong(index) {
  audio.src = arr[index].url;
  img.style.backgroundImage = `url(${arr[index].img})`;
  audio.play();
  pl.innerHTML = `<i class="ri-pause-mini-line"></i>`;
  flag = 1;
}









