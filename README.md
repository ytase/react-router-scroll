# react-router-scroll for React-router-dom v4

[React Router](https://github.com/reactjs/react-router) scroll management.

react-router-scroll is a React Router middleware that adds scroll management using [scroll-behavior](https://github.com/taion/scroll-behavior). By default, the middleware adds browser-style scroll behavior, but you can customize it to scroll however you want on route transitions.

This is a fork of the original React Router scroll made to support Reat Router v4. Currently all the original features should be working but it is still in early development, tests have not been completely updated yet and there are probably bugs to be encountered. Do not hesitate to signal them, or een fix them through pull requests.

## Usage

```js
import { BrowserRouter } from 'react-router-dom';
import { ScrollContext } from 'react-router-scroll';

/* ... */

ReactDOM.render(
  <BrowserRouter>
    <ScrollContext>
      <MyApp />
    </ ScrollContext>
  </ BrowserRouter>,
  container
);
```

## Guide

### Installation

```shell
$ yarn add ytase/react-router-scroll#build
```

### Basic usage

Use the `ScrollContext` wrapper as in the example above. `ScrollContext` Should always have only one child, same as all the `Router` components.

### Custom scroll behavior

You can provide a custom `shouldUpdateScroll` as a property of `ScrollContext`. This function is called with the previous and the current router props.

The function can return:

- a falsy value to suppress updating the scroll position
- a position array of `x` and `y`, such as `[0, 100]`, to scroll to that position
- a string with the `id` or `name` of an element, to scroll to that element
- a truthy value to emulate the browser default scroll behavior

```js
shouldUpdateScroll = (prevRouterProps, { location }) => (
  prevRouterProps && location.pathname !== prevRouterProps.location.pathname
);

shouldUpdateScroll = (prevRouterProps, { routes }) => {
  if (routes.some(route => route.ignoreScrollBehavior)) {
    return false;
  }

  if (routes.some(route => route.scrollToTop)) {
    return [0, 0];
  }

  return true;
};
```

### Scrolling elements other than `window`

Use `<ScrollContainer>` in components rendered by a router with the `useScroll` middleware to manage the scroll behavior of elements other than `window`. Each `<ScrollContainer>` must be given a unique `scrollKey`, and can be given an optional `shouldUpdateScroll` callback that behaves as above.

```js
import { ScrollContainer } from 'react-router-scroll';

function Page() {
  /* ... */

  return (
    <ScrollContainer
      scrollKey={scrollKey}
      shouldUpdateScroll={shouldUpdateScroll}
    >
      <MyScrollableComponent />
    </ScrollContainer>
  );
}
```

`<ScrollContainer>` does not support on-the-fly changes to `scrollKey` or to the DOM node for its child.

### Notes

#### Server side rendering

Both `<ScrollContainer>`  and `<ScrollContext>` are fine to use in server side rendering context. They just renturn their child without changing them in any way.
