function question(text,choices,answer){
  this.text=text;
  this.choices=choices;
  this.answer=answer;
}
//question prtotype
question.prototype.checkAnswer=function(answer){
  return this.answer===answer;
}
//quiz constructor
function quiz(questions){
  this.questions=questions;
  this.score=0;
  this.questionIndex=0;
}
//quiz prototype
quiz.prototype.getQuestion=function(){
  return this.questions[this.questionIndex];
}
// quiz isFinish
quiz.prototype.isFinish=function(){
  return this.questions.length===this.questionIndex;
}
//quiz guess
quiz.prototype.guess=function(answer){
  var question=this.getQuestion();
  if(question.checkAnswer(answer)){
    this.score++;
  }
  this.questionIndex++;
}



var q1=new question("what is best programming language?",["c#","java","pyhton","go"],"c#");
var q2=new question("what is most popular programming language?",["c#","java","pyhton","javascript"],"javascript");
var q3=new question("what is best modern programming language?",["c#","java","pyhton","go"],"pyhton");

var questions=[q1,q2,q3];
//start quiz

var quiz=new quiz(questions);

loadQuestion();

function loadQuestion(){
  if(quiz.isFinish()){
    showScore();
  }else{
    
    var question=quiz.getQuestion();
    var choices=question.choices;
    document.querySelector('#question')
     .textContent=question.text;
     
     for(var i=0;i<choices.length;i++){
       var element=document.querySelector('#choice'+i);
       element.innerHTML=choices[i];
       guess('btn'+i,choices[i]);
     }
     showProgres();
  }
}


function guess(id,guess){
  var btn=document.getElementById(id);
  btn.onclick=function(){
    quiz.guess(guess);
    loadQuestion();
  }
}
function showScore(){
 var html=`<h2>Score</h2><h4>${quiz.score}</h4>`;
 document.querySelector('.card-body').innerHTML=html;
}
function showProgres(){
    var totalQuestion=quiz.questions.length;
    var questionNumber=quiz.questionIndex+1;
    document.querySelector("#progress").innerHTML
    ='Question' +questionNumber + '/' + totalQuestion;
}