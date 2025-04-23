// function in JS 
// function sum(a,b) {
//     return a+b;
// }//in this syntax we use function keyword to define a function ===> function expression 

// let mul = function(a,b){ //function definition
//     return a,b;
// }//in this syntax we use let or var or const keyword to define a function ===> function expression

// // Arrow functions are used as shorthand notation for writing a function, => (arrow symbol)
// let div = (a,b) => {
//     return a/b;
// }
// sum(5,6);
// mul(2,3);
// div(10,2);

// let obj = new Object() / let arr = new Array()
// constructor function are functions that are used for specific purposes, these are specific functions 
// where any constructor function will have their starting letter as capital letter

//function Nxtwave(){}, to use a constructor function we do need a 'new' keyword 

// let sub = new Function();
let video = document.querySelector("video");

let constraints = {
    audio:true,
    video:true,
}

let recorder;

let chunks = []; //media data is stored in form of chunks

let recordBtnCont = document.querySelector(".record-btn-cont");
let recordBtn = document.querySelector(".record-btn");

let captureBtnCont = document.querySelector(".capture-btn-cont");
let captureBtn = document.querySelector(".capt-btn ");

let transparentColor = "transparent";

let recordFlag = false;

// navogator is a global object where this gives info about browser
//mediaDevices === provide access to connected media input devices like cameras and microphones
//getUserMedia === is a method of mediaDevices that allows us to access the user's camera and microphone

// API
navigator.mediaDevices.getUserMedia(constraints)
.then((stream)=> {
    console.log(stream);
    video.srcObject = stream; //src and srcObject 

    recorder = new MediaRecorder(stream);
    recorder.addEventListener("start", (e)=>{
        chunks=[];
        console.log("recording started");
    })
    // if any stream happens
    recorder.addEventListener("dataavailable", (e)=>{
        chunks.push(e.data);
        console.log("data available");
    })
    recorder.addEventListener("stop", (e)=>{
        // convert media chunks data to video
        let blob = new Blob(chunks, {type: "video/mp4"});
        let videoURL = URL.createObjectURL(blob);
        let a = document.createElement("a");
        a.href = videoURL;
        a.download = "stream.mp4";
        a.click();
    })

    recordBtnCont.addEventListener("click", (e)=>{
        if(!recorder){
            return
        }
        recordFlag = !recordFlag;
        if(recordFlag){ //start
            console.log("recording started");
            recorder.start();
            recordBtn.classList.add("scale-record");
            startTime();
        }
        else{
            console.log("recording stopped");
            recorder.stop();
            recordBtn.classList.remove("scale-record");
            stopTime();
        }
    })
})

// video is actually captured as chunks, but what these chunks will have?
// each chunk will be having a frame, image is actually a frame

captureBtnCont.addEventListener("click", (e)=> {
    console.log("Capture button clicked");
    captureBtnCont.classList.add("scale-capture"); //add animations
    
    let canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    let imageURL =  canvas.toDataURL("image/png");

    let tool = canvas.getContext("2d");
    tool.drawImage(video, 0, 0, canvas.width, canvas.height);

    // filtering part 
    tool.fillStyle = transparentColor
    tool.fillRect(0, 0, canvas.width, canvas.height);

    let a = document.createElement("a");
        a.href = imageURL;
        a.download = "image.png";
        a.click();
    console.log("Captured a frame");

    // remove animations 
    setTimeout(()=> {
        captureBtn.classList.remove("scale-capture");
    },500);
})

// filtering logic 
let filter = document.querySelector(".filter-layer");

let allFilters = document.querySelectorAll(".filter");
allFilters.forEach(filterItem => {
    filterItem.addEventListener("click", (e) => {
        // get style 
        transparentColor = getComputedStyle(filterItem).getPropertyValue("background-color");
        filter.style.backgroundColor = transparentColor;
        console.log("Filter applied: " + transparentColor);
    });
})
















let timerID;
let counter = 0; //represents total seconds
let timer = document.querySelector(".timer");
function startTime() {
    timer.style.display = "block";
    function displayTimer() {
        /* 
         calculate time 
         1. Initialize a variable that actually stores no. of seconds 
         2. whenever this function displayTimer is called then we need to increment the counter variable, 
            as each call of this function is considered as 1sec in regular time. Why? because we need to get the actual 
            time when this thing counted 
         3. How to count Hours, Minutes and seconds 
         counter = 3725
         1 hour = 3600seconds 
         to count 1hr using counter value, we use "/(division operator)" between counter and 3600 seconds. Division operator
         is used to perform flooor division
         3725/3600 = 1
         remainder = 3725 % 3600 = 125 minutes(no. of ninutes in seconds), so we need to convert back to minutes
         1 min = 60 sec
        */

        let totalSeconds = counter;
        let hours = Number.parseInt(totalSeconds/3600);
        totalSeconds = totalSeconds%3600;
        let minutes = Number.parseInt(totalSeconds/60);
        totalSeconds = totalSeconds%60;
        let seconds = totalSeconds;
        hours = (hours < 10) ? `0${hours}`:hours
        minutes = (minutes < 10) ? `0${minutes}` : minutes;
        seconds = (seconds < 10) ? `0${seconds}` : seconds;
        timer.innerText = `${hours}:${minutes}:${seconds}`;
        counter++; 
        
    }

    timerID = setInterval(displayTimer, 1000);//we are calling this function displaytimer() every 1sec
}

function stopTime() {
    clearInterval(timerID);
    timer.innerText = "00:00:00"
    timer.style.display = "none";
}


