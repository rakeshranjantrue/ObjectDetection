Status = "";
bedroom_image = "";
objects = [];

function preload(){
    bedroom_image = loadImage("bedroom.jpg");
}

function setup(){
    canvas = createCanvas(900, 350);
    canvas.position(200, 200);
    object_Detector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function modelLoaded(){
    console.log("Model Loaded!");
    Status = true;
    object_Detector.detect(bedroom_image, gotResults);
}

function gotResults(error,results){
    if(error){
        console.error(error);
    }
    console.log(results);
    objects = results;
}

function draw(){
    image(bedroom_image, 0, 0, 900, 350);

    if(Status != "")
    {
        for (i = 0; i < objects.length; i++)
        {
            document.getElementById("status").innerHTML = "Status : Object Detected";

            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x - 100, objects[i].y - 200);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x - 100, objects[i].y - 200, objects[i].width, objects[i].height);
        }
    }
}