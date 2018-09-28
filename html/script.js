const unveilButton = document.getElementById("unveil");
const marioPipe = document.getElementById("contact");
const list = document.getElementsByTagName("nav")[0];

let hasUnveilButtonBeenClicked = false;
// used code from  http://www.javascriptkit.com/javatutors/matchmediamultiple.shtml as guide  for setting up multiple window matches
var mqls = [
  window.matchMedia("(max-width: 480px)"),
  window.matchMedia(
    "(min-width: 764px) and (max-width: 1024px) and (orientation:portrait)"
  ),
  window.matchMedia(
    "(min-width: 481px) and (max-width: 880px)and (orientation:landscape)"
  ),
  window.matchMedia(
    "(min-width: 1000px) and (max-width: 1600px)and (orientation:landscape)"
  )
];

function responsivenessOnPipe(mql) {
  const four80 = mqls[0];

  function drynessOnPipe(mquery, perc) {
    if (mquery.matches) {
      // 480  cell phone portrait
      if (!hasUnveilButtonBeenClicked) {
        // unveilButton.style.background = "red";
        unveilButton.addEventListener("click", function(evt) {
          marioPipe.style.top = perc;
          hasUnveilButtonBeenClicked = true;
          list.scrollIntoView(true);
        });
      } else {
        //if the button was already clicked at a different browser width and you want to adjust the pipe to the current width
        marioPipe.style.top = perc;
      }
    }
  }
  drynessOnPipe(four80, "50%");
  drynessOnPipe(mqls[1], "60%");
  drynessOnPipe(mqls[2], "80%");
  drynessOnPipe(mqls[3], "90%");
}

for (let i = 0; i < mqls.length; i++) {
  responsivenessOnPipe(mqls[i]); // call listener function explicitly at run time
  mqls[i].addListener(responsivenessOnPipe); // attach listener function to listen in on state changes
}
