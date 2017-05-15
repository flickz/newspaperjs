function wrapValue(n){
    let localVariable = n;
    return () => n;
}

let wrap1 = wrapValue(1)
let wrap2 = wrapValue(2)

console.log(wrap1(), wrap2());

