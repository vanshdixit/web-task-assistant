const container = document.querySelector('.container');
const startbtn = document.querySelector('#startbtn');
const stopbtn = document.querySelector('#stopbtn');
// const speakbtn = document.querySelector('#speakbtn');
const timeinp = document.getElementById('timeinp');
const timebtn = document.getElementById('timebtn');
const alarmTitle = document.getElementById('alarmTitle');
const addTranscriptBtn = document.getElementById('addTranscriptBtn');
const TranscriptInp = document.getElementById('TranscriptInp');
const ResponseInp = document.getElementById('ResponseInp');
const SubmitResponse = document.getElementById('SubmitResponse');
const alerti = document.querySelector('.alert');
const SpeakNotInp = document.getElementById('SpeakNotInp');
const SpeakNotBtn = document.getElementById('SpeakNotBtn');
const sidebar = document.querySelector('.sidebar');
const arrowGIf = document.getElementById('arrowGif');
const theArrowh5 = document.getElementById('theArrowh5');
const HelpBtn = document.getElementById('HelpBtn');
const HelpGif = document.getElementById('HelpGif');
const HelpNextBtn = document.getElementById('HelpNextBtn');

let helpCount = 0; 

HelpBtn.addEventListener('click', ()=>{
    HelpGif.style.display = 'block';
    HelpNextBtn.style.display = 'block';
    HelpGif.style.animation = 'BtnTWake 1s';
    helpCount++;
})
HelpNextBtn.addEventListener('click', ()=>{
    HelpGif.style.left = '650px';
    helpCount++;
    
    // if(helpCount == 2 && HelpGif.style.left == '650px'){
    //     HelpGif.style.left = '800px';
    // }
    
})
if(helpCount == 2){
    HelpNextBtn.addEventListener('click', ()=>{
        if(HelpGif.style.left == '650px' && helpCount == 2){
            HelpGif.style.left = '800px'
        }
    });
}



arrowGIf.addEventListener('click', ()=>{
    if(sidebar.style.display != 'flex'){
        sidebar.style.display = 'flex';
        arrowGIf.style.left = '500px'
        arrowGIf.style.transform = 'rotate(50deg)';
        theArrowh5.style.display = 'none';
        SpeakNotInp.style.display = 'block';
        SpeakNotBtn.style.display = 'block';
    }
    else{
        sidebar.style.display = 'none';
        arrowGIf.style.left = '0px';
        arrowGIf.style.transform = 'rotate(220deg)';
        theArrowh5.style.display = 'block';
    }
})


let songs = [
    audioElement0 = new Audio('0.mp3'),
    audioElement11 = new Audio('11.mp3'),
    audioElement1 = new Audio('1.mp3'),
    audioElement2 = new Audio('2.mp3'),
    audioElement3 = new Audio('3.mp3'),
    audioElement4 = new Audio('4.mp3'),
    audioElement5 = new Audio('5.mp3'),
    audioElement6 = new Audio('6.mp3'),
    audioElement7 = new Audio('7.mp3'),
    audioElement8 = new Audio('8.mp3'),
    audioElement9 = new Audio('9.mp3'),
    audioElements10 = new Audio('10.mp3')
]
// let playListIndex = 6;

let time = new Date();
let hour = time.getHours();
let min = time.getMinutes();
let sec = time.getSeconds();
let TimeVal = timeinp.value;
let Splitedtime = TimeVal.split(':');
let SplitedHour = Splitedtime[0];
let SplitedMin = Splitedtime[1];

let transcriptList =  ['open', 'hello', 'Thank', 'time', 'nap', 'search google for', 'search youtube for', 'search amazon for', 'github profile', 'set', 'alarm', 'talk to me', 'anything', 'you there'];
console.log(transcriptList);



