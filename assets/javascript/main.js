

    $(document).ready( function() {

        var correct;
        var incorrect;
        var questionNum = 0;
        var questionBank = [];
        var queryURL = "https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple";

        
        class Question {
            constructor(questionText, answers, correctAnswer, index) {
                Question.questionText = questionText;
                Question.answers = answers;
                Question.correctAnswer = correctAnswer;
                Question.index = index;
            }

            displayQuestionText() {
                var question = $("#question-text");
                question.text(Question.text);

            }

        }
        
        function displayQuestion() {
            // var currentQuestion = questionBank[0];
            
            // currentQuestion.displayQuestionText(); 
        }
        

        function populateQuestionList(bank) {
            
            bank.forEach( function(item) {
                console.log(item.correct_answer);
                var answers = [];
                var done = false;
                var correctAnswer = Math.floor(Math.random()*4);
                for(var j = 0; j < 3; j++) {
                    if(!done && j === correctAnswer) {
                        answers.push(item.correct_answer);
                        j--;
                        done = true;
                    } else {
                        answers.push(item.incorrect_answers[j]);
                    }
                }
                var question = new Question(item.question, answers, item.correct_answer, correctAnswer );
                questionBank.push(question);
            })
        }

        function resetGame() {
            correct = 0;
            incorrect = 0;
            currentQuestion = 0;
    
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function(response) {
                //console.log(response);
                populateQuestionList(response.results);            
            });

            displayQuestion();
        }
        
        
        $(document).on("click", "#start", function() {
            resetGame();
        })


    });

    
