---
title: "Notify your Discord server when you go live on Twitch with AWS Lambda"
published: true
post_id: "0004"
categories: ["Tech"]
credit: Dylan Myers

# atom tags
author: dylan
image: assets/img/posts/0004.jpg
---

If you run a Discord server to accompany your Twitch stream, you probably have a channel dedicated to letting people know when you're livestreaming. Twitch notifications are infamously flaky, partially down to Twitch's dodgy ["smart notification" algorithm](https://link.twitch.tv/SmartNotifications) that tries (and often fails) to determine which device the recipient is active on to send a notification, as well as Android devices ["optimising" notification delivery](https://www.androidpolice.com/2020/07/18/phone-makers-are-breaking-your-favorite-apps-with-reckless-changes-to-androids-power-optimization-features/).

There is an array of free tools that provide this functionality, namely the insanely popular [MEE6](https://help.mee6.xyz/en/article/twitch-live-notifications-wc0idt/), [Streamcord](https://streamcord.io/twitch/), and [Lyvego](https://lyvego.com/). However, I don't want to use MEE6, and the other tools have a tendency to send out notifications way too late. Additionally, these notifications aren't super customisable in terms of what text is shown. To fix this, I set about to create my own version of this. In this article, I set out how I made **Goli** and how, as a streamer, you can use the script I made for better Twitch notifications.

## Goli's brains

Goli, short for Go-live, is based on [Webhook technology](https://markheath.net/post/basic-introduction-webhooks). I had heard about webhooks before starting this, but didn't really get how it works. In reality, they are super simple. It's an endpoint that takes data via HTTP POST and has a/multiple side effects, and optionally provides a response. Goli consumes a Twitch webhook and sends data to a Discord webhook:

{% include post_image.html name="goli-flow" ext=".png" alt="Flowchart between eventsub, aws and discord" %}

To make my own webhook reciever (and sender), I used AWS Lambda. This use case easily falls under its free tier, unless you are streaming more than a million times a month (and I would be very impressed if you are.) Lambda processes incoming data from Twitch, pings the Discord webhook and returns a status object for debugging. To make the lambda script publically available, I set up an API Gateway that acts as the Lambda's interface.

The script that's run on Lambda is available in [this GitHub repository](https://github.com/dylmye/twitch-golive-discord). I use this repo, rename `env.example.py` to `env.py` and set the environment variables, install its dependencies locally, then zip it and upload it to AWS as described in [this documentation](https://docs.aws.amazon.com/lambda/latest/dg/python-package-update.html#python-package-update-dependencies). The `lambda-function.py` file contains the function: it does some data validation, creates the discord message object using incoming data, then creates a POST request. There's also some handling for other data sent its way, namely [verification challenges](https://dev.twitch.tv/docs/eventsub#create-a-subscription).

The structure contents sent to Discord are described in [this helpful website](https://birdie0.github.io/discord-webhooks-guide/examples/twitch.html#twitch) from Birdie0. If you want to extend or customise your Discord message, use this website to find out how!

## Implementation

Right, here's the bit you care about. To implement this in your Discord, there are some prerequisites:

* A Discord Server you have admin access to, or own
* An AWS account - if you don't like AWS because it's Amazon, so is Twitch
* A Twitch account, obviously
* A computer with [Python 3](https://www.python.org/downloads/) installed on it
* An API client like [Postman](https://www.postman.com/downloads/) or [Insomnia](https://insomnia.rest/download)

This tutorial should take about 30-45 minutes from downloading everything to having a bot that will send messages when you go live. You may need minimal programming experience. If you have any feedback or questions please [let me know](https://twitter.com/dylan_mye) :)

1. To get started, let's set up your accounts. [Create a Twitch Developer app](https://dev.twitch.tv/console/apps) with any name and a Oauth Redirect URL of `http://localhost`. I selected the category 'application integration' because it's technically integrating with Discord. Create and store a client secret for later by clicking 'new secret' on the app's detail page.

{% include post_image.html name="twitchdash" ext=".png" alt="Screenshot of twitch console with generated client secret" %}

{:start="2"}
1. After you've stored that somewhere safe, let's create the Discord bot that will share the go-live message. Go to the server settings of the Discord server you manage, click on the integrations tab, select 'webhooks' then click the new webhooks button. Pick your title, avatar and the channel you want it to post to. Then click 'copy webhook URL' and keep it somewhere safe.

{% include post_image.html name="dischook" ext=".png" alt="Screenshot of discord's webhook configuration menu" %}

{:start="3"}
1. Finally, let's set up the environment for the code to run in. Log in to [your AWS console](https://console.aws.amazon.com/), and in the search bar at the top, search for Lambda. Lambda is the product that lets us run code instantly. For the purposes of this tutorial, we are using the updated console preview. Click 'create function', then select 'Author from scratch'. Pick a name for your project, and for runtime, pick the first Python version under 'Latest supported'. At the time of writing, this is **Python 3.8**. Click 'create function' at the bottom right. You should see something like this.

{% include post_image.html name="lambda" ext=".png" alt="Screenshot of the aws console with a successfully created lambda function" %}

{:start="4"}
1. Staying in the AWS console, let's configure the tool that will let us access the Lambda function on the internet. In the search bar, search for API Gateway. Click 'Create API' then select 'Build' from under 'REST API' (the name for the basic technology that lets us get data from Twitch). **Don't select 'REST API (Private)'.** On the 'Create new API' page, choose 'New API' and pick a name for the API. The description and endpoint type can stay the same. Click on 'actions' and then 'Create Method'.

{% include post_image.html name="gatewayactions" ext=".png" alt="Screenshot of the actions menu for an API" %}

I know this step is complicated but stay with me here. A little pop-up will appear next to the menu, select 'POST' (as that is the type of request we need to handle), then click the little tick that appears next to the pop-up. A page titled 'Choose the integration point for your new method' will appear, leave everything as default except for 'Use Lambda Proxy integration', this must be ticked. It passes the information from Twitch to your code. Now search for your Lambda function in the lambda function section. Select it, then hit save.

{% include post_image.html name="gatewayintpoint" ext=".png" alt="Screenshot of the configuration menu for setting up an api" %}

{:start="5"}
1. To finalise the API Gateway we just set up, click on that actions menu again and this time select 'deploy API'. In the deployment stage pop-up, select '[New Stage]' and give the stage a name like so. The name is part of the URL so don't choose something weird. Click deploy. You'll then see a link next to the words 'Invoke URL'. Copy this URL for later.

{% include post_image.html name="gatewaydeploy" ext=".png" alt="Screenshot of the 'deploy api' dialog" %}

{:start="6"}
1. Download the code from [the code repo](https://github.com/dylmye/twitch-golive-discord), open a console in the directory you have the code in, and run `pip install --target . -r requirements.txt` - this installs the required packages to make the script work. Rename the file `env.example.py` to `env.py` and replace the empty quotes with your Discord webhook URL you saved earlier, your Twitch username and [the ID of the Discord role](https://www.youtube.com/watch?v=Xme4lBvrCN8) you want to @. Create a zip file of all the contents in the folder after that's run, go back to your lambda control panel and in the 'code source' section, click 'upload from' -> '.zip'. Select your zip. Your code is now set up!

{% include post_image.html name="lambdaupload" ext=".png" alt="Screenshot showing the 'upload zip' button on the lambda dashboard" %}

{:start="7"}
1. Now to we need to tell Twitch to communicate with your Lambda function. We're going to follow [this setup guide](https://dev.twitch.tv/docs/eventsub#create-a-subscription) from Twitch. First, though, we need to use the Twitch app we made in step 1 to authenticate ourselves with the Twitch API. In our API client, make a new POST request. For this example we're using Insomnia, but any API client should work. The URL should be set to `https://id.twitch.tv/oauth2/token`. Add the following query strings to the URL:
* `client_id` - the client ID of your Twitch app, available from its dashboard
* `client_secret` - the client secret you created and saved in step 1
* `grant_type` - should be set to `client_credentials` as that's the type of key you need

Click send. In insomnia you should see something like the screenshot below. Copy the access token you get back from Twitch, you'll need it for the next step.

{% include post_image.html name="insauth" ext=".png" alt="Screenshot of the insomnia api client configured for the authentication step" %}

{:start="8"}
1. Next, to create the subscription, let's make another request. It should be a POST request to the URL `https://api.twitch.tv/helix/eventsub/subscriptions`. Configure a new header 'Client-ID' that has the value of your Twitch app's client ID, like in the previous step. Set up 'Bearer token' authentication (in Insomnia, click on the arrow next to the 'Auth' header and select Bearer), and enter the token provided to you in step 7 in the token field. Make sure the body type is set to JSON (or `application/json`), and copy/paste the following in the body, replacing the following parts:

* `broadcaster_user_id` - the user ID of the streamer. You can find it using [this useful tool](https://www.streamweasels.com/tools/convert-twitch-username-to-user-id/) from StreamWeasels.
* `callback` - the URL you copied in step 5. If you need it again, you can find it in the 'stages' section of your API Gateway.
* `secret` - a random string that you will need if you need to make any changes to this subscription. You should store the string you use here.

``` json
{
    "type": "stream.online",
    "version": "1",
    "condition": {
        "broadcaster_user_id": "<USER-ID-HERE>"
    },
    "transport": {
        "method": "webhook",
        "callback": "<LAMBDA-API-ENDPOINT-HERE>",
        "secret": "<SECRET-KEY-HERE>"
    }
}
```

It should look like this:

{% include post_image.html name="inssub" ext=".png" alt="Screenshot of the insomnia api client configured for the subscription step" %}


> The script handles verification steps outlined in the Twitch documentation.

You're done! When you next go live, people with the notification role you specified should be pinged when you're next live, within minutes of you going live.

{% include post_image.html name="notif" ext=".png" alt="Screenshot of an example output from the script" %}

## Costs

Thanks to AWS free tier, The biggest cost is your time. The estimated annual cost is a whopping $0. You can see the pricing calculator [here](https://calculator.aws/#/estimate?id=bc1d43fed2e4a1f18e8fc8002b9626d461a0cdfa), which assumes 100 'go-live' notifications a month.

{% include post_image.html name="pricing" ext=".png" alt="Screenshot of aws pricing calculator" %}

## Conclusion

Is it worth the effort to make your own Twitch notification bot? Probably not, unless you enjoy tinkering and learning how to do things _on the cloud_. Or if, like me, notifications are causing you issues. It can be a fun way to get stuck in to cloud services like Lambda, which can be really powerful for things like this where configuring and maintaining a server would take longer than development of the business logic itself. And it's even easier when it's free!


_Updated 9 Dec 2021 to update links._
