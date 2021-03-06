$(document).ready(function(){
	updateDisplay();
});
// Question List


var question1 = {
	question: 'How many national parks are in the United States?',
	options: ['100', '51', '58', '37'], 
	correctAnswer: 2
}

var question2 = {
	question: 'What was the first national park created in the United States?',
	options: ['Acadia', 'Grand Canyon', 'Yellowstone', 'Yosemite'], 
	correctAnswer: 2
}

var question3 = {
	question: 'Which national park has the greatest number of visitors each year?',
	options: ['Yellowstone', 'Rocky Mountain', 'Zion', 'Great Smoky Mountains'],
	correctAnswer: 3
}

var question4 = {
	question: 'Which president signed an act that created the National Park Service?',
	options: ['Theodore Roosevelt', 'Woodrow Wilson', 'Thomas Jefferson', 'Ulysses S. Grant'],
	correctAnswer: 1
}

var question5 = {
	question: 'What is the largest national park?',
	options: ['Death Valley', 'Glacier', 'Wrangell-St.Elias', 'Denali'], 
	correctAnswer: 2
}


var listOfQuestions = [question1, question2, question3, question4, question5];

var currentQuestion = 0;

var userScore = 0;


// Enables submit button

$('p > input').change(function() {

	$('#submitButton').prop('disabled', false).removeClass('disabled');
});

// Submit Button 

$('#submitButton').click(function(event) {
	event.preventDefault();

	//captures user selection
	var currentUserAnswer = $("input[name=userGuess]:checked").val();



	// gets correct answers

	var currentCorrectAnswer = listOfQuestions[currentQuestion].correctAnswer;
	console.log(currentCorrectAnswer);
	console.log(currentUserAnswer);

	if (currentUserAnswer == currentCorrectAnswer) {
		userScore++
	}

	//increment currentQuestion

	currentQuestion++;

	

	//shows answers at end
	if (currentQuestion >= listOfQuestions.length) {
		console.log('current answers');
		for(var i = 0; i < listOfQuestions.length; i++) {

			var CQ = listOfQuestions[i]
			var clonedQuestion = $('#clone').clone();
			clonedQuestion.attr("id","clone-" + i);	
			clonedQuestion.find('h4').text(CQ.question);
			// (function() {
			// 	for(var i = 0; i < CQ.options.length; i++) {
			// 		var option = CQ.options[i]
					

					var rightIndex = listOfQuestions[i].correctAnswer
					var rightAnswer = listOfQuestions[i].options[rightIndex]
					clonedQuestion.find('ol').append('<li>' + rightAnswer +'</li>')			

			//})();
			
			$('#correctAnswers > ul').append(clonedQuestion);
		}
		$('.content').hide();
		$('#correctAnswers').show();
	}
	
	//displays question + answers
	else {
		updateDisplay();
	}



});

//reset button
$('.reset').click(function() {
	currentQuestion = 0;
	userScore = 0;

	updateDisplay();
	$('.content').show();
	$('#correctAnswers').hide();
	$.each( $("li[id^='clone-']"), function () {
  		$(this).remove();
	});
});







function updateDisplay(){
	//replace question

	$('#question').text(listOfQuestions[currentQuestion].question);

	//replace list of answers

	for(var i = 0; i < 4; i++ ) {

		$('#choice' + (i + 1) ).text(listOfQuestions[currentQuestion].options[i]);
	}

	//resets radio button

	$('input[name="userGuess"]').prop('checked', false);

	$('.userScoreTally').text(userScore);
};