// Weather
function weatherFunc(location){
    const weatherCont = document.querySelector('.temp').querySelectorAll('*');
    console.log(weatherCont);
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=48ddfe8c9cf29f95b7d0e54d6e171008`;
    const xhr = new XMLHttpRequest();

    xhr.open('GET', url, true);
    xhr.onload = function () {
        if (this.status === 200){
            let data = JSON.parse(this.responseText);
            weatherCont[0].textContent = `Location : ${data.name}`;
            weatherCont[1].textContent = `Country : ${data.sys.country}`;
            weatherCont[2].textContent = `weather Type : ${data.weather[0].main}`
            weatherCont[3].textContent = `weather Description : ${data.weather[0].description}`;
            weatherCont[4].src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
            weatherCont[5].textContent = `Original temprature : ${ktc(data.main.temp)}`;
            weatherCont[6].textContent = `Feels like : ${data.main.feels_like}`;
            weatherCont[7].textContent = `Minimum temprature : ${data.main.temp_min}`;
            weatherCont[8].textContent = `Maximum temprature : ${data.main.temp_max}`;
            
            weatherStatement = `Sir, the weather in ${data.name} is ${data.weather[0].description}, and the temprature feels like ${ktc(data.main.feels_like)}`
            function sayWheather(){
                say(`${weatherStatement}`)
            }
        }else{
            weatherCont.textContent = 'Weather info not found';
        }
        
    }
    xhr.send();
}

function ktc(k){
    k = k - 273.15;
    return k.toFixed(2);
}

const hibdisForm = document.querySelector('.hibdisForm');
hibdisForm.style.display = 'none';
if(localStorage.getItem('hibdis_form') === null){
    hibdisForm.style.display = 'block';
    hibdisForm.querySelector('button').addEventListener('click', userInfo);
    // console.log(hibdisForm.addEventListener('input')[0].value)
}
function userInfo(){
    let hibdisFormInfo = {
        name : hibdisForm.querySelectorAll('input')[0].value,
        bio : hibdisForm.querySelectorAll('input')[1].value,
        github : hibdisForm.querySelectorAll('input')[2].value,
        instagram : hibdisForm.querySelectorAll('input')[3].value,
        location : hibdisForm.querySelectorAll('input')[4].value,
        linkedIn : hibdisForm.querySelectorAll('input')[5].value
    }
    testArr = [];
    hibdisForm.querySelectorAll('input').forEach((e) =>{
        testArr.push(e.value);
    })
    if(testArr.includes("")){
        say('Please enter your full information in here');
    }else{
        localStorage.clear();
        localStorage.setItem('hibdis_form', JSON.stringify(hibdisFormInfo));
        hibdisForm.style.display = 'none';
        weatherFunc(JSON.parse(localStorage.getItem('hibdis_form')).location)
    }
}



const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

addTranscriptBtn.addEventListener('click', ()=>{
    TranscriptInp.style.display = 'block';
    ResponseInp.style.display = 'block';
    TranscriptInp.value = "";
    ResponseInp.value = "";
    SubmitResponse.style.display = 'block';
    SubmitResponse.addEventListener('click', ()=>{
        TranscriptInp.style.display = 'none';
        ResponseInp.style.display = 'none';
        SubmitResponse.style.display = 'none';
        alerti.style.display = 'block';
        transcriptList.push(TranscriptInp.value);
        console.log(transcriptList);
    })
})

recognition.onstart = function(){
    console.log('vr active');
    console.log(hour);
    if(hour > 0 && hour < 12){
        say('Good morning sir');
    }
    else if(hour > 12 && hour < 17){
        say('Good Afternoon sir');
    }
    else{
        say('Good evening sir');
    }
}
recognition.onend = function(event){
    console.log('vr deactive');
    console.log(event);
    // say('I am going to take a nap, just wake me up whenever you need me, bye')
}
recognition.onresult = function(event){
    // console.log(event)
    let current = event.resultIndex;
    let transcript = event.results[current][0].transcript;
    let userData = localStorage.getItem('hibdis_form');
    console.log(`You said: ${transcript}`);
    transcript = transcript.toLowerCase();

    if(transcript.includes('hello')){
        say("hello sir");
        console.log('hello sir');
    }
    if(transcript.includes('thank') || transcript.includes('good')){
        say("Thankyou sir");
    }
    
    if(transcript.includes('time')){
        say(`Sir, the time right now is ${hour} hours ${min} minutes....`)
    }

    if(transcript.includes('nap')){
        say('aa, actually i am feeling sleepy, just wake me up whenever you need me, bye....')
    }

    if(transcript.includes('open')){
        let webname = transcript;
        webname = webname.split(" ")
        console.log(webname);
        console.log(webname[1]);
        let actualName = webname[1];
        if(webname[1] == 'open'){
            actualName = webname[2];
        }
        say(`Opening ${actualName}`);
        window.open(`https://www.${actualName}.com`);
        // let openIndex = transcript.indexOf('open');
        // console.log(openIndex);
        // let elemIndex = transcript.search('youtube');
        // console.log(elemIndex);
    }
    if(transcript.includes('search google for')){
        let searchContent = transcript;
        searchContent = searchContent.split(" ")
        console.log(searchContent);
        searchContent.shift();
        searchContent.splice(0, 1);
        searchContent.splice(0, 1);
        console.log(searchContent);
        if(searchContent[0] == 'for'){
            searchContent.shift();
        }
        let searchContentStr = searchContent.join(" ");
        console.log(searchContentStr);
        say(`searching google for ${searchContentStr}. Here are the results`);
        window.open(`https://www.google.com/search?q=${searchContentStr}`);
    }
    if(transcript.includes('search youtube for')){
        let searchYoutubeContent = transcript;
        searchYoutubeContent = searchYoutubeContent.split(" ");
        searchYoutubeContent.shift();
        searchYoutubeContent.splice(0, 1);
        searchYoutubeContent.splice(0, 1);
        if(searchYoutubeContent[0] == 'for'){
            searchYoutubeContent.shift();
        }
        let searchYoutubeContentStr = searchYoutubeContent.join(" ");
        say(`searching youtube for ${searchYoutubeContentStr}. Here are the results`);
        window.open(`https://www.youtube.com/results?search_query=${searchYoutubeContentStr}`); 
    }
    if(transcript.includes('search amazon for')){
        let searchAmazonContent = transcript;
        searchAmazonContent = searchAmazonContent.split(" ");
        searchAmazonContent.shift();
        searchAmazonContent.splice(0, 1);
        searchAmazonContent.splice(0, 1);
        if(searchAmazonContent[0] == 'for'){
            searchAmazonContent.shift();
        }
        let searchAmazonContentStr = searchAmazonContent.join(" ");
        say(`searching amazon for ${searchAmazonContentStr}. Here are the results`);
        window.open(`https://www.amazon.com/s?k=${searchAmazonContentStr}`); 
    }
    
    if(transcript.includes('github profile')){
        say('opening your github profile sir. there you go');
        window.open(`https://www.github.com/${JSON.parse(userData).github}`);
    }

    if(transcript.includes('set') && transcript.includes('alarm')){
        say('setting an alarm for you sir. please fill the required form');
        timeinp.style.display = 'flex';
        timebtn.style.display = 'flex';
        alarmTitle.style.display = 'flex'
    }

    if(transcript.includes('talk to me')){
        say('what do you wanna talk about sir??')
    }

    if(transcript.includes('anything')){
        say('I know what might cheer you up, jigyasa dixit is coming on her birthday to nagda this tim');
    }
    if(transcript.includes('you there')){
        say('for you sir always');
    }
    
        
    // if(transcript.includes('drop my needle')){
        // let playListIndex = 0;
        // songs[playListIndex].play();
        // playListIndex++;
        // console.log(playListIndex);
        // Array.from(songs).forEach((element)=>{
        //     playListIndex = 0;
        //     element.play();
        //     playListIndex++;
        //     element.addEventListener('ended', ()=>{
        //         element.play();
        //     })
        // })

        // songs[playListIndex].addEventListener('ended', ()=>{
        //     for(playListIndex = playListIndex; playListIndex<=10; playListIndex++){
        //         // songs[playListIndex].play();
        //         playListIndex++;
        //         // console.log(playListIndex);
        //         songs[playListIndex].addEventListener('ended', ()=>{
        //             playListIndex++;
        //             songs[playListIndex].play();
        //             // songs[playListIndex].addEventListener('ended', ()=>{
        //             //     playListIndex++;
        //             //     songs[playListIndex].play();
        //             // })
                    
        //         })
        //     }
        // })
        // let playListIndex = 0;
        // songs[playListIndex].play();
        // songs[playListIndex].addEventListener('ended', ()=>{
        //     playListIndex++;
        //     songs[playListIndex].play();
        //     for(playListIndex = playListIndex; playListIndex<=10;){
        //         console.log(playListIndex);
        //         songs[playListIndex].addEventListener('ended', ()=>{
        //             songs[playListIndex].play();
        //         })
        //     }
        // })
        // playListIndex++;
        // songs[playListIndex].play();
        // playListIndex++;
        // songs[playListIndex].play();
        // playListIndex++;
            
        
        // let playListIndex = 1;
        // console.log(songs[playListIndex]);
        // songs[0].play();
        // songs.addEventListener('ended', (e)=>{
        //     playListIndex += 1;
        //     songs[playListIndex].play();
        // })
        // for(item of songs){
        //     playListIndex = 0;
        // }
    // }
    if(transcript.includes('drop')){
        let playListIndex = 0;
        songs[playListIndex].play();
        playListIndex++;
        if(playListIndex = playListIndex){
            playListIndex++
            songs[playListIndex].play();
        }
    }
    if(transcript.includes(TranscriptInp.value)){
        say(ResponseInp.value);
    }
       
    

    if(transcript.includes('+')){
        let addInp = transcript;
        let splitedAddInp = addInp.split('+');
        console.log(splitedAddInp);
        console.log(`The numbers are ${splitedAddInp[0]} and ${splitedAddInp[1]}`)
        // let firstelm = splitedAddInp[0];
        let intfirst = parseInt(splitedAddInp[0]);
        let intsecond = parseInt(splitedAddInp[1])
        console.log(intfirst);
        console.log(intsecond);
        console.log(`The answer is ${intfirst + intsecond}`);
        say(`The answer is ${intfirst + intsecond}`);
        
        // let ans = parseInt(`The answer is ${splitedAddInp[0] + splitedAddInp[1]}`)
        // console.log(ans);
    }
    if(transcript.includes('chat')){
        window.open('https://bqlpj2nc4pjbfiuazr0mnw-on.drv.tw/BlueProjects/Hibdis/Bluechat/');
    }

    // if(transcript.includes('open instagram')){
    //     // say('Shall i open your instagram Sir?')
    //     // if(transcript.includes('yes')){
    //     //     window.open('https://www.instagram.com/vansh_dixit_06/');
    //     // }
    //     // else if(transcript.includes('no')){
    //     //     say('Ok sir')
    //     // }
    // }
    
    // else{
    //     say("I didn't quite get what you said sir, i belive it is not in my commanding transcripts right now, sorry...., but i am sure Your query will be added soon.");
    // }
    // if(!(transcript in transcriptList)){
    //     say('sir, the command you just gave does not come in my transcript list');
    // }
    
}



