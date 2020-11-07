const video = document.getElementById("video");
let predictedAges = [];

Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
  faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
  faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
  faceapi.nets.faceExpressionNet.loadFromUri("/models"),
  faceapi.nets.ageGenderNet.loadFromUri("/models")
]).then(startVideo);

function startVideo() {
  navigator.getUserMedia(
    { video: {} },
    stream => (video.srcObject = stream),
    err => console.error(err)
  );
}

video.addEventListener("playing", () => {
  const canvas = faceapi.createCanvasFromMedia(video);
  document.getElementById("webcam-con").append(canvas);

  const displaySize = { width: video.width, height: video.height };
  faceapi.matchDimensions(canvas, displaySize);

  setInterval(async () => {
    const detections = await faceapi
      .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceExpressions()
      .withAgeAndGender();
    const resizedDetections = faceapi.resizeResults(detections, displaySize);

    console.log(detections[0].expressions);

    canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);

    faceapi.draw.drawDetections(canvas, resizedDetections);
    console
    faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
    faceapi.draw.drawFaceExpressions(canvas, resizedDetections);

    const age = resizedDetections[0].age;
    const interpolatedAge = interpolateAgePredictions(age);
    document.getElementById("det-age").textContent = `${faceapi.utils.round(interpolatedAge, 0)} years`;

    const bottomRight = {
      x: resizedDetections[0].detection.box.bottomRight.x - 50,
      y: resizedDetections[0].detection.box.bottomRight.y
    };

    new faceapi.draw.DrawTextField(
      [`${faceapi.utils.round(interpolatedAge, 0)} years`],
      bottomRight
    ).draw(canvas);
  }, 100);
});

function interpolateAgePredictions(age) {
  predictedAges = [age].concat(predictedAges).slice(0, 30);
  const avgPredictedAge =
    predictedAges.reduce((total, a) => total + a) / predictedAges.length;
  return avgPredictedAge;
};


function checkOutcome(){

  var happyArray = ["Vine Compilations", "Meme compilation", "Bill nye compilation", "Cute animals", "Humans are amazing"];
  var randomHappy = Math.floor(Math.random()*happyArray.length);

  var sadArray = ["kittens playing", "puppies playing", "Bob Ross Compilations", "Please Dont be sad", "Cute animals"];
  var randomSad = Math.floor(Math.random()*sadArray.length);

  var angryArray = ["Yoga", "Breathing Techniques", "Cute animals", "Bob Ross Compilations", "anger controll videos"];
  var randomAngry = Math.floor(Math.random()*angryArray.length);

  var surprisedArray = ["Humans are amazing", "Dude perfect", "Mr Beast", "Gamers are awesome", "Easter Egg compilations"];
  var randomSurprised = Math.floor(Math.random()*surprisedArray.length);

  var disgustedArray = ["Odly Satisfying", "relaxing videos", "clear your mind"];
  var randomDisgusted = Math.floor(Math.random()*disgustedArray.length);

  var fearfulArray = ["Stress Relief", "Anxiety Relief", "Rain Sounds", "Yoga", "Calming exercises"];
  var randomFearful = Math.floor(Math.random()*fearfulArray.length);


  if(document.getElementById("det-emotion").textContent == "Happy"){
    console.log(randomHappy, happyArray[randomHappy]);
  } else if(document.getElementById("det-emotion").textContent == "Sad"){
    console.log(randomSad, sadArray[randomSad]);
  } else if(document.getElementById("det-emotion").textContent == "Fearful"){
    console.log(randomFearful, fearfulArray[randomFearful]);
  } else if(document.getElementById("det-emotion").textContent == "Disgusted"){
    console.log(randomDisgusted, disgustedArray[randomDisgusted]);
  } else if(document.getElementById("det-emotion").textContent == "Angry"){
    console.log(randomAngry, angryArray[randomAngry]);
  } else if(document.getElementById("det-emotion").textContent == "Surprised"){
    console.log(randomSurprised, surprisedArray[randomSurprised]);
  }
};

function checkOutcomeM(){

  var happyArrayM = ["Vine Compilations", "Meme compilation", "Bill nye compilation", "Cute animals", "Humans are amazing"];
  var randomHappyM = Math.floor(Math.random()*happyArrayM.length);

  var sadArrayM = ["kittens playing", "puppies playing", "Bob Ross Compilations", "Please Dont be sad", "Cute animals"];
  var randomSadM = Math.floor(Math.random()*sadArrayM.length);

  var angryArrayM = ["Yoga", "Breathing Techniques", "Cute animals", "Bob Ross Compilations", "anger controll videos"];
  var randomAngryM = Math.floor(Math.random()*angryArrayM.length);

  var surprisedArrayM = ["Humans are amazing", "Dude perfect", "Mr Beast", "Gamers are awesome", "Easter Egg compilations"];
  var randomSurprisedM = Math.floor(Math.random()*surprisedArrayM.length);

  var disgustedArrayM = ["Odly Satisfying", "relaxing videos", "clear your mind"];
  var randomDisgustedM = Math.floor(Math.random()*disgustedArrayM.length);

  var fearfulArrayM = ["Stress Relief", "Anxiety Relief", "Rain Sounds", "Yoga", "Calming exercises"];
  var randomFearfulM = Math.floor(Math.random()*fearfulArrayM.length);

  if(document.getElementById("det-emotion").textContent == "Happy"){
    console.log(randomHappyM, happyArrayM[randomHappyM]);
  } else if(document.getElementById("det-emotion").textContent == "Sad"){
    console.log(randomSadM, sadArrayM[randomSadM]);
  } else if(document.getElementById("det-emotion").textContent == "Fearful"){
    console.log(randomFearfulM, fearfulArrayM[randomFearfulM]);
  } else if(document.getElementById("det-emotion").textContent == "Disgusted"){
    console.log(randomDisgustedM, disgustedArrayM[randomDisgustedM]);
  } else if(document.getElementById("det-emotion").textContent == "Angry"){
    console.log(randomAngryM, angryArrayM[randomAngryM]);
  } else if(document.getElementById("det-emotion").textContent == "Surprised"){
    console.log(randomSurprisedM, surprisedArrayM[randomSurprisedM]);
  }

};

function checkOutcomeE(){

  const months = ["January", "February", "March", "April", "May", "June", "July"];

  const random = Math.floor(Math.random() * months.length);

  if(document.getElementById("det-emotion").textContent == "Happy"){
    console.log(random, months[random]);
  } else if(document.getElementById("det-emotion").textContent == "Sad"){
    console.log(randomSad);
  } else if(document.getElementById("det-emotion").textContent == "Fearful"){
    console.log(randomFearful);
  } else if(document.getElementById("det-emotion").textContent == "Disgusted"){
    console.log(randomDisgusted);
  } else if(document.getElementById("det-emotion").textContent == "Angry"){
    console.log(randomAngry);
  } else if(document.getElementById("det-emotion").textContent == "Surprised"){
    console.log(randomSurprised);
  }
};




