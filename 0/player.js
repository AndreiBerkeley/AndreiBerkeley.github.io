const dollyFrames = Array.from(
    { length: 7 },
    (_, index) => `./media/dolly-frames/${index + 1}.jpeg`,
);

const frame = document.querySelector('#dolly-frame');
const control = document.querySelector('#dolly-control');
const controlIcon = document.querySelector('#dolly-control-icon');
const controlLabel = document.querySelector('#dolly-control-label');

dollyFrames.forEach((source) => {
    const image = new Image();
    image.src = source;
});

let currentFrame = 0;
let isPaused = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function renderControl() {
    control.setAttribute('aria-pressed', String(isPaused));
    controlIcon.textContent = isPaused ? '▶' : 'Ⅱ';
    controlLabel.textContent = isPaused ? 'Play' : 'Pause';
}

setInterval(() => {
    if (isPaused) {
        return;
    }

    currentFrame = (currentFrame + 1) % dollyFrames.length;
    frame.src = dollyFrames[currentFrame];
}, 200);

control.addEventListener('click', () => {
    isPaused = !isPaused;
    renderControl();
});

renderControl();
