import './style.css';

import {
  of,
  from,
  map,
  filter,
  mergeMap,
  concatMap,
  switchMap,
  reduce,
  take,
  throwError,
  catchError,
  tap,
  finalize,
  forkJoin,
  startWith,
  interval,
  retry,
  scan,
  merge,
  takeUntil,
  timer,
  fromEvent,
  debounceTime,
  distinctUntilChanged,
  first,
  Subject,
  BehaviorSubject,
} from 'rxjs';

// const inputField = document.getElementById('inputF');

// fromEvent(inputField, 'change')
//   .pipe(
//     // filter((v) => v.target.value.length > 3),
//     // debounceTime(1000),
//     tap((v) => console.log(v.target.value))
//     // switchMap((v) => of(v + 't'))
//   )
//   .subscribe();

const newLine = () => console.log('');

/**
 * The most important rxjs operators with a few examples
 *
 * ---------------------------------------------------
 */
function ofFn() {
  // of
  console.warn('of');

  /**
   * Creates an Observable that emits some values you specify as arguments,
   * immediately one after the other, and then emits a complete notification.
   *
   * It is commonly used to create Observables from static values or to combine multiple values into a single
   * Observable.
   */
  const ofObs$ = of([1, 2, 3]);
  ofObs$.subscribe((value) => console.log(value)); // Output: 1 2 3

  newLine();
}
// ofFn();

function fromFn() {
  // from
  console.warn('from');

  /**
   * Creates an Observable from an array, an array-like object, a promise, an iterable
   * object, or an Observable-like object.
   */
  const fromObs$ = from([4, 5, 6]);
  fromObs$.subscribe((value) => console.log(value)); // Output: 4 5 6

  newLine();
}
// fromFn();

function tapFn() {
  // tap
  console.warn('tap');

  /**
   * Allows to perform side-effects or actions on the emitted values of an Observable,
   * without modifying the values.
   *
   * It is often used for debugging, logging or triggering actions
   */
  const tapObs$ = from([1, 2, 3]);
  tapObs$
    .pipe(
      tap((value) => value * 2),
      map((value) => value * 2)
    )
    .subscribe((value) => console.log('obs value', value));

  newLine();
}
// tapFn();

function mapFn() {
  // map
  console.warn('map');

  /**
   * Applies a given function to each value emitted by the source Observable,
   * and emits the resulting values as an Observable.
   *
   * Transforms data emitted by an Observable into a new format.
   * Map can perform operations, such as modifying values, extracting specific properties, or
   * event returning completely new objects.
   */
  const mapObs$ = of(1, 2, 3).pipe(map((value) => value * 2));
  mapObs$.subscribe((value) => console.log(value));

  newLine();
}
// mapFn();

function filterFn() {
  // filter
  console.warn('filter');

  /**
   * Filters the items emitted by the source Observable, only emitting values that
   * pass a specified condition.
   */
  const filterObs$ = of(1, 2, 3).pipe(
    map((value) => value * 2),
    filter((value) => value > 1)
  );
  filterObs$.subscribe((value) => console.log(value));

  newLine();
}
// filterFn();

function mergeMapFn() {
  // mergeMap
  console.warn('mergeMap');

  /**
   * Projects each source value to an Observable and merges the output Observables
   * into one Observable.
   */
  const mergeMapObs$ = of(1, 2, 3).pipe(
    mergeMap((value) => of(value, value * 2))
  );
  mergeMapObs$.subscribe((value) => console.log(value)); // Output: 1 2 2 4 3 6

  newLine();
}
// mergeMapFn();

function concatMapFn() {
  // concatMap
  console.warn('concatMap');

  /**
   * Projects each source value to an Observable and concatenates the output
   * Observables, in order, waiting for each one to complete before merging the next.
   *
   * Then it flattens and concatenates them in a sequential manner.
   * It maintains the order of emissions and waits for each inner Observable to complete before susbcribing to the next one.
   */
  const concatMapObs$ = of(1, 2, 3).pipe(
    concatMap((value) => of(value, value * 2))
  );
  concatMapObs$.subscribe((value) => console.log(value)); // Output: 1 2 2 4 3 6

  newLine();
}
// concatMapFn();

function switchMapFn() {
  // switchMap()
  console.warn('switchMap');

  /**
   * Maps each value to an Observable, then flattens all of these inner Observables
   * using switch.
   *
   * The switchMap operator is often used for handling asynchronous operations, such
   * as making HTTP requests in Angular.
   *
   * It transforms the values emitted by an Observable into a new Observable and
   * automatically unsubscribe from the previous inner Observable when a new value
   * arrives.
   */
  const switchMap$ = of(1, 2, 3).pipe(
    switchMap((value) => of(value, value * 2))
  );
  switchMap$.subscribe((value) => console.log(value)); // Output: 2 4

  newLine();
}
//switchMapFn();

function reduceFn() {
  // reduce
  console.warn('reduce');

  /**
   * Applies a function to each item emitted by the source Observable, sequentially,
   * and emits the final value.
   */
  const reduceObs$ = of(1, 2, 3).pipe(reduce((acc, value) => acc + value, 0));
  reduceObs$.subscribe((value) => console.log(value)); // Output: 6

  newLine();
}
// reduceFn();

