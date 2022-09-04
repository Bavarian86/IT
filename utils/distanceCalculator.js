
/** Start
 * Stanil Temelkov
 */



const {getUserPLZ} = require("../db/users");
const {getSupplierPLZ} = require("../db/products");
const {getCoordinates} = require("../db/transportCost");

//This function takes in latitude and longitude of two location and returns the distance between them as the crow flies (in km)
const calcCrow = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // km
    const dLat = toRad(lat2-lat1);
    const dLon = toRad(lon2-lon1);
    lat1 = toRad(lat1);
    lat2 = toRad(lat2);

    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const d = R * c;

    return d;
}

const toRad = (val) => val * Math.PI / 180;

const calculateDistance = async (product, userId) => {
    const userPLZ = await getUserPLZ(userId);
    const supplierPLZ = await getSupplierPLZ(product);

    const [userLat, userLong] = await getCoordinates(userPLZ);
    const [supLat, supLong] = await getCoordinates(supplierPLZ);

    return calcCrow(userLat, userLong, supLat, supLong).toFixed(1);
}

module.exports = {
    calculateDistance,
}

/**
 * Stanil Temelkov
END  */
