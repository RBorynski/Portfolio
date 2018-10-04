const unveilButton = document.getElementById("unveil");
const marioPipe = document.getElementById("contact");
const list = document.getElementsByTagName("nav")[0];
const unveilMoreButton = document.getElementsByClassName("unveilMore")[0];
const mainTable = document.getElementsByClassName("mainTable")[0];
let hasUnveilButtonBeenClicked = false;
let hasUnveilMoreButtonBeenClicked = false;
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

  function drynessOnPipe(mquery, perc, pipeOnSecondClick, portfolioTop) {
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
    // if (mquery.matches) {
    //   // 480  cell phone portrait
    //   if (!hasUnveilMoreButtonBeenClicked && hasUnveilButtonBeenClicked) {
    //     // unveilButton.style.background = "red";
    //     unveilMoreButton.addEventListener("click", function(evt) {
    //       marioPipe.style.top = pipeOnSecondClick;
    //       mainTable.style.display = "flex";
    //       mainTable.style.top = portfolioTop;
    //       mainTable.scrollIntoView(true);
    //       const b = portfolioTop;
    //       hasUnveilMoreButtonBeenClicked = true;
    //     });
    //   } else {
    //     //if the button was already clicked at a different browser width and you want to adjust the pipe to the current width
    //     marioPipe.style.top = pipeOnSecondClick;
    //     mainTable.style.top = portfolioTop;
    //   }
    // }

    // if  pipeOnSecondClick !== null) {
    //          unveilButton.style.background = "red";
    //          unveilMoreButton.addEventListener("click", function(evt) {
    //            marioPipe.style.top = pipeOnSecondClick;
    //            mainTable.style.display = "flex";
    //            mainTable.style.top = portfolioTop;
    //            mainTable.scrollIntoView(true);
    //            const b = ddfd;
    //          });
    //        }
  }
  drynessOnPipe(four80, "45%", "85%", "52%");
  drynessOnPipe(mqls[1], "55%", "95%", "62%");
  drynessOnPipe(mqls[2], "80%", null, null);
  drynessOnPipe(mqls[3], "85%", null, null);
}

for (let i = 0; i < mqls.length; i++) {
  responsivenessOnPipe(mqls[i]); // call listener function explicitly at run time
  mqls[i].addListener(responsivenessOnPipe); // attach listener function to listen in on state changes
}
