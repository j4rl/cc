document.addEventListener("DOMContentLoaded", function() {
    const grid=document.querySelector(".grid");
    let width=8;
    let squares=[];
    let score=0;
    let numMoves=0;

    const candyColors=[
        "radial-gradient(circle at 65% 15%, white 1px, red 3%, darkred 60%, red 100%)", 
        "radial-gradient(circle at 65% 15%, white 1px, gold 3%, goldenrod 60%, gold 100%)", 
        "radial-gradient(circle at 65% 15%, white 1px, orange 3%, orangered 60%, orange 100%)", 
        "radial-gradient(circle at 65% 15%, white 1px, orchid 3%, purple 60%, orchid 100%)",
        "radial-gradient(circle at 65% 15%, white 1px, lightgreen 3%, green 60%, lightgreen 100%)",
        "radial-gradient(circle at 65% 15%, white 1px, aqua 3%, darkblue 60%, aqua 100%)",
        "radial-gradient(circle at 65% 15%, white 1px, lightgrey 3%, darkgrey 60%, lightgrey 100%)"
    ]
    const specialColors=[
        "radial-gradient(circle at 65% 15%, white 1px, lightgrey 3%, darkgrey 60%, lightgrey 100%)"
    ]

    function createBoard(){
        for(i=0; i<(width*width); i++){
            const square=document.createElement('div');
            let randomColor=Math.floor(Math.random()*candyColors.length);
            square.style.background=candyColors[randomColor];
            square.setAttribute('id', i);
            square.setAttribute('draggable', true);

            //square.innerHTML=i;  //Temporär
            //square.classList.add("cen"); //Temporär

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
                case "fourrow":
                    arrCase=[i, i+1, i+2, i+3];
                    arrNoGo=[5,6,7,13,14,15,21,22,23,29,30,31,37,38,39,45,46,47,53,54,55,61,62,63];
                    break;
                case "fourcolumn":
                    arrCase=[i, i+width, i+width*2, i+width*3];
                    arrNoGo=[40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63];
                    break;
                case "fiverow":
                    arrCase=[i, i+1, i+2, i+3, i+4];
                    arrNoGo=[4,5,6,7,12,13,14,15,20,21,22,23,28,29,30,31,36,37,38,39,44,45,46,47,52,53,54,55,60,61,62,63];
                    break;
                case "fivecolumn":
                    arrCase=[i, i+width, i+width*2, i+width*3, i+width*4];
                    arrNoGo=[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63];
                    break;
                case "pool":
                    //  X X
                    //  X X
                    arrCase=[i, i+1, i+width, i+width+1];
                    arrNoGo=[7, 15, 23, 31, 39, 47, 55,56,57,58,59,60,61,62, 63];
                    break;
                case "diamond":
                    arrCase=[i, i+width-1, i+width+1, i+width*2];
                    arrNoGo=[0, 7, 8, 15, 16, 23, 24, 31, 32, 39, 40, 47, 48,49,50,51,52,53,54, 55, 56,57,58,59,60,61,62, 63];
                    //    X
                    //  X   X
                    //    X
                    break;
                case "cross":
                    //    X
                    //  X X X
                    //    X
                    break;
                case "fourleftdiagonal":
                    //  X
                    //    X
                    //      X
                    //        X
                    break;
                case "fourrightdiagonal":
                    //        X
                    //      X
                    //    X
                    //  X
                    break;    
                default:
            }


            let decidedColor=squares[i].style.background;
            const isBlank=squares[i].style.background === "";

            if(arrNoGo.includes(i)) continue; 

            if(arrCase.every(index => squares[index].style.background === decidedColor && !isBlank)){
                score += points;
                numMoves++;
                console.log("Number of moves: "+numMoves);
                document.getElementById('score').innerHTML=score;
                arrCase.forEach(index => {
                    squares[index].style.background = "";
                })
            }
        }
    }

    function moveDown(){
        for(i=0;i<width;i++){
            if(squares[i].style.background === ""){
                let randomColor=Math.floor(Math.random() * candyColors.length);
                squares[i].style.background=candyColors[randomColor];
            }
        }
        for(i=0;i<width*width;i++){
            if(squares[i].style.background === ""){
                squares[i].style.background = squares[i - width].style.background;
                squares[i - width].style.background = "";
            }
        }

    }

    window.setInterval(function() {
        checkMove("diamond", 1000);
        checkMove("pool", 200);
        checkMove("fiverow", 100);   
        checkMove("fivecolumn", 100);
        checkMove("fourrow", 50);
        checkMove("fourcolumn", 50);
        checkMove("threerow", 10);
        checkMove("threecolumn", 10);
        moveDown();    
    }, 100);
   
})