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

      div.appendChild(fullScreenBtn)
      fullScreenBtn.setAttribute('id', "fullScreenBtn")
      fullScreenBtn.textContent = "{ }"

      fullScreenBtn.addEventListener("click", function() {
        video.webkitRequestFullScreen()
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

    createVideo()
    createPlayBtn()
    createRestartBtn()
    createMuteBtn()
    createVolumeSlider()
    createProgressBar()
    createDigitTime()
    createDescContent()
    // createFullScreenBtn()
  }