export default ((...fns: Array<Function>) : Function => (v: any) : any => fns.reduce((a, fn) => fn(a), v));
