import { useCallback } from 'react';

import { KeyMap, KeyMapProps, KeyMapResult } from './types';

export const useKeyMap = (props: KeyMapProps = {}): KeyMapResult  => {
      
  const addKeyMap = useCallback((KeyMap: KeyMap) => {
    const { target, key, handler } = KeyMap;
    const stringKey = String(key);
    target?.current?.addEventListener(stringKey, handler, false);
  }, []);

  const removeKeyMap = useCallback((KeyMap: KeyMap) => {
    const { target, key, handler } = KeyMap;
    const stringKey = String(key);
    target?.current?.removeEventListener(stringKey, handler, false);
  }, []);

  return {addKeyMap, removeKeyMap};
}
