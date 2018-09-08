interface ArrayFunction<T> {
  (ary: Array<any>): Array<T>;
}
export default function takeMapFn<T>(fn: () => T) : ArrayFunction<T> {
  return function map(ary: Array<any>) : Array<T> {
    return ary.map(fn);
  }
}
