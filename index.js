const readlineSync = require("readline-sync");
const chalk = require("chalk");
var figlet = require("figlet");

const figletConfig = {
    font: "ANSI Shadow",
    horizontalLayout: "fitted",
    verticalLayout: "fitted",
    width: 80,
    whitespaceBreak: true,
};

// Chalk Theme
const error = chalk.bold.red; //
const success = chalk.bold.green;
const primary = chalk.white.bgRedBright.bold;
const mrRobot = (text) => {
    return chalk.hex("#FF0000")(figlet.textSync(text, figletConfig));
};

let score = 0;
const highscore = 4;
const highscores = [
    {
        name: "Darlene",
        score: 4,
    },
    {
        name: "FBI",
        score: 1,
    },
];

function intro() {
    console.log(primary("Hello friend. Hello friend? 👋 "));
    const userName = readlineSync.question(
        "Can you please tell me your name? "
    );

    console.clear();
    console.log(`Welcome ${chalk.bold(`${userName}`)} to the\n`);
    console.log(mrRobot("Mr. Robot"));
    console.log("Quiz\n");
}

function quiz() {
    function play(question, options, answer) {
        const userAnswer = readlineSync.keyInSelect(
            options,
            primary(question),
            { cancel: false }
        );

        if (userAnswer == answer) {
            console.log(success("\nYou are Right! ✔️\n"));
            score++;
        } else {
            console.log(error("\nNot a Mr robot fan I guess ❌\n"));
            if (score > 0) score--;
        }

        console.log("Current Score: " + score);
        console.log("------------------------");
    }

    console.log("🤖  Lets start with the Quiz 🤖");

    const questions = [
        {
            question: "What is the name of the secret group helping Whiterose",
            options: [
                "Dark Army",
                "Death Squad",
                "Dark Order",
                "Army of Darkness",
            ],
            answer: 0,
        },
        {
            question:
                "Who implemented the hack that Elliot found on ALLSAFE's servers in season 1 ",
            options: ["Darlene", "Elliot", "Tyrell Wellick", "Gideon"],
            answer: 1,
        },
        {
            question: "What is the name Elliot's therapist?",
            options: [
                "Kelly Jackson",
                "Christina Grounder",
                "Krista Gorden",
                "Gloria Reubenarrior",
            ],
            answer: 2,
        },
        {
            question: "How does Gideon Goddard die? ",
            options: [
                "Shot in the neck",
                "Stabbed in a bar",
                "Suicide",
                "A car accident",
            ],
            answer: 0,
        },
        {
            question: "What did the five/nine hack actually do?",
            options: [
                "Crashed mobile network accross US",
                "Encrypted Ecorp's data",
                "Erased everyone's debt",
                "Nothing",
            ],
            answer: 1,
        },
    ];

    // Display Quiz
    for (let i = 0; i < questions.length; i++) {
        var { question, options, answer } = questions[i];

        play(`Q${i + 1}] ${question}`, options, answer);
    }

    console.clear();
}

function displayHighscores() {
    const highscoreText =
        score > highscore
            ? "\nCongrats! You have beaten the highscore 🔥 \nYou can send me a screenshot if you want me to add your name below 👇"
            : "\nYou were not able to beat the highscore! 😵";
    console.log(highscoreText);
    console.log(`Your final score: ${chalk.red(score)}`);
    console.log(`\n--------🌟  ${primary("Highscores")} 🌟--------`);
    console.table(highscores);
}

function init() {
    intro();
    quiz();
    displayHighscores();
}

init();
