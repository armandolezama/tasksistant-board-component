import { LitElement, html } from "lit-element";
import styles from "./tasksistant-board-component-styles";

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
    this.rowSelected = 0;
    this.columnSelected = 0;
    this.allowNavigation = false;
  };

  /**
   * Object describing property-related metadata used by Polymer features
   */
  static get properties() {
    return {
      numberOfRows: { type: Number },
      numberOfColumns: { type: Number },
      rowSelected: {type: Number},
      columnSelected: {type: Number}
    };
  };

  static get styles() {
    return styles;
  };

  set rowSelected(value) {
    let oldValue = this._rowSelected;
    if(this.allowNavigation && value !== undefined && value !== oldValue && this.columnSelected !== undefined) {
      this.focusScrollOnCell(value, this.columnSelected);
    };
    this._rowSelected = value;
  };

  get rowSelected() {return this._rowSelected};

  set columnSelected(value) {
    let oldValue = this._columnSelected;
    if(this.allowNavigation && value !== undefined && value !== oldValue && this.rowSelected !== undefined) {
      this.focusScrollOnCell(this.rowSelected, value);
    };
    this._columnSelected = value;
  };

  get columnSelected() {return this._columnSelected};

  firstUpdated(){
    this.allowNavigation = true;
  };

  removeFocusStyle(row = 0, column = 0) {
    this.shadowRoot.getElementById(`cell-${row}-${column}`).classList.remove("focused");
  };

  addFocusStyle(row = 0, column = 0) {
    this.shadowRoot.getElementById(`cell-${row}-${column}`).classList.add("focused");
  };

  focusScrollOnCell(row = 0, column = 0) {
    this.shadowRoot.getElementById(`cell-${row}-${column}`).scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "center",
    });
    this.dispatchEvent(new CustomEvent('board-component-focused-on-cell', {detail: this.shadowRoot.getElementById(`cell-${row}-${column}`) }))
  };

  getCellByCoordinates(row = 0, column = 0) {
    if(row + 1 && column + 1 && row < parseInt(this.numberOfRows) && column < parseInt(this.numberOfColumns)){
      return this.shadowRoot.getElementById(`cell-${row}-${column}`);
    };
  };

  resetBoard() {
    this.numberOfRows = 0;
    this.numberOfColumns = 0;
  };

  createTable() {
    if (this.numberOfRows > 0 && this.numberOfColumns > 0) {
      let boardTemplate = html``;
        for (let row = 0; row < this.numberOfRows; row++) {
          boardTemplate = html`
            ${boardTemplate}
            <tr id="board-row-${row}" class="taksistant-table-row">
              ${this.createRow(row)}
            </tr>
          `;
        };
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
  };

  createRow(row) {
    let boardRow = html``;
      for (let column = 0; column < this.numberOfColumns; column++) {
        boardRow = html`
          ${boardRow}
          <td class="tasksistant-table-cell">
            <canvas id="cell-${row}-${column}" height="400" width="400"></canvas>
          </td>
        `;
      };
    return boardRow;
  };

  render() {
    return html`
      <div id="main-container">
        <table id="board-table">
          ${this.createTable()}
        </table>
      </div>
    `;
  };
};
customElements.define("tasksistant-board-component", TasksistantBoardComponent);
