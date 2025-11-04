---
title: "ISA Eye"
date: '2025-11-01T00:00:00.000Z'
summary: 'Budgeting for personal savings has never been easier'
image: '/assets/portfolio/isa-eye-1.webp'
url: 'isaeye.uk'
tags: ['react', 'typescript', 'expo']
---

🛍️ **Product Hunt: [View launch](https://www.producthunt.com/products/isa-eye)**

**The problem:** Individual Savings Accounts (ISAs) are tax-efficient saving account wrappers used by tens of millions of UK taxpayers, offered by hundreds of banks and financial services companies. While they provide many benefits, the rules and limitations are difficult for most to fully understand. There are allowances, sub-allowances, side-allowances, all of which change every few years. The most difficult part is that these allowances can be split over multiple accounts with multiple providers, and keeping track of how much of this allowance is used requires a lot of mental math.

**The result:** a fully-offline app that provides a simple interface to keep track of ISA contributions whereever they're made. I built ISA Eye with privacy and ease of use in mind.

![ISA Eye puts your savings first, with simple but useful data visualisation](/assets/portfolio/isa-eye-2.webp)

To easily build a website and mobile apps from one source, I used [Expo](https://docs.expo.dev/workflow/web/). For data storage (and in the future, data synchronisation) I built the data layer with [TinyBase](https://tinybase.org/). Finally the UI was built on top of [React Native Reusables](https://github.com/founded-labs/react-native-reusables).
