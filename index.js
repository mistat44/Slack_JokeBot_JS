const SlackBot = require("slackbots");
const axios = require("axios");

const bot = new SlackBot({
  token: "xoxb-383869362272-383870381552-ep7ORv80W5MVWlI7E8IGcZ6E",
  name: "jokebot"
});

// Start Handler
bot.on("start", () => {
  const params = {
    icon_emoji: ":smiley:"
  };

  bot.postMessageToChannel(
    "general",
    "Get Ready To Laugh With @JokeBot!",
    params
  );
});

// Error Handler
bot.on("error", err => console.log(err));

// Message Handler
bot.on("message", data => {
  if (data.type !== "message") {
    return;
  }

  handleMessage(data.text);
});

// Respond to data
function handleMessage(message) {
  if (message.includes(" chucknorris")) {
    chuckJoke();
  } else if (message.includes(" yomama")) {
    yoMamaJoke();
  } else if (message.includes(" random")) {
    randomJoke();
  } else if (message.includes(" help")) {
    runHelp();
  }
}

chuckUrl = "http://api.icndb.com/jokes/random";
yoMamaUrl = "http://api.yomomma.info";

// Tell a Chuck Norris Joke
function chuckJoke() {
  axios.get(chuckUrl).then(res => {
    const joke = res.data.value.joke;

    const params = {
      icon_emoji: ":laughing:"
    };

    bot.postMessageToChannel("general", `Chuck Norris: ${joke}`, params);
  });
}

// Tell a Yo Mama Joke
function yoMamaJoke() {
  axios.get(yoMamaUrl).then(res => {
    const joke = res.data.joke;

    const params = {
      icon_emoji: ":laughing:"
    };

    bot.postMessageToChannel("general", `Yo Mama: ${joke}`, params);
  });
}

// Tell a Random Joke
function randomJoke() {
  const rand = Math.floor(Math.random() * 2) + 1;
  if (rand === 1) {
    chuckJoke();
  } else if (rand === 2) {
    yoMamaJoke();
  }
}

// Show Help Text
function runHelp() {
  const params = {
    icon_emoji: ":question:"
  };

  bot.postMessageToChannel(
    "general",
    `Type @jokebot with either 'chucknorris', 'yomama' or for a twist, try 'random'`,
    params
  );
}
