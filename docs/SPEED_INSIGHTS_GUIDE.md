# Getting started with Speed Insights

This guide will help you get started with using Vercel Speed Insights on your project, showing you how to enable it, add the package to your project, deploy your app to Vercel, and view your data in the dashboard.

## Prerequisites

- A Vercel account. If you don't have one, you can [sign up for free](https://vercel.com/signup).
- A Vercel project. If you don't have one, you can [create a new project](https://vercel.com/new).
- The Vercel CLI installed. If you don't have it, you can install it using the following command:

```bash
# Using npm
npm i -g vercel

# Using yarn
yarn global add vercel

# Using pnpm
pnpm i -g vercel

# Using bun
bun i -g vercel
```

## Step 1: Enable Speed Insights in Vercel

On the [Vercel dashboard](https://vercel.com/dashboard), select your Project followed by the **Speed Insights** tab. You can also select the button below to be taken there. Then, select **Enable** from the dialog.

> **💡 Note:** Enabling Speed Insights will add new routes (scoped at `/_vercel/speed-insights/*`) after your next deployment.

## Step 2: Add `@vercel/speed-insights` to your project

The `@vercel/speed-insights` package has already been added to this project. If you need to add it to another project, use your package manager:

```bash
# Using npm
npm i @vercel/speed-insights

# Using yarn
yarn add @vercel/speed-insights

# Using pnpm
pnpm add @vercel/speed-insights

# Using bun
bun add @vercel/speed-insights
```

## Step 3: Add the `SpeedInsights` component to your app

For React applications (like this one), add the `SpeedInsights` component from `@vercel/speed-insights/react` to your main app file:

```jsx
import { SpeedInsights } from '@vercel/speed-insights/react';

export default function App() {
  return (
    <>
      <YourAppContent />
      <SpeedInsights />
    </>
  );
}
```

The `SpeedInsights` component has already been integrated into the application's main `App.jsx` component.

### Framework-specific instructions

#### Next.js (Pages Router)

```tsx
import type { AppProps } from 'next/app';
import { SpeedInsights } from '@vercel/speed-insights/next';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <SpeedInsights />
    </>
  );
}

export default MyApp;
```

#### Next.js (App Router)

```tsx
import { SpeedInsights } from "@vercel/speed-insights/next";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
```

#### Remix

```tsx
import { SpeedInsights } from '@vercel/speed-insights/remix';

export default function App() {
  return (
    <html lang="en">
      <body>
        {/* ... */}
        <SpeedInsights />
      </body>
    </html>
  );
}
```

#### SvelteKit

```ts
import { injectSpeedInsights } from "@vercel/speed-insights/sveltekit";

injectSpeedInsights();
```

#### Vue/Nuxt

```vue
<script setup lang="ts">
import { SpeedInsights } from '@vercel/speed-insights/vue';
</script>

<template>
  <SpeedInsights />
</template>
```

#### HTML

Add the following scripts before the closing tag of the `<body>`:

```html
<script>
  window.si = window.si || function () { (window.siq = window.siq || []).push(arguments); };
</script>
<script defer src="/_vercel/speed-insights/script.js"></script>
```

## Step 4: Deploy your app to Vercel

You can deploy your app to Vercel's global [CDN](/docs/cdn) by running the following command from your terminal:

```bash
vercel deploy
```

Alternatively, you can [connect your project's git repository](/docs/git#deploying-a-git-repository), which will enable Vercel to deploy your latest pushes and merges to main.

Once your app is deployed, it's ready to begin tracking performance metrics.

> **💡 Note:** If everything is set up correctly, you should be able to find the `/_vercel/speed-insights/script.js` script inside the body tag of your page.

## Step 5: View your data in the dashboard

Once your app is deployed, and users have visited your site, you can view the data in the dashboard.

To do so, go to your [dashboard](https://vercel.com/dashboard), select your project, and click the **Speed Insights** tab.

After a few days of visitors, you'll be able to start exploring your metrics. For more information on how to use Speed Insights, see [Using Speed Insights](/docs/speed-insights/using-speed-insights).

## Privacy and Compliance

Learn more about how Vercel supports [privacy and data compliance standards](/docs/speed-insights/privacy-policy) with Vercel Speed Insights.

## Advanced Configuration

### Using `beforeSend` callback

You can optionally remove sensitive information from the URL by adding a `speedInsightsBeforeSend` function. This is particularly useful for Astro applications:

```tsx
<script is:inline>
  function speedInsightsBeforeSend(data){
    console.log("Speed Insights before send", data)
    return data;
  }
</script>
```

## Next steps

Now that you have Vercel Speed Insights set up, you can explore the following topics to learn more:

- [Learn how to use the `@vercel/speed-insights` package](/docs/speed-insights/package)
- [Learn about metrics](/docs/speed-insights/metrics)
- [Read about privacy and compliance](/docs/speed-insights/privacy-policy)
- [Explore pricing](/docs/speed-insights/limits-and-pricing)
- [Troubleshooting](/docs/speed-insights/troubleshooting)

## Local Development

When running your app locally with `npm run dev`, Speed Insights will be available but will not send data to Vercel. This is expected behavior for development environments. Once you deploy to Vercel, data collection will be active for real users.

## Troubleshooting

### The Speed Insights script is not loading

1. Verify that Speed Insights is enabled in your Vercel project dashboard
2. Check that your app is deployed to Vercel (not running locally)
3. Clear your browser cache and hard refresh
4. Check the browser console for any errors

### No data is appearing in the dashboard

- It can take a few hours for initial data to appear
- Ensure that real users are visiting your deployed site (local development doesn't send data)
- Check that you've properly integrated the SpeedInsights component

For more help, check the [official Speed Insights documentation](https://vercel.com/docs/speed-insights).
