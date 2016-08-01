var fs = require('fs'),
    cors_proxy = require('cors-anywhere');

var host = '0.0.0.0',
    port = 8089;
 
var keyfile = 'cert/janusweb_lnq_to.key',
    certfile = 'cert/janusweb_lnq_to.crt',
    certchainfiles = [
      'COMODORSADomainValidationSecureServerCA.crt',
      'COMODORSAAddTrustCA.crt',
      'AddTrustExternalCARoot.crt'
    ];

var ca = [];
certchainfiles.forEach(function(file) {
  ca.push(fs.readFileSync("cert/" + file))
});

var httpsOptions = {
  ca: ca,
  key: fs.readFileSync(keyfile),
  cert: fs.readFileSync(certfile)
};
cors_proxy.createServer({
  originWhitelist: [], // Allow all origins 
  //requireHeader: ['origin', 'x-requested-with'],
  //removeHeaders: ['cookie', 'cookie2']
  removeHeaders: ['user-agent'],
  setHeaders: {
    'user-agent': 'FireBox 1.0',
  },
  httpProxyOptions: {
    secure: false
  },
  httpsOptions: httpsOptions,
}).listen(port, host, function() {
  console.log('Running CORS Anywhere on ' + host + ':' + port);
});

