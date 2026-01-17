---
title: "I left the hyperscalers for Europe. It wasn't so simple."
coverImage: '/assets/blog/2026-01-17-migrating-personal-infra-to-eu/cover.webp'
---

For me, the priority with hosting personal projects has always been to run them as cheaply as possible, because I don't monetise them (partly out of a lack of confidence but mostly because I don't need to). This naturally skews toward American offerings, with multiple variables leading to unbeatable prices - Hyperscalers earning higher margins on enterprise customers who are locked in, "free tier" pricing to entice developers to adopt platforms, high venture capital liquidity, etc. My monthly AWS bill is less than £0.50 a month, and I've never paid Cloudflare a penny. [Recent](https://www.stevefrenzel.dev/posts/i-moved-my-astro-websites-to-europe/) [incidents](https://news.ycombinator.com/item?id=45416353) and developments in the US legal environment (*gestures broadly at everything*) have given me the motivation to move my deployments closer to `/home`.

The strong data privacy laws of the European Union and interest in supporting the [underdog](https://theconversation.com/a-224665) has led me to find the best balance between EU hosting and affordability.

## The research

Thankfully, I haven't been alone in this, I had a few resources to work off of. [Steve Frenzel](https://www.stevefrenzel.dev/posts/i-moved-my-astro-websites-to-europe/) shared his similar journey. Meanwhile [Peter White](https://peterwhite.dev/posts/european-alternatives-to-vercel) and [Thilo Maier](https://maier.tech/posts/it-aint-easy-to-move-a-side-project-off-big-tech) shared some alternatives they found and difficulties they encountered. As always, [a number of](https://www.reddit.com/r/sveltejs/comments/1jr5gyn/) [Reddit threads](https://www.reddit.com/r/nextjs/comments/1ovwwax/) provided a glimpse into the hivemind on this subject matter.

The main themes I found from my research are that:

- **There are great alternatives but they're all hosted in the US**: Render, Railway, Netlify, Sevalla and Sherpa.sh all have their benefits but they're out of the race
- **The second best alternative is probably self-hosting on bare metal**: Reddit in particular loves Dokploy and Coolify
- **The best European alternatives can be expensive**: Many services can't beat the American [loss leaders](https://truthonthemarket.com/2019/05/07/is-amazon-guilty-of-predatory-pricing/) or choose to target more profitable demographics (I can't blame 'em)

## The requirements

First, I took inventory of my digital estate, so to speak. I run a couple of static generated sites, including the one you're reading this on right now (fourth wall break!) and projects like [ISA Eye](https://isaeye.uk). Some of these sites make use of serverless compute, object storage (and a CDN fronting said storage), and more niche services like image optimisation. I turned this into a map:

![A chart of the "before" infrastructure, made in draw.io.](/assets/blog/2026-01-17-migrating-personal-infra-to-eu/before-map.webp)

(Away from websites, I also self-host some apps for personal organisation. These are largely out of scope of this article.)

I distilled down my needs to these three guiding principles:

1. **The provider should be headquartered in a European country**: just having a point of presence in Ireland isn't enough, [Microsoft](https://www.microsoft.com/en-ie/aboutireland). That being said, I'm not going to research the CEO's family tree.
2. **A budget of £8 a month, overall**: £100/year feels like more than enough for some simple web apps and light workloads including serverless functions. Prioritise free tier availability and pay-per-use pricing.
3. **Loading times should not be affected**: Even for hobby projects, speed is important because I still want people to look at what I'm doing and [not bounce](https://www.thinkwithgoogle.com/marketing-strategies/app-and-mobile/page-load-time-statistics/). Solutions should still prioritise low latency as much as possible.

(I drew up some bonus criteria as well: Terraform/OpenTofu support, free email/Discord support, (meaningful) carbon offsetting, and good ratings on platforms like Trustpilot, G2 and Capterra.)

This should be easy peasy, right? Wrong!

## The struggle that ensued

I found some fantastic resources for researching possible solutions for this project. [European Alternatives](https://european-alternatives.eu/) is run by Austrian developer Constantin Graf and was a great starting point. There's also the [European Cloud Alternatives](https://europeancloudproviders.com/) wizard and Georg Kalus' [European Cloud](https://european.cloud) project, both of which cover some services not listed on the former's directory. Finally I trawled through search results, Reddit and recommendations from friends and colleagues.

The first struggle I encountered was the number of services aimed at enterprises rather than individual developers. The telltale sign of this was request-only and flat-rate pricing offers, which just aren't feasible for an individual developer's budget.

Some American services are truly unique: Vercel's serverless deployment of server-side rendered web apps has no competition in Europe. Instead you're expected to run the server as a Node.js app in a custom Docker setup. That means no one-click deployments (without deploying solutions like the aforementioned Coolify), no auto-scaling and no tight platform integration. Similarly, it was a real struggle to find a decent European domain registrar with the level of control that Porkbun provides. That was probably the most painful service to leave behind.

You'll also find that not everything is as it seems: I ended up abandoning multiple providers due to being misled by pricing (minimum spend requirements, hidden up-front fees, etc) and nonexistent/unprofessional support. To focus on one facet of the setup, many of the most popular object storage services don't support an S3-compatible API, which is a must for me because so many tools and CDNs depend on it. But I'm not here to slag off anyone.

## The final setup

Here's what I got up to over the Christmas break:

![A chart of the "after" infrastructure, made in draw.io.](/assets/blog/2026-01-17-migrating-personal-infra-to-eu/after-map.webp)

Starting from the bottom up:

- **Domains registered with [QuickHostUK](https://www.quickhost.uk/)**: It might feel like eNom-partnered registrars are all the same, but QuickHost's edge is their fantastic customer experience. 24/7/365 technical support that don't baby you and an active Discord community made me feel at home. As you can tell from their name, the main business is UK-based web + VPS cloud hosting (and UK colo), however their domain product is far from a last-minute thought. I miss Porkbun in some ways, like managing your own DNSSEC and [this](https://porkbun.com/buniverse.html), however I have no regrets in supporting a great local business. Bonus points for a carbon neutral offering, too.
- **Managed DNS with [Gcore](https://gcore.com/)**: Cloudflare's 'proxy' DNS service provides DDoS protection, advanced caching and DNS-level analytics, alongside new feature offerings like [ALIAS records](https://dn.org/cname-cloaking-security-considerations-for-dns-aliases/). Gcore doesn't have quite the same level offering but it is a level above registrar-provided DNS in terms of DDoS protection and the user interface. Gcore is a less well-known PaaS from Luxembourg that originally focussed on services for the gaming industry but are truly fantastic whoever you are. They also have a generous free plan with access to a big network of PoPs, and all assets are Terraform-able. Their customer service isn't quick but they're not bad otherwise.
- **Static hosting with [Statichost](https://www.statichost.eu/)**: It's more than a no-BS name, it's a no-BS service. A super simple interface that integrates as smooth as butter with most modern frameworks. It integrates just as easily with my repos as Vercel/Cloudflare Pages did, thanks to their webhooks. This is the most no-compromises solution I've used. Soon they're releasing preview URLs and their own CDN which is a true cherry on the top. Eric Selin, I salute you!
- **App hosting with [Scaleway](https://www.scaleway.com/)**: This was the biggest struggle to replace. Scaleway's Serverless Container offering is a little less "one-click deploy" than Cloudflare Pages but [their Next.js tutorial](https://www.scaleway.com/en/docs/tutorials/hosting-nextjs-webapp-serverless-containers/) is quite short and reflective of how easy the process is. Scaleway is one of the best-known cloud providers in Europe. They're serious about their environmental impact, too. Bonus points for OpenTofu support.
- **Object storage with Scaleway**: This is the closest replacement to S3 that I've found that meets my needs. Proper high availability and S3 API support, and practically free (< £0.02 a month) for the amount of storage I'm using. Unlike some of its European alternatives (and S3) it also has an easy-to-use user interface.
- **CDN with Gcore**: Gcore offers a great free plan that meets all of my needs and connects easily with Scaleway despite offering their own (more expensive) object storage service. 1 million requests are included each month which is more than enough for my projects (for better or for worse.) My only wish is that image optimisation was available for the free tier to compete with Cloudflare's offering.
- **Functions with Scaleway**: Scaleway's Lambda replacement has an extremely generous free tier and better organisation than AWS's offering: as well as their site-wide "project" grouping, related functions are grouped into "namespaces" that share environment variables and access tokens. And unlike AWS it's extremely simple to link a function to a custom domain.
- You'll notice that **image optimisation** hasn't been carried over. I've yet to find a replacement that works with NextJS's [image optimisation API](https://nextjs.org/docs/messages/export-image-api) that also meets the budget requirements. But that's fine when CDN costs aren't an issue!

Generally, I've found that this setup is serving me well: budget-wise I'm paying around £5 a month which is significantly more than before but certainly manageable; speed-wise, I cannot see any meaningful difference in Lighthouse tests.

I'm not missing the extreme level of detail and labyrinthine setup processes that AWS offered. As someone who didn't make much use of the nooks and crannies AWS offered (like Lambda Layers), I can't tell you if these solutions are right for you and your needs but certainly for my personal projects I'm happy with where I am.
