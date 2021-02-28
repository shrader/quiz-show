const BASE_API_URL = "http://jservice.io/api/";
const NUM_CATEGORIES = 6;
const NUM_CLUES_PER_CAT = 5;
const $LOADING_SPINNER = $(".fa-3x");
const $BTN = $(".btn");
const $BOARD = $("#jeopardyBoard");
// categories is the main data structure for the app; it should eventually look like this:

//  [
//    { title: "Math",
//      clues: [
//        {question: "2+2", answer: "4", showing: null},
//        {question: "1+1", answer: "2", showing: null}, ... 3 more clues ...
//      ],
//    },
//    { title: "Literature",
//      clues: [
//        {question: "Hamlet Author", answer: "Shakespeare", showing: null},
//        {question: "Bell Jar Author", answer: "Plath", showing: null}, ...
//      ],
//    }, ...4 more categories ...
//  ]

let categories = [];


/** Get NUM_CATEGORIES random categories from API.
 *
 * Returns array of category ids, e.g. [4, 12, 5, 9, 20, 1]
 */

async function getCategoryIds() {

    let allCategories = await axios.get(`${BASE_API_URL}categories?count=100`);

    let selectedCategories = _.sampleSize(allCategories.data, 6);

    let catIds = [];

    for (let category of selectedCategories) {

        catIds.push(category.id);
    }

    return catIds;
}

/** Return object with data about a category:
 *
 *  Returns { title: "Math", clues: clue-array }
 *
 * Where clue-array is:
 *   [
 *      {question: "Hamlet Author", answer: "Shakespeare", showing: null},
 *      {question: "Bell Jar Author", answer: "Plath", showing: null},
 *      ... 3 more ...
 *   ]
 */

