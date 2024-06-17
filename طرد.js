const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();

const PAGE_ACCESS_TOKEN = 'YOUR_PAGE_ACCESS_TOKEN';

app.set('port', (process.env.PORT || 5000));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/webhook', (req, res) => {
    if (req.query['hub.verify_token'] === 'YOUR_VERIFY_TOKEN') {
        res.send(req.query['hub.challenge']);
    }
    res.send('Error, wrong validation token');
});

app.post('/webhook', (req, res) => {
    let messaging_events = req.body.entry[0].messaging;
    for (let i = 0; i < messaging_events.length; i++) {
        let event = messaging_events[i];
        let sender = event.sender.id;
        if (event.message && event.message.text) {
            let text = event.message.text;
            if (text === 'سؤالك هنا') {
                sendTextMessage(sender, 'جوابك هنا');
            } else {
                sendTextMessage(sender, 'آسف، لم أفهم سؤالك.');
            }
        }
    }
    res.sendStatus(200);
});

function sendTextMessage(sender, text) {
    let messageData = {text: text};
    request({
        url: 'https://graph.facebook.com/v12.0/me/messages',
        qs: {access_token: PAGE_ACCESS_TOKEN},
        method: 'POST',
        json: {
            recipient: {id: sender},
            message: messageData,
        }
    }, function (error, response, body) {
        if (error) {
            console.log('Error sending messages: ', error);
        } else if (response.body.error) {
            console.log('Error: ', response.body.error);
        }
    });
}

app.listen(app.get('port'), () => {
    console.log('Node app is running on port', app.get('port'));
});


طبعًا! ها هو كود بسيط لبوت فيسبوك ماسنجر بلغة JavaScript يقوم بتعليم البوت سؤالًا وجوابه:

```javascript
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();

const PAGE_ACCESS_TOKEN = 'YOUR_PAGE_ACCESS_TOKEN';

app.set('port', (process.env.PORT || 5000));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/webhook', (req, res) => {
    if (req.query['hub.verify_token'] === 'YOUR_VERIFY_TOKEN') {
        res.send(req.query['hub.challenge']);
    }
    res.send('Error, wrong validation token');
});

app.post('/webhook', (req, res) => {
    let messaging_events = req.body.entry[0].messaging;
    for (let i = 0; i < messaging_events.length; i++) {
        let event = messaging_events[i];
        let sender = event.sender.id;
        if (event.message && event.message.text) {
            let text = event.message.text;
            if (text === 'سؤالك هنا') {
                sendTextMessage(sender, 'جوابك هنا');
            } else {
                sendTextMessage(sender, 'آسف، لم أفهم سؤالك.');
            }
        }
    }
    res.sendStatus(200);
});

function sendTextMessage(sender, text) {
    let messageData = {text: text};
    request({
        url: 'https://graph.facebook.com/v12.0/me/messages',
        qs: {access_token: PAGE_ACCESS_TOKEN},
        method: 'POST',
        json: {
            recipient: {id: sender},
            message: messageData,
        }
    }, function (error, response, body) {
        if (error) {
            console.log('Error sending messages: ', error);
        } else if (response.body.error) {
            console.log('Error: ', response.body.error);
        }
    });
}

app.listen(app.get('port'), () => {
    console.log('Node app is running on port', app.get('port'));
});
```
