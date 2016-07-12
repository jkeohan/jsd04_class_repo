# ![](https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png) Lab Lesson: Hubot (3:00)

| Timing | Type | Topic |
| --- | --- | --- |
| 10 min | [Opening](#opening) | Introduction |
| 75 min | [Lab](#lab1) | Hubot: Independent Practice |
| 90 min | [Lab](#lab2) | Hubot: Unit 1 Project |
| 5 min | [Conclusion](#conclusion) | Final Questions & Exit Tickets |
| 45 min | [Bonus Labs](#bonus) | Currency Converters |

>Note: The following lesson is structured as a "lab lesson". After a brief introduction, the students will be spending most of the class working independently, first installing and configuring all of the necessary utilities to run Hubot, then working through various Hubot examples and finally, working on the Unit 1 Hubot project. **It is essential that during this session, the entire instructional team is on their feet, walking around the room, checking in with students, answering questions and helping troubleshoot.**

### Objectives

*After this lesson, students will be able to:*

- Install and configure all utilities needed to run a Hubot
- Write scripts that allow their Hubot to interact with users of the class Slack room

### Preparation
*Before this lesson, students should be able to:*

- Describe how parameters and arguments relate to functions
- Create and call a function that accepts parameters to solve a problem
- Define and call functions defined in terms of other functions
- Return a value from a function using the return keyword
- Define and call functions with argument-dependent return values
- Determine the scope of local and global variables
- Create a program that hoists variables

---
<a name="opening"></a>
## Introduction (10 min)

>Note: The following lab is very challenging and will likely require a good deal of troubleshooting. **This can be a logistically complex exercise, so you should give it a try prior to class.**  

For our Unit 1 project, we'll be building our own chat bot in Slack. To help you become familiar with bots, we're going to use something called Hubot. Hubot is a framework for creating chat bots that you can use to create new bots for use in a variety of chat environments, including Slack. Using Hubot, you create bots (also often confusingly called Hubots) which follow scripts written in JavaScript to perform various tasks, from configuring new servers to updating code on GitHub. We will mostly be using Hubot in this project to interact with real users in Slack.

### What Are We About to Do?

First, let's define some terms we'll be using during this lab.

**[Slack bot user](https://api.slack.com/bot-users):** You have probably seen automated "bots" on platforms like Twitter. Essentially, a bot is a script that is programmed to interact with users as if it's a person. In Slack, these are called "bot users," or "bots" for short. There is one bot user that is built into Slack that you've probably heard from already when you joined, called Slackbot. In this lab, we'll begin creating our own bots for use in the class Slack team.

**Hubot:** [Hubot](https://hubot.github.com/) is a framework built by GitHub to speed up the process of developing bot users on a variety of platforms, including Slack. It's built using Node.js and CoffeeScript (see below), and it includes built-in functionality for performing common bot tasks (posting images, etc.). We'll be using Hubot to create the bot users we build.

**CoffeeScript:** A variant of JavaScript, some people claim that CoffeeScript makes JavaScript more readable and faster to type. Because only JavaScript can run in browsers and in Node, CoffeeScript has to go through an extra step to be translated into JavaScript so that it can be run. CoffeeScript is often used in conjunction with Hubot; you won't need to know how to write CoffeeScript for the purposes of this class, but be aware that it will come up in Hubot examples and documentation. If you encounter a CoffeeScript file (e.g., the "example.coffee" file included with Hubot) and want to better understand what it's doing, you can use a CoffeeScript convertor like [JS2Coffee](http://js2.coffee/) to translate it into JavaScript.

**Heroku:** Heroku is a platform for hosting and running apps in the cloud. We'll be using Heroku to host the code for our Hubot, so it can run independently of our machines.

**Yeoman:** Yeoman is a set of tools that provides a scaffolding for getting web apps up and running quickly. We'll be using of a Yeoman tool called yo, which takes care of things like dependencies, build tasks, and configuration, so you don’t have to.

---
<a name="lab1"></a>
## Hubot: Independent Practice (75 mins)

>Note: Provide students with the below set of instructions and have them work in groups of 2-3, each group with its own Hubot and Slack API token (in classes with more than 30 students, Hubots/API tokens will need to be shared between multiple groups). Before class, configure multiple Hubot integrations for the class (the maximum number of Hubots per Slack organization is 10); [Click here](https://my.slack.com/services/new/hubot) to configure a new Hubot. Once each Hubot has been configured, edit its configuration in order to access its API token. **It's very important to configure enough Hubots and API tokens prior to class, as Slack starts refusing connections when more than five users attempt to use the same API token simultaneously.** Students should follow the instructions to install all the necessary utilities and then work through each of the examples, trying to get each to run in the class Slack room. Be sure to walk around the room to help troubleshoot and offer pointers.

### Installing and Configuring Everything

In order to get our bots up and running, we need to perform a number of installations, so make sure you follow these steps carefully. Your instructor should provide you with a Hubot and an API token; be sure to have those ready because you'll need both in order to complete many of these steps.

First, you'll need to [sign up for a free Heroku account](http://heroku.com).

Next, [download the Heroku toolbelt](https://toolbelt.heroku.com/). This set of tools allows us to talk to Heroku's servers using the command line.

We begin with the command line. In a terminal window, type the following commands, in order:

**Create your hubot directory:**

`$ mkdir myhubot`

**Move into that new directory:**

`$ cd myhubot`

**Install Hubot and its dependencies (CoffeeScript, Yeoman, and the Hubot generator):**

`$ npm install -g hubot coffee-script yo generator-hubot`

**Using Yeoman, generate a Hubot bot:**

`$ yo hubot --adapter="slack"`

**This will prompt you to answer a few questions about your bot:**

 * Owner: `hit enter`
 * Bot Name: `Give the bot a name`
 * Description: `Optional Description`


>Note: the `--adapter="slack"` option in the `yo` command above is a workaround for a dependency-related bug in `generator-hubot` causing the program to crash when it prompts the user for what adapter they want to use. If you specify the adapter on the command line as above, the broken prompting code will be skipped. (This is all documented in [this issue](https://github.com/github/generator-hubot/issues/64) in the `generator-hubot` repo.)

**Install hubot-slack dependency and save it to your package.json:**

`npm install hubot-slack --save`

Now, we need to push up our bot to Heroku.

**Initialize your local repository:**

`$ git init`

**Add all of your new files:**

`$ git add .`

**Commit your new files:**

`$ git commit -m "Initial Commit"`

**Create a new app on Heroku:**

`$ heroku login`

`$ heroku create myhubotapp`

 **Connect your local repo to heroku**

 `$ git remote add heroku https://git.heroku.com/myhubotapp`

**Add the following configs for Slack:**

`$ heroku config:add HEROKU_URL=https://myhubotapp.herokuapp.com`

`$ heroku config:add HUBOT_SLACK_TOKEN=YourTokenGoesHere`

**Push all your code up to Heroku**

`$ git push heroku master`

**Turn on your bot**

`$ heroku ps:scale web:1`

**Test your bot locally to make sure it's working:**

`HUBOT_SLACK_TOKEN=TOKEN-GOES-HERE ./bin/hubot --adapter slack`

Now we have our very own Hubot that's willing and able to do our bidding. What can it do? Let’s take it for a test drive.

### Interacting with Your Hubot

To create instructions for your Hubot, you need to add a JavaScript file to the `scripts` folder. You can add multiple scripts files to that folder and all will execute when the Hubot is run. Let's look at a few commands that will help us build our Hubot scripts.

#### Listening

**.hear**

 The `.hear` command listens for a specific phrase anywhere in the Slack room. You don't have to mention your Hubot in order to get a response.

 In the example below, when the bot hears "Hello!", it will respond, "Hi there!":

 ```js
 bot.hear(/Hello!/, function(res) {
   return res.send("Hi there!");
 });
 ```

 ```
 tim: Hello!
 hubot: Hi there!
 ```

**.respond**

 `.respond` is similar to `.hear`, except it will only be triggered when someone specifically mentions the Hubot using `@`, or sends a direct message.

 ```javascript
 bot.respond(/What's your favorite food?/, function(res) {
   return res.send("I'm a robot--I don't eat food!");
 });
 ```

 ```
 tim: @hubot What's your favorite food?
 hubot: I'm a robot--I don't eat food!
 jon: What's your favorite food?
 ... [no response because Jon didn't tag Hubot in his message]
 ```

#### Speaking Responding to User Input

**.send and .reply**

The "send" method allows your Hubot to send a message to the channel, and the "reply" method allows it to respond directly to a user with an @ reply. In order to understand the difference, we’ll need to accept some user input, so let's take a look at the example below.

**The Wildcard Selector**

 Would you like to accept user input in your script? Take a look at the example below:

 ```js
 bot.respond(/Hi Hubot! My name is (.*)/i, function(msg) {
   var name;
   name = msg.match[1];
   if (name == "Hubot") ){
     return msg.send("You're not Hubot--I'm Hubot!");
   } else {
     return msg.reply("Nice to meet you, " + name + "!");
   }

 });
 ```
 ```
 tim: @hubot Hi Hubot! My name is Tim
 hubot: @tim Nice to meet you, Tim!  
 tim: @hubot Hi Hubot! My name is Hubot
 hubot: You're not Hubot--I'm Hubot!
 ```

Did you notice the difference between `.send` and `.reply`?

Now, let's dig into how the user input works. As you can see, we're using `.respond` to set the bot up to listen for its @ handle. In this case, it's listening for the phrase `@hubot Hi Hubot! My name is _____`. The `(.*)` syntax is a wildcard value that effectively represents the "blank" in that sentence. When the bot is triggered with the phrase, `@hubot Hi Hubot! My name is (.*)`, it stores the contents of `(.*)` in an array called `match`, which lives inside an object called `msg`. When we want to retrieve that value, we use `fav = msg.match[0]` to grab the first value in that array, which, in this case, is "Tim".

 <details>
 <summary>
 **Wait, What Does the `[1]` Mean?** (click the arrow for the answer)
 </summary>
`msg.match[1]` will grab the value corresponding to the second group `(.*)` in the expression. Just like most collections in JavaScript, this is a zero-based index. However, the first group is the entire expression. So in the example above, `msg.match[0]` will return the entire expression: `Hi Hubot! My name is Tim`. If you use multiple `(.*)`s within one RegEx statement, you can assign each of the values to different variables, such as: `var foo = msg.match[1]`, `var bar = msg.match[2]`.
 </details>

 Here's an example that uses two wildcards:

 ```js
 bot.respond(/add (.*) and (.*)/i, function(msg) {
   var a;
   var b;
   a = parseInt(msg.match[1]);
   b = parseInt(msg.match[2]);
   c = a + b

   return msg.reply(a + " plus " + b + " = " + c);
 });

 ```
 ```
 tim: @hubot add 3 and 4
 hubot: 3 plus 4 = 7
 ```

 Here's another example that uses a switch statement to handle different cases:
 ```js
 bot.respond(/what is your favorite (.*)/, function(msg) {
   var fav;
   fav = msg.match[1];
   console.log(fav);
   switch (fav) {
     case "food":
       return msg.reply("I'm a robot--I don't eat food!");
       break;
     case "band":
       return msg.reply("It's gotta be Daft Punk!");
       break;
     case "programming language":
       return msg.reply("Javascript, of course!");
       break;
     default:
       return msg.reply("I don't have a favorite " + fav + ". What's yours?");
   }
 });
 ```
 ```
 tim: @hubot what is your favorite food?
 hubot: @tim I'm a robot--I don't eat food!
 tim @hubot what is your favorite color?
 hubot: @tim I don't have a favorite color. What's yours?
 ```

#### Getting Fancy

 **Regular Expressions**
   You might have noticed that we haven't used quotes around the phrases Hubot is listening for; instead, we’re using `/` (e.g. `/What's your favorite food/`). Why do we do this?

  Most programming languages allow you to search for text within text using something called **Regular Expressions**. Regular expressions, or "RegEx," enable you to listen for very specific patterns of text within a document, or, in this case, a chat room.

  For example, if you want to find the word "what" using a RegEx, you can use the following code: `\bwhat\b`. Here, "b" represents the boundaries of the word (i.e., its beginning and end) and the "what" represents the word we are searching for.

  This is an advanced example, though. **For most of your bots, you can simply enclose phrases between `/` marks**. If you would like to learn more about RegEx, check out the resources below:
  - [RegexOne](http://regexone.com/) walks you through basic to advanced RegEx syntax. Check it out!
  - [RegExr](http://regexr.com/) lets you test out your RegEx without the need to constantly start and stop your bot.


To wrap things up, here's one final example of an advanced Hubot that uses a RegEx, and that can respond to a number of different inputs:

```js
module.exports = function(robot) {
    robot.respond(/is it a (weekend|holiday)\s?\?/i, function(msg){
        var today = new Date();

        msg.reply(today.getDay() === 0 || today.getDay() === 6 ? "YES" : "NO");
    });

    robot.hear(/i did it/i, function(msg){
        msg.send("Congratulations! Good job!");
    });

    robot.respond(/are you there?/i, function(msg){
        msg.reply('Yes, usually here, and listening.');
    });

    robot.respond(/convert \$(.*) to btc/i, function(res){
        var usd = res.match[1];
        res.reply('That is about ' + usd * 0.0024 + ' in BTC');
    });

}
```

This should give you a sense of what a Hubot can do—and perhaps give you some ideas for building your own Hubot...

>Note: Additional information on building and running Hubots is available in the [Unit 1 Project Prompt](../../projects/unit1/project-01.md)

---
<a name="lab2"></a>
## Hubot: Unit 1 Project (90 mins)

At this point, if the students have successfully managed to work through each of the examples, they should now be ready to tackle the Unit 1 Project. Provide students with the [project prompt](../../projects/unit1/project-01.md) and have them work either independently or in groups to attempt to complete the project. If the students are able to complete the project before class is over, you can use the remaining time to have students present their work to the class. If there is still time left over, you can have students tackle the bonus exercises below. If, however, most of the students are unable to complete the project before the end of class, you can assign it as a take-home project that is due in 1-2 class periods.

>Note: Students/groups should continue using the same Hubot/API token they used for the above examples.

---
<a name="conclusion"></a>

## Conclusion (5 min)

Make sure the lesson objectives have been met.

* What did we install and why?
* How does Hubot work?

---
<a name="bonus"></a>

# Bonus Content

The following exercises are purely optional and provided as a bonus for instructors. If your class moves quickly or if advanced students are looking for an additional challenge, you may choose to use the exercises below.

## Bitcoin: Currency Converter

We have provided you with starter code for grabbing the latest bitcoin trading price. Open the [starter code](starter-code/currency-converter). Based on the U.S. Dollar amount a user inputs, we should print out the corresponding value in bitcoin based on the last trading price.

>Note: We haven't covered DOM Manipulation yet, but students will need to get some familiarity with [document.getElementById()](https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementById) or [parseFloat()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseFloat)to complete this exercise. Be sure to let them know and/or provide a short intro.

Before writing any code, be sure to write down the pseudocode for the exercise.

**Sample Starter Pseudocode**

```javascript

* when convert button is clicked, run convert

* function convert
	store the inputted value into a variable
	parse the inputted value
	call `usdtoBTC` function and pass the user inputted value
	display converted amount

 * function usdToBTC
	 var convertedBTC = usd/BTCrate
	 return convertedBTC

  ```

##  Hubot Part 2: Bitcoin Convertor Bot

  Build a Hubot that can convert a requested amount in $USD to its equivalent value in Bitcoin. You may use a constant, fixed price instead of the live rate of BTC price.

  When the Hubot participant enters "convert $X to btc", the bot should return the value in bitcoin.

  **Sample Hubot**

  ![](solution-code/currency-converter/btchubot.png)
