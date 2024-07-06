let box = document.querySelectorAll(".box");
let reset = document.querySelector("#reset");
let newGameBtn = document.querySelector("#new-Btn");
let msgContainer = document.querySelector(".msg-container");
let message = document.querySelector("#msg");

let turnO = true;

const winpatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
};

box.forEach((box) => {
    box.addEventListener("click", () => {
        console.log("Button was clicked");
        if (turnO) {
            box.innerText = "O";
            turnO = false;
        } else {
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;

        checkwinner();
    });
});

const disableBoxes = () => {
    for (let boxx of box) {
        boxx.disabled = true;
    }
};

const enableBoxes = () => {
    for (let boxx of box) {
        boxx.disabled = false;
        boxx.innerText = "";
    }
};

const showWinner = (winner) => {
    message.innerText = `Congratulations! Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const showDraw = () => {
    message.innerText = "It's a draw!";
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const checkwinner = () => {
    let filledboxes = 0;
    let winnerFound = false;

    for (let pattern of winpatterns) {
        let pos1val = box[pattern[0]].innerText;
        let pos2val = box[pattern[1]].innerText;
        let pos3val = box[pattern[2]].innerText;

        if (pos1val != "" && pos2val != "" && pos3val != "") {
            if (pos1val === pos2val && pos2val === pos3val) {
                console.log("winner", pos1val);
                showWinner(pos1val);
                winnerFound = true;
                break;
            }
        }
    }

    // Check for draw only if no winner is found
    if (!winnerFound) {
        box.forEach((boxx) => {
            if (boxx.innerText !== "") {
                filledboxes++;
            }
        });

        if (filledboxes === 9) {
            showDraw();
        }
    }
};

newGameBtn.addEventListener("click", resetGame);
reset.addEventListener("click", resetGame);
