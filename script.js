const gameCells=document.querySelectorAll('.cell');
const restartBtn=document.querySelector('.restartBtn');
const alertBox=document.querySelector('.alert-box');
const player1=document.querySelector('.player1');
const player2=document.querySelector('.player2');
//making variables
let currentPlayer='X';
let nextPlayer='O';
let playerTurn=currentPlayer;

//function to start game;

const startGame=() => {
     gameCells.forEach(cell => {
        cell.addEventListener('click',handleClick);
     })
}     
          
          
           
   
//handle click
const handleClick=(e) => {
    if(e.target.textContent===''){
        e.target.textContent=playerTurn;
        
        if(checkWin()){
           
           
            showAlert(`${playerTurn} has Won!`);
           disableCells();
        }
        else if(checkTie()){
       
              
                showAlert('Match has been tied');
                disableCells();
            
        }
        else{
            changePlayerTurn();
            showAlert(`Next Turn is for Player: ${playerTurn}`);
            
        }
        
    }
}
//to restart the game;

const restartGame=()=>{
    gameCells.forEach(cell=>{
        cell.textContent='';
        cell.classList.remove('disabled');
    });
    startGame();
}
restartBtn.addEventListener('click',restartGame);

// changing player turn;

const changePlayerTurn=() => {
    if(playerTurn===currentPlayer){
        playerTurn=nextPlayer;
    }
    else{
        playerTurn=currentPlayer;
    }
}

// function to check if any player win or not;

const checkWin=() => {
    const winningConditions=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

    for(let i=0;i<winningConditions.length;i++){
        const[pos1,pos2,pos3]=winningConditions[i];
        if(gameCells[pos1].textContent!=='' && gameCells[pos1].textContent===gameCells[pos2].textContent && gameCells[pos2].textContent===gameCells[pos3].textContent){
            return true;
        }
    }
    return false;
                                      
}

//function to check tie;
const checkTie=()=>{
    for(let i=0;i<gameCells.length;i++){
        if(gameCells[i].textContent===''){
            return false;
        }
    }
    if(!checkWin()){
        return true;
    }
}

//function to disable game board if game has been tied
const disableCells=()=>{
    gameCells.forEach(cell=>{
        cell.removeEventListener('click',handleClick);
        //adding class to style,so that we can know that our cell is disabled
        cell.classList.add('disabled');
    })
}

//function to show alert
const showAlert=(msg)=>{
    alertBox.style.display="block";
    alertBox.textContent=msg;
    setTimeout(()=>{
        alertBox.style.display="none";
    },3000)
}

//start game;
startGame();