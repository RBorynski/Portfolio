const unveilButton = document.getElementById("unveil");
const marioPipe = document.getElementById("contact");
const menusAndPipe = document.getElementById("bottom");
const list = document.getElementsByTagName("nav")[0];
const statement = document.getElementsByTagName("p")[0];
const links = document.getElementsByTagName("a");
let counter = 0;
const makeLinksAppearInNewTab = () => {
  for (let i = 0; i < links.length; i++) {
    links[i].setAttribute("target", "_blank");
  }
};
makeLinksAppearInNewTab();
// links.setAttribute("target", "_blank");
const unveilMoreButton = document.getElementsByClassName("unveilMore")[0];
const portfolioMenu = document.getElementsByClassName("portfolioMenu")[0];
const mainTable = document.getElementsByClassName("mainTable")[0];
const hamburgerMenu = document.getElementsByClassName("fa fa-bars")[0];
const downArrow = document.getElementsByClassName("fa fa-level-down")[0];
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

  subtraction -= 14;
  let backToString = subtraction.toString();
  return (backToString += "%");
};

function responsivenessOnPipe(mql) {
  const four80 = mqls[0];

  function drynessOnPipe(mquery, perc, pipeOnSecondClick, portfolioTop) {
    if (mquery.matches) {
      const changeMenuTypeBasedOnOrientation = () => {
        const isOrientationPortrait = mquery.media.includes("portrait");
        if (!isOrientationPortrait) {
          navWithMultiLevelDropdowns.style.display = "flex";
          mainTable.style.display = "none";
        } else {
          navWithMultiLevelDropdowns.style.display = "none";
          mainTable.style.display = "flex";
        }
      };

      unveilButton.addEventListener("click", function(evt) {
        list.scrollIntoView(true);
        marioPipe.style.top = perc;
        hasUnveilButtonBeenClicked = true;
        statement.style.color = "rgba(0, 0, 0, 0)";
        downArrow.style.display = "none";
      });

      unveilMoreButton.addEventListener("click", function(evt) {
        marioPipe.style.top = pipeOnSecondClick;
        portfolioMenu.style.display = "flex";
        portfolioMenu.style.top = portfolioTop;
        hamburgerMenu.style.display = "none";
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
          portfolioMenu.scrollIntoView(true);
        }, 6000);
        setTimeout(function() {
          portfolioMenu.style.zIndex = "4";
        }, 8000);
        counter++;
      });
      if (!hasUnveilMoreButtonBeenClicked && hasUnveilButtonBeenClicked) {
        marioPipe.style.top = perc;
        //if the button was already clicked at a different browser width and you want to adjust the pipe to the current width when resizing it
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
        portfolioMenu.style.height = derivePortfolioHeight(
          pipeOnSecondClick,
          portfolioTop
        );
      }
    }
  }
  // parameters are generally used for dynamic return values, but they are equally as useful for dynamic dom manipulation based on media query
  drynessOnPipe(four80, "45%", "130%", "52%");
  drynessOnPipe(mqls[1], "55%", "140%", "62%");
  drynessOnPipe(mqls[2], "85%", "120%", "91%");
  drynessOnPipe(mqls[3], "85%", "125%", "101%");
}

for (let i = 0; i < mqls.length; i++) {
  responsivenessOnPipe(mqls[i]); // call listener function explicitly at run time
  mqls[i].addListener(responsivenessOnPipe); // attach listener function to listen in on state changes
}