function takeFn() {
  // take
  console.warn('take');

  /**
   * Emits only the first count values emitted by the source Observable.
   *
   * Take a specific number of values emitted by an Observable and then complete.
   *
   * It limits the stream to emit only the desired number of values.
   */
  const takeObs$ = of().pipe(first());
  takeObs$.subscribe((value) => console.log(value)); // Output: 1 2 3

  newLine();
}
// takeFn();

function catchErrorFn() {
  // catchError
  console.warn('catchError');

  /**
   * Catches errors on the observable to be handled by returning a new observable or throwing an error.
   *
   * It intercepts an error, allowing the user to recover from the error, log it, or provide an alternative calue or fallback behavior
   */
  const catchErrorObs$ = throwError(() => Error('This is an error!')).pipe(
    catchError((_) => interval(1000).pipe(take(3)))
  );
  catchErrorObs$.subscribe({
    next: console.log,
    complete: () => console.log('complete'),
    error: console.warn,
  }); // Output: Caught error: This is an error!

  newLine();
}
// catchErrorFn();

function finalizeFn() {
  // finalize
  console.warn('finalize');

  /**
   * The finalize() operator allows you to perform a specified action when an Observable completes or errors,
   * regardless of whether it emits values or not
   *
   * It is often used to release resources or perform cleanup operations.
   *
   */
  const finalizeObs$ = interval(1000).pipe(
    take(3),
    finalize(() => {
      // Cleanup or final action
      console.log('Observable completed');
    })
  );
  finalizeObs$.subscribe((value) => console.log(value));

  newLine();
}
// finalizeFn();

function forkJoinFn() {
  // forkJoin
  console.warn('forkJoin');

  const subject = new BehaviorSubject('Hello122');
  subject.next('Hello');

  /**
   * The forkJoin() operator combines multiple Observables into a single Observable that emits an array of
   * values from each source Observable
   *
   * But ONLY, when all source Observables have completed.
   *
   * It waits for the Observables to emit their final value and then emits an array of those values.
   */
  const forkJoinObs1$ = subject.asObservable().pipe(take(1));
  const forkJoinObs2$ = of('World');

  forkJoin([forkJoinObs1$, forkJoinObs2$]).subscribe((results) => {
    console.log(`${results[0]} ${results[1]}`);
  });

  newLine();
}
// forkJoinFn();

function startWithFn() {
  // startWith
  console.warn('startWith');

  /**
   * The startWith operator allows you to prepend a default or initial value to an Observable sequence.
   *
   * The prepended value will be emitted as the first value in the stream.
   */
  const startWithObs$ = of(1, 2, 3);

  startWithObs$.pipe(startWith(0)).subscribe((value) => console.log(value));
  newLine();
}
// startWithFn();

function retryFn() {
  // retry
  console.warn('retry');

  /**
   * The retry operator allows you to retry the emission of values from an Observable, when it encounters
   * an error
   *
   * It takes the number of retry attempts as a parameter and resubscribes to the source Observable.
   *
   * TODO(FM): Tinker with the retry count during the live session
   */
  const retryCount = 5;
  let counter = 0;

  const retryObs$ = throwError(() => Error('Error')).pipe(
    catchError((err) => {
      if (counter < 5) {
        return throwError(() => Error(err)).pipe(
          tap({ error: () => console.log('retrying', counter++) })
        );
      }
      return of('it works');
    }),
    retry(retryCount)
  );
  retryObs$.subscribe({
    next: (value) => console.log(value),
    error: (err) => console.error(err),
  });

  newLine();
}
// retryFn();

function mergeFn() {
  // merge
  console.warn('merge');

  const mergeObs1$ = interval(1000).pipe(map((value) => `Obs1: ${value}`));
  const mergeObs2$ = from([4, 5, 6]).pipe(map((value) => `Obs2: ${value}`));

  /**
   * The merge operator combines multiple Observables into a single Observable that
   * emits values from all the merged Observables concurrently.
   */
  const mergedObs$ = merge(mergeObs1$, mergeObs2$);
  mergedObs$.subscribe((value) => console.log(value));

  newLine();
}
// mergeFn();

function scanFn() {
  // scan
  console.warn('scan');

  /**
   * The scan operator applies an accumulator function over the values emitted by an
   * Observable.
   *
   * Emits the accumulated result after reach emission.
   * The reduce function only emits after the source Observable completes.
   */
  const scanObs$ = from([1, 2, 3, 4, 5]).pipe(
    scan((acc, value) => acc + value, 0)
  );
  scanObs$.subscribe((value) => console.log(value));

  newLine();
}
// scanFn();

function takeUntilFn() {
  // takeUntil
  console.warn('takeUntil');

  /**
   * The takeUntil operator allows to complete an Observable when another Observable
   * emits an error.
   *
   * It takes a second Observable as a parameter and completes the source Observable
   * as soon as the second Observable emits a value.
   */
  const source$ = interval(1000);
  const stopper$ = timer(6000);

  const takeUntilObs$ = source$.pipe(takeUntil(stopper$));
  takeUntilObs$.subscribe({
    next: (value) => console.log(value),
    complete: () => console.log('takeUntil completed!'),
  });

  newLine();
}
// takeUntilFn();
