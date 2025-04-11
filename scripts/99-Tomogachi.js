 /*LOADING BELOW*/
 let saveFile = JSON.parse(localStorage.getItem(`activeSaveFile`));

 let isPaused = JSON.parse(localStorage.getItem(`${saveFile}isPaused?`)) || true
 let statArray = JSON.parse(localStorage.getItem(`${saveFile}stats`)) || {
   weight: 5,
   happiness: 5,
   health: 5,
   energy: 5,
   hunger: 5,
 };
 
 let causeOfDeath = JSON.parse(localStorage.getItem(`causeOfDeath`)) || ''
 let ReportEducation = JSON.parse(localStorage.getItem(`ReportEducation`)) || '1st'
 let LastWords = JSON.parse(localStorage.getItem(`LastWords`)) || `Don't Remember`

 let sleepyScore = (statArray.energy * 2);
 let hungerScore = 20;
 
 let time = JSON.parse(localStorage.getItem(`${saveFile}time`)) || {
   seconds: 59,
   minutes: 9,
 };
 
 
 let nameVariable = JSON.parse(localStorage.getItem(`${saveFile}name`)) || `Unnamed Pet`;
 
 let catColor = JSON.parse(localStorage.getItem(`${saveFile}breedSaved`))
 console.log(catColor);
 /* TIMER BELOW*/

 if (!localStorage.getItem(`${saveFile}buttonTime`)) {
  localStorage.setItem(`${saveFile}buttonTime`, JSON.stringify({
    walk: 0, play: 0, doctor: 0, train: 0, meal: 0, treat: 0
  }));
}
 
function buttonCounter(activity) {
  if (canPressButton(activity)) {
    const saveKey = `${saveFile}buttonTime`;

    // Load latest saved timers
    let storedButtonTime = JSON.parse(localStorage.getItem(saveKey)) || {
      walk: 0, play: 0, doctor: 0, train: 0, meal: 0, treat: 0
    };

    storedButtonTime[activity] = 1;
    localStorage.setItem(saveKey, JSON.stringify(storedButtonTime));

    let cooldown = setInterval(() => {
      let currentButtonTime = JSON.parse(localStorage.getItem(saveKey)) || {};

      if (currentButtonTime[activity] > 0) {
        currentButtonTime[activity]--;
        localStorage.setItem(saveKey, JSON.stringify(currentButtonTime));
      } else {
        clearInterval(cooldown);
      }
    }, 10000);
  }
}
 
function canPressButton(activity) {
  let currentButtonTime = JSON.parse(localStorage.getItem(`${saveFile}buttonTime`)) || {};
  return !currentButtonTime[activity] || currentButtonTime[activity] === 0;
}

 setInterval(function() {
   if (isHeDead === false) {
  countSecondDown('interval')};
 }, 1000);
 setInterval(function() {
   if (isHeDead === false) {
     updateTimer('interval')};
  }, 1000);
 

 function countSecondDown() {
   if (time.seconds > 0 && isPaused === false) {
     time.seconds = time.seconds - 1

 
     // This is the sleepy time
     if (sleepyScore > 0) {
     sleepyScore = sleepyScore - 1;
    } else if (sleepyScore === 0 && isHeSleepy === false) {
     isHeSleepy = true
     } else {
       asleep();
       }

   //Hunger
   if (isHeHungry === true && hungerScore > 1) {
     hungerScore = hungerScore - 1;
    } else if (isHeHungry === true && hungerScore <= 1) {
     isHeStarving = true
     document.querySelector('.js-hunger')
     .innerHTML = `I am starving!`;
     }
  
    } else if (time.seconds === 0 && isPaused === false) {
      time.seconds = 59;
      time.minutes = time.minutes - 1;

      if (time.minutes < 0) {
        causeOfDeath = "Natural Causes"
      localStorage.setItem(`causeOfDeath`, JSON.stringify(causeOfDeath));

         gameOverOne();
       } 
    }   

 
 }
 
 
 function updateTimer() {
   if (time.seconds >= 10 && isPaused === false) {
   document.querySelector('.js-timer')
     .innerHTML = `Time: ${time.minutes}.${time.seconds}`;
   } else if (time.seconds <= 9 && isPaused === false) {
     document.querySelector('.js-timer')
     .innerHTML = `Time: ${time.minutes}.0${time.seconds}`;
   }
 
 
 };
 
 
 /* STATS BELOW */
 function awaken() {
   sleepyScore = (statArray.energy * 2);
   isHeSleepy = false
 
   document.querySelector('.zzz-display').innerHTML = ``;
 }
 
 
 function asleep() {
   statArray.health = statArray.health + 1/10;
   statArray.energy = statArray.energy + 1;
   statArray.hunger = statArray.hunger + 1/5;
 
   updateStats();
   shiftSentences();

   let dialogueChoice = Math.random();

   if (dialogueChoice > 0 && dialogueChoice < 1/3) {
    snoring = '>Hachoo...'
   } else if (dialogueChoice > 1/3 && dialogueChoice < 2/3) {
    snoring = '>MeeMeeMee...'
   } else if (dialogueChoice > 2/3 && dialogueChoice < 1)  {
    snoring = '>Zzz...'
   }

  lineOne = `${snoring}`
  document.querySelector('.dialogue-1').innerHTML = `${lineOne}`;
  document.querySelector('.dialogue-2').innerHTML = `${lineTwo}`;
  document.querySelector('.dialogue-3').innerHTML = `${lineThree}`;
  document.querySelector('.dialogue-4').innerHTML = `${lineFour}`;
  document.querySelector('.dialogue-5').innerHTML = `${lineFive}`;
  document.querySelector('.dialogue-6').innerHTML = `${lineSix}`; 

  document.querySelector('.zzz-display').innerHTML = `Zzzz`;
  document.querySelector('.cat-eyes').innerHTML = `<img class="cat-top-eyes-game" src="images/Cat Parts/Cat-tamagatchi-sleep-eyes.png">`;
}

