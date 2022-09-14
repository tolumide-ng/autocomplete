## 1. What is the difference between Component and PureComponent? give an example where it might break my app.
`PureComponents` are components that are not re-rendered when the parent component re-render, but only when their state/props change. This is because `PureComponents` implement their own shouldComponentUpdate which performs a shallow comparison of every props/state (this improves the performance of such components).
`Components` are regular components that can re-render either due to changes in their props/state or owing to the re-rendering of their parents.

> Shallow Comaprison is the comparison (equality check) of primitive values e.g number, string boolean, by their exact values, and the comparison of Object values e.g. Arrays by reference. \
    <code>
        const a = 1; \
        const b = 1; \
        const c = 2; \
        a === b; // true \
        a === c; // false \
    </code>  <br>
    <code>
        const obj_a = {}; \
        const obj_b = {}; \
        const obj_c = obj_a; \
        obj_a === obj_b; // false \
        obj_a === obj_c; // true \
    </code>

#### Examples of where PureComponent might break an application:
1. When `Component` is a child of `PureComponent`
2. When the props/state passed to the `PureComponent` is a nested complex data structure: \
Because `PureComponents` only perform shallow comparisons, they might continously re-render when their isn't a change in their props/state if such props/state are not primitive data-structures. This gives a false-negative effect, thereby undoing the performance optimization it was meant to provide, and worsening the performance of such application.
<br>
<br>

## 2. Context + ShouldComponentUpdate might be dangerous. Can think of why is that?
The ShouldComponentUpdate implementation that comes with PureComponents prevents such PureComponents from being aware of changes that might have taken place in Context therefore leading to stale data been renderd on the the PureComponent.
<br>
<br>

## 3. Describe 3 ways to pass information from a component to its PARENT.
#### a. Using state management libraries: e.g ContextAPI or Redux
State management libraries enable access to globally available information, when changes take place in a child component, and are available in the global state, a parent can have access to it by subscribing to such changes through the state management library been used.
<br>

#### b. Passing a function down the child component, so that you can set a property in the parent component
>    <code>
        const Child = ({updateCount, count}) => (
            <>
                <p>{count}</p>
                <button type="button" onClick={updateCount}>Add</button>
            </>
        )

        const OtherChild ({count}) => (
            <p>If you click the button once more you would have {count}</p>
        )

        const Parent = () => {
            const [count, setCount] = useState(0);
            const updateCount = () => {
                setCount(count + 1);
            }

            return (
                <>
                    <OtherChild count={count} />
                    <Child updateCount={updateCount} count={count} />
                </>
            )
        }
>    </code>
<br>

#### c. Using React hooks:
Using React Hooks, it is possible to return an object which has properties like `render` and `count` below, this way, the parent component can have access to the available data from the child component (the hook), while still rendering the jsx.
>    <code>
        const useCountHook = () => {
            const [count, setCount] = useState(0);

            return {
                count,
                render:(
                    <button type="button" onClick={() => setCount(count + 1)}>Add 1</button>
                )
            }
        }

        const Parent = () => {
            const {count, render} = useCountHook();

            return (
                <div>
                    <p> You currently have {count} oranges </p>
                    {render}
                </div>
            )
        }
>    </code>

<br>
<br>

## 4. Give 2 ways to prevent components from re-rendering.
Unnecessary re-renders in React components can result in poor application performance which can result in bad User Experience for the end users. Hence, the need to prevent unnecessary re-renders in such application, some of the ways to prevent this include:
#### a. Memoization of such components:
`React.memo` is an Higher Order Component that allows us to prevent re-renders on React components when the props of such component has not changed, thereby preventing unnecessary re-renders when the parent component changes.
    Functions in React can also be memoized using `useCallback` or `useMemo` hook.
    > Memoization is a technique used to improve the speed of computer programmes when they perform expensive actions like calculations e.t.c, which might otherwise have costed a lot more time, or used a lot of CPU resources. Memoization works by caching the return value of an expensive request, and only makes such request when the request parameters change.

<br>

#### b. Use keys when mapping through lists:
    React uses a diffing algorithm to compare root elements, recursing down to their child elements, and replacing the stale nodes. Adding `key` attribute to an element resulting from a `map` (e.g `li`) helps react identify which `li` has changed and need to be re-rendered.

<br>
<br>

## 5. What is a fragment and why do we need it? Give an example where it might break my app.
Fragment is a pattern/syntax used to wrap a component returning multiple elements in React. Fragments do not create extra DOM nodes.
Fragments can be represented as `<React.Fragment></React.Fragment>` or `<></>`, the key only difference between the two is that the first allows a `key` attribute.
An example where fragments might break an application would be adding attributes like `key` to `<React.Fragment>`
<br>
<br>

