---
title: '3 ways to notify your Discord server when you upload to YouTube - with and without AWS'
coverImage: '/assets/blog/2022-08-22-youtube-discord/cover.webp'
---

Just like [Twitch notifications](https://dylmye.me/2021/03/08/twitch-discord/), notifying your Discord server about your YouTube uploads sounds like something that should be built in. Until it is, I have created a solution using AWS Lambda and API Gateway solutions. But first, here's an even easier (and free) way without using the oft slow and unreliable services like MEE6 and Dyno. The jist of how these solutions work is that we continually check a feed YouTube provides, and when we get a new entry we use a [Discord webhook](https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks) to post a new message.

## Method 1: (More than a) Pipedream

![Flowchart between websub, aws and discord](/assets/blog/2022-08-22-youtube-discord/pipedream-flow.png)

Sign up for [Pipedream](https://pipedream.com), it connects services together like Zapier or IFTT, but it's free for this level of usage and [way more powerful than its competitors](https://techcrunch.com/2022/05/17/2315521/). We're going to connect the YouTube Data API to our Discord Webhook. Navigate [here](https://pipedream.com/apps/youtube-data-api/integrations/discord-webhook/send-message-with-discord-webhook-api-on-new-videos-in-channel-from-youtube-data-api-api-int_m8sZWGj) and click "Get Started". You'll then be presented with a two-step form, one step being the YouTube data "input", and the Discord Webhook "output". The idea here is that when the input trigger is... triggered, the output is passed the trigger data.

![The two-step form presented by Pipedream](/assets/blog/2022-08-22-youtube-discord/pipedream-step-1.png)

Log in with your YouTube account (it **doesn't** need to be the same as the channel you're looking for uploads from). Get the [channel ID or @handle](https://www.streamweasels.com/tools/youtube-channel-id-and-user-id-convertor/) and set the Channel ID field to that.

On the free plan you get 333 daily invocations, so the minimum duration you can get for free is about every 5 minutes. Now we've filled out all the fields, click on "Create source" to make the channel source. It'll take a minute to get all the data, then you'll be prompted to select an event. Select the most recent one. This will be used to help make the message template later on.

Next, connect your Discord account, selecting which server and channel you want to post to:

![The Discord Webhook setup process](/assets/blog/2022-08-22-youtube-discord/pipedream-step-2.png)

You can now use the parts from the YouTube feed to build up the notification that will show in your Discord server. You can see an example below. The blue parts are substituted out when a new upload comes through:

![Blue text = substitutes](/assets/blog/2022-08-22-youtube-discord/pipedream-step-3.png)

Click 'Deploy' in the top right, then you're done! You should see your notifications come through. You can further customise the workflow, adding a custom username and profile picture to the webhook that posts the notifications, by going to [your workflows](https://pipedream.com/workflows).

## Method 2: Lambda Party

The primary way we can fetch notifications for YouTube video uploads ourselves is through an old technology called [WebSub](https://www.w3.org/TR/websub/) (formerly PubSubHubBub, I know, I'm glad they changed it too.) There's three parts to this WebSub chain. First up are "topics", which are essentially fancy [Atom feeds](https://en.wikipedia.org/wiki/Atom_(web_standard)). You, a "subscriber", tell a "hub" (the software that tracks all the topics and subscribers) to keep track of updates from the topic. The hub does this by sending a request to the topic. From now until the subscription expires, the topic will post updates to the hub. The hub then propagates the update to all the subscriptions. The subscription consists of a callback URL which the hub posts said data to. You can read more about WebSub [here](https://ably.com/topic/websub) (there's graphs too!) Anyway, **let's set up a subcription!**

I've made a [Serverless deployment template](https://github.com/dylmye/aws-python-youtube-websub-to-discord-webhook) with a README that should get you started, with the Lambda and API Gateway setup, but let's go through it together to understand how it works.

![Flowchart between websub, aws and discord](/assets/blog/2022-08-22-youtube-discord/serverless-flow.png)

At the heart of it, the Lambda script takes in an XML entry, parses it with [BeautifulSoup](https://pypi.org/project/beautifulsoup4/), and posts a Discord notification with the details to a Discord webhook. To get notifications, we have to subscribe the script to a WebSub hub. Here's an example of how I subscribed my Serverless deployment to Lambda:

![The PubSubHubBubLubTub. The callback URL is the webhook reciever and the topic URL is the YouTube 'topic' generated by Google. Notice the extra 'xml' in the URL? That's on purpose, this endpoint is specifically for WebSub.](/assets/blog/2022-08-22-youtube-discord/lambda-websub-1.png)

The script automatically handles the verification process by responding with the challenge code on the GET request. The Hub does all the hard work of pinging the 'topic' for updates, and dispatching that to your callback endpoint.

## Method 2(b): If you don't want to use Serverless

Let's manually set up the script. If you've followed the steps in the [Twitch guide](https://dylmye.me/2021/03/08/twitch-discord/) these will be familiar to you. Please make sure you have [Python 3](https://www.python.org/downloads/) installed.

First, grab [the channel ID / @handle](https://www.streamweasels.com/tools/youtube-channel-id-and-user-id-convertor/) you'll need it. Next, clone/download [this GitHub repository I made](https://github.com/dylmye/superfeedr-discord). Follow the install instructions including setting up the `env.py` with the Discord webhook URL you set up earlier, and optionally a [Discord role ID](https://www.youtube.com/watch?v=Xme4lBvrCN8). Zip up everything in the folder, because we're going to upload all of this to _The Cloud™_.

Next we need to set up the place we're going to host and access this code. Head over to [Amazon Web Services](https://console.aws.amazon.com/lambda/home?region=us-east-1) where we're going to set up the Lambda (script host) and API Gateway (the way for us to call the script.) Click the big 'Create function' button, and make sure "Author from scratch" is selected. The only setting we care about here is setting the runtime environment to the latest supported version of Python.

![Your Lambda function setup should look like this](/assets/blog/2022-08-22-youtube-discord/lambda-setup.png)

Next, upload the zip you made earlier. The button can be a little hard to find, but it's here:

![A small dropdown of upload options for Lambda scripts, the highlighted option being 'zip'](/assets/blog/2022-08-22-youtube-discord/lambda-upload.png)

Now let's make the API Gateway functionality we talked about earlier. We're going to make a simple POST request handler which pipes all requests directly to the script we just uploaded. Click the "Add trigger button" in the function overview. Set up the API Gateway by selecting 'create a new API' and setting the API type to 'REST API' (because we don't need all the fancy functionality 'HTTP API' gives you.) Set your security to open for now. It's a good idea to add authentication later on but that's outside of the scope of this guide. Also the generated URL is random and not public facing so you shouldn't have any strong need for security right now.

Your form should look like this:

![The Lambda trigger creation form](/assets/blog/2022-08-22-youtube-discord/lambda-trigger-setup.png)

Clicking the 'Add' button at the bottom should then redirect you to a view like this:

![The lambda trigger, set up with all the details like the name of the API Gateway, the URL of the gateway, and the path](/assets/blog/2022-08-22-youtube-discord/lambda-trigger-confirm.png)

That "API endpoint" URL is what you need for the final step.

Head over to [Superfeedr](https://superfeedr.com), a service that checks feeds using that "WebSub" technology we talked about before. Create an account as a subscriber, then set up a new subscription. The topic URL is `
https://www.youtube.com/feeds/videos.xml?channel_id=` + the channel ID you made earlier (told you it'd come in handy!). The callback URL is the Lambda API endpoint URL. Finally, set the subscription format to "atom" (basically RSS.) The form should look like this:

![A screenshot of the setup dialog for Superfeedr, with fields filled as detailed above](/assets/blog/2022-08-22-youtube-discord/lambda-superfeedr-setup.png)

Click 'create' and you're done!

## Acknowledgements

Much appreciation to the Ably team for creating [this very easy to understand guide](https://ably.com/topic/websub) to WebSub.

Thanks to Kevin Cox for [this useful article](https://kevincox.ca/2021/12/16/youtube-websub/) about the YouTube feed.

Thanks to the contributors to [this IndieWebCamp wiki article](https://indieweb.org/How_to_publish_and_consume_WebSub), especially Aaron Parecki.

Thanks to you for reading this :) Please do [get in touch](twitter.com/dylan_mye) if you have any feedback or comments!
