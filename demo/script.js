const toDo = () => {
    const component = document.querySelector('tasksistant-board-component');
    component.numberOfRows = 4;
    component.numberOfColumns = 4;
}

customElements.whenDefined('tasksistant-board-component').then(toDo)