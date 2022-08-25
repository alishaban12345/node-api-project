// import math from './math'
const math=require('./math')
test('calcualte multiply', () => {
    const total = math.multiplication(10,10);
    if (total !== 100){
        throw new Error ('total should be 100. but got',total)
    }
})
test('calcualte addition', () => {
    const total = math.addition(10,10);
    if (total !== 20){
        throw new Error ('total should be 20. but got',total)
    }
})





// test('hello word', () => {
//     throw new Error('faliure');
// })