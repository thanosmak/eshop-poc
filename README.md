# BO Front-End Developer - Assignment 02

## Task description

As an assignment, I had to create a Proof of Concept of an e-commerce solution. One client wants to have an application where he could sell images and artworks. He provided designs and we need to transfer his vision to real code.

Design provided: https://www.figma.com/file/wYrjKlxB3g80yge1kcahWx/Bejamas-Recruitment-task?node-id=7:376
Images were found in: https://www.pexels.com/

## Tech Stack that was used

- React
- Typescript
- Firebase (for DB and storing images)

## Asked requirements (features)

1. **Featured Product**
   > One of the products should have a flag that it's a featured artwork. It should be displayed above the product list.
2. **Product List**
   > The product list should contain 6 artworks. After hovering over the image, you should display the "add to cart" bar. Remember that some products have the bestseller flag.
3. **Add to Cart**
   > After clicking "Add to cart" in the cart icon in the header should appear the badge with the counter of elements in the cart. Each 'Add to cart' action should open the cart dropdown with items. The dropdown should be also visible after clicking the basket icon in the header. Clicking in the "Clear" button should remove items from the cart and hide the dropdown.
4. **Pagination**
   > Products should be paginated. On one page should be 6 items. The pagination should show the current page. Hide the 'prev' arrow on the first page and hide the 'next' arrow on the last page
5. **Sorting**
   > Implement 2 types of sorting: alphabetically or by price. Use basic HTML select. Clicking on arrows should change the order to 'ascending' or 'descending'.
6. **Filtering**
   > Products should be filterable. You can filter products by multiple categories (multiple filters) and only one price range (single filter). Using filters should affect the pagination. Try to build filter options dynamically (don't hardcode them).
7. **Web performance**
   > Optimise Your website using lighthouse reports. Try to achieve 80+ score in web core vitals. (mobile and desktop)
8. **API implementation (bonus)**
   > Try to implement your own database solution. You can use tools like Fauna, Hasura, Amplify, Firebase)

---

---

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
