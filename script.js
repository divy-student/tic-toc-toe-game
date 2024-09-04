let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset-btn");
let newGamebtn = document.querySelector(".new-btn");
let msg = document.querySelector(".msg");
let msgContainer = document.querySelector(".msg-container");

let turn0 = true;

const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,4,6],
    [2,5,8],
    [3,4,5],
    [6,7,8]
];

let count = 0;

const gameDraw = () => {
    msg.innerText = `This match was draw.
    play new game.
    👇 `;
    msgContainer.classList.remove("hide");
    disablebox();
};


const resetGame = () => {
    turn0 = true;
    enablebox();
    count = 0;
    msgContainer.classList.add("hide");
}

boxes.forEach((box) => {
    box.addEventListener("click",() => {
        if(turn0){
            box.innerText = "O";
            box.style.color = "green";
            turn0 = false;
        }else {
            box.innerText = "X";
            box.style.color = "red";
            turn0 = true;
        }
        box.disabled = true;
        count++;

        let isWinner = checkWinner();

        if (count === 9 && !isWinner) {
            gameDraw();
        }
    });
});


const disablebox =  () => {
    for (let box of boxes){
    box.disabled = true;
    }
}

const enablebox =  () => {
    for (let box of boxes){
    box.disabled = false;
    box.innerText = "";
    }
}

const showWinner = (winner) => {
    msg.innerText =`Congratulations 🎉,
     winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disablebox();
};

const checkWinner = () => {
    for(let pattern of winPatterns){
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;

        if(pos1val != "" && pos2val != "" && pos3val != "") {
           if( pos1val === pos2val && pos2val === pos3val){
            showWinner(pos1val);
            return true;
           }
        }
    }
};

newGamebtn.addEventListener("click" , resetGame);
resetbtn.addEventListener("click" , resetGame);