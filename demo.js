const morseCodeKey = new Map();
morseCodeKey.set('a','*-');
morseCodeKey.set('b','-***');
morseCodeKey.set('c','-*-*');
morseCodeKey.set('d','-**');
morseCodeKey.set('e','*');
morseCodeKey.set('f','**-*');
morseCodeKey.set('g','--*');
morseCodeKey.set('h','****');
morseCodeKey.set('i','**');
morseCodeKey.set('j','*---');
morseCodeKey.set('k','-*-');
morseCodeKey.set('l','*-**');
morseCodeKey.set('m','--');
morseCodeKey.set('n','-*');
morseCodeKey.set('o','---');
morseCodeKey.set('p','*--*');
morseCodeKey.set('q','--*-');
morseCodeKey.set('r','*-*');
morseCodeKey.set('s','***');
morseCodeKey.set('t','-');
morseCodeKey.set('u','**-');
morseCodeKey.set('v','***-');
morseCodeKey.set('w','*--');
morseCodeKey.set('x','-**-');
morseCodeKey.set('y','-*--');
morseCodeKey.set('z','--**');
morseCodeKey.set(',',',');



var referenceNum=0;

var inMorseCode=false;

var lengthOfWordToTranslate=0;

var numberOfWords=0;

function btnClicked(){
    clearArea();
    //get options
    setOptions();
    //generate test
    generateTest();
}

var listOfWordsInEnglish = [];
var listOfWordsInMorseCode = [];
var viewingWords = [];
function generateTest(){
    //Start generating the test
    for(var alpha=0;alpha<numberOfWords;alpha++){
        var currentWordInEnglish=makeWord();
        listOfWordsInEnglish.push(currentWordInEnglish);
        var currentWordInMorseCode=listOfWordsInEnglish[referenceNum];
        listOfWordsInMorseCode.push(toMorseCode(currentWordInMorseCode));
        
        //alert("word: "+listOfWordsInEnglish[referenceNum]);
        //alert("in Morse code: "+listOfWordsInMorseCode[referenceNum])
        //increment count for number of options
        referenceNum++;
        var node = document.createElement('div');
        //generate the label,textfield,and button
        if(inMorseCode){
            //generateViewingList();
            node.innerHTML = '<label value='+referenceNum+' id="word'+referenceNum+'">'+ listOfWordsInMorseCode[referenceNum-1]+'</label><input type="text" id="textfield' + referenceNum + '" name="textfield' + referenceNum + '"><button value='+referenceNum+' onclick="checkAnswer(this.value)" id="checkbtn' + referenceNum + '" name="checkbtn' + referenceNum + '">check</button>';
        }
        else{
            node.innerHTML = '<label value='+referenceNum+' id="word'+referenceNum+'">'+ listOfWordsInEnglish[referenceNum-1]+'</label><input type="text" id="textfield' + referenceNum + '" name="textfield' + referenceNum + '"><button value='+referenceNum+' onclick="checkAnswer(this.value)" id="checkbtn' + referenceNum + '" name="checkbtn' + referenceNum + '">check</button>';
        }
        //generateViewingList();
        document.getElementById('container').appendChild(node);
    }
}

function appendViewingList(){
    
}

function toMorseCode(str){
    var translatedWord="";
    for(var i=0;i<str.length;i++){
        translatedWord+=morseCodeKey.get(str.substring(i,i+1));
    }
    return translatedWord;
}

function makeWord(){
    var wordToTranslate="";
    for(var i=0;i<lengthOfWordToTranslate;i++){
        wordToTranslate+=pickLetter();
        if(i<lengthOfWordToTranslate-1){
            wordToTranslate+=',';
        }
    }
    
    return wordToTranslate;
}

function setOptions(){
    //is the word already translated
    var translateMode=parseInt(document.getElementById('word_type').value);
    if(translateMode==1){
        inMorseCode=true;
    }
    else{
        inMorseCode=false;
    }

    //get length of the word
    lengthOfWordToTranslate=parseInt(document.getElementById('num1').value);
    //get number of words
    numberOfWords=parseInt(document.getElementById('num2').value);
}

function pickLetter(){
    var randomNumber = Math.random()*26+97;
    var letter=String.fromCharCode(randomNumber);
    return letter;
}

function resetWordToTranslate(){
    listOfWordsInEnglish=[];
    listOfWordsInMorseCode=[];
    referenceNum=0;
}


function checkAnswer(num){
    index=num-1;
    //Gets inputted answer in string
    var inputAnswerWord=document.getElementById('textfield'+num).value;
    var actualWord="";
    var inputAnswerTranslated="";
    

    //getting the actual word
        if(inMorseCode){
            for(var j=0;j<lengthOfWordToTranslate*2;j++){
                var tempWord = listOfWordsInEnglish[index];
                var tempLetter = tempWord.substring(j,j+1);
                if(tempLetter==','){
                    //alert("it is ,")
                }
                else{
                    actualWord+=tempLetter;
                }
            }
        }
        else{
            var tempWord = listOfWordsInMorseCode[index];
            for(var some=0;some<tempWord.length;some++){
                var tempLetter = tempWord.substring(some,some+1);
                if(tempLetter==','){
                    //alert("it is ,")
                }
                else{
                    actualWord+=tempLetter;
                }
            }
            
            
        }
    
    //getting the input word
    for(var k=0;k<inputAnswerWord.length*2;k++){
        if(inMorseCode){
            if(inputAnswerWord.substring(k,k+1)==','){

            }
            else{
                inputAnswerTranslated+=inputAnswerWord.substring(k,k+1);
            }
        }
        else{
            var tempWord = listOfWordsInMorseCode[index];
            if(k<inputAnswerWord.length){
                inputAnswerTranslated+=inputAnswerWord.substring(k,k+1);
            }

        }
        
    }
    

    //if the user got the correct answer
    if(inputAnswerTranslated===actualWord){
        //Let the user know that they got the correct answer
        alert("Correct!");
    }else{
        //Let the user know that they got the incorrect answer
        alert("Incorrect... the answer was: "+actualWord+". you put: "+inputAnswerTranslated);
    }
    
}


function anim(e) {
    //enter is 13
    if(e.keyCode==13){
        alert("Enter clicked");
    }
}
document.onkeydown = anim;

/**
 * Determines if there are already options
 * If so, deletes them
 */
 function clearArea(){
    //check to see if options exist
    if (document.getElementById("word1")||document.getElementById("textfield1")||document.getElementById("checkbtn1")) {
        //going through all of the options
        for(var bravo=1;bravo<numberOfWords+1;bravo++){
            
            //initializing id of labels, textfields, and buttons
            var labelId="word"+bravo;
            var buttonId="checkbtn"+bravo;
            var inputId="textfield"+bravo;

            //Getting the labels, textfields, and buttons
            var thisLabel=document.getElementById(labelId);
            var thisbutton=document.getElementById(buttonId);
            var thisinput=document.getElementById(inputId);
            
            //Removing the labels, textfields, and buttons
            thisLabel.remove();
            thisbutton.remove();
            thisinput.remove();
        }
        //reset the reference number because there are no options currently
        referenceNum=0;
        numberOfWords=0;
        resetWordToTranslate();
    }
}
