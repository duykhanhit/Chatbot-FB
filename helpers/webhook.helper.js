const request = require('request');
const mess_md = require('../models/message.model');
const axios = require('axios');

module.exports.handleMessage = async (sender_psid, received_message) => {

    let response;
    let listHotWords = ['lồn', 'buồi', 'cặc', 'vú', 'đm', 'dm', 'địt', 'đụ', 'chịch', 'xoạc'];

    let dataCorona = await axios.get('https://code.junookyo.xyz/api/ncov-moh/data.json');
    let dataMessage = await mess_md.find();

    console.log(dataCorona.data);

    let casesG = dataCorona.data.data.global.cases;
    let deathsG = dataCorona.data.data.global.deaths;
    let recoveredG = dataCorona.data.data.global.recovered;

    let casesVN = dataCorona.data.data.vietnam.cases;
    let deathsVN = dataCorona.data.data.vietnam.deaths;
    let recoveredVN = dataCorona.data.data.vietnam.recovered;

    let restext;
  
    if (received_message.text) {
      for(let i = 0; i < dataMessage.length; i++) {
        if(dataMessage[i].question.toLowerCase() === received_message.text.toLowerCase()){
          restext = dataMessage[i];
        }
      }
      if(restext){
        response = {
          "text": restext.answer
        } 
      }else{
        response = {
          "text": `Tôi chưa biết cách trả lời câu này. Hãy liên hệ với chủ nhân của tôi để biết cách dạy tôi nói. Hotline: 113 ...`
        }
      }
      if(received_message.text.toLowerCase() === 'ncov'){
        response = {
          "text": `THÔNG TIN DỊCH BỆNH CORONA
-Thế giới:
--Số ca nhiễm: ${casesG}.
--Số ca tử vong: ${deathsG}.
--Số ca bình phục: ${recoveredG}.
-Việt Nam:
--Số ca nhiễm: ${casesVN}.
--Số ca tử vong: ${deathsVN}.
--Số ca bình phục: ${recoveredVN}.`
        }
      }
      if(received_message.text.toLowerCase() === 'help'){
        response = {
          "text": `Chào mừng bạn đến với trung tâm trợ giúp.
- Chat "ncov" để xem tình hình bệnh dịch Corona.
- Chat "rules" để xem cách sử dụng tôi.
- Đang cập nhật....
          `
        }
      }
      if(received_message.text.toLowerCase() === 'rules'){
        response = {
          "text": `Hãy viết đúng tiếng Việt có dấu và đúng chính tả để tôi có thể trả lời chính xác nhất.`
        }
      }
      if(received_message.text.toLowerCase() === 'info'){
        response = {
          "text": `Tôi được tạo ra bởi một người yêu mèo nhưng không có mèo 😒. Thật sự bất hạnh quá đi mà...`
        }
      }
      if(received_message.text.toLowerCase() === 'version'){
        response = {
          "text": `Bot auto chat v1.0 chúc bạn có trải nghiệm vui vẻ.`
        }
      }
      if(listHotWords.find((word) => received_message.text.toLowerCase().indexOf(word) !== -1 )){
        response = {
          "text": `Không được nói bậy nha!`
        }
      }
    } else if (received_message.attachments) {
      let attachment_url = received_message.attachments[0].payload.url;
      response = {
        "attachment": {
          "type": "template",
          "payload": {
            "template_type": "generic",
            "elements": [{
              "title": "Bạn muốn tôi nhận xét về bức ảnh này?",
              "subtitle": "Tap a button to answer.",
              "image_url": attachment_url,
              "buttons": [
                {
                  "type": "postback",
                  "title": "Yes!",
                  "payload": "yes",
                },
                {
                  "type": "postback",
                  "title": "No!",
                  "payload": "no",
                }
              ],
            }]
          }
        }
      }
    }
  
    callSendAPI(sender_psid, response);
  }
  
  // Handles messaging_postbacks events
module.exports.handlePostback = (sender_psid, received_postback) => {
    let response;
  
    let payload = received_postback.payload;
  
    if (payload === 'yes') {
      response = { "text": "Xấu dã man -.-!" }
    } else if (payload === 'no') {
      response = { "text": "Vậy thì thôi." }
    }
    callSendAPI(sender_psid, response);
  }
  
  // Sends response messages via the Send API
function callSendAPI(sender_psid, response) {
    let request_body = {
      "recipient": {
        "id": sender_psid
      },
      "message": response
    }
  
    request({
      "uri": "https://graph.facebook.com/v2.6/me/messages",
      "qs": { "access_token": 'token của fanpage' },
      "method": "POST",
      "json": request_body
    }, (err, res, body) => {
      if (!err) {
        console.log('Done');
      } else {
        console.error("Unable to send message:" + err);
      }
    });
  }