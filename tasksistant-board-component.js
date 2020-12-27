import { LitElement, html } from "lit-element";
import '@tasksistant-components/tasksistant-cell-component'
import styles from './tasksistant-board-component-styles'
import { TasksistantCellComponent } from "@tasksistant-components/tasksistant-cell-component";

export class TasksistantBoardComponent extends LitElement {
  /**
   * Instance of the element is created/upgraded. Useful for initializing
   * state, set up event listeners, create shadow dom.
   * @constructor
   */
  constructor() {
    super();
    this.numberOfRows = 0;
    this.numberOfColumns = 0;
    this.boardSpace = [];
    this.boardDirectory = new Map();
  }

  /**
   * Object describing property-related metadata used by Polymer features
   */
  static get properties() {
    return {
      numberOfRows: {type: Number},
      numberOfColumns: {type: Number},
      boardSpace: {type: Array},
      boardDirectory: {type: Array}
    };
  }

  static get styles(){ 
    return styles;}

  
  createSpace(){
    for (let row = 0; row < this.numberOfRows; row++) {
      this.boardSpace[row] = []
      for (let column = 0; column < this.numberOfColumns; column++) {
        this.boardSpace[row][column] = new TasksistantCellComponent();
      }
      
    }
  }

  render() {
    return html`
    <div id="main-container">
      <table>
        ${(() => {
          if(this.numberOfRows > 0  && this.numberOfColumns > 0){
            let boardTemplate = html``;
            for (let row = 0; row < this.numberOfRows; row++) {
              boardTemplate = html`
              ${boardTemplate}
                <tr>
                  ${(()=>{
                    let boardRow = html``
                    for (let column = 0; column < this.numberOfColumns; column++) {
                      boardRow = html`
                      ${boardRow}
                      <td>
                        <tasksistant-cell-component></tasksistant-cell-component>
                      </td>
                      `
                    }
                    return boardRow
                  })()}
                </tr>
              `}
              return boardTemplate
          } else {
            return html`
            <h2>Not enough rows</h2>
            `
          }
        })()}
      </table>
    </div>
    `;
  }
}
customElements.define("tasksistant-board-component", TasksistantBoardComponent);
