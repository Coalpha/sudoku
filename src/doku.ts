export default ((str: string) => str.split('\n').slice(1, -1).map(row => row.split('').map(v => +v)));