/// lets have a break

 let isHeDead = false
 let isHeSleepy = false
 let isHeHungry = false
 let isHeStarving = false 
 let isHeSick = false
 let isHeDrained = false
 let isHeDepressed = false
 isHeOverweight = false

 let grade = 0
 let graduated = false
 let didHeTrain = false

 let isDropDownVisiable = false
/* let proppellerHatAchievement = false
 let cowboyAchievement = false
 let graduatedAchievement = false */

  let lineOne = ''
  let lineTwo = ''
  let lineThree = ''
  let lineFour = '' 
  let lineFive = ''
  let lineSix = ''

  let breedColor = ''

  ///break time over, time to talk !

function dialogue() {
  shiftSentences();

  let sleepPrompt = ''
  let hungerPrompt = ''
  let sickPrompt = ''
  let drainedPrompt = ''
  let educationPrompt = ''
  let randomPrompt = ''
if (isHeDepressed === false) {
    // sleep
    if (sleepyScore <= 10 && sleepyScore > 0) {
      sleepPrompt = `I was about to fall asleep...`
    } else if (sleepyScore <= 0) {
      sleepPrompt = 'you woke me up...'
    } else {
    sleepPrompt = ''
    }
    //hunger
    if (statArray.hunger > 5) {
      hungerPrompt = `Im a little hungry`
    } else if (isHeHungry === true || isHeStarving === true) {
      hungerPrompt = `I NEED to eat!`
    } else {
      hungerPrompt = ''
    }
    // sick
    if (isHeSick === true) {
      sickPrompt = `I don't feel too good...`
    } else {
      sickPrompt = ''
    }
    // drained
    if (isHeDrained === true) {
      drainedPrompt = `I'm kinda worn out...`
    } else {
      drainedPrompt = ''
    }
    // education
    if (grade === 1 && graduated === true && didHeTrain === true) {
      educationPrompt = `I'm Potty Trained OMG !!`
    } else if (grade === 2 && graduated === true && didHeTrain === true) {
      educationPrompt = `In School I Learned To Understand Commands!!` 
    } else if (grade === 3 && graduated === true && didHeTrain === true) {
      educationPrompt = `I Can Read Now!`
    } else if (grade === 4 && graduated === true && didHeTrain === true) {
      educationPrompt = `Just Gratuated Middle-School!`
    } else if (grade === 5 && graduated === true && didHeTrain === true) {
      educationPrompt = `I Just Gratuated High-School. How The Years Fly By...`
    } else if (grade === 6 && graduated === true && didHeTrain === true) {
      educationPrompt = `I Finally Got My Degree In Computer Science`
    } else if (grade === 7 && graduated === true && didHeTrain === true) {
      educationPrompt = `I know... wait this can't be true.`
    } else if (grade === 8 && graduated === true && didHeTrain === true) {
      educationPrompt = `I know... that I'm just a little thing inside your screen...`
    } else if (graduated === false && didHeTrain === true) {
      educationPrompt = `Studying is hard... Sorry.`
    } else if (didHeTrain === false) {
      educationPrompt = ''
    }

      lineOne = `> ${sleepPrompt} ${hungerPrompt} ${sickPrompt} ${drainedPrompt} ${educationPrompt}`

      if (lineOne === '>     ') {

        
        let randomThoughts = Math.random();
        console.log(randomThoughts);

        if (randomThoughts < 1/6) {
          randomPrompt = 'Would it be good if you were always happy? That would be nice, but at a certain point wouldnt you be missing key parts of life and growth?'
        } else if (randomThoughts > 1/6 && randomThoughts < 2/6 ) {
          randomPrompt = 'Is having personality even a thing you can have?'
        } else if (randomThoughts > 2/6 && randomThoughts < 3/6 ) {
          randomPrompt = "Wanna see me go around the earth and back? Wanna see me do it again?"
        } else if (randomThoughts > 3/6 && randomThoughts < 4/6 ) { 
          randomPrompt = "I wanna do more!"
        } else if (randomThoughts > 4/6 && randomThoughts < 5/6 ) {
          randomPrompt = "I have so much fun with you!"
        } else if (randomThoughts > 5/6 && randomThoughts < 1 ) {
          randomPrompt = 'I just burped !'
        } 
        lineOne = `>${randomPrompt}`
      }
  

  } else {
    let Depression = ''
    let randomSad = Math.random();

    if (randomSad < 1/4) {
      Depression = 'Ugh, Im so sad...'
    } else if (randomSad > 1/4 && randomSad < 2/4) {
      Depression = "I don't want to talk right now..."
    } else if (randomSad > 2/4 && randomSad < 3/4) {
      Depression = 'I wish SOMEONE would play with me...'
    } else if (randomSad > 3/4 && randomSad < 1) {
      Depression = "You wouldn't even understand, mom..."
}
  lineOne = `${Depression}`
  }
  

 document.querySelector('.dialogue-1').innerHTML = `${lineOne}`;
 document.querySelector('.dialogue-2').innerHTML = `${lineTwo}`;
 document.querySelector('.dialogue-3').innerHTML = `${lineThree}`;
 document.querySelector('.dialogue-4').innerHTML = `${lineFour}`;
 document.querySelector('.dialogue-5').innerHTML = `${lineFive}`;
 document.querySelector('.dialogue-6').innerHTML = `${lineSix}`;

 localStorage.setItem(`LastWords`, JSON.stringify(lineOne));
 

 console.log(lineOne)
}

