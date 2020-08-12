# lrud

[![npm version](https://img.shields.io/npm/v/@please/lrud.svg)](https://www.npmjs.com/package/@please/lrud)

A React library for managing focus in TV apps.

## Installation

Install using [npm](https://www.npmjs.com):

```
npm install @please/lrud
```

or [yarn](https://yarnpkg.com/):

```
yarn add @please/lrud
```

This library has the following peer dependencies:

- [`react@^16.8.0`](https://www.npmjs.com/package/react)

## Table of Contents

- [**Guides**](#guides)
  - [Getting started](#getting-started)
  - [FAQ](#faq)
- [**API Reference**](#api-reference)
  - [\<FocusRoot/\>](#focusroot-)
  - [\<FocusNode/\>](#FocusNode-)
  - [useFocusNode()](#usefocusnode-focusid-)
  - [useSetFocus()](#usesetfocus)
  - [useNodeEvents()](#usenodeevents-focusid-events-)
  - [useFocusHierarchy()](#usefocushierarchy)
  - [useFocusStore()](#usefocusstore)
- [**Prior Art**](#prior-art)
- [**Limitations**](#limitations)

## Guides

### Getting Started

Render the `FocusRoot` high up in your application's component tree.

```jsx
import { FocusRoot } from '@please/lrud';

export default function App() {
  return (
    <FocusRoot>
      <AppContents />
    </FocusRoot>
  );
}
```

You may then use FocusNode components to create a focusable elements on the page.

```jsx
import { FocusNode } from '@please/lrud';

export default function Profile() {
  return <FocusNode className="profile">Profile</FocusNode>;
}
```

This library automatically moves the focus between the FocusNodes as the user inputs
LRUD commands on their keyboard or remote control.

This behavior can be configured through the props of the FocusNode component. To
learn more about those props, refer to the API documentation below.

### FAQ

#### What is LRUD?

LRUD is an acronym that stands for left-right-up-down, and it refers to the directional buttons typically found on remotes. In LRUD systems,
input devices usually also have some kind of "submit" button, and, less commonly, a back button.

#### Is this library right for me?

The [limitations](#limitations) described below may help you to determine that.

## API Reference

This section of the documentation describes the library's named exports.

### `<FocusRoot />`

Serves as the root node of a new focus hierarchy. There should only ever be one `FocusRoot` in each application.

All props are optional.

| Prop          | Type    | Default value | Description                                                                                             |
| ------------- | ------- | ------------- | ------------------------------------------------------------------------------------------------------- |
| `orientation` | string  | 'horizontal'  | Whether the children of the root node are arranged horizontally or vertically.                          |
| `wrapping`    | boolean | 'false'       | Set to `true` for the navigation to wrap when the user reaches the start or end of the root's children. |

```jsx
import { FocusRoot } from '@please/lrud';

export default function App() {
  return (
    <FocusRoot orientation="vertical">
      <AppContents />
    </FocusRoot>
  );
}
```

### `<FocusNode />`

A [Component](https://reactjs.org/docs/react-component.html) that represents a focusable node in your application.

All props are optional.

```jsx
import { FocusNode } from '@please/lrud';

export default function Profile() {
  return (
    <FocusNode
      elementType="button"
      className="profileBtn"
      onSelect={({ node }) => {
        console.log('The user just selected this profile', node);
      }}>
      Profile
    </FocusNode>
  );
}
```

### `useFocusNode( focusId )`

A [Hook](https://reactjs.org/docs/hooks-intro.html) that returns the focus node with ID `focusId`. If the node does not exist,
then `null` will be returned instead.

```js
import { useFocusNode } from '@please/lrud';

export default function MyComponent() {
  const navFocusNode = useFocusNode('nav');

  console.log('Is the nav focused?', navFocusNode?.isFocused);
}
```

### `useSetFocus()`

A [Hook](https://reactjs.org/docs/hooks-intro.html) that returns the `setFocus` function, which allows you to imperatively set
the focus.

This can be used to:

- override the default navigation behavior of the library
- focus modals or traps
- exit traps

```js
import { useSetFocus } from '@please/lrud';

export default function MyComponent() {
  const setFocus = useSetFocus();

  useEffect(() => {
    setFocus('nav');
  }, []);
}
```

### `useNodeEvents( nodeId, events )`

A [Hook](https://reactjs.org/docs/hooks-intro.html) that allows you to tap into a focus nodes' focus lifecycle events. Use this hook when
you need to respond to the focus lifecycle for a node that is not in your current component.

```js
import { useNodeEvents } from '@please/lrud';

export default function MyComponent() {
  useNodeEvents('nav', {
    focus(navNode) {
      console.log('The nav node is focused', navNode);
    }

    blur(navNode) {
      console.log('The nav node is no longer focused', navNode);
    }
  });
}
```

Each callback receives a single argument, the focus node.

The available events are:

| Event name | Description Description                         |
| ---------- | ----------------------------------------------- |
| `focus`    | Called when the focus node receives focus.      |
| `blur`     | Called when the focus node loses focus.         |
| `active`   | Called when the focus node becomes active.      |
| `inactive` | Called when the focus node is no longer active. |
| `disabled` | Called when the focus node is set as disabled.  |
| `enabled`  | Called when the focus node is enabled.          |

### `useFocusHierarchy()`

A [Hook](https://reactjs.org/docs/hooks-intro.html) that returns an array representing the focus hierarchy, which are the nodes
that are currently focused. Each entry in the array is a focus node.

```js
import { useFocusHierarchy } from '@please/lrud';

export default function MyComponent() {
  const focusHierarchy = useFocusHierarchy();

  console.log(focusHierarchy);
  // => [
  //   { nodeId: 'root', ... },
  //   { nodeId: 'homePage', ... },
  //   { nodeId: 'mainNav', ... },
  // ]
}
```

### `useFocusStore()`

A [Hook](https://reactjs.org/docs/hooks-intro.html) that returns the
focus store. Typically, you should not need to use this hook.

```js
import { useFocusStore } from '@please/lrud';

export default function MyComponent() {
  const focusStore = useFocusStore();

  useEffect(() => {
    console.log('the current focus state:', focusStore.getState());
  }, []);
}
```

## Limitations

- No support for pointer (mouse) inputs
- Navigation is determined based on a grid-like system, rather than nodes' spatial position on the page

## Prior Art

- ["Pass the Remote" on the Netflix Tech Blog](https://medium.com/netflix-techblog/pass-the-remote-user-input-on-tv-devices-923f6920c9a8)
- [bbc/lrud](https://github.com/bbc/lrud)
- [react-tv](https://github.com/raphamorim/react-tv)
- [@xdproto/focus](https://github.com/jamesplease/focus) _(the predecessor of this library)_

```

```
