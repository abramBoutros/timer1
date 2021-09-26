
window.addEventListener('load', () => {

 // select the DOM elements
const durationInput = document.querySelector('#duration');
const startButton = document.querySelector('#start');
const pauseButton = document.querySelector('#pause');
const circle = document.querySelector('circle');

const radius = circle.getAttribute('r');
const perimeter = 2 * radius * Math.PI ;
circle.setAttribute('stroke-dasharray',perimeter);

let duration;

const timer = new Timer(durationInput, startButton, pauseButton, {
    onStart(totalDuration) {
    console.log('Timer started');
    duration = totalDuration;
    },
    onTick(timeRemaining) {
        circle.setAttribute('stroke-dashoffset',
            (perimeter * timeRemaining) / duration - perimeter
        );
    },
    onComplete() {
        console.log('completed');
    }
});


});