## 6. Give 3 examples of the HOC pattern.
An Higher Order Component (HOC) is a component that takes a component as an argument and returns a new component.
#### a. Display a Loader when the Page is yet to get its props from a network request
> <code>
    const HomePage = (props) => (
        <>
            <h1>{props.title}</h1>
            <p> Welcome to {props.name}</p> 
        <>
    )

    const Loader = () => (
        <p>Loading</p>
    )

    const PageWithLoader = ({children, status, ...rest}) => {
        <>
            {
                status === "loading" ?
                    <Loader>
                    : children(rest)
            }
        </>
    }
> </code>

<br>

#### b. Control Access to Authenticated pages:
Like the example above, we can use Higher Order components to control user access to specific pages based on their authentication status
<br>

#### c. Modify the props passed to child components:
We can also use HOCs to modify the props that would be passed to the component before such component is rendered
<br>
<br>

## 7. what's the difference in handling exceptions in promises, callbacks and async...await.
#### a. Exceptions in javascript `Promises` implemented using `.then` can be handling using a chained `.catch` in javascript:
```
    fetch("example-sitename.com")
        .then(successHandler)
        .catch(errorHandler)
```
<br>

#### b. Exception handling in Javascript `callbacks` can be implemented by passing the `error` as the first argument of such callback function:
```
    function getTodos(person, callback) {
        <!-- makes the request to get the todos -->
    }

    getTodos("tolumide", function(error, todos){
        if(error){
            errorHandler(error)
        } else {
            <!-- continue working on the todos -->
        }
    })
```
<br>

#### c. Exception handling in `Async awaits` can be implemented using the `try..catch` syntax:
```
    try {
        const response = await fetch("sample-sitename.com");
        const data = response.json();
    } catch (error) {
        errorHandler(error);
    }
```
<br>
<br>

## 8. How many arguments does setState take and why is it async.
setState takes two arguments.
setState causes components to re-render. Rerendering is an expensive operation and might cause the browser to be unresponsive, hence it is best to do this asynchronously.
<br>
<br>

## 9. List the steps needed to migrate a Class to Function Component.
Assuming we had a `Class component` that look like the component below:
```
    class Login extends React.Component {
        state = {
            name: "",
            password: "",
        }

        handleChange = (e) => {
            const {name, value} = e.target;
            this.setState({[name]: value});
        }

        handleSubmit = () => {
            <!-- handle submission e.g. make network request -->
            this.setState({name: "", value: ""});
        }


        render() {
            const {name, password} = this.state;

            return (
                <form onSubmit={this.handleSubmit}>
                    <input type="text" value={name} name="name" onChange={this.handleChange}>
                    <input type="password" value={password} name="password" onChange={this.handleChange}>
                    <button type="submit">Login<button>
                </form>
            )
        }

    }
```
Step 1: Replace the `class` keyword and `React.Component` with a `function` \
Step 2: Convert the state on `line 191 - line 194`   to use the `useState` hook \
Step 3: Update the methods within the component, and declare them as functions within the component: \
    e.g : Replace `handleChange` with a function delcaration of `handleChange` within the component `e.g. const handleChange = (e) => {...}` \
        : Replace `handleSubmit` with a function declaration of `handleSubmit` within the component `e.g. const handleSubmit = (e) => {...}` \
Step 5: If the class contains network calls within `componentDidMount`, replace such requests with `useEffect` hooks \
Step 6: Move the contents in `render` directly into the component. \
Step 7: Adjust the event handlers to reflect the new function declaration `e.g. replace {this.handleSubmit} on line 211 with {handleSubmit}` \####
<br>
<br>

## 10. List a few ways styles can be used with components.
a. CSS in JS i.e. writing CSS in Javascript using styled components
b. Using CSS preprocessors like SASS, SCSS, LESS
c. Inline styling 
d. CSS Modules



## 11. How to render an HTML string coming from the server.
#### a. Using `dangerouslySetInnerHTML`:
    This can also be achieved by updating the `innerHtml`, but it is best to use the the `dangerouslySetInnerHTML` property provided by React to inform the developer of the risk that comes with this:
    ```e.g. 
        function App (html) {
            return (
                <div dangerouslySetInnerHTML={{__html: `${html}`}}>
            )
        }
#### b. Using a third party library e.g `React Html Parser`


