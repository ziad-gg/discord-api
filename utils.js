import { verifyKey } from 'discord-interactions';

export function VerifyDiscordRequest(clientKey) {
  return function (req, res, buf, encoding) {
    const signature = req.get('X-Signature-Ed25519');
    const timestamp = req.get('X-Signature-Timestamp');

    const isValidRequest = verifyKey(buf, signature, timestamp, clientKey);
    if (!isValidRequest) {
      return res.status(401).end('Bad request signature');
    }
  }
}

export function DiscordAPI(url) { return 'https://discord.com/api/v9/' + url };