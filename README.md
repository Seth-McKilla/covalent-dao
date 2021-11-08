This repo is a submission for the [DAO Analytics Dashboard Template](https://gitcoin.co/issue/covalenthq/covalent-gitcoin-bounties/5/100026820) hackathon hosted by [Covalent](https://www.covalenthq.com/) on GitCoin.

#DAOlytics
Daolytics is a basic open source, multi-chain compatible, DAO Analytics Dashboard Template, powered by the Covalent API.
For a more detailed desccription about the template, please refer to **_[DAOlytics.pdf](https://github.com/Seth-McKilla/covalent-dao/blob/main/DAOlytics.pdf)_** file in this repository.

The Dashboard is hosted live **[here](https://covalent-dao.vercel.app/)**.

You can find a short demo video of the Dashboard **[here](https://www.youtube.com/watch?v=8rgz9Y02Qt8)**.


#Running the app

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, clone the repo with the following git command:

```bash
git clone https://github.com/Seth-McKilla/covalent-dao.git
```

Second, open a terminal in the root directory of the project and run:

```bash
npm install
```

to install all the package dependencies for the project

Third, create a .env.local file in the project root directory that includes your API key:

```bash
COVALENT_API_KEY=<YOUR API KEY>
```

Finally, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
