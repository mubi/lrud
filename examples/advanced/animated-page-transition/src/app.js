import React, { useState } from 'react';
import classnames from 'classnames';
import { useMountTransition } from 'core-hooks';
import { FocusNode } from '@mubi/lrud';
import './app.css';

export default function App() {
  // As this toggles between page one and two, the two pages animate between one another
  const [page, setPage] = useState('one');

  // This `useMountTransition` hook is a hook that allows us animate our components
  // in/out using CSS transitions.
  // The return value is [boolean, boolean]. The first boolean represents whether or not
  // you should mount the component, and the second Boolean is true when you should give the
  // element a class that makes it visible in the page.
  const [mountPageOne, useActiveClassPageOne] = useMountTransition({
    shouldBeMounted: page === 'one',
    transitionDurationMs: 450,
    onEnteringTimeout: 35,
  });

  const [mountPageTwo, useActiveClassPageTwo] = useMountTransition({
    shouldBeMounted: page === 'two',
    transitionDurationMs: 450,
    onEnteringTimeout: 35,
  });

  return (
    <FocusNode className="app">
      {mountPageOne && (
        <FocusNode
          className={classnames('block-container block-container-horizontal', {
            'block-container-unmounted': page !== 'one',
            'block-container-active': useActiveClassPageOne,
          })}
          onMountAssignFocusTo="1-B">
          <h2>One</h2>
          <div className="flex">
            <FocusNode className="block" onSelected={() => setPage('two')}>
              1-A
            </FocusNode>
            <FocusNode
              focusId="1-B"
              className="block"
              onSelected={() => setPage('two')}>
              1-B
            </FocusNode>
            <FocusNode className="block" onSelected={() => setPage('two')}>
              1-C
            </FocusNode>
          </div>
        </FocusNode>
      )}
      {mountPageTwo && (
        <FocusNode
          className={classnames('block-container block-container-horizontal', {
            'block-container-unmounted': page !== 'two',
            'block-container-active': useActiveClassPageTwo,
          })}
          onMountAssignFocusTo="2-B">
          <h2>Two</h2>
          <div className="flex">
            <FocusNode className="block" onSelected={() => setPage('one')}>
              2-A
            </FocusNode>
            <FocusNode
              focusId="2-B"
              className="block"
              onSelected={() => setPage('one')}>
              2-B
            </FocusNode>
            <FocusNode className="block" onSelected={() => setPage('one')}>
              2-C
            </FocusNode>
          </div>
        </FocusNode>
      )}
    </FocusNode>
  );
}
