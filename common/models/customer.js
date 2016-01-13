module.exports = function(Customer) {
Customer.disableRemoteMethod('__create__lastTrackings', true);                // Removes (POST) /products
Customer.disableRemoteMethod('__upsert__lastTrackings', true);                // Removes (PUT) /products
Customer.disableRemoteMethod('__deleteById__lastTrackings', true);            // Removes (DELETE) /products/:id
Customer.disableRemoteMethod("__updateAll__lastTrackings", true);               // Removes (POST) /products/update
Customer.disableRemoteMethod("__updateAttributes__lastTrackings", false);       // Removes (PUT) /products/:id
Customer.disableRemoteMethod('__createChangeStream__lastTrackings', true);    // removes (GET|POST) /products/change-stream
};
