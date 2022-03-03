# penn-coursecart-application

[Live Deployment of Website on Netlify](https://eager-wozniak-9da146.netlify.app)

## Project Description / How to use:

My goal in creating this application was to use a Javascript/React Framework to build an interface where users can explore computer science courses added at Penn, add them to a cart, and checkout. 

To use the app, simply scroll through the listed course options (or alternatively, search for a desired course), click on a course to view its description and additional information, and press the "+" button if you'd like to add it to your cart. For some courses, an additional feature will then pop up where you can also select a recitation option from the given list. 

Lastly, you can click on the Cart Button in the top right corner, which will bring you to a page that shows you the receipt of your selected courses. On this page, you can sort the courses based on your preferences, as well as remove a course from your receipt. Press "BACK" if you'd like to return to the course selection page.

Enjoy!

(Note: This project was created for the frontend technical challenge of my application to Penn Labs, a non-profit, student-run organization that provides software solutions used by over 16,000 members of the Penn community. Based off of the skills I demonstrated in this challenge, I was accepted out of 200+ applicants in the Spring 2022 application cycle.)

## How to Run

Method 1: [Live Deployment of Website on Netlify](https://eager-wozniak-9da146.netlify.app)

Method 2: Run site locally using the following steps:

First, download the .zip file for the master branch above.

Then, make sure you have node and npm installed using:

### `node -v`
### `npm -v`
Alternatively:
### `yarn -v`

If not installed, download the appropriate package on [this site](https://nodejs.org/en/download/)

Now, navigate into the project directory and run:

### `npm install`
Alternatively:
### `yarn`

Followed by:

### `npm run dev`
Alternatively:
### `yarn start`

This will run the app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.

## My Approach / Reflection

This was actually one of the first times I've built and deployed a web app that used Javascript, not to mention React. As a result, my greatest challenge was self-learning both of these tools on the fly, doing my best to avoid bugs and potentially bad habits.

Of course, I did not let this added difficulty get in the way of achieving my primary goal, which was to create a presentation interface as intuitive and user-friendly as possible.

To do so, I implemented a variety of complex features to my app, many of which were not required in the original challenge description. These features include:

UI/UX-related:
- The ability to select recitations when available (this is a completely original feature that not a single other applicant attempted)
- A search bar that is completely responsive to a variety of special cases, including if the user searches a course by concatenating both the dept and number (i.e. cis110), if the user enters > 1 word into search bar, and if the user enters words out of order.
- The ability to sort courses in order of preference, as well as delete them completely from your cart.

Technical Proficiency-related:
- Global state handling using the React context api
- Animations using the framer-motion npm package

  - Before this challenge, I had no previous knowledge of either of this technical features. However, in order to challenge myself as much as possible, I utilized both briefly within my project, and will continue learning how to implement them properly in the future.

If I had had more time to work on this application, I would have liked to implement an additional feature that removes courses from the available list based off of if their class time conflicts with courses that have already been added to the cart. I'd also like to have cleaned up my code by using "lifting state up" more and being more conservative with my function initialization.

### File Documentation

Main source files (my contribution):
- src/App.js
- src/components (all)
- src/context (all)
- src/functions (all)
- src/index.css

# Original Challenge Prompt

> If you have already done this challenge, there's a [section below](#repeat-applicants) specifically for you.

The frontend challenge for this semester is to build a product called Penn Course Cart in React! The goal of this challenge is for you to demonstrate:

1. An eye for building intuitive, feature-rich user interfaces
2. Ability to build products with minimal direction
3. Ability to work within a set timeline

More concretely, you will build an interface where users can explore computer science courses added at Penn, can add them to a cart, and checkout.

---

### Getting started

- Copy this repository to your own GitHub account by clicking the green "use this template" button. Make sure you create a **private repository**
  - You'll have to make a GitHub account if you don't already have one :stuck_out_tongue:
- [Clone](https://help.github.com/en/articles/cloning-a-repository) the repository you just made to your own computer:
  ```bash
  git clone git@github.com:{USERNAME}/frontend-challenge.git
  ```
- Make sure that you [have Node installed](https://www.seas.upenn.edu/~cis197/development)
- `cd` into the cloned directory and run either `yarn` or `npm install`
- Run `yarn start` or `npm run dev`

---

### General structure

```
public/
  index.html           Root HTML file for each page

src/                   Where the JS logic is
  components/          Contains all React components
    Cart.js            Basic component for the course cart
    Courses.js         Basic component for rendering courses
    Nav.js             Basic component for the navbar
    ...                Feel free to add other components

  data/                Contains data rendered by the components
    courses.json       Contains information on CIS courses at Penn

  App.css              CSS for the app
  App.js               Root component for the app
  index.js             Renders the React app
  ...
```

---

### Features

1. **Explore courses**

   - If you view `src/components/Courses.js`, you'll see that it is rendering _some_ of the courses data from `src/data/courses.json`
   - What you need to do is design a more robust way to display this courses information. You should display all information contained in the JSON--though put some thought into how to go about doing this.
     - For example, you might only want to show the description once the user clicks on the course.

2. **Add courses to your cart**

   - A user should be able to add a subset of these courses to their cart.
     - The user should not be able to add more than 7 courses to their cart.
   - When a user adds a course, this addition should be reflected in:
     1. How that cart is rendered
     2. How that course is rendered
     - For example, there should not still be a button to add that course to the cart, and maybe the text should be grayed out.

3. **View cart and checkout**

   - The user should be able to click a button to view their cart.
     - If the cart has no items in it, tell the user that their cart is empty.
     - If the cart has courses it in, display the courses and relevant information about them.
   - When the user is satisfied with their course cart, they should be able to "checkout"
     - This will either take the user to a new page containing (or will display on the same page) a "receipt" containing the courses which they checked out with.

4. **Additional features**

   - Feel free to add other features as well! Here are some ideas:
     - Big bonus if you integrate other data (course times, when they're offered, etc.)
       - A great resource is the [Penn Labs API](https://github.com/pennlabs/labs-api-server)
         ```
         fetch(https://api.pennlabs.org/registrar/search?q=cis-110)
         ```
     - Add animations for adding and viewing courses and the cart
     - Let users rank courses in order of preference
     - Take advantage of a [linter](https://eslint.org)
     - Allow users to filter and sort courses by different metrics

---

### Additional tips

- For styling, use whatever you want:

  - CSS frameworks (Bulma, Bootstrap)
  - CSS files (or SCSS)
  - CSS-in-JS
  - `styled-components`
  - ...

- For state management:

  - Vanilla react state and props
  - Redux
  - ...

- For navigation:
  - React Router
  - ...

---

### Getting help

If you have any questions about the project or need some help, send an email to **Daniel Tao** (dtao@seas.upenn.edu).

---

### Repeat applicants

First off, thanks so much for your continued interest in Labs. We've accomplished a lot in the past year and have plans for more great products and features which need new developers to tackle them—so fingers crossed!

At Labs we don't just build new products, we also maintain legacy code bases and year over year push out new and improved versions. [Penn Course Review](https://penncoursereview.com) and the [Common Funding Application](https://penncfa.com) are two great examples.

In line with this, we want you to take your submission from when you last applied, clean up your code, and take it to the next level with new features and data. Be deliberate with your implementation decisions, architecture, and documentation such that if someone else opens your code 6 months from now they'll be able to pick up right where you left off. We're excited to see what you come up with.

---

## Submitting
Follow the instructions on the Technical Challenge page for submission.


