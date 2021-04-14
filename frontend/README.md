# React-Jobly Frontend Component Heirarchy

## App 
* wrapper for whole app
- No props
- State - infoLoaded, currentUser, token, applicationIds
- UserContext.Provider value -> (currentUser, setCurrentUser, hasAppliedForJob, applyForJob)
- BrowserRouter
    - NavBar props -> logout
    - Routes props -> login, signup

## NavBar
- Props: logout
- No State
- useContext - currentUser
Shows different links based on currentUser status
    - loggedInNav
    - loggedOutNav

## Routes
- Props: login, signup
- No State
Location of switch for routes: Route || PrivateRoute *HOC for authentication access to route*
    - Home - R - homepage ("/")
    - CompaniesList - PR - list companies ("/companies")
    - CompanyDetails - PR - show details of a company : params:handle ("/companies/:handle")
    - JobList - PR - list jobs ("/jobs")
    - NewUserForm - R - Signup up : props -> signup ("/signup")
    - LoginForm - R - Login : props -> login ("/login")
    - UpdateUserForm - PR ("/profile")
    - Redirect - If user tries to access route that doesn't exist go to ("/")


## PrivateRoutes
- props: exact, path, children
- useContext : currentUser
    - Directs users to "/login" for attempting to access private route
    without auth.

## Companies
- state - isLoading, companies
- useEffect (search())
- search - calls JoblyApi.getCompanies(name);
    - SearchForm: props={search}
    - CompaniesList ("/companies") -> CompanyCard: props= {key, handle, name, description, numEmployees, logoUrl}

### CompanyCard
- shows Company informaiton and job list for company

## JobList
- state - jobs, isLoading
- useEffect (search())
- search - calls JoblyApi.getJobs(title);
    - SearchForm: props={search}
    - JobCardList: props={jobs}

### JobCardList
    - props - jobs
    - JobCardList -> JobCard: props={key, id, title, salary, equity, companyName }
#### JobCard
    - state - applied
    * useContext - hasAppliedForJob, applyForJob 
    useEffect (setApplied())
    - Shows job information with apply button

## Auth/Users
    - login ("/login")
    * LoginForm: props: login *
        - state: formData
        
    - signup ("/signup")
    * NewUserForm: props: signup * 
        - state: formData

    - profile ("/profile")
    * UpdateUserForm *
        - useContext - currentUser, setCurrentUser
        - state: formData


# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
