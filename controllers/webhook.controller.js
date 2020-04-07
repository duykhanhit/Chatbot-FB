const webhook_help = require('../helpers/webhook.helper');

module.exports.getWebhook = (req, res) => {
    let VERIFY_TOKEN = "cái này xác mih lúc thêm page trên facebook developers";

    let mode = req.query['hub.mode'];
    let token = req.query['hub.verify_token'];
    let challegen = req.query['hub.challenge'];
  
    if (mode && token) {
      if (mode === 'subscribe' && token === VERIFY_TOKEN) {
        console.log('WEBHOOK_VERIFIED');
        res.status(200).send(challegen);
      } else {
        res.sendStatus(403);
      }
    }
}

module.exports.postWebhook = (req, res) => {
    let body = req.body;

    if (body.object === 'page') {
      body.entry.forEach(function (entry) {
  
        let webhook_event = entry.messaging[0];
        console.log(webhook_event);
  
        let sender_psid = webhook_event.sender.id;
        console.log('Sender PSID: ' + sender_psid);
  
        if (webhook_event.message) {
            webhook_help.handleMessage(sender_psid, webhook_event.message);
        } else if (webhook_event.postback) {
            webhook_help.handlePostback(sender_psid, webhook_event.postback);
        }
  
      });
  
      res.status(200).send('EVENT_RECEIVED');
    } else {
      res.status(404);
    }
}