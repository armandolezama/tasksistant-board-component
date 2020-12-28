import { css } from 'lit-element';

export default css`
  :host(*) {
    margin: 0;
    padding: 0;
  }

  tasksistant-cell-component {
    --tasksistant-cell-component-main-container-border: none;
    --tasksistant-cell-component-node-inner-text-display: none;
    --tasksistant-cell-component-main-container-width: 80px;
    --tasksistant-cell-component-main-container-height: 80px;
    --tasksistant-cell-component-node-slot-width: 80px;
    --tasksistant-cell-component-node-slot-height: 80px;
    margin: 5px;
  }

  tasksistant-cell-component.active {
    --tasksistant-cell-component-main-container-background: red;
    --tasksistant-cell-component-node-slot-background: red;
  }
`;