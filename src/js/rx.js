import { fromEvent } from 'rxjs';
import { scan, map, throttleTime } from 'rxjs/operators';

fromEvent(document, 'click')
  .pipe(
    throttleTime(1000),
    map(event => event.clientX),
    scan((count, clientX) => count + clientX, 0),
  )
  .subscribe(count => console.log(`Clicked ${count} times`));
