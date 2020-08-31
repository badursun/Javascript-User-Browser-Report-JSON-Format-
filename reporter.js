let Result = {} ;
let UserInformation = {
	init: function(){
		UserInformation.chechCF();
		UserInformation.operatingSytem();
		UserInformation.osVersion();
		UserInformation.getLanguage();
		UserInformation.ScreenSizes();
		UserInformation.CheckCookie();
		UserInformation.checkSockets();
		UserInformation.getLocation();

		Result.timeStamp = (new Date()).toString();

		return Result;		
		return JSON.stringify( Result);			
	},
	operatingSytem: function() {
	    var OSName = "Unknown OS";
	    if (navigator.appVersion.indexOf("Win") != -1) OSName = "Windows";
	    if (navigator.appVersion.indexOf("Mac") != -1) OSName = "MacOS";
	    if (navigator.appVersion.indexOf("X11") != -1) OSName = "UNIX";
	    if (navigator.appVersion.indexOf("Linux") != -1) OSName = "Linux";

	    Result.operatingSytem = OSName;
	},
	osVersion: function(){
	    Result.osVersion = navigator.appVersion;
	},
	chechCF: function(){
		var myRequest = new Request('https://www.cloudflare.com/cdn-cgi/trace');
		fetch(myRequest).then(function(response) {
		    return response.text().then(function(text) {
				Result.IP 			= text.split("\n").filter(el => el.startsWith("ip=") ).join('\n').replace('ip=','');
				Result.TLS 			= text.split("\n").filter(el => el.startsWith("tls=") ).join('\n').replace('tls=','');
				Result.VisitScheme 	= text.split("\n").filter(el => el.startsWith("visit_scheme=") ).join('\n').replace('visit_scheme=','');
				Result.httpProtocol = text.split("\n").filter(el => el.startsWith("http=") ).join('\n').replace('http=','');
				Result.Location 	= text.split("\n").filter(el => el.startsWith("loc=") ).join('\n').replace('loc=','');
		    });
		});
	},
	getLanguage: function(){
		var NavObj = navigator;
		Result.Language = NavObj.language;
	},
	ScreenSizes: function(){
		var screenSize = '';
		if (screen.width) {
		    width = (screen.width) ? screen.width : '';
		    height = (screen.height) ? screen.height : '';
		    screenSize += '' + width + " x " + height;
		}
		Result.OrientationAngle = screen.orientation.angle;
		Result.Orientation 		= screen.orientation.type;
		Result.ColorDepth 		= screen.colorDepth;
		Result.ScreenSize 		= screenSize;
		Result.BrowserSize 		= ''+ document.documentElement.clientHeight +' x '+ document.documentElement.clientWidth +''
	},
	CheckCookie: function(){
		Result.CookieEnabled = (navigator.cookieEnabled) ? true : false;
	},
	checkSockets: function(){
		Result.Sockets = !!window.WebSocket;
	},
	getLocation: function(){
		if (navigator.geolocation) {
		    navigator.geolocation.getCurrentPosition( UserInformation.showPosition );
		} else {
			Result.Latitude 	= null;
			Result.Longitude 	= null;
		}
	},
	showPosition: function(position) {
		Result.Latitude 	= position.coords.latitude;
		Result.Longitude 	= position.coords.longitude;
	}


}







console.log( UserInformation.init() );
