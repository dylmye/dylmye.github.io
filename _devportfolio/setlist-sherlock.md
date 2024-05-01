---
title: "Setlist Sherlock"
date: '2024-02-18T00:00:00.000Z'
summary: 'A mobile app that makes finding concert setlists so much easier'
image: '/assets/portfolio/setlist-sherlock-1.webp'
url: 'play.google.com/store/apps/details?id=com.dylmye.setlists'
tags: ['react', 'typescript', 'expo']
---

I found myself frequently checking [Setlist.fm](https://setlist.fm) at gigs to found out what songs could be performed. I also see concertgoers on Twitter posting screenshots of the website from their phone. While Setlist.fm have optimised their website for mobile devices, I felt like it'd be a good use case for an app because it could unlock integrations (e.g. Apple Music, sharing to social media) and because I find the website interface to not be the clearest.

![Advanced search filters are supported, unlike other Setlist.fm-based apps available](/assets/portfolio/setlist-sherlock-2.webp)

In order to build this app quickly, I used the [Expo framework](https://expo.dev) with its preset TypeScript base. I imported Setlist.fm's API by using their [OpenAPI](https://www.openapis.org/) specification with a Codegen tool, [`rtk-query-codegen-openapi`](https://redux-toolkit.js.org/rtk-query/usage/code-generation#openapi). This allowed me to directly import the OpenAPI endpoints into [RTK Query](https://redux-toolkit.js.org/rtk-query/overview), meaning I went from an empty template to consuming Setlist.fm's API in under an hour.

![All of the details for a setlist are easily findable without scrolling](/assets/portfolio/setlist-sherlock-3.webp)

I wanted to build a native-first approach to designing the app, specifically implementing Material You dynamic colours into the Android variant of the app using pchmn's [Expo Material 3 Theme](https://github.com/pchmn/expo-material3-theme) package, as well as building in dark and light colour mode throughout the development process. Using [React Native Paper](https://callstack.github.io/react-native-paper) enabled the implementation of these features in a standardised way.

I'm planning to add further native feature implementation in order to list this app on Apple's App Store as well as F-Droid.