function shiftSentences() {
  lineTwo = document.querySelector('.dialogue-1').innerHTML;
  lineThree = document.querySelector('.dialogue-2').innerHTML;
  lineFour = document.querySelector('.dialogue-3').innerHTML;
  lineFive = document.querySelector('.dialogue-4').innerHTML;
  lineSix = document.querySelector('.dialogue-5').innerHTML;
}


 ///                            UPDATE STATES !!!!! 

 function updateStats() {

 // starving!!
 if (statArray.hunger >= 10) {
  document.querySelector('.js-hunger').innerHTML = `I'm Hungry!!`;
  isHeHungry = true;
  statArray.weight = statArray.weight - 1;
  statArray.happiness = statArray.happiness - 1;
}; 
///
if (isHeStarving === true) {
  statArray.weight = statArray.weight - 1;
  statArray.happiness = statArray.happiness - 1;
  statArray.health = statArray.health - 1;

  document.querySelector('.js-hunger')
  .innerHTML = `I am starving!`;

};
///
if (statArray.hunger < 10) {
  isHeHungry = false;
  isHeStarving = false;
  hungerScore = 20;
};
///
if (statArray.hunger === 0) {
 document.querySelector('.js-hunger')
 .innerHTML = `My tummy is full!`;
} else if (statArray.hunger > 0 && statArray.hunger < 10) {
document.querySelector('.js-hunger')
 .innerHTML = ``;
}
// health
if (statArray.health < 5) {
  isHeSick = true
} else if (statArray.health > 5) {
  isHeSick = false
}
// energy
if (statArray.energy < 5) {
  isHeDrained = true
} else if (statArray.energy > 5) {
  isHeDrained = false
}
// sad
if (statArray.happiness < 5) {
  isHeDepressed = true
} else if (statArray.happiness >= 5) {
  isHeDepressed = false
}
// overwight
if (statArray.weight > 10) {
  isHeOverweight = true
} else if (statArray.happiness < 10) {
  isHeOverweight = false
}
 
// achievements 
/*
 if (statArray.happiness === 10) {
  proppellerHatAchievement = true
 }
 if (statArray.health === 1) {
  cowboyAchievement = true
 }
 if (grade >= 6) {
  graduatedAchievement = true
 }
achievementGet();
*/
 /// no negative numbers!!
       if (statArray.weight < 0) {
         statArray.weight = 0
       }
       if (statArray.happiness < 0) {
         statArray.happiness = 0
       }
       if (statArray.health < 0) {
         statArray.health = 0
       }
       if (statArray.energy < 0) {
         statArray.energy = 0
       }
       if (statArray.hunger < 0) {
         statArray.hunger = 0
       }
       
 
 /// Stat cap
 
 if (statArray.happiness > 10) {
   statArray.happiness = 10
 }
 if (statArray.health > 10) {
   statArray.health = 10
 }
 if (statArray.energy > 10) {
   statArray.energy = 10
 }
 if (statArray.hunger > 10) {
   statArray.hunger = 10
 }
 if (statArray.weight > 20) {
   statArray.weight = 20
 }
 
     //creating fake //=
 
     /// actual shit DELETE THE DOCUMENT BY SHOWTIME [param, where, statName, finalBar, extra, zero] Zero is the 0 bar, and extra is the extras locations.
     document.querySelector('.js-stats')
 
 
     .innerHTML = `Weight: ${Math.round(statArray.weight)} Happiness: ${Math.round(statArray.happiness)} Health: ${Math.round(statArray.health)} Energy: ${Math.round(statArray.energy)} Hunger: ${Math.round(statArray.hunger)}`;

     displayBarStats((time.minutes + 1), `.js-minutes-bar`, 'minutes', `fix`, `.Blank`, `<img class="image-bar" src="images/Bar practice.png"></img>`)
 
     displayBarStats(statArray.health, `.js-health-bar`, 'health', `fix`, `.Blank`, `<img class="image-bar" src="images/Bar practice.png"></img>`)
 
     displayBarStats(statArray.happiness, `.js-happy-bar`, 'happy', `fix`, `.Blank`, `<img class="image-bar" src="images/Bar practice.png"></img>`)
 
     displayBarStats(statArray.energy, `.js-energy-bar`, 'energy', `fix`, `.Blank`, `<img class="image-bar" src="images/Bar practice.png"></img>`)
 
     displayBarStats(statArray.hunger, `.js-hunger-bar`, 'hunger', `<img class="image-bar" src="images/Bar practice.png"></img>`, `.Blank`, `<img class="image-bar" src="images/Bars/hungerBar (0).png"></img>`)
 
     displayBarStats(statArray.weight, `.js-weight-bar`, 'weight', `<img class="image-bar" src="images/Bars/weightBar-Overload.png">`, `.js-weight-extra`, `<img class="images/Bars/hungerBar (9).png"></img> `)
    
     /// This is where we save shit
     localStorage.setItem(`${saveFile}stats`, JSON.stringify(statArray));
     localStorage.setItem(`${saveFile}name`, JSON.stringify(nameVariable));
 
   if (statArray.weight <= 10) {
     document.querySelector(`.js-weight-extra`).innerHTML = ``
   }
 
     if (statArray.weight === 0) {
      causeOfDeath = "Malnutrition"
      localStorage.setItem(`causeOfDeath`, JSON.stringify(causeOfDeath));

       gameOverOne();
     }
     if (statArray.health === 0) {
      causeOfDeath = "Terminal Illness"
      localStorage.setItem(`causeOfDeath`, JSON.stringify(causeOfDeath));

       gameOverOne();
     }
     
     document.querySelector('.name-display').innerHTML = `${nameVariable}`

     expressions();
   };

   function coolDownButton(where, textVariable) {
    if (isPaused === false) {
    document.querySelector(where).innerHTML = `<img class="cool-down-icon" src="images/cool-down.gif"></img>`

    setTimeout(function() {
      document.querySelector(where).innerHTML = `${textVariable}`
    }, 10000);
    }
   }
 
 
 function displayBarStats(param, where, statName, finalBar, extra, zero) {
 
   if (param === 0) {
     document.querySelector(where).innerHTML = `${zero}`
   } else if (param > 0 && param <= 1) {
     document.querySelector(where).innerHTML = `<img class="image-bar" src="images/Bars/${statName}Bar.png">`
   } else if (param > 1 && param <= 2) {
 document.querySelector(where).innerHTML = `<img class="image-bar" src="images/Bars/${statName}Bar (1).png">`
   } else if (param > 2 && param <= 3) {
 document.querySelector(where).innerHTML = `<img class="image-bar" src="images/Bars/${statName}Bar (2).png">`
   } else if (param > 3 && param <= 4) {
 document.querySelector(where).innerHTML = `<img class="image-bar" src="images/Bars/${statName}Bar (3).png">`
   } else if (param > 4 && param <= 5) {
 document.querySelector(where).innerHTML = `<img class="image-bar" src="images/Bars/${statName}Bar (4).png">`
   } else if (param > 5 && param <= 6) {
 document.querySelector(where).innerHTML = `<img class="image-bar" src="images/Bars/${statName}Bar (5).png">`
   } else if (param > 6 && param <= 7) {
 document.querySelector(where).innerHTML = `<img class="image-bar" src="images/Bars/${statName}Bar (6).png">`
   } else if (param > 7 && param <= 8) {
 document.querySelector(where).innerHTML = `<img class="image-bar" src="images/Bars/${statName}Bar (7).png">`
   } else if (param > 8 && param <= 9) {
 document.querySelector(where).innerHTML = `<img class="image-bar" src="images/Bars/${statName}Bar (8).png">`
   } else if (param > 9 && param <= 10) {
 document.querySelector(where).innerHTML = `<img class="image-bar" src="images/Bars/${statName}Bar (9).png">`
   } else {
 document.querySelector(where).innerHTML = `${finalBar}`
 document.querySelector(extra).innerHTML = `+${param - 10}lb Overweight`
   }
 };
