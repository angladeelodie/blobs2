const {
  Client,
  MessageEmbed
} = require("discord.js");
const {
  Board,
  Led,
  Servo
} = require("johnny-five");

class Bot {
  constructor(token, win, led, led2) {
    console.log("Bot start");

    this.win = win;
    this.client = new Client();
    this.client.on("ready", this.onReady.bind(this));
    this.client.on("message", this.onMessage.bind(this));
    this.client.login(token);
    this.users = [];

    //this.initArduino();
    this.led = led;
    this.led2 = led2;
  }

  /* initArduino() {
    this.board = new Board({ repl: false });
    this.board.on("ready", this.onBoardReady.bind(this));
    console.log("BOARD STARTED");
  } */
  onBoardReady() {
    console.log("Board ready");

  }


  onReady() {
    console.log("BOT READY");
  }

  onMessage(message) {
    //   const receivedEmbed = message.embeds[0];
    //   //console.log(message.content);

    //   if (receivedEmbed) {
    //     this.win.webContents.send("messageDiscord", receivedEmbed);
    //     console.log(receivedEmbed);
    //   } else {
    //     this.win.webContents.send("messageDiscord", message.content);
    //   }
    
    var timestamp = message.createdTimestamp;
    

    var messageInfos = {
      content: message.content,
      author: message.author.username,
      timestamp: timestamp
    };

    this.win.webContents.send("messageDiscord", messageInfos);



  }
}

module.exports = {
  Bot
};