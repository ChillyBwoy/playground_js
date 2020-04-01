class Counter {
  constructor(limit, $el) {
    this.limit = limit;
    this.$el = $el;
    this.count = 0;

    this.run = this.run.bind(this);
  }

  asPct() {
    const pct = (this.count * 100) / this.limit;
    return `${pct.toFixed(3)} %`;
  }

  run() {
    this.count += 100;
    this.$el.innerHTML = this.asPct();

    if (this.count < this.limit) {
      setTimeout(this.run, 100);
    }
  }
}

const counter = new Counter(1e7, document.getElementById('progress'));

counter.run();