recognition.continuous = true;

startbtn.addEventListener('click', ()=>{
    recognition.start();
})
stopbtn.addEventListener('click', ()=>{
    recognition.stop();
})

function say(message){
    const speech = new SpeechSynthesisUtterance();
    const allVoices = speechSynthesis.getVoices();
    speech.volume = 1;
    speech.voice = allVoices[0];
    speech.text = message;
    
    window.speechSynthesis.speak(speech);
    console.log('I am speaking right now.......');
}

timebtn.addEventListener('click', function(){
    let SubmitTimeVal = timeinp.value;
    let SubmitTime = SubmitTimeVal.split(':');
    let SubmitHour = SubmitTime[0];
    let SubmitMin = SubmitTime[1];
    console.log(SubmitHour, SubmitMin);
    let SetHour = localStorage.setItem('hour', SubmitHour);
    let SetMin = localStorage.setItem('Min', SubmitMin);
    timeinp.style.display = 'none';
    timebtn.style.display = 'none';
    alarmTitle.style.display = 'none';
    say(`Alarm set at ${SubmitHour} hour ${SubmitMin} minutes`);
});

setInterval(() => {
    time = new Date();
    hour = time.getHours();
    min = time.getMinutes();
    sec = time.getSeconds();
    TimeVal = timeinp.value;
    Splitedtime = TimeVal.split(':');
    SplitedHour = hour;
    SplitedMin = min;
    // console.log(SubmitHour, SubmitMin)
    let gethour = localStorage.getItem('hour');
    let getMin = localStorage.getItem('Min');
    if(gethour == hour && getMin == min && sec == 0){
        say(`${alarmTitle.value}`);
    }
}, 1000);


