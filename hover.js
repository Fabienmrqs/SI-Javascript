var hover = document.querySelectorAll('.img')
for (let i = 0; i < hover.length; i++) {
    hover[i].addEventListener('mouseover',function(){
        title.style.display = 'block';
    });
    hover[i].addEventListener('mouseout',function(){
        title.style.display = '';
    });
    
}


