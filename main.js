video = ""
statusVar = "";
objects = []

function preload(){
    
}

function setup(){
    canvas = createCanvas(600, 420);
    canvas.center()
    video = createCapture(VIDEO)
    video.size(380, 380)
    video.hide()
    objectDetector = ml5.objectDetector("cocosd", modelLoaded)
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}
function draw(){
    image(video, 0, 0, 640, 420);

    if(statusVar != ""){
        r = random(255)
        g = random(255)
        b = random(255)
        objectDetector.detect(video, gotResult)
        for(i = 0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "Status: Object detected";
            document.getElementById("objectStatus").innerHTML = "Baby not found";
            if(objects[i].label == "person")
            {
                document.getElementById("objectStatus").innerHTML = "Baby found";
            }
            else{
                document.getElementById("objectStatus").innerHTML = "Baby not found"; 
            }
            fill(r, g, b)
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke(r, g, b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
        if(objects.length == 0){
            document.getElementById("objectStatus").innerHTML = "Baby not found"; 
        }
    }
}
function modelLoaded(){
    console.log("Model Loaded");
    statusVar = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}
function gotResult(error, results){
    if(error){
        console.log(error)
    }
    objects = results
    console.log(objects)
}