SpeakNotBtn.addEventListener('click', ()=>{
    let SpeakNotVal = SpeakNotInp.value;
    if(SpeakNotVal.includes('hello')){
        SpeakNotInp.value = "";
        say('hello sir');
    }
    if(SpeakNotVal.includes('you there')){
        SpeakNotInp.value = "";
        say('For you sir, always');

    }
    if(SpeakNotVal.includes('thank') || SpeakNotVal.includes('good')){
        SpeakNotInp.value = "";
        say("Thankyou sir");
    }
    
    if(SpeakNotVal.includes('time')){
        SpeakNotInp.value = "";
        say(`Sir, the time right now is ${hour} hours ${min} minutes....`)
    }
    
    if(SpeakNotVal.includes('nap')){
        SpeakNotInp.value = "";
        say('aa, actually i am feeling sleepy, just wake me up whenever you need me, bye....')
    }
    
    if(SpeakNotVal.includes('open')){
        SpeakNotInp.value = "";
        let webname = SpeakNotVal;
        webname = webname.split(" ")
        console.log(webname);
        console.log(webname[1]);
        let actualName = webname[1];
        if(webname[1] == 'open'){
            actualName = webname[2];
        }
        say(`Opening ${actualName}`);
        window.open(`https://www.${actualName}.com`);
        // let openIndex = SpeakNotVal.indexOf('open');
        // console.log(openIndex);
        // let elemIndex = SpeakNotVal.search('youtube');
        // console.log(elemIndex);
    }
    if(SpeakNotVal.includes('search google for')){
        SpeakNotInp.value = "";
        let searchContent = SpeakNotVal;
        searchContent = searchContent.split(" ")
        console.log(searchContent);
        searchContent.shift();
        searchContent.splice(0, 1);
        searchContent.splice(0, 1);
        console.log(searchContent);
        if(searchContent[0] == 'for'){
            searchContent.shift();
        }
        let searchContentStr = searchContent.join(" ");
        console.log(searchContentStr);
        say(`searching google for ${searchContentStr}. Here are the results`);
        window.open(`https://www.google.com/search?q=${searchContentStr}`);
    }
    if(SpeakNotVal.includes('search youtube for')){
        SpeakNotInp.value = "";
        let searchYoutubeContent = SpeakNotVal;
        searchYoutubeContent = searchYoutubeContent.split(" ");
        searchYoutubeContent.shift();
        searchYoutubeContent.splice(0, 1);
        searchYoutubeContent.splice(0, 1);
        if(searchYoutubeContent[0] == 'for'){
            searchYoutubeContent.shift();
        }
        let searchYoutubeContentStr = searchYoutubeContent.join(" ");
        say(`searching youtube for ${searchYoutubeContentStr}. Here are the results`);
        window.open(`https://www.youtube.com/results?search_query=${searchYoutubeContentStr}`); 
    }
    if(SpeakNotVal.includes('search amazon for')){
        SpeakNotInp.value = "";
        let searchAmazonContent = SpeakNotVal;
        searchAmazonContent = searchAmazonContent.split(" ");
        searchAmazonContent.shift();
        searchAmazonContent.splice(0, 1);
        searchAmazonContent.splice(0, 1);
        if(searchAmazonContent[0] == 'for'){
            searchAmazonContent.shift();
        }
        let searchAmazonContentStr = searchAmazonContent.join(" ");
        say(`searching amazon for ${searchAmazonContentStr}. Here are the results`);
        window.open(`https://www.amazon.com/s?k=${searchAmazonContentStr}`); 
    }

    
    if(SpeakNotVal.includes('github profile')){
        SpeakNotInp.value = "";
        say('opening your github profile sir. there you go');
        window.open(`https://www.github.com/${JSON.parse(userData).github}`);
    }

    if(SpeakNotVal.includes('play')){
        SpeakNotInp.value = "";
        let webname = SpeakNotVal;
        webname = webname.split(" ");
        actualName = webname[1];
        window.open(`https://open.spotify.com/search/${actualName}`)
    }
    
    if(SpeakNotVal.includes('set') && SpeakNotVal.includes('alarm')){
        SpeakNotInp.value = "";
        say('setting an alarm for you sir. please fill the required form');
        timeinp.style.display = 'flex';
        timebtn.style.display = 'flex';
        alarmTitle.style.display = 'flex'
        window.open(`https://open.spotify.com/search/senorita`)
    }
    
    if(SpeakNotVal.includes('talk to me')){
        SpeakNotInp.value = "";
        say('what do you wanna talk about sir??')
    }
    
    if(SpeakNotVal.includes('anything')){
        SpeakNotInp.value = "";
        say('I know what might cheer you up, rishikesh is a good person');
    }
    if(SpeakNotVal.includes('you there')){
        SpeakNotInp.value = "";
        say('for you sir always');
    }
    if(SpeakNotVal.includes(TranscriptInp.value)){
        // console.log(ResponseInp.value);
        say(ResponseInp.value);
    }
    if(SpeakNotVal.includes('+')){
        let addInp = transcript;
        let splitedAddInp = addInp.split('+');
        console.log(splitedAddInp);
        console.log(`The numbers are ${splitedAddInp[0]} and ${splitedAddInp[1]}`)
        // let firstelm = splitedAddInp[0];
        let intfirst = parseInt(splitedAddInp[0]);
        let intsecond = parseInt(splitedAddInp[1])
        console.log(intfirst);
        console.log(intsecond);
        console.log(`The answer is ${intfirst + intsecond}`);
        say(`The answer is ${intfirst + intsecond}`);
        
        // let ans = parseInt(`The answer is ${splitedAddInp[0] + splitedAddInp[1]}`)
        // console.log(ans);
    }
    if(SpeakNotVal.includes('chat')){
        window.open('https://bqlpj2nc4pjbfiuazr0mnw-on.drv.tw/BlueProjects/Hibdis/Bluechat/');
    }
})