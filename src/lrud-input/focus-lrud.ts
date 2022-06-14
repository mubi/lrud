import throttle from './throttle';
import keyCodeToBindingMap from './code-to-binding-map';
import keyToBindingMap from './key-to-binding-map';
import { FocusStore } from '../types';

export default function focusLrud(focusStore: FocusStore) {
  const lrudMapping = {
    up() {
      focusStore.processKey.up();
    },

    down() {
      focusStore.processKey.down();
    },

    left() {
      focusStore.processKey.left();
    },

    right() {
      focusStore.processKey.right();
    },

    select() {
      focusStore.processKey.select();
    },

    back() {
      focusStore.processKey.back();
    },
  };

  const keydownHandler = throttle(
    function (e: KeyboardEvent) {
      const bindingName =
        // @ts-ignore
        (e.key && keyToBindingMap[e.key]) || keyCodeToBindingMap[e.keyCode];

      // @ts-ignore
      const binding = lrudMapping[bindingName];

      if (typeof binding === 'function') {
        e.preventDefault();
        e.stopPropagation();

        binding();
      }
    },
    // TODO: support throttling. Ideally on a per-node basis.
    0,
    {
      trailing: false,
    }
  );

  function subscribe() {
    window.addEventListener('keydown', keydownHandler);
  }

  function unsubscribe() {
    window.removeEventListener('keydown', keydownHandler);
  }

  return {
    subscribe,
    unsubscribe,
  };
}
