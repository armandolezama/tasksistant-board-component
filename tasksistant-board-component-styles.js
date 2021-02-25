import { css } from 'lit-element';

export default css`

  #main-container {
    width: 500px;
    height: 500px;
    margin: 0;
    padding: 0;
  }

  #board-table {
    display: table;
    border-collapse: collapse;
    box-sizing: border-box;
    text-indent: initial;
    border-spacing: 0;
  }

  .tasksistant-table-cell{
    margin: 0;
    padding: 0;
    width: 80px;
    height: 80px;
    box-sizing: border-box;
  }

  .taksistant-table-row{
    display: inline-flex;
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
  }

  canvas {
    width: 80px;
    height: 80px;
  }
`;