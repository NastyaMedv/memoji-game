const  ICONS = ['🦄','🐶','🐭','🐱','🐱','🐭','🐟','🐹','🦄','🐶','🐟','🐹'];
let game =  document.getElementById('game');

for (let i = 0; i<game.children.length; i++) {
    game.children[i].children[1].innerText = ICONS[i];
}

game.addEventListener('click', function(e) {
    let parent = e.target.parentNode;
    if (parent.classList.contains('card')) {
        if (parent.classList.contains('open-card')) {
            parent.classList.remove('open-card');
            parent.classList.add('close-card');
        } else if (parent.classList.contains('close-card')) {
            parent.classList.remove('close-card');
            parent.classList.add('open-card');
        } else {
            parent.classList.add('open-card');
        }
    }
});
