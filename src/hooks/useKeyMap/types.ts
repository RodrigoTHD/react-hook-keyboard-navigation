import { RefObject } from 'react';

export type Target = RefObject<HTMLElement>;

export type Key = string | string[] | number | number[];

export type KeyMap = {
  handler: (e: Event) => void;
  key: Key;
  target?: Target;
};

export type KeyMapProps = {
  key?: Key;
};

export type KeyMapResult = {
  addKeyMap: (keyMap: KeyMap) => void;
  removeKeyMap: (keyMap: KeyMap) => void;
};
