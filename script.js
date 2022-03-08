
var timeleft = 60;


// // Add event listener to generate button
// generateBtn.addEventListener("click", checkCriteria);


//Countdown Timer

var downloadTimer = setInterval(function(){
  if(timeleft <= 0){
    clearInterval(downloadTimer);
    document.getElementById("countdown").innerHTML = "Times Up";
  } else {
    document.getElementById("countdown").innerHTML = timeleft + " seconds remaining";
    document.getElementById("progressBar").value = timeleft;
  }
  timeleft -= 1;
}, 1000);



// Questions for flash cards
/*
the number five plus the string five equals 10
false *
true
---
JavaScript is a server side programming language only.
true
false *
----
JavaScript was created in 1995
true *
false
-----
Div is a semantic tag.
 true
 false *

 ---
You create flexbox containers within the CSS
 true *
 false


*/