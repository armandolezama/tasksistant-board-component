import { LitElement, html } from 'lit-element';
import '@tasksistant-components/tasksistant-cell-component';
import styles from './tasksistant-board-component-styles';

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
    this.currenNode = {};
  };

  /**
   * Object describing property-related metadata used by Polymer features
   */
  static get properties() {
    return {
      numberOfRows: { type: Number },
      numberOfColumns: { type: Number },
      boardSpace: { type: Array },
      boardDirectory: { type: Array },
      currentNode: { type: Object },
    };
  };

  static get styles() {
    return styles;
  };

  manageNodeFilled() {};

  manageNodeCleaned() {};

  removeCurrentNodeActiveStyle() {
    this.currenNode.cell.classList.remove('active');
  };

  addCurrentNodeActiveStyle() {
    this.currenNode.cell.classList.add('active');
  };

  navigateFromCurrentNodeTo(direction) {
    if (this.currenNode.cell[direction].cellReference.cell) {
      this.removeCurrentNodeActiveStyle();
      const xAxis = this.currenNode.coordinates[0];
      const yAxis = this.currenNode.coordinates[1];
      switch (direction) {
        case "left":
          this.currenNode = this.boardSpace[xAxis][yAxis - 1];
          break;
        case "right":
          this.currenNode = this.boardSpace[xAxis][yAxis + 1];
          break;
        case "top":
          this.currenNode = this.boardSpace[xAxis - 1][yAxis];
          break;
        case "bottom":
          this.currenNode = this.boardSpace[xAxis + 1][yAxis];
          break;
      };
      this.addCurrentNodeActiveStyle();
      this.dispatchEvent(
        new CustomEvent("tasksistant-board-current-node-changed", {
          detail: {
            currenNode: this.currenNode,
          },
        })
      );
    } else {
      this.dispatchEvent(new CustomEvent("tasksistant-board-new-node-missing"));
    };
  };

  linkHTMLElements() {
    for (let row = 0; row < this.numberOfRows; row++) {
      this.boardSpace[row] = [];
      for (let column = 0; column < this.numberOfColumns; column++) {
        this.boardSpace[row][column] = {
          cell: this.shadowRoot.getElementById(
            `tasksistant-cell-${row}-${column}`
          ),
          item: this.shadowRoot.getElementById(
            `tasksistant-item-${row}-${column}`
          ),
          coordinates: [row, column],
        };
      };
    };
  };

  linkByDirection(direction = "", coordinates = []) {
    if (direction !== "" && coordinates.length === 2) {
      const row = coordinates[0];
      const column = coordinates[1];
      const nodeOrigin = this.boardSpace[row][column];
      let nodeDestiny = [];
      switch (direction) {
        case "left":
          nodeDestiny = this.boardSpace[row][column - 1];
          nodeOrigin.cell[direction].cellReference = nodeDestiny;
          nodeDestiny.cell.right.cellReference = nodeOrigin;
          break;
        case "right":
          nodeDestiny = this.boardSpace[row][column + 1];
          nodeOrigin.cell[direction].cellReference = nodeDestiny;
          nodeDestiny.cell.left.cellReference = nodeOrigin;
          break;
        case "top":
          nodeDestiny = this.boardSpace[row - 1][column];
          nodeOrigin.cell[direction].cellReference = nodeDestiny;
          nodeDestiny.cell.bottom.cellReference = nodeOrigin;
          break;
        case "bottom":
          nodeDestiny = this.boardSpace[row + 1][column];
          nodeOrigin.cell[direction].cellReference = nodeDestiny;
          nodeDestiny.cell.top.cellReference = nodeOrigin;
          break;
      };
    };
  };

  linkBoardCells() {
    for (const row of this.boardSpace) {
      for (const cell of row) {
        if (cell.coordinates[0] < this.numberOfRows - 1) {
          this.linkByDirection("bottom", cell.coordinates);
        }
        if (cell.coordinates[1] < this.numberOfColumns - 1) {
          this.linkByDirection("right", cell.coordinates);
        };
      };
    };
  };

  linkBoardSpace() {
    this.linkHTMLElements();
    this.linkBoardCells();
    this.currenNode = this.boardSpace[0][0];
    this.addCurrentNodeActiveStyle();
  };

  render() {
    return html`
      <div id="main-container">
        <table id="board-table">
          ${(() => {
            if (this.numberOfRows > 0 && this.numberOfColumns > 0) {
              let boardTemplate = html``;
              for (let row = 0; row < this.numberOfRows; row++) {
                boardTemplate = html`
                  ${boardTemplate}
                  <tr id="board-row-${row}">
                    ${(() => {
                      let boardRow = html``;
                      for (
                        let column = 0;
                        column < this.numberOfColumns;
                        column++
                      ) {
                        boardRow = html`
                          ${boardRow}
                          <td>
                            <tasksistant-cell-component
                              id="tasksistant-cell-${row}-${column}"
                              @tasksistant-cell-component-node-content-added="${this
                                .manageNodeFilled}"
                              @tasksistant-cell-component-node-content-deleted="${this
                                .manageNodeCleaned}"
                            >
                              <div slot="node-slot">
                                <h3 id="tasksistant-item-${row}-${column}">
                                  hello from node ${row} ${column}
                                </h3>
                              </div>
                            </tasksistant-cell-component>
                          </td>
                        `;
                      }
                      return boardRow;
                    })()}
                  </tr>
                `;
              }
              return boardTemplate;
            } else {
              return html`
                ${this.numberOfRows === 0
                  ? html`<h2>Not enough rows</h2>`
                  : this.numberOfColumns === 0
                  ? html`<h2>Not enough columns</h2>`
                  : this.numberOfColumns}
              `;
            };
          })()}
        </table>
      </div>
    `;
  };
};
customElements.define("tasksistant-board-component", TasksistantBoardComponent);
