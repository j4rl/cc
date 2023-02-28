document.addEventListener("DOMContentLoaded", function() {
    const grid=document.querySelector(".grid");
    let width=8;
    let squares=[];
    let score=0;

    const candyColors=[
        "red", 
        "yellow", 
        "orange", 
        "purple",
        "green",
        "blue"
    ]

    function createBoard(){
        for(i=0; i<(width*width); i++){
            const square=document.createElement('div');
            //Sätt bakgrund här
            let randomColor=Math.floor(Math.random()*candyColors.length);
            square.style.background=candyColors[randomColor];
            square.setAttribute('id', i);
            square.setAttribute('draggable', true);
            grid.appendChild(square);
            squares.push(square);
        }
    }
    createBoard();
})