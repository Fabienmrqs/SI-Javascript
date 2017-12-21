// window.addEventListener('load', init)

function init() {
    var div = document.createElement('div')
    var containerDescContent = document.querySelector('.containerDescContent')
    var movieTitle = document.querySelector('.movieTitle')
    var movieAuthor = document.querySelector('.movieAuthor')
    var movieYear = document.querySelector('.movieYear')
    var movieRating = document.querySelector('.movieRating')
    var movieDescription = document.querySelector('.movieDescription')

    document.body.querySelector('.modal').querySelector('.modalContent').querySelector('.containerPlayer').appendChild(div)
    div.setAttribute('id', 'div')

    function createDescContent() {
      movieTitle.textContent = data.films[numFilm].title
      movieAuthor.textContent = 'Auteur : ' + data.films[numFilm].author
      movieYear.textContent = data.films[numFilm].year
      movieRating.textContent = 'Rating : ' + data.films[numFilm].rating + '/5'
      movieDescription.textContent = data.films[numFilm].description
    }

    function createVideo() {
      var video = document.createElement("video")

      div.appendChild(video)
      video.id = "Video"
      video.src = '../mvi/' + data.films[numFilm].src
      video.volume = 0.5
    }

    function createPlayBtn() {
      var playBtn = document.createElement("div")
      var video = document.getElementById("Video")

      div.appendChild(playBtn)
      playBtn.setAttribute('id', "playBtn")
      playBtn.textContent = "\u25B6"
      
      video.addEventListener("click", function() {
        // playPause()
        if (video.paused) {
          video.play()
          playBtn.textContent = "\u25AE\u25AE"
      } else {
          video.pause()
          playBtn.textContent = "\u25B6"
      }
      })
      
      playBtn.addEventListener("click", function() {
        // playPause()
        if (video.paused) {
            video.play()
            playBtn.textContent = "\u25AE\u25AE"
        } else {
            video.pause()
            playBtn.textContent = "\u25B6"
        }
      })
    }

    function createRestartBtn() {
      var restartBtn = document.createElement("div")
      var video = document.getElementById("Video")

      div.appendChild(restartBtn)
      restartBtn.setAttribute('id', "restartBtn")
      restartBtn.textContent = "\u2B1B"

      restartBtn.addEventListener("click", function() {
        video.currentTime = 0
        video.pause()
        playBtn.textContent = "\u25B6"
      })

      window.addEventListener('keydown', function(e) {
        if (e.keyCode === 83) {
        video.currentTime = 0
        video.pause()
        playBtn.textContent = "\u25B6"
        }
      })
    }

    function createMuteBtn() {
      var muteBtn = document.createElement("div")
      var video = document.getElementById("Video")
      var volumeSlider = document.getElementById("volumeSlider")

      div.appendChild(muteBtn)
      muteBtn.setAttribute('id', "muteBtn")
      muteBtn.textContent = "\uD83D\uDD0A"

      muteBtn.addEventListener("click", function() {
        if (muteBtn.textContent === "\uD83D\uDD0A") {
          video.volume = 0
          muteBtn.textContent = "\uD83D\uDD07"
        } else {
          video.volume = 0.5
          muteBtn.textContent = "\uD83D\uDD0A"
        }
      })

      window.addEventListener('keydown', function(e) {
        var volumeSlider = document.getElementById("volumeSlider")
        var video = document.getElementById("Video")

        if (e.keyCode === 77 && muteBtn.textContent === "\uD83D\uDD0A") {
          video.volume = 0
          muteBtn.textContent = "\uD83D\uDD07"
        } else {
          video.volume = volumeSlider.value / 100
          muteBtn.textContent = "\uD83D\uDD0A"
        }
      })
    }

    function createVolumeSlider() {
      var volumeSlider = document.createElement("input")
      var video = document.getElementById("Video")
      var muteBtn = document.getElementById("muteBtn")

      div.appendChild(volumeSlider)
      volumeSlider.setAttribute('id', 'volumeSlider')
      volumeSlider.type = "range"
      volumeSlider.value = 50

      volumeSlider.addEventListener("input", function() {
        video.volume = volumeSlider.value / 100
        muteBtn.textContent = "\uD83D\uDD0A"
        if (volumeSlider.value < 1) {
          muteBtn.textContent = "\uD83D\uDD07"
        }
      })
      window.addEventListener('keydown', function(e) {
        if (volumeSlider.value < 1) {
          muteBtn.textContent = "\uD83D\uDD07"
        }
        if (e.keyCode === 38) {
          volumeSlider.value++
          console.log(volumeSlider.value)
          video.volume = volumeSlider.value / 100
        }
        if (e.keyCode === 40) {
          volumeSlider.value -= 2
          console.log(volumeSlider.value)
          video.volume = volumeSlider.value / 100
        }
      })
    }

    function createProgressBar() {
      var progressBar = document.createElement("progress")
      var video = document.getElementById("Video")

      div.appendChild(progressBar)
      progressBar.type = "range"
      progressBar.setAttribute('id', 'progressBar')
      progressBar.setAttribute('value', '0')
      progressBar.setAttribute('step', '0.001')
      progressBar.setAttribute('max', '100')

      progressBar.addEventListener('click', function(e) {
      // progressBar.addEventListener('click', function() {
        // var slideTo = video.duration * (progressBar.value / 100)
        // video.currentTime = slideTo
      // })
        var percent = e.offsetX / this.offsetWidth
        // var video = document.getElementById("Video" + i)

        video.currentTime = percent * video.duration
        progressBar.value = percent / 100
      })
      video.addEventListener('timeupdate', function() {
        var newTime = video.currentTime * (100 / video.duration)
        progressBar.value = newTime
      })
    }

    function createDigitTime() {
      var digitTime = document.createElement('p')
      var video = document.getElementById("Video")
      var filmLength = data.films[numFilm].duration

      div.appendChild(digitTime)
      digitTime.setAttribute('id', 'digitTime')
      digitTime.textContent = '0:00' + ' / ' + filmLength

      video.addEventListener('timeupdate', function() {
        var minutes = Math.floor(video.currentTime/60)
        var secondes = Math.floor(video.currentTime%60)
        var secondesText

        if (secondes < 10) {
          secondesText = '0' + secondes
        } else {
          secondesText = secondes
        }

        digitTime.textContent = minutes + ':' + secondesText + ' / ' + filmLength
      })
    }

    function createFullScreenBtn() {
      var fullScreenBtn = document.createElement("div")
      var video = document.getElementById("Video")
      var checkFullScreen = 0
      var div = document.getElementById('div')

      div.appendChild(fullScreenBtn)
      fullScreenBtn.setAttribute('id', "fullScreenBtn")
      fullScreenBtn.textContent = "{ }"

      fullScreenBtn.addEventListener("click", function() {
        if (!checkFullScreen) {
          div.style.display = 'block'
          video.webkitRequestFullScreen()
          progressBar.classList.toggle('zIndex__progressBar')
          playBtn.classList.toggle('zIndex__playBtn')
          restartBtn.classList.toggle('zIndex__restartBtn')
          digitTime.classList.toggle('zIndex__digitTime')
          muteBtn.classList.toggle('zIndex__muteBtn')
          volumeSlider.classList.toggle('zIndex__volumeSlider')
          fullScreenBtn.classList.toggle('zIndex__fullScreenBtn')
          checkFullScreen = 1
        } else {
          video.webkitExitFullscreen()
          div.style.display = 'grid'
          progressBar.classList.toggle('zIndex__progressBar')
          playBtn.classList.toggle('zIndex__playBtn')
          restartBtn.classList.toggle('zIndex__restartBtn')
          digitTime.classList.toggle('zIndex__digitTime')
          muteBtn.classList.toggle('zIndex__muteBtn')
          volumeSlider.classList.toggle('zIndex__volumeSlider')
          fullScreenBtn.classList.toggle('zIndex__fullScreenBtn')
          checkFullScreen = 0
        }
      })
      window.addEventListener('keydown', function(e) {
        var div = document.getElementById('div')
        var progressBar = document.getElementById('progressBar')
        var playBtn = document.getElementById('playBtn')
        var restartBtn = document.getElementById('restartBtn')
        var digitTime = document.getElementById('digitTime')
        var muteBtn = document.getElementById('muteBtn')
        var volumeSlider = document.getElementById('volumeSlider')
        var fullScreenBtn = document.getElementById('fullScreenBtn')

        if (e.keyCode === 70 && !checkFullScreen) {
          if (video.requestFullscreen) {
            video.requestFullscreen();
            div.style.display = 'block'
            progressBar.classList.toggle('zIndex__progressBar')
            playBtn.classList.toggle('zIndex__playBtn')
            restartBtn.classList.toggle('zIndex__restartBtn')
            digitTime.classList.toggle('zIndex__digitTime')
            muteBtn.classList.toggle('zIndex__muteBtn')
            volumeSlider.classList.toggle('zIndex__volumeSlider')
            fullScreenBtn.classList.toggle('zIndex__fullScreenBtn')
          } else if (video.mozRequestFullScreen) {
            video.mozRequestFullScreen();
            div.style.display = 'block'
            progressBar.classList.toggle('zIndex__progressBar')
            playBtn.classList.toggle('zIndex__playBtn')
            restartBtn.classList.toggle('zIndex__restartBtn')
            digitTime.classList.toggle('zIndex__digitTime')
            muteBtn.classList.toggle('zIndex__muteBtn')
            volumeSlider.classList.toggle('zIndex__volumeSlider')
            fullScreenBtn.classList.toggle('zIndex__fullScreenBtn')
          } else if (video.webkitRequestFullscreen) {
            video.webkitRequestFullscreen();
            div.style.display = 'block'
            progressBar.classList.toggle('zIndex__progressBar')
            playBtn.classList.toggle('zIndex__playBtn')
            restartBtn.classList.toggle('zIndex__restartBtn')
            digitTime.classList.toggle('zIndex__digitTime')
            muteBtn.classList.toggle('zIndex__muteBtn')
            volumeSlider.classList.toggle('zIndex__volumeSlider')
            fullScreenBtn.classList.toggle('zIndex__fullScreenBtn')
          }
          checkFullScreen = 1
        } else if (e.keyCode === 70) {
          video.webkitExitFullscreen()
          checkFullScreen = 0
          div.style.display = 'grid'
          progressBar.classList.toggle('zIndex__progressBar')
          playBtn.classList.toggle('zIndex__playBtn')          
          restartBtn.classList.toggle('zIndex__restartBtn')
          digitTime.classList.toggle('zIndex__digitTime')
          muteBtn.classList.toggle('zIndex__muteBtn')
          volumeSlider.classList.toggle('zIndex__volumeSlider')
          fullScreenBtn.classList.toggle('zIndex__fullScreenBtn')
        } else if (e.keyCode === 27) {
          video.webkitExitFullscreen()
          checkFullScreen = 0
          div.style.display = 'grid'
          progressBar.classList.toggle('zIndex__progressBar')
          playBtn.classList.toggle('zIndex__playBtn')
          restartBtn.classList.toggle('zIndex__restartBtn')
          digitTime.classList.toggle('zIndex__digitTime')
          muteBtn.classList.toggle('zIndex__muteBtn')
          volumeSlider.classList.toggle('zIndex__volumeSlider')
          fullScreenBtn.classList.toggle('zIndex__fullScreenBtn')
        }
      })
    }

    function playPause() {
      var video = document.getElementById("Video")
      var playBtn = document.getElementById("playBtn")

      if (video.paused) {
          video.play()
          playBtn.textContent = "\u25AE\u25AE"
      } else {
          video.pause()
          playBtn.textContent = "\u25B6"
      }
    }

    function keyCodeFunction() {
      var video = document.getElementById("Video")

      window.addEventListener('keydown', function(e) {
        if (e.keyCode === 39) {
          video.currentTime += 5
        }
        if (e.keyCode === 37) {
          video.currentTime -= 5
        }
        if (e.keyCode === 32) {
          playPause()
        }
        if (e.keyCode === 75) {
          playPause()
        }
        if (e.keyCode === 74) {
          video.currentTime -= 10
        }
        if (e.keyCode === 76) {
          video.currentTime += 10
        }
      })
    }

    createVideo()
    createPlayBtn()
    createRestartBtn()
    createMuteBtn()
    createVolumeSlider()
    createProgressBar()
    createDigitTime()
    createDescContent()
    keyCodeFunction()
    createFullScreenBtn()
  }