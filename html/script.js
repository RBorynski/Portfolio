const unveilButton = document.getElementById("unveil");
const marioPipe = document.getElementById("contact");
const list = document.getElementsByTagName("nav")[0];
const statement = document.getElementsByTagName("p")[0];

const unveilMoreButton = document.getElementsByClassName("unveilMore")[0];
const portfolioMenu = document.getElementsByClassName("portfolioMenu")[0];
const mainTable = document.getElementsByClassName("mainTable")[0];
const navWithMultiLevelDropdowns = document.getElementsByClassName(
  "navWithMuliLevelDropdowns"
)[0];
let hasUnveilButtonBeenClicked = false;
let hasUnveilMoreButtonBeenClicked = false;

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
  let subtraction = parseFloat(pipeTop.replace(/%/gi, "")); //2
  subtraction -= portfolioTop.replace(/%/gi, "");

  subtraction += 5;
  let backToString = subtraction.toString();
  return (backToString += "%");
};

function responsivenessOnPipe(mql) {
  const four80 = mqls[0];

  function drynessOnPipe(mquery, perc, pipeOnSecondClick, portfolioTop) {
    if (mquery.matches) {
      const changeMenuTypeBasedOnOrientation = () => {
        const isOrientationPortrait = mquery.media.includes("portrait");
        unveilButton.style.background = "red";
        if (!isOrientationPortrait) {
          navWithMultiLevelDropdowns.style.display = "flex";
          mainTable.style.display = "none";
        } else {
          navWithMultiLevelDropdowns.style.display = "none";
          mainTable.style.display = "flex";
        }
      };

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
          // mainTable.style.display = "flex";
          portfolioMenu.style.height = derivePortfolioHeight(
            pipeOnSecondClick,
            portfolioTop
          );
          // portfolioMenu.scrollIntoView(true);
          // portfolioMenu.style.height =
          hasUnveilMoreButtonBeenClicked = true;
          changeMenuTypeBasedOnOrientation();
          setTimeout(function() {
            portfolioMenu.style.zIndex = "4";
            portfolioMenu.scrollIntoView(true);
          }, 8000);
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
        changeMenuTypeBasedOnOrientation();
      }
    }
  }
  drynessOnPipe(four80, "45%", "100%", "52%");
  drynessOnPipe(mqls[1], "55%", "110%", "62%");
  drynessOnPipe(mqls[2], "80%", "123%", "86%");
  drynessOnPipe(mqls[3], "85%", "130%", "96%");
}

for (let i = 0; i < mqls.length; i++) {
  responsivenessOnPipe(mqls[i]); // call listener function explicitly at run time
  mqls[i].addListener(responsivenessOnPipe); // attach listener function to listen in on state changes
}
