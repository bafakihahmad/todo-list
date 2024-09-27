class todo {
  constructor(work, state = false) {
    this.work = work;
    this.state = state;
  }

  completeTask() {
    this.state = true;
  }
}

module.exports = todo;
