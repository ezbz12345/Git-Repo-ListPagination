/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

const allStudents = document.getElementsByClassName('student-item cf'); //grabbing all the complete li's from the html
let activeArray = allStudents; //this will hold the student li that will be available to view, even if not on the active page
const foundArray = []; //this will hold the search matches
const allStudentsTextArray = []; //this will let us match input with text.
const allStudentsTextArraySource = document.getElementsByTagName('h3');
for (let i = 0 ; i < allStudents.length ; i ++){
    allStudentsTextArray.push(allStudentsTextArraySource[i].textContent);}

//here we make a place for the buttons to go, and give them a class to be identified by the css. 
const ul = document.getElementsByTagName('ul')[0];
const li = document.createElement('button');
const div = ul.parentNode;
const buttonDiv = document.createElement('div');
buttonDiv.classList.add('pagination');
div.appendChild(buttonDiv);
const buttonUl = document.createElement('ul');
buttonDiv.appendChild(buttonUl);

//function for making the buttons. We need to call this at specific moments, like search results, and page load. we will call it then. 
function makeTheButtons (activeArray){ 
    //reset the buttons fresh each time
    var buttonParent = document.querySelectorAll('.pagination')[0];
    var buttonParentKid = buttonParent.firstChild;
    while (buttonParentKid.childElementCount > 0){
        buttonParentKid.firstChild.remove();
    }

    let resetTheButtons = document.getElementsByClassName('.pagination');
    while (resetTheButtons.length > 0){
        resetTheButtons[0].remove();
    }

    for(let i = 0 ; i <= Math.floor((activeArray.length-1)/10) ; i ++){
       var buttonLi = document.createElement('li');
       buttonUl.appendChild(buttonLi);
       var pageButton = document.createElement('BUTTON');
       buttonNum = i+1;
       pageButton.textContent = buttonNum;
       pageButton.classList.add('pagination');
       buttonLi.appendChild(pageButton);
 }
  if(buttonUl.childElementCount == 1){
      buttonUl.firstChild.remove();
  }
}

 //make a place for the scearch bar to go
 const searchBarDivParent = document.getElementsByClassName("page-header cf")[0];
const searchBarDiv = document.createElement('div');
searchBarDiv.classList.add('student-search')
const searchBarInput = document.createElement('input');
searchBarInput.setAttribute('placeholder', "Search for students...");
const searchBarButton = document.createElement('BUTTON');
searchBarButton.textContent = "Search";

//adding the searchbar to the page. this doesn't need reset like the buttons, so we can call it right after. 
function makeTheSearchBar (){
    searchBarDivParent.appendChild(searchBarDiv);
    searchBarDiv.appendChild(searchBarInput);
    searchBarDiv.appendChild(searchBarButton);
 }
 makeTheSearchBar();

 //Making the search function.
 const input = document.querySelector('input');
 const userInput = input.value;
 function findStudent(userInput){
     activeArray = []
     for(let i = 0 ; i < allStudentsTextArray.length ; i++){
         if (allStudentsTextArray[i].includes(userInput.toLowerCase())){
             activeArray.push(allStudents[i])
         }else allStudents[i].style.display = "none"
     } 
    // if(activeArray.length == 0){alert("noone here");}
     return activeArray;
 }
//this is the functionality needed to display 10 at a time that will need to be called by button click events, page loads, and search results. 
 function showMeTen(whichTen, activeArray){
    for (let i = 0 ; i < activeArray.length ; i ++){
        activeArray[i].style.display = "";
    }
    var low = (whichTen * 10);
    var high = (whichTen + 1)*10;
    for (let i = 0 ; i < activeArray.length ; i ++){
        if (i >= low && i < high){
        activeArray[i].style.diplay = "";
        }else{
        activeArray[i].style.display = "none";
        }
    }
 }

//show page function first try. we need to make buttons, and display 10. 
function showPage(whichTen, activeArray){
    makeTheButtons(activeArray);
    showMeTen(whichTen, activeArray);
}
showPage(0, allStudents);

//add our event listeners
buttonDiv.addEventListener('click', (e) => {
    if (e.target.tagName == 'BUTTON'){
        let whichTen = (parseInt(e.target.textContent) - 1)
        showMeTen(whichTen, activeArray);
    }
})

//two for the search bar. one for submit button, and one for real time typing. (keyup)
searchBarDiv.addEventListener('click', (e) => {
    if(e.target.tagName =='BUTTON'){
    let userInput = input.value;
    showPage(0, findStudent(userInput));
    nooneHere();
  }
})
searchBarDiv.addEventListener('keyup', (e) => {
    let userInput = input.value;
    showPage(0, findStudent(userInput));
    nooneHere();
})

//creating the message that will show when noone is found from the search. 
var nobodyHome = document.createElement('div');
    var nobodyHomeKid = document.createElement('span')
    nobodyHomeKid.textContent = "Nobody here...";
    nobodyHome.classList.add('empty');
    nobodyHomeKid.style.display = "none"
    div.appendChild(nobodyHome);
    nobodyHome.appendChild(nobodyHomeKid);    

//function that will show the no results message, or remove it based on the activeArray length. This will need to be called everytime our activeArray changes. #seetheeventlisteners
function nooneHere(){
    if (activeArray.length == 0){
        nobodyHomeKid.style.display = "";
    }else {nobodyHomeKid.style.display = "none";
}}

//hope this wasn't too bad to follow. thanks for your attention!
//JTE11