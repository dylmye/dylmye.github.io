---
title: "Let's Plan"
date: '2023-05-08T00:00:00.000Z'
summary: 'An intuitive, offline-first webapp for travel planning, with extensive Firebase integration'
image: '/assets/portfolio/lets-plan-1.webp'
url: 'lets-plan.ninja'
tags: ['react', 'typescript', 'firebase']
---

**The brief:** Over the course of 2022 I day-tripped across the UK to discover more about my country. To facilitate this travel I created an organiser, which eventually became Let's Plan. It needed to work offline and in poor data areas, but also sync across devices to allow me to create and access plans on my phone and computer. It also needed to be flexible: I had to book many types of transport and events with specific timings, but equally account for untimed and unplanned days/times.

**The result:** I created a single-page application in React, using the MUI design system as a base for components and layout. I initially designed the website in Figma, ensuring to take into account accessibility, and mobile-first design. I made the decision to use Firebase services for functionality where I could: website hosting, (optional) user authentication, Firestore for storing trips, Cloud Functions for advanced functionality and Firebase Storage for image hosting. Firebase offered exceptional free tier allocations that made this project economical, while turning no profit. To further save on costs, the app does not have a backend and instead relies on Firebase Security Rules for safety, and Cloud Functions for anything extra.

![The homepage of Let's Plan, with a list of trips](/assets/portfolio/lets-plan-2.jpg)
![The trip details view on Let's Plan](/assets/portfolio/lets-plan-3.jpg)

To build out the project in a structured way, I created a GitHub project board. I split out my requirements into separate tickets, then as I used the product in the prototype stage, I created more tickets to refine the product. I followed this principle of documenting everything that came across my mind, as well as feedback from user testing.

![I used GitHub Projects to track feature implementation](/assets/portfolio/lets-plan-4.jpg)

Since my day-tripping adventure concluded, I have built extra functionality like PWA (Progressive Web App) features, Google Maps integration, Uber integration, affiliate links, dark + light mode, and automated deployments via GitHub Actions.
