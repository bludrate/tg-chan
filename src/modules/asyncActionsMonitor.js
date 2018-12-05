const promiseFinally = require('promise.prototype.finally');

// Add `finally()` to `Promise.prototype`
promiseFinally.shim();

class AsyncActionsMonitor{
  actions = [];

  constructor() {
    this.promise = new Promise(( resolve )=>{
      this.resolve = resolve;
    });
  }

  addAction( promise ){
    this.actions.push( promise );

    promise.finally( () => {
      const index = this.actions.indexOf( promise );

      this.actions.splice( index, 1 );

      if ( !this.actions.length ) {
        this.resolve();
      }
    } );
  }
}

export default new AsyncActionsMonitor();
