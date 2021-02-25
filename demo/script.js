const goToNodeComponent = direction => {
  const component = document.querySelector("tasksistant-board-component");
  component.navigateFromCurrentNodeTo(direction);
};

const setBoardSpace = () => {
  const component = document.querySelector("tasksistant-board-component");
  component.numberOfRows = document.getElementById('rows-count').value;
  component.numberOfColumns = document.getElementById('columns-count').value;
};