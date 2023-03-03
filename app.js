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
        
    }
    
})