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
            let randomColor=Math.floor(Math.random()*candyColors.length);
            square.style.background=candyColors[randomColor];
            square.setAttribute('id', i);
            square.setAttribute('draggable', true);

            square.innerHTML=i;  //Temporär
            square.classList.add("cen"); //Temporär

            grid.appendChild(square);
            squares.push(square);
        }
    }
    createBoard();

    //Dragging stuff around... and... stuff.
    let colorBeingDragged;
    let colorBeingReplaced;
    let squareIdBeingDragged;
    let squareIdBeingReplaced;

    squares.forEach(square => square.addEventListener('dragstart', dragStart));
    squares.forEach(square => square.addEventListener('dragend', dragEnd));
    squares.forEach(square => square.addEventListener('dragover',dragOver));
    squares.forEach(square => square.addEventListener('dragenter',dragEnter));
    squares.forEach(square => square.addEventListener('dragleave',dragLeave));
    squares.forEach(square => square.addEventListener('drop',dragDrop));

    function dragStart(){
        colorBeingDragged=this.style.background;
        squareIdBeingDragged=parseInt(this.id);
    }
    function dragEnd(){
        let validMoves = [
            squareIdBeingDragged-1,
            squareIdBeingDragged-width,
            squareIdBeingDragged+1,
            squareIdBeingDragged+width
        ];
        let validMove=validMoves.includes(squareIdBeingReplaced);
        if(squareIdBeingReplaced && validMove){
            squareIdBeingReplaced=null;
        }else if(squareIdBeingReplaced && !validMove){
            squares[squareIdBeingReplaced].style.background=colorBeingReplaced;
            squares[squareIdBeingDragged].style.background=colorBeingDragged;
        }else{
            squares[squareIdBeingDragged].style.background=colorBeingDragged;
        }

    }
    function dragOver(e){
        e.preventDefault();   
    }
    function dragEnter(e){
        e.preventDefault();
    }
    function dragLeave(){

    }

    function dragDrop(){
        colorBeingReplaced=this.style.background;
        squareIdBeingReplaced=parseInt(this.id);
        this.style.background=colorBeingDragged;
        squares[squareIdBeingDragged].style.background=colorBeingReplaced;
    }

    function checkMove(checkCase, points){
        for(i=0;i<width*width;i++){
            switch(checkCase){
                case "threerow":
                    arrCase=[i, i+1, i+2];
                    arrNoGo=[6,7,14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 62, 63];
                    break;
                case "threecolumn":
                    arrCase=[i, i+width, i+width*2];
                    arrNoGo=[48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63];
                    break;
                default:
            }

            let decidedColor=squares[i].style.background;
            const isBlank=squares[i].style.background === "";

            if(arrNoGo.includes(i)) continue; 

            if(arrCase.every(index => squares[index].style.background === decidedColor && !isBlank)){
                score += points;
                document.getElementById('score').innerHTML=score;
                arrCase.forEach(index => {
                    squares[index].style.background = "";
                })
            }
        }
    }

    function moveDown(){
        for(i=0;i<width*width;i++){
            if(squares[i].style.background === ""){
                squares[i].style.background = squares[i - width].style.background;
                squares[i - width].style.background="";
            }
        }
        for(i=0;i<width;i++){
            if(squares[i].style.background === ""){
                let randomColor=Math.floor(Math.random * candyColors.length);
                squares[i].style.background=candyColors[randomColor];
            }
        }
    }

window.setInterval(function(){
    moveDown();
    checkMove("threerow", 10);
    checkMove("threecolumn", 10);
    
}, 100);


    
})