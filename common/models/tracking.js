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

function splitDeviceAlias(device_alias) {
	var arr = device_alias.split("$")
	if (arr && arr.length === 2) {
		return arr
	} else {
		return device_alias.split("/")
	}
}


module.exports = function(Tracking) {
   Tracking.webhookRoximity = function(req, res, cb) {
	var debug = true
	var debug2 = false
	var data = req.body
      	var deviceDecrypted=data["device_alias"]
	if (debug2) {
		var dataString = JSON.stringify(data, null, 4)
        	console.log('-----------------------------------------------------------------');
        	console.log('device <'+deviceDecrypted+'> beacon data arrived');
		console.log('data\n'+dataString)
	}
	var splittedDeviceAlias = splitDeviceAlias(deviceDecrypted)
        var customerId = splittedDeviceAlias[0]
        var email = splittedDeviceAlias[1]
	var newTrackingObject = null

	// triggered at = 1451475051.728004
	//                seconds    milliseconds
	// create a new timestamp for date with miliseconds before .
	var triggeredAtAsTime = Math.floor(data["triggered_at"]*1000)
	//var timeZoneOffset = new Date().getTimezoneOffset() * 60 * 1000
	var timeZoneOffset = 0
	var triggeredAtAsDate = new Date(triggeredAtAsTime - timeZoneOffset)
	var dateNow = new Date(Date.now() - timeZoneOffset)
	if (debug) { console.log(dateNow.toString()+' - email <'+email+'> id <'+customerId+' unpacked device_alias'); }
	this.create({
		id: 0,
		altitude: data["location"]["alt"].toString(),
		h_accuracy: data["location"]["h_accuracy"].toString(),
		speed: data["location"]["speed"].toString(),
		trigger_id: data["trigger_id"],
		longitude: data["location"]["lon"].toString(),
		latitude: data["location"]["lat"].toString(),
		event: data["event"],
		device_alias: deviceDecrypted,
		created: dateNow,
		application_id: data["application_id"],
		action_id: data["action_id"],
		bearing: data["location"]["bearing"].toString(),
		tags: data["tags"][0],
		trigger_name: data["trigger"]["name"],
		trigger_type: data["trigger_type"],
		triggered_at: data["triggered_at"].toString(),
		triggered_at_date: triggeredAtAsDate,
		customer_id: customerId
	}, function (err, newTracking) {
		if (err) {
			console.log("error while creating tracking"+err);
			cb(err, 'beacon not saved');
		} else {
			newTrackingObject = newTracking	
			if (debug) { console.log(dateNow.toString()+" - new tracking generated with id "+newTracking.id+' for '+email) }
        		cb(null, 'beacon data saved (id ='+newTracking.id+')')
		}
	});
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

