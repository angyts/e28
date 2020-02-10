// Javascript for e28 Game assignment. Not supposed to use jQuery
// g,r,y,b,o,p

// let row = document.querySelector('td')
// row.classList.add('one');

// When page loads
window.addEventListener('load', function () {
    addChangeColourListener();
})


function addChangeColourListener() {
    document.querySelectorAll('.active-btn').forEach(item => {
        item.addEventListener('click', event => {
            changeColor(event);
        })
    })
}


function changeColor(event) {
    // Found this on https://stackoverflow.com/questions/11741070/how-to-get-the-element-clicked-on
    let s = event.target;

    // The big switcharoo happens here
    switch (s.dataset.color) {
        case 'g':
            s.outerHTML = `<button type="button" class="btn r btn-circle-large active-btn" data-color="r" onclick="changeColor(event)">Red</button>`;
            break;
        case 'r':
            s.outerHTML = `<button type="button" class="btn y btn-circle-large active-btn" data-color="y" onclick="changeColor(event)">Yellow</button>`;
            break;
        case 'y':
            s.outerHTML = `<button type="button" class="btn b btn-circle-large active-btn" data-color="b" onclick="changeColor(event)">Blue</button>`;
            break;
        case 'b':
            s.outerHTML = `<button type="button" class="btn o btn-circle-large active-btn" data-color="o" onclick="changeColor(event)">Orange</button>`;
            break;
        case 'o':
            s.outerHTML = `<button type="button" class="btn p btn-circle-large active-btn" data-color="p" onclick="changeColor(event)">Purple</button>`;
            break;
        case 'p':
            s.outerHTML = `<button type="button" class="btn g btn-circle-large active-btn" data-color="g" onclick="changeColor(event)">Green</button>`;
            break;
    }
}