var cpmIndicator = document.getElementById('cpm');
var bestCPMIndicator = document.getElementById('best');
var timeIndicator = document.getElementById('timeElapsed');
var clickIndicator = document.getElementById('clickCount');
var recentKeys = document.getElementById('recentKeys');
var scoreBar = document.getElementById("scoreBar");


var clickCount = 0; //How many times the user has clicked
var delta = 0; //miliseconds elapsed since start
var start = 0; //starting milisecond value (from Jan 1970 hehe)
var interval = 0;
var active = 0;
var bestcpm = 0;
var cpmvalue = 0;
var recentCount = 0;

function updateCPM() {
    cpmvalue = Math.round((clickCount / delta) * 1000 * 60); //Calculate the value
    cpmIndicator.innerHTML = cpmvalue;
    
    scoreBar.style.width = (cpmvalue/10) + '%';
}

function updateBestCPM() {
    if (cpmvalue > bestcpm) {
        bestcpm = cpmvalue;
    }
    bestCPMIndicator.innerHTML = bestcpm;
}

function startTimer() { //starts ticking
    interval = setInterval(updateTimer, 1); //start ticking
    start = Date.now(); //set the starting point
    active = 1;
}

function stopTimer() { //stops ticking
    clearInterval(interval);
    active = 0;
}

function updateTimer() {
    delta = Date.now() - start; //Update the delta
    updateCPM(); //Update the live CPM
    if (delta > 1000 && delta % 1000) { //after a small delay, check for best CPM every second
        updateBestCPM();
    }
    timeIndicator.innerHTML = delta / 1000; //Update the time elapsed
    return;
}

function clear() {
    timeIndicator.innerHTML = "0";
    clickIndicator.innerHTML = "0";
    clickCount = 0;
    bestcpm = 0;
} 

function addToRecent(e){
    if (e.key.length > 1 || e.key === " ") { //Don't show long keynames
        return;
    }else{
        if (recentCount > 7) {
            var newStr = recentKeys.innerText.substring(0, recentKeys.innerText.length-1);
            recentKeys.innerText = newStr;
        }
        var n = e.key + " " + recentKeys.innerHTML;
        recentKeys.innerHTML = n;
        recentCount++;
    }
}

document.addEventListener('keydown', function(event) {
    addToRecent(event);
    if (active === 0) //Timer not yet started, start it then
    {
        clear();
        startTimer();
        clickIndicator.innerHTML = clickCount;
        clickCount++;
    } else //Timer already running, add keypresses then.
    {
        clickIndicator.innerHTML = clickCount;
        clickCount++;
    }
}, false);
