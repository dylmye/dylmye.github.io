---
title: "2 ways to notify your Discord server when you upload to YouTube - with and without AWS"
published: true
post_id: "0005"
categories: ["Tech"]
credit: Dylan Myers

# atom tags
author: dylan
image: assets/img/posts/0005.jpg
---

Just like [Twitch notifications](https://dylmye.me/2021/03/08/twitch-discord/), notifying your Discord server about your YouTube uploads sounds like something that should be built in. Until it is, I have created a solution using AWS Lambda and API Gateway solutions. But first, here's an even easier (and free) way without using the oft slow and unreliable services like MEE6 and Dyno. The jist of how these solutions work is that we continually check a feed YouTube provides, and when we get a new entry we use a [Discord webhook](https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks) to post a new message.

## Method 1: (More than a) Pipedream

{% include post_image.html name="pipedream-flow" ext=".png" alt="Flowchart between websub, aws and discord" %}

Sign up for [Pipedream](https://pipedream.com), it connects services together like Zapier or IFTT, but it's free for this level of usage and [way more powerful than its competitors](https://techcrunch.com/2022/05/17/2315521/). We're going to connect the YouTube Data API to our Discord Webhook. Navigate [here](https://pipedream.com/apps/youtube-data-api/integrations/discord-webhook/send-message-with-discord-webhook-api-on-new-videos-in-channel-from-youtube-data-api-api-int_m8sZWGj) and click "Get Started". You'll then be presented with a two-step form, one step being the YouTube data "input", and the Discord Webhook "output". The idea here is that when the input trigger is... triggered, the output is passed the trigger data.

{% include post_image.html name="pipedream-step-1" ext=".png" alt="The two-step form presented by Pipedream. The first step is the setup for the YouTube search and the second step is the Discord Webhook" caption="The two-step form presented by Pipedream" %}

Log in with your YouTube account (it **doesn't** need to be the same as the channel you're looking for uploads from). Get the [channel ID](https://commentpicker.com/youtube-channel-id.php) and set the Channel ID field to that.

On the free plan you get 333 daily invocations, so the minimum duration you can get for free is about every 5 minutes. Now we've filled out all the fields, click on "Create source" to make the channel source. It'll take a minute to get all the data, then you'll be prompted to select an event. Select the most recent one. This will be used to help make the message template later on.

Next, connect your Discord account, selecting which server and channel you want to post to:

{% include post_image.html name="pipedream-step-2" ext=".png" alt="The Discord setup screen you see when you connect a Discord account to Pipedream. One field is a dropdown of all the servers the user has access to, and the second dropdown has a list of all the channels in that server." caption="The Discord Webhook setup process" %}

You can now use the parts from the YouTube feed to build up the notification that will show in your Discord server. You can see an example below. The blue parts are substituted out when a new upload comes through:

{% include post_image.html name="pipedream-step-3" ext=".png" alt="The message builder for the Discord webhook. A field titled message includes a text box, where the words 'Message: event title' and 'Watch now: link to stream' have been typed. The event title and link to stream are highlighted blue to indicate they are placeholders. A dropdown under the field shows the available placeholders and examples from the latest upload in the feed." caption="Blue text = substitutes" %}

Click 'Deploy' in the top right, then you're done! You should see your notifications come through. You can further customise the workflow, adding a custom username and profile picture to the webhook that posts the notifications, by going to [your workflows](https://pipedream.com/workflows).

## Method 2: Lambda Party

The primary way we can fetch notifications for YouTube video uploads ourselves is through an old technology called [WebSub](https://www.w3.org/TR/websub/) (formerly PubSubHubBub, I know, I'm glad they changed it too.) Basically how it works is, you (the subscriber) use a "hub" (a fancy server)

YouTube doesn't offer anything as nice to use as Twitch's EventSub. Instead it uses an old technology for notifications called [WebSub](https://www.w3.org/TR/websub/) (formerly PubSubHubBub, I know, I'm glad they changed it too.) Essentially it works like Twitch EventSub but it needs a special "hub" to route requests, and with some hubs you have to manually resubscribe to keep getting notifications. I've made a [Serverless deployment template](https://github.com/dylmye/aws-python-youtube-websub-to-discord-webhook) with a README that should get you started, with the Lambda and API Gateway setup, but let's go through it together to understand how it works.

{% include post_image.html name="serverless-flow" ext=".png" alt="Flowchart between websub, aws and discord" %}

At the heart of it, the Lambda script takes in an XML entry, parses it with [BeautifulSoup](https://pypi.org/project/beautifulsoup4/), and posts a Discord notification with the details to a Discord webhook. To get notifications, we have to subscribe the script to a WebSub hub. Here's an example of how I subscribed my Serverless deployment to Lambda:

{% include post_image.html name="lambda-websub-1" ext=".png" alt="A screenshot of the Pub Sub Hub Bub subscription form screen, with the callback URL and topic URL filled." caption="The PubSubHubBubLubTub. The callback URL is the webhook reciever and the topic URL is the YouTube 'topic' generated by Google. Notice the extra 'xml' in the URL? That's on purpose, this endpoint is specifically for WebSub." %}

The script automatically handles the verification process by responding with the challenge code on the GET request. The Hub does all the hard work of pinging the 'topic' for updates, and dispatching that to your callback endpoint.

### If you don't want to use Serverless

Let's manually set up the script. If you've followed the steps in the [Twitch guide](https://dylmye.me/2021/03/08/twitch-discord/) these will be familiar to you.

## Acknowledgements

Thanks to Kevin Cox for [this useful article](https://kevincox.ca/2021/12/16/youtube-websub/) about the YouTube feed.

Thanks to the contributors to [this IndieWebCamp wiki article](https://indieweb.org/How_to_publish_and_consume_WebSub), especially Aaron Parecki.