/*
  function achievementGet() {
    if (cowboyAchievement === true) {
      document.getElementById("drop-down-move-four").style.top = "-1000px";
    } 
    if (proppellerHatAchievement === true) {
      document.getElementById("drop-down-move-three").style.top = "-1000px";
    }
    if (graduatedAchievement === true) {
      document.getElementById("drop-down-move-five").style.top = "-1000px";
    }
  }
*/
  let DidHeStart = false
 
   function pausing() {
     document.getElementById("Start-Game-Button").style.position = "absolute";
     document.getElementById("Start-Game-Button").style.left = "60px";
     document.getElementById("Start-Game-Button").style.top = "10px";
     document.getElementById("Start-Game-Button").style.width = "75px";
     document.getElementById("Start-Game-Button").style.height = "50px";
     document.getElementById("Start-Game-Button").style.borderRadius = "20px";
     document.getElementById("Start-Game-Button").style.borderColor = "black";
     document.getElementById("Start-Game-Button").style.color = "black";
     document.getElementById("Start-Game-Button").style.backgroundColor = "white";
     document.getElementById("Start-Game-Button").style.cursor = "pointer";
     document.getElementById("Start-Game-Button").style.fontSize = "10px";
 
     if (isPaused === false) {
        isPaused = true
        document.getElementById('Start-Game-Button')
        .innerHTML = "Resume"
     } else if (isPaused === true) {
        isPaused = false
        document.getElementById('Start-Game-Button')
        .innerHTML = "Pause"
     }
    
     if (DidHeStart === false && isHeDrained === false) {
     changeCatColor(`${catColor}`, '.cat-body', '.cat-ears', '-game')
     console.log(catColor)
     DidHeStart = true
    }  else if (DidHeStart === false && isHeDrained === true) {
      changeCatColor(`${catColor}`, '.cat-body', '.cat-ears', '-game')
     console.log(catColor)
     DidHeStart = true

     document.querySelector('.cat-ears').innerHTML = `<img class="cat-top-ears-drained" src="images/Cat Parts/${catColor}-sick-ears-cat.png">`;
    
    document.getElementById('cat-ears-ID').style.left = '44.3%'
    document.getElementById('cat-ears-ID').style.top = '49%'
    }
   }
 
   /*misc*/
  
