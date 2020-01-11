var encode = function(string) { return Buffer.from(string, 'binary').toString('base64') };
var decode = function(string) { return Buffer.from(string, 'base64').toString() };

export { encode, decode };