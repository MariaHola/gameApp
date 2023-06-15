window.onload = function() {
    var alphabet = [
      "a","ą","b","c","ć","d","e","ę","f","g","h","i","j","k","l","ł","m","n","o","ó","p","q","r","s","ś","t","u","v","w","x","y","z","ź","ż"
    ];
  
    var categories; 
    var chosenCategory; 
    var word; 
    var guess; 
    var geusses = []; 
    var lives; 
    var counter; 
    var space; 
  
    
    var showLives = document.getElementById("mylives");
    console.log(showLives); 
    var showCatagory = document.getElementById("scatagory");
  
    var buttons = function() {
      myButtons = document.getElementById("buttons");
      letters = document.createElement("ul");
  
      for (var i = 0; i < alphabet.length; i++) {
        letters.id = "alphabet";
        list = document.createElement("li");
        list.id = "letter";
        list.innerHTML = alphabet[i];
        check();
        myButtons.appendChild(letters);
        letters.appendChild(list);
      }
    };
  
    var selectCat = function() {
      if (chosenCategory === categories[0]) {
        catagoryName.innerHTML =
          "Kategoria: Miasta";
      } else if (chosenCategory === categories[1]) {
        catagoryName.innerHTML = "Kategoria: Polskie potrawy";
      } else if (chosenCategory === categories[2]) {
        catagoryName.innerHTML = "Kategoria: Rośliny";
      }
    };
  
    
    result = function() {
      wordHolder = document.getElementById("hold");
      correct = document.createElement("ul");
  
      for (var i = 0; i < word.length; i++) {
        correct.setAttribute("id", "my-word");
        guess = document.createElement("li");
        guess.setAttribute("class", "guess");
        if (word[i] === "-") {
          guess.innerHTML = "-";
          space = 1;
        } else {
          guess.innerHTML = "_";
        }
  
        geusses.push(guess);
        wordHolder.appendChild(correct);
        correct.appendChild(guess);
      }
    };
  
    // Show lives
    comments = function() {
      showLives.innerHTML = "Pozostało Ci " + lives + " prób.";
      if (lives < 1) {
        showLives.innerHTML = "Ale z Ciebie Bambik...";
      }
      for (var i = 0; i < geusses.length; i++) {
        if (counter + space === geusses.length) {
          showLives.innerHTML = "Wygrana!";
        }
      }
    };
  
    
    var animate = function() {
      var drawMe = lives;
      drawArray[drawMe]();
    };
  
   
    canvas = function() {
      myStickman = document.getElementById("stickman");
      context = myStickman.getContext("2d");
      context.beginPath();
      context.strokeStyle = "#fff";
      context.lineWidth = 2;
    };
  
    head = function() {
      myStickman = document.getElementById("stickman");
      context = myStickman.getContext("2d");
      context.beginPath();
      context.arc(60, 25, 10, 0, Math.PI * 2, true);
      context.stroke();
    };
  
    draw = function($pathFromx, $pathFromy, $pathTox, $pathToy) {
      context.moveTo($pathFromx, $pathFromy);
      context.lineTo($pathTox, $pathToy);
      context.stroke();
    };
  
    frame1 = function() {
      draw(0, 150, 150, 150);
    };
  
    frame2 = function() {
      draw(10, 0, 10, 600);
    };
  
    frame3 = function() {
      draw(0, 5, 70, 5);
    };
  
    frame4 = function() {
      draw(60, 5, 60, 15);
    };
  
    torso = function() {
      draw(60, 36, 60, 70);
    };
  
    rightArm = function() {
      draw(60, 46, 100, 50);
    };
  
    leftArm = function() {
      draw(60, 46, 20, 50);
    };
  
    rightLeg = function() {
      draw(60, 70, 100, 100);
    };
  
    leftLeg = function() {
      draw(60, 70, 20, 100);
    };
  
    drawArray = [
      rightLeg,
      leftLeg,
      rightArm,
      leftArm,
      torso,
      head,
      frame4,
      frame3,
      frame2,
      frame1
    ];
  

    check = function() {
      list.onclick = function() {
        var geuss = this.innerHTML;
        this.setAttribute("class", "active");
        this.onclick = null;
        for (var i = 0; i < word.length; i++) {
          if (word[i] === geuss) {
            geusses[i].innerHTML = geuss;
            counter += 1;
            console.log(1);
          }
        }
        var j = word.indexOf(geuss);
        if (j === -1) {
          lives -= 1;
          comments();
          animate();
        } else {
          comments();
        }
      };
    };
  
  
    play = function() {
      categories = [
        [
          "zabrze",
          "gdańsk",
          "warszawa",
          "poznań",
          "opole",
          "łódź",
          "kraków",
          "gdynia",
          "szczecin",
          "katowice",
          "wejcherowo"
        ],
        ["krupnik", "kluski-śląskie", "szczawiowa", "kaszanka", "chłodnik"],
        ["tulipan", "bez", "mlecz", "róża", "bluszcz"]
      ];
  
      chosenCategory = categories[Math.floor(Math.random() * categories.length)];
      word = chosenCategory[Math.floor(Math.random() * chosenCategory.length)];
      word = word.replace(/\s/g, "-");
      console.log(word);
      buttons();
  
      geusses = [];
      lives = 10;
      counter = 0;
      space = 0;
      result();
      comments();
      selectCat();
      canvas();
    };
  
    play();
  
  
    document.getElementById("reset").onclick = function() {
      correct.parentNode.removeChild(correct);
      letters.parentNode.removeChild(letters);
      context.clearRect(0, 0, 400, 400);
      play();
    };
  };