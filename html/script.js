const unveilButton = document.getElementById("unveil");
const marioPipe = document.getElementById("contact");
const list = document.getElementsByTagName("nav")[0];
const statement = document.getElementsByTagName("p")[0];

const unveilMoreButton = document.getElementsByClassName("unveilMore")[0];
const portfolioMenu = document.getElementsByClassName("portfolioMenu")[0];
let hasUnveilButtonBeenClicked = false;
let hasUnveilMoreButtonBeenClicked = false;
// used code from  http://www.javascriptkit.com/javatutors/matchmediamultiple.shtml as guide  for setting up multiple window matches
var mqls = [
  window.matchMedia("(max-width: 480px) and (orientation:portrait)"),
  window.matchMedia(
    "(min-width: 481px) and (max-width: 1024px) and (orientation:portrait)"
  ),
  window.matchMedia(
    "(min-width: 481px) and (max-width: 880px)and (orientation:landscape)"
  ),
  window.matchMedia("(min-width: 1000px) and (orientation:landscape)")
];

// unveilMoreButton.addEventListener("click", function(evt) {
//   list.style.display = "flex";
// });
const derivePortfolioHeight = (pipeTop, portfolioTop) => {
  let subtraction = parseFloat(pipeTop.replace(/%/gi, ""));
  subtraction -= portfolioTop.replace(/%/gi, "");
  subtraction += 5;
  let backToString = subtraction.toString();
  return (backToString += "?");
};

function responsivenessOnPipe(mql) {
  const four80 = mqls[0];

  function drynessOnPipe(mquery, perc, pipeOnSecondClick, portfolioTop) {
    if (mquery.matches) {
      // 480  cell phone portrait
      // unveilButton.style.background = "red";

      unveilButton.addEventListener("click", function(evt) {
        {
          list.scrollIntoView(true);
          marioPipe.style.top = perc;
          hasUnveilButtonBeenClicked = true;
          statement.style.color = "rgba(0, 0, 0, 0)";
        }
      });

      //if the button was already clicked at a different browser width and you want to adjust the pipe to the current width
      // unveilButton.style.background = "red";
      unveilMoreButton.addEventListener("click", function(evt) {
        if (hasUnveilButtonBeenClicked) {
          marioPipe.style.top = pipeOnSecondClick;
          portfolioMenu.style.display = "flex";
          portfolioMenu.style.top = portfolioTop;
          portfolioMenu.style.height = derivePortfolioHeight(
            pipeOnSecondClick,
            portfolioTop
          );
          // portfolioMenu.scrollIntoView(true);
          // portfolioMenu.style.height =
          hasUnveilMoreButtonBeenClicked = true;
        }
      });
      if (!hasUnveilMoreButtonBeenClicked && hasUnveilButtonBeenClicked) {
        marioPipe.style.top = perc;
      }

      if (
        hasUnveilMoreButtonBeenClicked &&
        hasUnveilButtonBeenClicked &&
        pipeOnSecondClick !== null
      ) {
        //if the button was already clicked at a different browser width and you want to adjust the pipe to the current width
        marioPipe.style.top = pipeOnSecondClick;
        portfolioMenu.style.top = portfolioTop;
      }
    }
  }
  drynessOnPipe(four80, "45%", "85%", "52%");
  drynessOnPipe(mqls[1], "55%", "95%", "62%");
  drynessOnPipe(mqls[2], "80%", "120%", "86%");
  drynessOnPipe(mqls[3], "85%", "127%", "96%");
}

for (let i = 0; i < mqls.length; i++) {
  responsivenessOnPipe(mqls[i]); // call listener function explicitly at run time
  mqls[i].addListener(responsivenessOnPipe); // attach listener function to listen in on state changes
}
