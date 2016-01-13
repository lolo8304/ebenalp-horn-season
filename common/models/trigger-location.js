module.exports = function(TriggerLocation) {
TriggerLocation.disableRemoteMethod('create', true);                // Removes (POST) /products
TriggerLocation.disableRemoteMethod('upsert', true);                // Removes (PUT) /products
TriggerLocation.disableRemoteMethod('deleteById', true);            // Removes (DELETE) /products/:id
TriggerLocation.disableRemoteMethod("updateAll", true);               // Removes (POST) /products/update
TriggerLocation.disableRemoteMethod("updateAttributes", false);       // Removes (PUT) /products/:id
TriggerLocation.disableRemoteMethod('createChangeStream', true);    // removes (GET|POST) /products/change-stream

};
