import { useCallback } from 'react';

import { EventActionType, EventListener, KeyMap, KeyMapResult } from './types';

export const useKeyMap = (): KeyMapResult => {
  const configureEventListener = useCallback(
    (eventAction: EventActionType, KeyMap: KeyMap) => {
      const { target, key, handler } = KeyMap;
      const keys = Array.isArray(key) ? key : Array(key);
      const eventHandler = handler as EventListener;
      keys.forEach(key => {
        if (eventAction === EventActionType.Add) {
          target?.current?.addEventListener(key, eventHandler, false);
        } else {
          target?.current?.removeEventListener(key, eventHandler, false);
        }
      });
    },
    []
  );

  const addKeyMap = useCallback(
    (KeyMap: KeyMap) => {
      configureEventListener(EventActionType.Add, KeyMap);
    },
    [configureEventListener]
  );

  const removeKeyMap = useCallback(
    (KeyMap: KeyMap) => {
      configureEventListener(EventActionType.Remove, KeyMap);
    },
    [configureEventListener]
  );

  return { addKeyMap, removeKeyMap };
};
