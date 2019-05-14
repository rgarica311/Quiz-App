function testButton() {
  console.log('js running')
  $('.quiz-button').on('click', function(event) {
    event.preventDefault();
    $('.bg-image').css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 1000);
  });
}

function hideBeginQuiz() {
  $('.content').on('click', '.quiz-button', function(event){
    $(event.currentTarget).parent().css('display', 'none');
    $('.main').attr('style', 'width: 750px');

    showQuiz()
  })
}

let questionNum = 0;
let currentScore = 0;

function buildQuestion() {
  if (questionNum < STORE.length) {
    console.log(`questionNum is ${questionNum}`)
    return $('.form').html(`<img class="film-image" src="Assets/film-strip2.png">
    <div class="quiz">
    <h2>${STORE[questionNum].question}</h2>
    <form>
      <fieldset>
        <label>
          <input name="choice" type="radio" required value="${STORE[questionNum].choices[0]}">

          <span>${STORE[questionNum].choices[0]}</span>
        </label>

        <label>
          <input name="choice" type="radio" required value="${STORE[questionNum].choices[1]}">

          <span>${STORE[questionNum].choices[1]}</span>
        </label>

        <label>
          <input name="choice" type="radio" required value="${STORE[questionNum].choices[2]}">

          <span>${STORE[questionNum].choices[2]}</span>
        </label>

        <label>
          <input name="choice" type="radio" required value="${STORE[questionNum].choices[3]}">

          <span>${STORE[questionNum].choices[3]}</span>
        </label>

        <button type="submit" class="enter-button"><span class="button-text">ENTER!</span></button>


      </fieldset>
    </form>
    </div>`);

  } else {
      showResults()
      console.log(`questionNum is ${questionNum}`)
      runTimes++
      console.log(`else is running ${runTimes}`)
  }

}

let runTimes = 0;

function showResults() {
  runTimes++
  console.log(`show results has run ${runTimes}`)
  if (currentScore >= 5 && currentScore < 8) {
    console.log("inserting results")
    $('.film-image').attr("src", "Assets/kevinscream.jpeg")
    $('.content').html(`<div class="result-message"><span>You got ${currentScore} right answer(s)</span><span>You still have some work to do if you want be a real DIT</span></div><button><span>RESTART!</span></button>`)
    $('.next').css('display', 'none')
    $('.correct-ans').css('display', 'none')
  } else if (currentScore < 5) {
    console.log("inserting results")
    $('.film-image').attr("src", "Assets/mistake.jpeg")
    $('.content').append(`<div class="result-message"><span class="result-text">You got ${currentScore} right answer(s)</span><span class="result-text">Are you sure you want to be DIT?</span><span class="result-text">Perhaps you've made a huge mistake</span></div><button class="quiz-button restart"><span class="button-text">RESTART!</span></button>`)
    $('.next').css('display', 'none')
    $('.correct-ans').css('display', 'none')
  } else if (currentScore >=8 ) {
    console.log("inserting results")
    $('.film-image').attr("src", "Assets/troy.jpeg")
    $('.next').css('display', 'none')
    $('.correct-ans').css('display', 'none')
    $('.content').append(`<div class="result-message"><span class="result-text">You got ${currentScore} right answer(s)</span><span class="result-text">You are ready to offload with the best of them!</span></div><button class="quiz-button restart"><span class="button-text">RESTART!</span></button>`)

  }
  $('.film-image').removeClass('hide')
  handleRestart()
}

function handleRestart() {
  $('.content').on('click', '.restart', function(){
      location.reload()
  })
}

function nextQuestion() {
  runTimes++
  console.log(`nextQuestion is running ${runTimes}`)
  questionNum++
  $('.question-num').text(questionNum)
  $('.content').unbind().on('click', '.next', function(event){
    console.log('next question button pressed')
    removeAnswerImg()
    showQuiz()
  })
}

function updateScore() {
  currentScore++
  $('.user-score').text(currentScore)
}

function removeAnswerImg() {
  $('.film-image').attr('src', 'Assets/film-strip2.png')
}

function makeNextButton() {
  $('.content').append('<button class="quiz-button next" style="width: 100%; left:0px;"><span class="button-text">NEXT!</span>')
}

function showCorrectAnsImg() {
  if ( $('.film-image').attr('src') === "Assets/film-strip2.png" ) {
    $('.film-image').attr('src', 'Assets/Oscars-Icon-Correct.jpg')
  }
  $('.quiz').addClass('hide')
  makeNextButton()
  nextQuestion()

}

function showWrongAnsImg() {
  if ( $('.film-image').attr('src') === "Assets/film-strip2.png" ) {
    $('.film-image').attr('src', 'Assets/Razzie-Icon.jpg')
    $('.content').prepend(`<div class="correct-ans"><span class="correct-text">CORRECT ANSWER: ${STORE[questionNum].correctAnswer}</span></div>`)
  }
  $('.quiz').addClass('hide')
  makeNextButton()
  nextQuestion()
}

function ansCorrect() {
  console.log("correct answer!")
  updateScore()
  showCorrectAnsImg()
}

function wrongAnswer() {
  showWrongAnsImg()
}

function handleAnswerSubmit() {
  $('form').on('submit', function(event){
    event.preventDefault()
    console.log('enter pressed')
    let userAnswer = $('input:checked').val()
    console.log(`user anseer is ${userAnswer}`)
    let correctAnswer = `${STORE[questionNum].correctAnswer}`
    console.log(`correct answer is ${correctAnswer}`)

    if (userAnswer === correctAnswer) {
      ansCorrect()
    } else {
      wrongAnswer()
    }

  })
}




function showQuiz() {
  console.log('showquiz running')
  $('.form').attr('style', 'display: block');

  buildQuestion();
  handleAnswerSubmit();
}




function startQuiz() {
  $('.content').html(`<div class="content begin-quiz">
  <h1 class="title">DIGITAL IMAGE TECHNICIAN QUIZ</h1>
  <button class="quiz-button begin">
    <span class="button-text">START QUIZ!</span>
  </button>
  </div>`)

  hideBeginQuiz();

}


$(startQuiz);
