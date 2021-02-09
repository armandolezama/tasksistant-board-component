import { css } from 'lit-element';

export default css`

  tasksistant-cell-component {
    --tasksistant-cell-component-main-container-border: none;
    --tasksistant-cell-component-node-slot-border: none;
    --tasksistant-cell-component-node-inner-text-display: none;
    --tasksistant-cell-component-main-container-width: 80px;
    --tasksistant-cell-component-main-container-height: 80px;
    --tasksistant-cell-component-node-slot-width: 80px;
    --tasksistant-cell-component-node-slot-height: 80px;
    width: 80px;
    height: 80px;
  }

  tasksistant-cell-component.dead {
    --tasksistant-cell-component-main-container-background: red;
    --tasksistant-cell-component-node-slot-background: red;
  }

  tasksistant-cell-component.active {
    --tasksistant-cell-component-main-container-background: red;
    --tasksistant-cell-component-node-slot-background: red;
  }

  tasksistant-item-component {
    --tasksistant-canvas--host-canvas-width: 80px;
    --tasksistant-canvas--host-canvas-height: 80px;
    width: 80px;
    height: 80px;
  }

  #main-container {
    width: 500px;
    height: 500px;
    margin: 0;
    padding: 0;
  }

  #board-table {
    display: table;
    border-collapse: separate;
    box-sizing: border-box;
    text-indent: initial;
    border-spacing: 0;
    border-color: grey;
  }

  .tasksistant-table-cell{
    margin: 0;
    padding: 0;
    width: 80px;
    height: 80px;
    box-sizing: border-box;
  }

  .taksistant-table-row{
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
  }
`;