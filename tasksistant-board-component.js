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

  static get styles() { 
    return styles;}

  manageNodeFilled() {};

  manageNodeCleaned() {};

  linkHTMLElements() {
    for (let row = 0; row < this.numberOfRows; row++) {
      this.boardSpace[row] = []
      for (let column = 0; column < this.numberOfColumns; column++) {
        this.boardSpace[row][column] = {
          cell: this.shadowRoot.getElementById(`tasksistant-cell-${row}-${column}`),
          item: this.shadowRoot.getElementById(`tasksistant-item-${row}-${column}`),
          coordinates: [row, column]
          };
      };
    };
  }

  linkByDirection(direction = '', coordinates = []) {
    if(direction !== '' && coordinates.length === 2) {
      const row = coordinates[0];
      const column = coordinates[1];
      const nodeOrigin = this.boardSpace[row][column].cell;
      let nodeDestiny = {};
      switch (direction) {
        case 'left':
          nodeDestiny = this.boardSpace[row][column - 1].cell;
          nodeOrigin[direction] = nodeDestiny;
          nodeDestiny.right.cellReference = nodeOrigin;
          break;
        case 'right':
          nodeDestiny = this.boardSpace[row][column + 1].cell;
          nodeOrigin[direction] = nodeDestiny;
          nodeDestiny.left.cellReference = nodeOrigin;
          break;
        case 'top':
          nodeDestiny = this.boardSpace[row - 1][column].cell;
          nodeOrigin[direction] = nodeDestiny;
          nodeDestiny.bottom.cellReference = nodeOrigin;
          break;
        case 'bottom':
          nodeDestiny = this.boardSpace[row + 1][column].cell;
          nodeOrigin[direction] = nodeDestiny;
          nodeDestiny.top.cellReference = nodeOrigin;
          break;
      }
    };
  }

  linkBoardCells() {
    for (const row of this.boardSpace) {
      for (const cell of row) {
        if(cell.coordinates[0] < this.numberOfRows - 2) {
          this.linkByDirection('bottom', cell.coordinates);
        }
        if(cell.coordinates[1] < this.numberOfColumns - 2) {
          this.linkByDirection('right', cell.coordinates);
        }
      };
    };
  }

  linkBoardSpace() {
    this.linkHTMLElements();
    this.linkBoardCells();
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
                        <tasksistant-cell-component id="tasksistant-cell-${row}-${column}"
                        @tasksistant-cell-component-node-content-added="${this.manageNodeFilled}"
                        @tasksistant-cell-component-node-content-deleted="${this.manageNodeCleaned}">
                          <div slot="node-slot">
                            <h3 id="tasksistant-item-${row}-${column}">hello from node ${row} ${column}</h3>
                          </div>
                        </tasksistant-cell-component>
                      </td>
                      `
                    };
                    return boardRow
                  })()}
                </tr>
              `};
              return boardTemplate
          } else {
            return html`
            ${this.numberOfRows === 0 ? html`<h2>Not enough rows</h2>` : this.numberOfColumns === 0 ? html`<h2>Not enough columns</h2>` : this.numberOfColumns}
            `
          };
        })()}
      </table>
    </div>
    `;
  }
}
customElements.define("tasksistant-board-component", TasksistantBoardComponent);
