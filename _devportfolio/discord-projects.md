---
title: "Integrating with Discord Webhooks, Twitch APIs"
date: '2021-04-00T00:00:00.000Z'
summary: "Experimenting with multiple APIs to improve streamer's UX"
image: '/assets/portfolio/discord-projects-1.webp'
---

As a long-time user of Twitch and Discord, I've been inspired to build functionality for these platforms that cover gaps in the market. I have built tools with the aim of making other user's lives easier, but also to further my understanding of the platforms and how they interact and compliment each other. Here are some of these projects.

A quick glossary for those who need it: Twitch is a livestreaming platform. Discord is a community-focused "chatroom" service. Many Twitch creators have a Discord community. OBS (or Open Broadcasting Software) is an extensive program that enables streamers to stream their content to platforms like Twitch.

## Twitch and YouTube notifications on Discord

Streamers often host their community on Discord. A common issue streamers were facing was that they wanted to let their community know when their livestreams on Twitch were starting, but Twitch's notification system is unreliable and commerically available "Discord notifiers" often were late and expensive.

I created a system from scratch to deliver these notifications practically as soon as the streamer went live, which I have deployed in a dozen Discord servers with no issues. I wrote [a technical guide](../posts/2021-03-08-twitch-discord) on implementation, and open-sourced the infrastructure and code.

Building on the success of this, and to build on feedback from streamers, I created a similar system for YouTube uploads. I also wrote [a technical guide](../posts/2022-08-22-youtube-discord) for this.

## OBS Overlay for Last.fm

Streamers often like to share what they are listening to or what music is playing on their stream for the audience's benefit. Often this information is shown in an graphic overlay. Overlays for Spotify users already exist, but to support other streaming services, I built a customisable, responsive [last.fm](https://www.last.fm/) & [ListenBrainz](https://listenbrainz.org/) overlay.

## SadgeClipper

I created a simple webapp to filter through highlights clipped by Twitch viewers, that you can [read more about](./sadge-clipper).

## Pryingeyes

In September 2021, Twitch added phone numbers to their account settings page. Some streamers worried about accidentally sharing their phone number, as there was nothing hiding this field. [A request to hide the phone number field by default](https://twitch.uservoice.com/forums/310228-account-management-e-g-login-connections-pass/suggestions/44207337-click-to-reveal-phone-number) gained over 80 votes and a number of streamers mentioned the issue on Twitter. This inspired me to create a Chrome extension to provide this hiding functionality.

Over a weekend I learned how to make a Chrome extension, created and tested the feature. I made sure it wouldn't "flash" the phone number while it loaded. [The extension](https://chrome.google.com/webstore/detail/prying-eyes-for-twitch-hi/lbpecilknabhpnafcbjhmkndlbghnpng?hl=en-GB) is available but a week or so after I launched it, Twitch added the feature.

Through this development, I learned how to create browser extensions, and worked under the pressure of meeting people's needs in time to remain relevant.
