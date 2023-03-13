const PubNub = require('pubnub');

const credentials = {
    publishKey:'pub-c-8a035990-d834-48f7-ac01-8f7e4b29439e',
    subscribeKey:'sub-c-2dfecdef-801a-4f42-b19e-f20e17f55577',
    secretKey:'sec-c-ZjliMzk0Y2YtYjFmNy00YTRhLTg5ZjItMGVkYzJlN2E2YTVl'
}

const CHANNELS ={
    TEST:'TEST'
    
}

class PubSub {
    constructor(){
        this.pubnub = new PubNub(credentials);

        this.pubnub.subscribe({channels:Object.values(CHANNELS)});

        this.pubnub.addListener(this.listener());

    }


    listener(){
        return{
            message:messageObject=>{
                const {channel,message} = messageObject;
                console.log(`Message received.Channel: ${channel}. Message: ${message}`);
            }
        }
    }

    publish({channel,message}) {
        this.pubnub.publish({channel,message});
    }

} 

const testPubSub = new PubSub();
testPubSub.publish({channel:CHANNELS.TEST,message:'hello pubnub'})

module.exports = PubSub;