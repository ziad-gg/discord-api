const { verifyKey } = require('discord-interactions');

module.exports.VerifyDiscordRequest = function (clientKey) {
  return function (req, res, buf, encoding) {
    const signature = req.get('X-Signature-Ed25519');
    const timestamp = req.get('X-Signature-Timestamp');

    const isValidRequest = verifyKey(buf, signature, timestamp, clientKey);
    if (!isValidRequest) {
      return res.status(401).end('Bad request signature');
    }
  }
}

module.exports.DiscordAPI = function DiscordAPI(url) { return 'https://discord.com/api/v9/' + url };