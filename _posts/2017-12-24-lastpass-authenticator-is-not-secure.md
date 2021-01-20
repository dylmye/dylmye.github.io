---
title: "LastPass’ Authenticator app is not secure [Updated]"
published: true
post_id: "0001"
categories: ["Tech", "Investigations"]
hide_figure: true
hackernoon_url: https://hackernoon.com/lastpass-authenticator-app-is-not-secure-77b9743c3007
excerpt: "I've found a really easy way to bypass the fingerprint/PIN authentication that protects all of your 2FA codes. The Android app, produced by LastPass, doesn't"

# atom tags
author: dylan
# image: "/assets/img/posts/0001.jpg"
---

> **UPDATE: The issue has been fixed. Please see the end of the article.**

I've found a really easy way to bypass the fingerprint/PIN authentication that protects all of your 2FA codes. The Android app, produced by LastPass, doesn't use the same protection that their flagship app uses (like locking when idle, lock on screen off, etc).

All you need is access to individual activities ("screens" of apps). You don't need root to access these; pre-Oreo you can use an app like Adam Szalkowski's Activity Launcher or if you're on Oreo you can use sika524's QuickShortcutMaker.

The activity you need to access is `com.lastpass.authenticator.activities.SettingsActivity`:

{% include post_image.html name="instructions" alt="Accessing the settings activity using Activity Launcher" caption="Accessing the settings activity using Activity Launcher" %}


Open the settings activity and you'll see (surprise, surpise) the settings page. Pressing the back arrow in the top left (or your back arrow button) will bring you to the Main activity, where your 2FA codes lay. Notice how at no point you needed to provide your PIN/fingerprint to access this activity?

This lack of protection can be automated as it's merely a standard Android activity. Unfortunately the app is not covered under the Bugcrowd bounty programme but I feel that it is important to let people know. The best workaround currently is using a good App locker, such as the inbuilt locker in OxygenOS or KeepSafe's [App Lock](https://play.google.com/store/apps/details?id=com.getkeepsafe.applock).

**(Edit #1, 27/12 7.30pm GMT)**: A lot of people are saying that this flaw requires physical access. However, as I pointed out above, you don't need physical access, a maliciously installed application can easily access the activity and capture the code.)

**(Edit #2, 28/12 4.50pm GMT)**: The bug has been fixed in version 1.2.0.1145 which will be released soon. Thank you for sharing this article and providing support and thank you to LastPass for sorting out the issue.)

---

## Responsible disclosure timeline:

**13th June 2017**: Reported to LastPass support with proof. Jed from LP confirms that he can reproduce the issue

**20th June**: Followed up asking for an ETA. Support confirm that there is no ETA

**7th December**: Followed up, ticket pushed to "level 3 support". Johnny from LP confirms that there are no updates and it is "still being investigated".

**8th December**: Informed support that I would be publishing the details, received no response.