function expressions() {
/* DEFAUFT STUFF
<div class="cat-ears"><img class="cat-top-ears" src="images/Cat Parts/Cat-tamagatchi-default-ears.png"></div>
  <div class="cat-eyes"><img class="cat-top-eyes" src="images/Cat Parts/Cat-tamagatchi-default-eyes.png"></div>
  <div class="cat-mouth"><img class="cat-top-mouth" src="images/Cat Parts/Cat-tamagatchi-default-mouth.png"></div>
*/
  if (isHeDepressed === true) {
    //eyes
    document.querySelector('.cat-eyes').innerHTML = `<img class="cat-top-eyes-game" src="images/Cat Parts/Cat-tamagatchi-sad-eyes.png">`;
    //mouth
    document.querySelector('.cat-mouth').innerHTML = `<img class="cat-top-mouth-sad" src="images/Cat Parts/Cat-tamagatchi-sad-mouth.png">`;
  } else if (isHeDepressed === false) {
     //eyes
     document.querySelector('.cat-eyes').innerHTML = `<img class="cat-top-eyes-game" src="images/Cat Parts/Cat-tamagatchi-default-eyes.png">`;
     //mouth
     document.querySelector('.cat-mouth').innerHTML = `<img class="cat-top-mouth-game" src="images/Cat Parts/Cat-tamagatchi-default-mouth.png">`;
  }

  if (isHeDrained === true) {
    document.querySelector('.cat-ears').innerHTML = `<img class="cat-top-ears-drained" src="images/Cat Parts/${catColor}-sick-ears-cat.png">`;
    
    document.getElementById('cat-ears-ID').style.left = '44.3%'
    document.getElementById('cat-ears-ID').style.top = '49%'
  } else if (isHeDrained === false) {
    document.querySelector('.cat-ears').innerHTML = `<img class="cat-top-ears-game" src="images/Cat Parts/${catColor}-ears-cat.png">`;

    document.getElementById('cat-ears-ID').style.left = '45%'
    document.getElementById('cat-ears-ID').style.top = '47.5%'
  }

  if (isHeHungry === true) {
    document.querySelector('.cat-drool').innerHTML = `<img class="cat-top-drool" src="images/Cat Parts/Cat-tamagatchi-drool.png">`;
  } else if (isHeHungry === false) {
    document.querySelector('.cat-drool').innerHTML = ``;
  }

  if (isHeSick === true) {
    document.querySelector('.sick-display').innerHTML = `<img class="cat-top-sick" src="images/Cat Parts/Cat-tamagatchi-sick.png"></img>`;
  } else if (isHeHungry === false) {
    document.querySelector('.sick-display').innerHTML = ``;
  }
}

   updateStats(); 

   function naming() {
     const inputElement = document.querySelector('.js-name-input');
     nameVariable = inputElement.value; // Remove 'var' to make it update the global variable

     document.querySelector('.name-display-start').innerHTML = `${nameVariable}`;
     localStorage.setItem('petName', JSON.stringify(nameVariable)); // Save the pet's name
     localStorage.setItem(`${saveFile}name`, JSON.stringify(nameVariable));
   }
 
  function keyDownEnterName(event) {
     if (event.key === 'Enter') {
       naming();
     }
   }
 
   function putOnHat(hatVariable, classVariable) {
    document.querySelector('.hat-display').innerHTML = `<img class="${classVariable}" src="${hatVariable}">`
   }
   function takeHatOff() {
    document.querySelector('.hat-display').innerHTML = ``
   }
   function dropDownHat() {
    if (isDropDownVisiable === false) {
      document.getElementById('drop-down-move').style.left = '68.2%'
      document.getElementById('drop-down-move-two').style.left = '68.8%'
      document.getElementById('drop-down-move-three').style.left = '68.8%'
      document.getElementById('drop-down-move-four').style.left = '68.8%'
      document.getElementById('drop-down-move-five').style.left = '68.8%'

      isDropDownVisiable = true
    } else if (isDropDownVisiable === true) {
      //<div class="hat-drop-down" id="drop-down-move"></div>
//<div class="flex-container-hat" id="drop-down-move-two"></div>
      document.getElementById('drop-down-move').style.left = '-1000px'
      document.getElementById('drop-down-move-two').style.left = '-1000px'
      document.getElementById('drop-down-move-three').style.left = '-1000px'
      document.getElementById('drop-down-move-four').style.left = '-1000px'
      document.getElementById('drop-down-move-five').style.left = '-1000px'
      isDropDownVisiable = false
    }
   }

   function playTruckGif() {
    document.querySelector('.layout-five').innerHTML = `<img id="layout-img" src="images/backgrounds/Background-driving-ezgif.com-speed.gif">`
   }

   /*
   function replaceHTMLShortCut(what, replacement) {
    document.querySelector(`.${what}`).innerHTML = replacement
   }
   */
   function moveObjectShortCut(What, wherePut) {
    let isMoved = false

    if (isMoved === false) {
      document.getElementById(What).style.left = wherePut
      isMoved = true
    } else if (isDropDownVisiable === true) {
      document.getElementById(What).style.left = '-1000px'
      isMoved = false
    }
    return isMoved;
   }

   function getDeathReport() {
    
    document.querySelector('.deathReport').innerHTML = `
    Name: ${nameVariable} <br>
    Cause Of Death: ${causeOfDeath} <br> Breed: ${catColor} <br>
    Last Words: "${LastWords}" <br>
    Education: ${ReportEducation} <br>
    Cost For Replacement: negative 10$ thanks to the Tomogatchi corporation <br>
    Que for Replacement: No time at all! :) `
   }
    
   // Buttons

   const buttonMeal = document.getElementById('meal-id');
   const buttonTreat = document.getElementById('treat-id');
   const buttonPlay = document.getElementById('play-id');
   const buttonWalk = document.getElementById('walk-id');
   const buttonVet = document.getElementById('vet-id');
   const buttonTrain = document.getElementById('train-id');
   const everythingElseButChatter = document.getElementById('layout-img');
   const everythingElseAndChatter = document.getElementById('chatter-container');
   const everythingElseAndDrop = document.getElementById('drop-down-move-two');

   everythingElseButChatter.addEventListener('mouseover', function() {
    previewStats('', '', '', '', '');
  });
  everythingElseAndChatter.addEventListener('mouseover', function() {
    previewStats('', '', '', '', '');
  });
  everythingElseAndDrop.addEventListener('mouseover', function() {
    previewStats('', '', '', '', '');
  });
   buttonMeal.addEventListener('mouseover', function() {
     previewStats('', 'green', 'green', 'green', '');
   });
   buttonTreat.addEventListener('mouseover', function() {
    previewStats('red', '', 'green', 'green', 'green');
  });
  buttonPlay.addEventListener('mouseover', function() {
    previewStats('', 'red', 'red', 'red', 'green');
  });
  buttonWalk.addEventListener('mouseover', function() {
    previewStats('red', 'red', 'red', 'red', 'green');
  });
  buttonVet.addEventListener('mouseover', function() {
    previewStats('green', '', 'red', '', 'red');
  });
  buttonTrain.addEventListener('mouseover', function() {
    previewStats('green', '', 'red', 'red', 'red');
  });
   function previewStats(colorVariableOne, colorVariableTwo, colorVariableThree, colorVariableFour, colorVariableFive) {
    document.querySelector('.health-outline').innerHTML = `<img class="outline" src="images/${colorVariableOne}-outline.png"></img>`

    document.querySelector('.weight-outline').innerHTML = `<img class="outline" src="images/${colorVariableTwo}-outline.png"></img>`

    document.querySelector('.hunger-outline').innerHTML = `<img class="outline" src="images/${colorVariableThree}-outline.png"></img>`

    document.querySelector('.energy-outline').innerHTML = `<img class="outline" src="images/${colorVariableFour}-outline.png"></img>`

    document.querySelector('.happy-outline').innerHTML = `<img class="outline" src="images/${colorVariableFive}-outline.png"></img>`
   }
 
   function walk() {
    if (isPaused === false && canPressButton('walk')) {
      buttonCounter('walk')
     statArray.weight = statArray.weight - 4;
     statArray.happiness = statArray.happiness + 1;
     statArray.health = statArray.health - 1;
     statArray.energy = statArray.energy - 2;
     statArray.hunger = statArray.hunger + 1;
 
     didHeTrain = false
     updateStats();
     awaken();
     dialogue();
     } 
   };
 
 
   function meal() {
    if (isPaused === false && canPressButton('meal')) {
    
      buttonCounter('meal')
     statArray.weight = statArray.weight + 2;
     statArray.energy = statArray.energy + 1;
     statArray.hunger = statArray.hunger - 2;




    if (isHeOverweight === true) {
      statArray.health = statArray.health - 1
    } 
     didHeTrain = false
     dialogue();
     awaken();
     updateStats();
     } 
   }

   function treat() {
    if (isPaused === false && canPressButton('treat')) {
      buttonCounter('treat')
      statArray.health = statArray.health - 1;
      statArray.energy = statArray.energy + 1;
      statArray.happiness = statArray.happiness + 2;
      statArray.hunger = statArray.hunger - 1;
  
      didHeTrain = false
      dialogue();
      awaken();
      updateStats();
      } 
   }
 
 
   function play() {
    if (isPaused === false && canPressButton('play')) {
     buttonCounter('play')     
     statArray.weight = statArray.weight - 1;
     statArray.happiness = statArray.happiness + 3;
     statArray.energy = statArray.energy - .5;
     statArray.hunger = statArray.hunger + 1;
 
     didHeTrain = false
     dialogue();
     awaken();
     updateStats();
     } 
   };
 
 
   function doctor() {
    if (isPaused === false && canPressButton('doctor')) {
      buttonCounter('doctor')   
     statArray.happiness = statArray.happiness - 5;
     statArray.energy = statArray.energy - 2;
     statArray.hunger = statArray.hunger + 1;
     statArray.health = statArray.health + 4;
 
     didHeTrain = false
     
     dialogue();
     awaken();
     updateStats();
    } 
   };
   

   function train() {
    if (isPaused === false && canPressButton('train')) {
      buttonCounter('train')   
     statArray.happiness = statArray.happiness - 1;
     statArray.energy = statArray.energy - 3;
     statArray.hunger = statArray.hunger + 2;
     statArray.health = statArray.health + 1;
     
    didHeTrain = true
    let studySesh = Math.random()
  
      if (studySesh < (statArray.energy / 10)) {
        grade = grade + 1
        graduated = true
      } else if (studySesh > (statArray.energy / 10)) {
        graduated = false
      }
      if (grade >= 10) {
        grade = 10
      }

      dialogue();
      awaken();
      updateStats();
     } 
     localStorage.setItem("ReportEducation", JSON.stringify(grade));
     return grade, graduated;
   };

   function changeCatColor(breed, whereBody, whereEars, classVariable) {
    document.querySelector(whereBody).innerHTML = `<img class="cat-top-body${classVariable}" src="images/Cat Parts/${breed}-body-cat.png">`
    document.querySelector(whereEars).innerHTML = `<img class="cat-top-ears${classVariable}" src="images/Cat Parts/${breed}-ears-cat.png">`
   }
   
 