async function getCategory(catId) {

    let categoryData = await axios.get(`${BASE_API_URL}category?id=${catId}`);

/* occasionally having issues with single and double quotes being mixed in as well
 as mis-formatted quotes, solve this problem by looping through the clues and answers
 and using regex to replace all double quotes with single quotes. 
 source for regex: https://gist.github.com/MirzaLeka/fe33f850d783997181d97dc02cefc000
*/
    for (let clue of categoryData.data.clues) {

        let question = clue.question;

        let answer = clue.answer; 

         question = question.replace(/"/g, "'");

         clue.question = question;

         answer = answer.replace(/"/g, "'");

         clue.answer = answer;
    }

    return categoryData.data;
}

/** Fill an HTML table with the categories & cells for questions.
 *
 * - The <thead> should be filled w/a <tr>, and a <td> for each category
 * - The <tbody> should be filled w/NUM-QUESTIONS_PER_CAT <tr>s,
 *   each with a question for each category in a <td>
 *   (initially, just show a "?" where the question/answer would go.)
 */

async function fillTable() {

    let selectedCategories = await getCategoryIds();

    for (let catID of selectedCategories) {

         let catData = await getCategory(catID);

         categories.push(catData);
    }

//using the HTML data attribute to attach the questions and answers, so they can be accessed by the event target

    $BOARD.html(
        `<table class="tg">
        <thead>
          <tr>
            <th class="table-header category">${categories[0].title.toUpperCase()}</th>
            <th class="table-header category">${categories[1].title.toUpperCase()}</th>
            <th class="table-header category">${categories[2].title.toUpperCase()}</th>
            <th class="table-header category">${categories[3].title.toUpperCase()}</th>
            <th class="table-header category">${categories[4].title.toUpperCase()}</th>
            <th class="table-header category">${categories[5].title.toUpperCase()}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="trow-1 col-1 question" data-question="${categories[0].clues[0].question}"
            data-answer="${categories[0].clues[0].answer}">?</td>
            <td class="trow-1 col-2 question" data-question="${categories[1].clues[0].question}"
            data-answer="${categories[1].clues[0].answer}">?</td>
            <td class="trow-1 col-3 question" data-question="${categories[2].clues[0].question}"
            data-answer="${categories[2].clues[0].answer}">?</td>
            <td class="trow-1 col-4 question" data-question="${categories[3].clues[0].question}"
            data-answer="${categories[3].clues[0].answer}">?</td>
            <td class="trow-1 col-5 question" data-question="${categories[4].clues[0].question}"
            data-answer="${categories[4].clues[0].answer}">?</td>
            <td class="trow-1 col-6 question" data-question="${categories[5].clues[0].question}"
            data-answer="${categories[5].clues[0].answer}">?</td>
          </tr>
          <tr>
            <td class="trow-2 col-1 question" data-question="${categories[0].clues[1].question}"
            data-answer="${categories[0].clues[1].answer}">?</td>
            <td class="trow-2 col-2 question" data-question="${categories[1].clues[1].question}"
            data-answer="${categories[1].clues[1].answer}">?</td>
            <td class="trow-2 col-3 question" data-question="${categories[2].clues[1].question}"
            data-answer="${categories[2].clues[1].answer}">?</td>
            <td class="trow-2 col-4 question" data-question="${categories[3].clues[1].question}"
            data-answer="${categories[3].clues[1].answer}">?</td>
            <td class="trow-2 col-5 question" data-question="${categories[4].clues[1].question}"
            data-answer="${categories[4].clues[1].answer}">?</td>
            <td class="trow-2 col-6 question" data-question="${categories[5].clues[1].question}"
            data-answer="${categories[5].clues[1].answer}">?</td>
          </tr>
          <tr>
            <td class="trow-3 col-1 question" data-question="${categories[0].clues[2].question}"
            data-answer="${categories[0].clues[2].answer}">?</td>
            <td class="trow-3 col-2 question" data-question="${categories[1].clues[2].question}"
            data-answer="${categories[1].clues[2].answer}">?</td>
            <td class="trow-3 col-3 question" data-question="${categories[2].clues[2].question}"
            data-answer="${categories[2].clues[2].answer}">?</td>
            <td class="trow-3 col-4 question" data-question="${categories[3].clues[2].question}"
            data-answer="${categories[3].clues[2].answer}">?</td>
            <td class="trow-3 col-5 question" data-question="${categories[4].clues[2].question}"
            data-answer="${categories[4].clues[2].answer}">?</td>
            <td class="trow-3 col-6 question" data-question="${categories[5].clues[2].question}"
            data-answer="${categories[5].clues[2].answer}">?</td>
          </tr>
          <tr>
            <td class="trow-4 col-1 question" data-question="${categories[0].clues[3].question}"
            data-answer="${categories[0].clues[3].answer}">?</td>
            <td class="trow-4 col-2 question" data-question="${categories[1].clues[3].question}"
            data-answer="${categories[1].clues[3].answer}">?</td>
            <td class="trow-4 col-3 question" data-question="${categories[2].clues[3].question}"
            data-answer="${categories[2].clues[3].answer}">?</td>
            <td class="trow-4 col-4 question" data-question="${categories[3].clues[3].question}"
            data-answer="${categories[3].clues[3].answer}">?</td>
            <td class="trow-4 col-5 question" data-question="${categories[4].clues[3].question}"
            data-answer="${categories[4].clues[3].answer}">?</td>
            <td class="trow-4 col-6 question" data-question="${categories[5].clues[3].question}"
            data-answer="${categories[5].clues[3].answer}">?</td>
          </tr>
          <tr>
            <td class="trow-5 col-1 question" data-question="${categories[0].clues[4].question}"
            data-answer="${categories[0].clues[4].answer}">?</td>
            <td class="trow-5 col-2 question" data-question="${categories[1].clues[4].question}"
            data-answer="${categories[1].clues[4].answer}">?</td>
            <td class="trow-5 col-3 question" data-question="${categories[2].clues[4].question}"
            data-answer="${categories[2].clues[4].answer}">?</td>
            <td class="trow-5 col-4 question" data-question="${categories[3].clues[4].question}"
            data-answer="${categories[3].clues[4].answer}">?</td>
            <td class="trow-5 col-5 question" data-question="${categories[4].clues[4].question}"
            data-answer="${categories[4].clues[4].answer}">?</td>
            <td class="trow-5 col-6 question" data-question="${categories[5].clues[4].question}"
            data-answer="${categories[5].clues[4].answer}">?</td>
          </tr>
        </tbody>
        </table>`
    );


    console.log("categories on fill table", categories);
}

/** Handle clicking on a clue: show the question or answer.
 *
 * */

function handleClick(evt) {

   let $currentHTML = $(evt.target).html();

   let $question = $(evt.target).data("question");

   let $answer = $(evt.target).data("answer");

    /* need to add logic to see if text is ?, question, or answer
    *  change the HTML / text to whats needed 
    *  when changing to answer change the background to green as well */

    if ($currentHTML === "?") {

        $(evt.target).html($question);

    } else {

        $(evt.target).html($answer);

        $(evt.target).css("background-color", "#28a200");
    }
    
}

/** Show the loading spinner,
 * and update the button used to fetch data.
 */

function showLoadingView() {

    $LOADING_SPINNER.css("display","block");
    
    $BTN.text("Loading...");

    $BTN.css("background-color", "#74119c");

}

/** Remove the loading spinner and update the button used to fetch data. */

function hideLoadingView() {

    $LOADING_SPINNER.css("display","none");

    $BTN.text("Restart!");
}

/** Setup game data and board:
 * - wipe the board
 * - get random category Ids
 * - get data for each category
 * - call fillTable to create HTML table
 */

async function setupGameBoard() {

    categories = [];

    $BOARD.empty();

    await fillTable();

}

/** Start game: show loading state, setup game board, stop loading state */

async function setupAndStart() {

    showLoadingView();

    await setupGameBoard();

    hideLoadingView();
}

/** At start:
 *
 * - Add a click handler to your start button that will run setupAndStart
 * - Add a click handler to your board that will run handleClick
 *   when you click on a clue
 */

// ADD THOSE THINGS HERE

$BTN.on("click", setupAndStart);

$BOARD.on("click", handleClick);
