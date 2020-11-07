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

function Testing(){

  var happyArray = ["Vine Compilations", "Meme compilation", "Bill nye compilation", "Cute animals", "Humans are amazing"];

  var sadArray = ["kittens playing", "puppies playing", "Bob Ross Compilations", "Please Dont be sad", "Cute animals"];

  var randomNumber = Math.floor(Math.random() * 5);

  var randomHappy = happyArray[randomNumber].toString();
  var randomSad = sadArray[randomNumber].toString();

  document.getElementById("search").value = randomHappy;
}

function checkOutcome(){

  var happyArray = ["Vine Compilations", "Meme compilation", "Bill nye compilation", "Cute animals", "Humans are amazing"];

  var sadArray = ["kittens playing", "puppies playing", "Bob Ross Compilations", "Please Dont be sad", "Cute animals"];

  var angryArray = ["Yoga", "Breathing Techniques", "Cute animals", "Bob Ross Compilations", "anger controll videos"];

  var surprisedArray = ["Humans are amazing", "Dude perfect", "Mr Beast", "Gamers are awesome", "Easter Egg compilations"];

  var disgustedArray = ["Odly Satisfying", "relaxing videos", "clear your mind", "satisfying", "cleaning tips"];

  var fearfulArray = ["Stress Relief", "Anxiety Relief", "Rain Sounds", "Yoga", "Calming exercises"];

  var randomNumber = Math.floor(Math.random() * 5);

  var randomHappy = happyArray[randomNumber].toString();
  var randomSad = sadArray[randomNumber].toString();
  var randomAngry = angryArray[randomNumber].toString();
  var randomSurprised = surprisedArray[randomNumber].toString();
  var randomDisgusted = disgustedArray[randomNumber].toString();
  var randomFearful = fearfulArray[randomNumber].toString();


  if(document.getElementById("det-emotion").textContent == "Happy"){
    document.getElementById("search").value = randomHappy;
  } else if(document.getElementById("det-emotion").textContent == "Sad"){
    document.getElementById("search").value = randomSad;
  } else if(document.getElementById("det-emotion").textContent == "Fearful"){
    document.getElementById("search").value = randomFearful;
  } else if(document.getElementById("det-emotion").textContent == "Disgusted"){
    document.getElementById("search").value = randomDisgusted;
  } else if(document.getElementById("det-emotion").textContent == "Angry"){
    document.getElementById("search").value = randomAngry;
  } else if(document.getElementById("det-emotion").textContent == "Surprised"){
    document.getElementById("search").value = randomSurprised;
  }

};

function checkOutcomeM(){

  var happyArrayM = ["Bob Marley music", "Queen music", "The Strokes music", "TOTO music", "Lil uzi vert music"];

  var sadArrayM = ["aries music", "nf music", "Juice wrld music", "Elliot smith music", "nothing nowhere music"];

  var angryArrayM = ["Blink 182 music", "Rage against the machine music", "Imortal technique music", "Slipknot music", "Rise Against music"];

  var surprisedArrayM = ["Death grips music", "Adele music", "Lil Yachty music", "Luther vandross music", "Megadeath music"];

  var disgustedArrayM = ["lofi music", "calming noises", "Duke ellignton music", "Sammy Davis Jr music", "Bob cosby music"];

  var fearfulArrayM = ["lofi music", "elijah who music", "Frank sinatra music", "Ella fitsgerald music", "The ink spots music"];

  var randomNumber = Math.floor(Math.random() * 5);

  var randomHappyM = happyArrayM[randomNumber].toString();
  var randomSadM = sadArrayM[randomNumber].toString();
  var randomAngryM = angryArrayM[randomNumber].toString();
  var randomSurprisedM = surprisedArrayM[randomNumber].toString();
  var randomDisgustedM = disgustedArrayM[randomNumber].toString();
  var randomFearfulM = fearfulArrayM[randomNumber].toString();

  if(document.getElementById("det-emotion").textContent == "Happy"){
    document.getElementById("Msearch").value = randomHappyM;
  } else if(document.getElementById("det-emotion").textContent == "Sad"){
    document.getElementById("Msearch").value = randomSadM;
  } else if(document.getElementById("det-emotion").textContent == "Fearful"){
    document.getElementById("Msearch").value = randomFearfulM;
  } else if(document.getElementById("det-emotion").textContent == "Disgusted"){
    document.getElementById("Msearch").value = randomDisgustedM;
  } else if(document.getElementById("det-emotion").textContent == "Angry"){
    document.getElementById("Msearch").value = randomAngryM;
  } else if(document.getElementById("det-emotion").textContent == "Surprised"){
    document.getElementById("Msearch").value = randomSurprisedM;
  } 

};

function submitForms(){
  document.getElementById("form").submit();
  document.getElementById("form").addEventListener("submit", function(event){
    event.preventDefault()
  });
  document.getElementById("Mform").submit();
  document.getElementById("Mform").addEventListener("submit", function(event){
    event.preventDefault()
  });
};








