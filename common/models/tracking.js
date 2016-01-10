function isFunctionA(functionToCheck) {
 var getType = {};
 return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}
function logRequest(req) {
var pars = req
var output = '';
for (var property in pars) {
if (isFunctionA(pars[property])) {
//output += property + ': ' + pars[property]+';\n-----------------------------------------\n ';
} else {
  output += property + ': ' + pars[property]+';\n ';
}
}
console.log("req="+output);
}


module.exports = function(Tracking) {
   Tracking.webhookRoximity = function(req, res, cb) {
      var device_alias=req.param("device_alias")
      var deviceDecrypted=new Buffer(device_alias, 'base64').toString('ascii')
      var data = req.body
      var dataString = JSON.stringify(data, null, 4)
      console.log('-----------------------------------------------------------------');
      console.log('device <'+deviceDecrypted+'> beacon data arrived');
      console.log('data\n'+dataString);
	//var deviceJSON = JSON.parse(deviceDecrypted)
        //var customerId = deviceJSON.customerId
        //var email = deviceJSON.email

      cb(null, 'beacon data saved (len='+dataString.length+')');
    }
   Tracking.remoteMethod(
        'webhookRoximity',
        {
          accepts: [
                {arg: 'req', type: 'object', 'http': {source: 'req'}},
                {arg: 'res', type: 'object', 'http': {source: 'res'}}
          ],
          returns: {arg: 'result', type: 'string'},
          http: {path: '/webhookRoximity', verb: 'post'}
        }
    )
};

