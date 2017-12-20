var modal = document.querySelector('.modal')
var boxes = document.querySelectorAll('.box')
var imgs = document.querySelectorAll('.img')
var overlay = document.querySelector('.modalOverlay')
var modalContent = document.querySelector('.modalContent')
var containerPlayer = document.querySelector('.containerPlayer')
var numFilm


for (var i = 0; i < imgs.length; i++) {
	imgs[i].addEventListener('click', function(event) {
        for (var j = 0; j < data.films.length; j++) {
            if (event.srcElement.attributes.src.nodeValue === data.films[j].img) {
                numFilm = j
                init()
            }
        }
    	modal.style.display = 'block'
    	document.body.style.overflow = 'hidden'
	})
}

overlay.addEventListener('click', function() {
	var video = document.getElementById("Video")
	var playBtn = document.getElementById('playBtn')
    var div = document.getElementById('div')
    
    div.parentNode.removeChild(div)
    playBtn.textContent = "\u25B6"
    modal.style.display = ''
    document.body.style.overflow = 'visible'
    video.currentTime = 0
    video.pause()
})