Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});

camera = document.getElementById("live_camera");

Webcam.attach('#live_camera');

function cap_img(){
    Webcam.snap(function(data_uri) {
        document.getElementById("snapshot").innerHTML = '<img id="captured_img" src = "'+data_uri+'"/>';
    });
}

console.log('ml5 version', ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/y9k_uiZNp/model.json",modelLoaded);

function modelLoaded(){
    console.log("Model Loaded!");
}

function predict_gesture(){
a = document.getElementById("captured_img");
    classifier.classify(a, gotResults);
}

function gotResults(error, result){
    if(error){
        console.log(error);
    }
    else{
     console.log(result);
     document.getElementById("predict_1").innerHTML = result[0].label;
     document.getElementById("gesture_1").innerHTML = result[0].label;

     if(result[0].label == "Peace"){
        document.getElementById('gesture_1').innerHTML = '&#9996';
        talk1 = "The prediction is peace"
        }
        
        if(result[0].label == "Thumbs Up"){
            document.getElementById('gesture_1').innerHTML = '&#128077';
            talk1 = "The prediction is thumbs up"
        }
        
        if(result[0].label == "Ok"){
            document.getElementById('gesture_1').innerHTML = '#128076';
            talk1 = "The prediction is okay"
        }
        speak()
        
    }}

    function speak(){
        var synth = window.speechSynthesis;
        var utterThis = new SpeechSynthesisUtterance(talk1);
        synth.speak(utterThis);
    }
    

