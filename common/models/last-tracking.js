module.exports = function(LastTracking) {
LastTracking.disableRemoteMethod('create', true);                // Removes (POST) /products
LastTracking.disableRemoteMethod('upsert', true);                // Removes (PUT) /products
LastTracking.disableRemoteMethod('deleteById', true);            // Removes (DELETE) /products/:id
LastTracking.disableRemoteMethod("updateAll", true);               // Removes (POST) /products/update
LastTracking.disableRemoteMethod("updateAttributes", false);       // Removes (PUT) /products/:id
LastTracking.disableRemoteMethod('createChangeStream', true);    // removes (GET|POST) /products/change-stream

};
