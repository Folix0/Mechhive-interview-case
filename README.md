# Installation instructions

This project was built with [Create Remix](https://remix.run/docs/en/main/start/quickstart).

It can be accessed online [here](https://mechhive-interview-case.vercel.app/) or deployed locally. Installation steps below go into detail on how to do that.

## Requirements
- [Node.js](https://nodejs.org/en/) 16.18 or newer

## Installation

### API Key

in the root of the project (_mechhive-case/_), you need to create a `.env` file with a `REACT_APP_RAPIDAPI_KEY` which will then be used for API calls. It should look something like this: `REACT_APP_RAPIDAPI_KEY=YOUR_KEY` if you don't have one already, you can [sign up](https://rapidapi.com/auth/sign-up) and [subscribe](https://rapidapi.com/principalapis/api/currency-conversion-and-exchange-rates) to the API to obtain it.

Once signed up and logged in, you can view your API key [here](https://rapidapi.com/principalapis/api/currency-conversion-and-exchange-rates/playground/apiendpoint_6d87411b-80dd-4b72-9f16-c903473324b7)
![image](https://github.com/user-attachments/assets/70592125-d7b2-4d0c-bfa2-6f72957a162f)


### Installation and Launching

```shell
npm run dev
```
in the root directory `mechhive-case/` you can run `npm run dev` in terminal to install and launch the app in your local dev environment.

By default, it should be available by opening [http://localhost:5173/](http://localhost:5173) to view it in your browser.

# Features

<p>Acceptance Criteria:</p>

- ✅ Use the Shopify framework [Remix](https://remix.run/)
- ✅ Implement a homepage with a brief introduction to the website
- ✅ Implement a Sign In page with your own design ideas
- ✅ Implement a password-protected currency converter page
- ✅ Redirect users without access to the converter page to the Sign In page
- ✅ Fetch data from the provided currency exchange API
- ❔ Use the Remix loader to fetch data from the API and the action to perform calculations (Remix loader used, actions haven't been utilized)
- ✅ Apply SEO best practices and include the required meta tags
- ✅ Reproduce the provided design as faithfully as possible

<p>Nice to have:</p>

- ✅ Use query parameters in the URL to select currencies (from, to, amount)
- ✅ Upload your code to your personal GitHub account for review
- ✅ Deploy your application to Vercel
- 🔲 Add Recaptcha V2 to the Sign In form

# What to Improve?
- Reduce the amount of API calls by storing the symbols locally, and even possibly the exchange rates (for a timed duration) to further optimize our API call costs
- Implement error handling and user feedback for failed API calls in the UI to improve user experience (perhaps a toast component would be perfect for that?).
- Add functional, unit, and snapshot tests.
- Optimize the performance of the `ConvertWindow` component by minimizing unnecessary re-renders.
- Improve the accessibility of the application by ensuring all interactive elements are keyboard-navigable and screen reader-friendly.
