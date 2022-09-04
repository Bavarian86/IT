const {getTransportPrice} = require('../db/transportCost');

/** START
 * Stanil Temelkov
 */


/**
 * Here product object contains properties: amount, maxProducts, minOfPallets
 *
 * Algorithm:
 * 1. For each product calculate number of pallets and free space if any
 * 2. Combine pallets together:
 *    Sort array from step1 by number of pallet spaces required. First we start with the product required the most space
 *    and then trying to add products with less amount of space required.
 *    If free space is available we combine products together on the same pallet, otherwise just add pallets
 */
const calculateNumberOfPallets = (products) => {
    const palletSpaces = products.map((p) => calculatePalletSpacesPerProduct(p));
    palletSpaces.sort((a, b) => (b[0] - b[1]) - (a[0] - a[1]));

    return combinePallets(palletSpaces);
}

const combinePallets = (palletSpaces) => {
    const combinedResult = palletSpaces.reduce((prev, cur) => {
        if (prev[1] > cur[0] - cur[1]) {
            return [prev[0], prev[1] - (cur[0] - cur[1])];
        } else {
            return [prev[0] + cur[0], prev[1] + cur[1]];
        }
    }, [0, 0]);

    return Math.ceil(combinedResult[0]);
}

const calculatePalletSpacesPerProduct = (product) => {
    const numberOfPalletsRequired = Math.ceil(product.amount / product.maxProducts) * product.minOfPallets;
    const freeSpaces = numberOfPalletsRequired - product.amount / product.maxProducts * product.minOfPallets;

    return [Math.ceil(numberOfPalletsRequired), freeSpaces + Math.ceil(numberOfPalletsRequired) - numberOfPalletsRequired];
}

calculatePrice = async (products, distance) => {
    const numberOfPallets = calculateNumberOfPallets(products);
    const price = await getTransportPrice(numberOfPallets, distance);

    return [numberOfPallets, price];
}

module.exports = { calculatePrice };

/**
 * Stanil Temelkov
 END */

 /** FOLLOWING Testing concept and testing
 * Stanil Temelkov
 */


// 2 products tests
// console.log(calculateNumberOfPallets([
//     {amount: 12, maxProducts: 10, minOfPallets: 2},
//     {amount: 5, maxProducts: 25, minOfPallets: 1.2}
// ]));
//
// console.log(calculateNumberOfPallets([
//     {amount: 5, maxProducts: 25, minOfPallets: 1.2},
//     {amount: 12, maxProducts: 10, minOfPallets: 2}
// ]));
//
// console.log(calculateNumberOfPallets([
//     {amount: 25, maxProducts: 25, minOfPallets: 1.2},
//     {amount: 1, maxProducts: 10, minOfPallets: 2}
// ]));
//
// console.log(calculateNumberOfPallets([
//     {amount: 1, maxProducts: 10, minOfPallets: 2},
//     {amount: 25, maxProducts: 25, minOfPallets: 1.2}
// ]));

// 3 products tests
// console.log(calculateNumberOfPallets([
//     {amount: 1, maxProducts: 10, minOfPallets: 2},
//     {amount: 25, maxProducts: 25, minOfPallets: 1.2},
//     {amount: 15, maxProducts: 15, minOfPallets: 2.5},
// ]));
//
// console.log(calculateNumberOfPallets([
//     {amount: 1, maxProducts: 10, minOfPallets: 2},
//     {amount: 15, maxProducts: 15, minOfPallets: 2.5},
//     {amount: 25, maxProducts: 25, minOfPallets: 1.2},
// ]));
//
// console.log(calculateNumberOfPallets([
//     {amount: 25, maxProducts: 25, minOfPallets: 1.2},
//     {amount: 1, maxProducts: 10, minOfPallets: 2},
//     {amount: 15, maxProducts: 15, minOfPallets: 2.5},
// ]));
//
// console.log(calculateNumberOfPallets([
//     {amount: 25, maxProducts: 25, minOfPallets: 1.2},
//     {amount: 15, maxProducts: 15, minOfPallets: 2.5},
//     {amount: 1, maxProducts: 10, minOfPallets: 2},
// ]));
//
// console.log(calculateNumberOfPallets([
//     {amount: 15, maxProducts: 15, minOfPallets: 2.5},
//     {amount: 1, maxProducts: 10, minOfPallets: 2},
//     {amount: 25, maxProducts: 25, minOfPallets: 1.2},
// ]));
//
// console.log(calculateNumberOfPallets([
//     §{amount: 15, maxProducts: 15, minOfPallets: 2.5},
//     {amount: 25, maxProducts: 25, minOfPallets: 1.2},
//     {amount: 1, maxProducts: 10, minOfPallets: 2},
// ]));