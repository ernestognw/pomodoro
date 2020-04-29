const title = document.querySelector('title');
const timerPomodoro = document.querySelector('#timer');
const timerValue = document.querySelector('#timeS');
const breakValue = document.querySelector('#timeB');
const downSession = document.querySelector('#downS');
const upSession = document.querySelector('#upS');
const downBreak = document.querySelector('#downB');
const upBreak = document.querySelector('#upB');
const playT = document.querySelector('#play');
const pauseT = document.querySelector('#pause');
const stopT = document.querySelector('#stop');
const completed = document.querySelector('#completed');

// Golbals
let minutesSession = 25;
let minutesBreak = 5;
let duration = -1;
let minutes;
let seconds;
let interval;
let pomodoros = 1;
const maxPomodoros = 4;
let type = 'timer';

for(let i = 0; i < maxPomodoros; i++) {
    const div = document.createElement('div');
    div.className = 'fullPomodoro';
    completed.appendChild(div);
}

const zeros = i => {
    if(i < 10) {
        i = "0" + i;
    }
    return i;
}

const durationTempo = mins => {
    if(duration >= 0) {
        duration--;
        minutes = zeros(Math.floor(duration / 60));
        seconds = zeros(duration % 60);
        timerPomodoro.textContent = `${minutes}:${seconds}`;
        type == 'timer' ? title.textContent = `Pomodoro: ${minutes}:${seconds}` : title.textContent = `Break:   ${minutes}:${seconds}`;
    } else {
        duration = mins * 60;
    }
}

const downMinutesSession = () => {
    if(interval && duration == 0){
        clearInterval(interval);
        duration = -1;
        type = 'break';
        audioInit();
        playTimer();
    } else if(interval) {
        durationTempo(minutesSession);
    } else if(minutesSession > 1) {
        minutesSession--;
        if(!interval) {
            timerValue.textContent = minutesSession;
            if(minutesSession < 10) {
                timerPomodoro.textContent = `0${minutesSession}:00`; // Times Display
            } else {
                timerPomodoro.textContent = `${minutesSession}:00`; // Times Display
            }
        }
    }
}

const upMinutesSession = () => {
    if(minutesSession < 60) {
        minutesSession++;
        timerValue.textContent = minutesSession;
        if(minutesSession < 10) {
            timerPomodoro.textContent = `0${minutesSession}:00`; // Times Display
        } else {
            timerPomodoro.textContent = `${minutesSession}:00`; // Times Display
        }
    } else {
        timerValue.textContent = 60;
    }
}

const downMinutesBreak = () => {
    if(interval && duration == 0){
        if(pomodoros < maxPomodoros) {
            clearInterval(interval);
            duration = -1;
            pomodoros ++;
            type = 'timer';
            audioInit()
            playTimer();
        } else {
            stopPomodoro();
        }
    } else if(interval) {
        durationTempo(minutesBreak);
    } else if(minutesBreak > 1) {
        minutesBreak--;
        if(!interval) {
            breakValue.textContent = minutesBreak;
        }
    }
}

const upMinutesBreak = () => {
    if(minutesBreak < 10) {
        minutesBreak++;
        breakValue.textContent = minutesBreak;
    } else {
        breakValue.textContent = 10;
    }
}

const audioInit = () => {
    if(type == 'timer') {
        const audio = document.querySelector('#initSound');
        audio.currentTime = 0;
        audio.play();
    } else {
        const audio = document.querySelector('#finishSound');
        audio.currentTime = 0;
        audio.play();
    }
}

const playTimer = () => {
    if(type == 'timer') {
        timerPomodoro.classList.remove('breakColor');
        interval = setInterval(downMinutesSession, 1000);
    } else {
        timerPomodoro.classList.add('breakColor');
        const fullPomodoro = document.querySelectorAll('.fullPomodoro');
        for(let i = 0; i < pomodoros; i++) {
            fullPomodoro[i].classList.add('breakColor');
        }
        interval = setInterval(downMinutesBreak, 1000);
    }
}

const playPause = () => {
    clearInterval(interval);
}

const stopPomodoro = () => {
    timerPomodoro.classList.remove('breakColor');
    const audio = document.querySelector('#stopSound');
    audio.currentTime = 0;
    audio.play();
    clearInterval(interval);
    duration = -1;
    title.textContent = 'Pomodoro';
    minutesSession = Number(timerValue.textContent);
    if(minutesSession < 10) {
        timerPomodoro.textContent = `0${timerValue.textContent}:00`; // Times Display
    } else {
        timerPomodoro.textContent = `${timerValue.textContent}:00`; // Times Display
    }
}

downSession.addEventListener('click', downMinutesSession);
upSession.addEventListener('click', upMinutesSession);
downBreak.addEventListener('click', downMinutesBreak);
upBreak.addEventListener('click', upMinutesBreak);
playT.addEventListener('click', playTimer);
pauseT.addEventListener('click', playPause);
stopT.addEventListener('click', stopPomodoro);