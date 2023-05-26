---
title: "Game Show Voting Platform"
date: '2023-03-01T00:00:00.000Z'
summary: 'Full-stack platform for an online gameshow delivered on a tight deadline'
image: '/assets/portfolio/gameshow-1.webp'
tags: ['react', 'typescript', 'aws', 'terraform']
---

**The brief:** The client was planning to run a reality show among a group of friends, over the internet. Based on the show [_The Circle_](https://en.wikipedia.org/wiki/The_Circle_(franchise)) (itself based on a novel by Dave Eggers), a key requirement for the client was the ability to send contestants questions and allow them to rank each other. The platform needed to be intuitive to use, require no special setup for clients, and provide as high as possible reliance to ensure the game goes smoothly. The deadline for the project was tight, at two weeks.

**The result:** After creating a full specification & high level objectives list with the client, and with the tight deadline in mind, I decided to build the project in four parts: a single-page application (SPA) client (website) that interfaces with a lightweight API, itself based on a simple MySQL database and all deployed through Terraform. I split the requirements into tickets on a GitHub project kanban board in order to meet the requirements efficiently.

## Front end

I built an interface quickly by using [Vite tooling](https://vitejs.dev/), with a React + TypeScript template. This enabled me to worry less about the setup and infrastructure of the front-end and work on the features instead.

![The homepage is primarily made up of the form.](/assets/portfolio/gameshow-1.webp)

To interface the API and persist data over tabs and sessions, I used [Redux Toolkit](https://redux-toolkit.js.org/) (RTK.) RTK is built on top of the state management tool Redux, and offers a tool called _Query_ that abstracts over the difficulties of fetching, storing and cache managing API requests. Using RTK Query saved time in development by providing strongly typed interfaces for APIs without the setup time that [tRPC](https://trpc.io/) requires, and provided advanced functionality required like polling.

I built form functionality using [React Final Form](https://final-form.org/react) and the interface is based on [Material UI (MUI)](https://mui.com/). Other tools used include Atlassian's [Beautiful D'n'D](https://github.com/atlassian/react-beautiful-dnd), used to create drag-n-drop list forms, and [dayjs](https://day.js.org/) for date formatting and manipulation.

## API

Again I built the API with lean-ness and plug-and-play ability in mind. I based it on the [NestJS](https://nestjs.com/) framework, again based on TypeScript & Express. Nest is flexible, extendable and requires little configuration. I used multiple plugins to build functionality quickly:

* [Passport](https://www.passportjs.org/) - for easy user oAuth authentication via [Discord](https://github.com/oauth-everything/passport-discord)
* [JWT](https://jwt.io/) - for maintaining user authorisation
* [Objection + Knex](https://github.com/willsoto/nestjs-objection) - for intuitive database interaction

## Database

I used MySQL for data storage on production, and SQLite locally, for simplicity's sake. I used [Objection.js](https://vincit.github.io/objection.js/) ORM to manage + query entities in the database.

## Infrastructure

### AWS

The setup for this application is quite simple. All infrastructure was hosted in [AWS](https://aws.amazon.com/).

The front-end is statically hosted using S3. A GitHub Workflow built and deployed the website to S3 when changes are pushed to the main branch.

The back-end and database are provided by an Elastic Beanstalk application, with an RDS database and no load balancing. Again, changes to the backend application are deployed through a GitHub Workflow.

Finally, CNAME'ing these resources to a custom domain and deploying TLS certificates was performed through Route 53 and AWS ACM.

### Deploying with Terraform

I provisioned all infrastructure for this using [Terraform](https://www.terraform.io/) infrastructure-as-code. This allowed me to plan everything in one place, creating a single source of truth and transparency.
