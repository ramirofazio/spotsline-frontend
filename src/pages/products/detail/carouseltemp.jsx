import React from "react";
import "./styles.css";

import Box from "@material-ui/core/Box";
import Fade from "@material-ui/core/Fade";
import Paper from "@material-ui/core/Paper";

const data = [
  "FIRST CONTENT",
  "SECOND CONTENT",
  "LAAAAAARGE CONTENT",
  "MORE CONTENT",
  "ANITA LAVA LA TINA",
  "HANNAH",
  "LA RUTA NATURAL",
  "MORE SPANISH CONTENT",
  "EXTRA 1",
  "EXTRA 2",
  "EXTRA 3",
  "EXTRA 4",
  "EXTRA 5",
];
const dataPerPage = 6;

const durationEnter = 1500;
const durationExit = 500;

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentSlide: 0,
      currentPage: 1,
      totalPages: Math.ceil(data.length / dataPerPage),
      cycles: 0,
      timerId: null,
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleCarouselTurn = this.handleCarouselTurn.bind(this);
    this.getChangeOfPage = this.getChangeOfPage.bind(this);
    this.getPointIndexes = this.getPointIndexes.bind(this);
  }

  componentDidMount() {
    const timerId = setInterval(() => this.handleCarouselTurn(timerId), 5000);
    this.setState({ timerId });
  }

  componentWillUnmount() {
    const { timerId } = this.state;
    clearInterval(timerId);
  }

  handleCarouselTurn(timerId) {
    const newState = { ...this.state };

    if (newState.cycles === 10) {
      clearInterval(timerId);
      return;
    }

    if (newState.currentSlide + 1 >= data.length) {
      newState.cycles += 1;
      newState.currentSlide = 0;
    } else {
      newState.currentSlide += 1;
    }

    newState.currentPage = this.getChangeOfPage(newState.currentSlide, newState.currentPage);

    this.setState({ ...newState });
  }

  handleClick(to) {
    this.setState((prevState) => ({
      currentSlide: to,
      currentPage: this.getChangeOfPage(to, prevState.currentPage),
    }));
  }

  getChangeOfPage(currentSlide, currentPage) {
    const { totalPages } = this.state;
    // Base case to return to the first page
    if (currentSlide === 0) return 1;

    // If the change comes from the right side, move on to the next page
    if (currentSlide === (dataPerPage - 1) * currentPage) {
      // But if we are already at the last page, then return to the first page
      if (currentPage === totalPages) return 1;
      return currentPage + 1;
    }

    // If the change comes from the left side, go back to the previous page
    if (currentSlide === (dataPerPage - 1) * (currentPage - 1) && currentSlide !== 0) return currentPage - 1;

    return currentPage;
  }

  getPointIndexes() {
    const { currentPage } = this.state;

    return [...Array(dataPerPage).keys()].map((x) => x + (dataPerPage - 1) * (currentPage - 1));
  }

  render() {
    const { currentSlide, currentPage, totalPages } = this.state;

    const indexArray = this.getPointIndexes();
    console.log(indexArray);

    return (
      <div className="App">
        <Box className="principal">
          {currentSlide}

          <Box className="carousel">
            {data.map((d, index) => (
              <Fade
                key={`${d}${index}`}
                className="content"
                in={index === currentSlide}
                timeout={{ enter: durationEnter, exit: durationExit }}
              >
                <Paper elevation={2} className="paper">
                  {d}
                </Paper>
              </Fade>
            ))}
          </Box>

          <Box className="dot">
            {indexArray.map((index) => {
              if (currentPage > totalPages || index >= data.length) {
                return null;
              }
              return (
                <span
                  key={`dot-${index}`}
                  onClick={() => this.handleClick(index)}
                  style={{
                    marginLeft: "5px",
                    cursor: "pointer",
                    fontSize:
                      // Right
                      (index === (dataPerPage - 1) * currentPage && currentPage < totalPages) ||
                      // Left
                      (index === (dataPerPage - 1) * (currentPage - 1) && index !== 0)
                        ? "15px"
                        : "20px",
                    color: currentSlide === index ? "salmon" : "pink",
                    textShadow: "0 3px 3px mistyrose",
                  }}
                >
                  &#9679;
                </span>
              );
            })}
          </Box>
        </Box>
      </div>
    );
  }
}

export default App;
