leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
music = "";
scoreofleftwrist = 0;
scoreofrightwrist = 0;
song_1 = "";
song_2 = "";
music_2 = "";

function setup() {
    canvas = createCanvas(600, 550);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);

}

function preload() {
    music = loadSound("music.mp3");
    music_2 = loadSound("music2.mp3");
}

function draw() {
    image(video, 0, 0, 600, 550);
    song_1 = music.isPlaying();
    song_2 = music_2.isPlaying();
    if (scoreofrightwrist > 0.2) {
        circle(rightWristX, rightWristY, 25);
        fill("#FFFFFF");
        music_2.stop();
        if (music == false) {
            music.play();
        }
    }
    if (scoreofleftwrist > 0.2) {
        circle(leftWristX, leftWristY, 25);
        fill("#FFFFFF");
        music.stop();
        if (music_2 == false) {
            music_2.play();
        }
    }
}

function playsong() {
    music.play();
    song.setVolume(1);
    song.rate(1);
}

function modelLoaded() {
    console.log("MODEL IS LOADED");
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log(" leftWristX " + leftWristX + " leftWristY " + leftWristY);
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log(" RightW;ristX " + rightWristX + " RightWristY " + rightWristY);
        scoreofleftwrist = results[0].pose.keypoints[9].score;
        scoreofrightwrist = results[0].pose.keypoints[10].score;
    }
}