function changeUIStart() {
  //document.getElementById("Start-Game-Button").style.fontSize = "10px";
  document.getElementById("naming-screen").style.left = "0%";
  document.getElementById("save-screen").style.left = "-100000px";

/*
  document.getElementById("js-save-button-start").style.left = "-1000px";
  document.getElementById("js-save-button-start-two").style.left = "-1000px";
  document.getElementById("js-save-button-start-three").style.left = "-1000px";
  document.getElementById("js-save-button-start-four").style.left = "-1000px";

  document.getElementById("hidden-one").style.left = "42%";
  //save status ^530px
  document.getElementById("hidden-two").style.left = "38%";
  //input ^430px
  document.getElementById("hidden-three").style.left = "34%";
  //name button370px
  document.getElementById("hidden-four").style.left = "35%";
  //name display 420px
  document.getElementById("hidden-five").style.left = "46.5%";
  //play 600px
  document.getElementById("hidden-six").style.left = "38.5%";
  //back 480px
  document.getElementById("mover-downer").style.left = "40px";
  //mover-downer 40px
  */


  document.getElementById("title").innerHTML = 'Now You Can Name Your Him Anything!'
}

function changeUIBackStart() {

  document.getElementById("naming-screen").style.left = "-10000px";
  document.getElementById("save-screen").style.left = "0%";
  
/* first draft that was entirely too much effort
  document.getElementById("js-save-button-start").style.left = "40px";
  document.getElementById("js-save-button-start-two").style.left = "440px";
  document.getElementById("js-save-button-start-three").style.left = "840px";
  document.getElementById("js-save-button-start-four").style.left = "380px";
 

  
  document.getElementById("hidden-one").style.left = "-1000px";
  //save status ^
  document.getElementById("hidden-two").style.left = "-1000px";
  //input ^
  document.getElementById("hidden-three").style.left = "-1000px";
  //name button
  document.getElementById("hidden-four").style.left = "-1000px";
  //name display
  document.getElementById("hidden-five").style.left = "-1000px";
  //play
  document.getElementById("hidden-six").style.left = "-1000px";
  //back
  document.getElementById("mover-downer").style.left = "-1000px";
  //mover-downer 40px
*/

  document.getElementById("title").innerHTML = 'Choose what save you want your little guy in!!'
}

 function directToGame() {
      window.location.href = `http://127.0.0.1:5500/99-Tomogachi.html`;
 }
 
   function gameOverOne() {   
     window.location.href = `http://127.0.0.1:5500/99-Tamogatchi-END.html`
     changeCatColor(`${breedColor}`, '.cat-body-start', '.cat-ears-start', '')
   };
 
 
   function gameOverTwo() {
 
     localStorage.removeItem(`${saveFile}stats`);
     localStorage.removeItem(`${saveFile}time`);
     localStorage.removeItem(`${saveFile}name`);
     localStorage.removeItem(`activeSaveFile`);
 
       document.querySelector(".js-end-display")
     .innerHTML = `${nameVariable} has died! Don't worry, they are replacable...`;
   };
  

   function inner(param) {
     document.querySelector(".save-display")
     .innerHTML = `${param}`;
   }
 
 
   document.addEventListener("DOMContentLoaded", function() {

    
     // Puttin they listeners on them
     document.querySelectorAll(".js-save-button").forEach(button => {
         button.addEventListener("click", function() {
             let slot = this.getAttribute("data-slot");
             loadSave(slot);
         });
         updateSaveButtons();
     });     
 });
 
 function updateSaveButtons() {
     document.querySelectorAll(".js-save-button").forEach(button => {
         let slot = button.getAttribute("data-slot");
         let petName = JSON.parse(localStorage.getItem(`${slot}name`));
 
         if (petName) {
             button.textContent = petName;
             button.disabled = false;
         } else {
             button.textContent = `Load Save ${slot}`;
             button.disabled = true
         }
     });
 }
 
 // Update display
 function updateStatsDisplay(statArray) {
   console.log(statArray);
 }
 
 function loadSave(slot) {
     localStorage.setItem("activeSaveFile", JSON.stringify(slot));
     window.location.href = "99-Tomogachi.html";
 }

 var $win = $(window);
var $lay = $('#layout');
var baseSize = {
    w: 720,
    h: 500    
}
updateScale()

function updateScale() {
    
    var ww = $win.width();
    var wh = $win.height();
    var newScale = 1;
    
    // compare ratios
    if(ww/wh < baseSize.w/baseSize.h) { // tall ratio
        newScale = ww / baseSize.w;
    } else { // wide ratio
        newScale = wh / baseSize.h;        
    }
    
    $lay.css('transform', 'scale(' + newScale + ',' +  newScale + ')');
    
    console.log(newScale);
}

$(window).resize(updateScale);
 
   /* THIS IS A BUTTON PRESET
     statArray.weight = statArray.weight ;
     statArray.happiness = statArray.happiness;
     statArray.health = statArray.health
     statArray.energy = statArray.energy
     statArray.hunger = statArray.hunger
   */
                   /* FORMATTING BAR      
 
 
 function updateScoreElement() {
 document.querySelector('.js-score')
   .innerHTML = `Wins: ${score.wins}, Losses: ${score.Losses}, Ties: ${score.Tie}`;
 }
 
 
                       FORMATTING BAR */
 
 