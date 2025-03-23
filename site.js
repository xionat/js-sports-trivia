
// import the utility functions "decodeHtml" and "shuffle"
import { decodeHtml, shuffle } from './utils.js' 

// get the elements from the DOM
const questionElement = document.querySelector('#question')
const answersElement = document.querySelector('#answers')
const nextQuestionElement = document.querySelector('#nextQuestion')

// IIFE (so we can use async/await)
;(async () => {

	// todo: create your "getNextQuestion" function
		const getNextQuestion = async () => {
			const fetchResponse = await fetch('https://opentdb.com/api.php?amount=1&category=21&difficulty=easy&type=multiple');
			const json = await fetchResponse.json();
	
			// This is for the question, correct answer, and incorrect answers
			const { question, correct_answer: correct, incorrect_answers: incorrect } = json.results[0];
			const answers = shuffle([...incorrect, correct]); // Shuffle answers
	
			return { question, answers, correct };
		};
	// todo: create your "renderQuestion" function
	const renderQuestion = ({ question, answers, correct }) => {
        questionElement.textContent = decodeHtml(question); 
        answersElement.innerHTML = '';

		answers.forEach(answer => {
			const button = document.createElement('button');
			button.textContent = decodeHtml(answer);
	
			button.addEventListener('click', () => {

				if (answer === correct) {
					button.classList.add('correct');
					answersElement.querySelectorAll('button').forEach(b => b.disabled = true);
					alert('Correct!');
					return;
				}

				button.disabled = true
				alert('Incorrect!')
			});
	
			answersElement.appendChild(button);
		});
    };
	// todo: add the event listener to the "nextQuestion" button
	nextQuestionElement.addEventListener('click', async () => {
        renderQuestion(await getNextQuestion());
        nextQuestionElement.disabled = true; // Disable button for 10 sec
        setTimeout(() => nextQuestionElement.disabled = false, 10000);
    });
})()

// nextQuestion button to show the first question
nextQuestionElement.click()
