import { RefObject } from 'react';

export type KeyMapTarget = RefObject<HTMLElement>;

export type Key = string | string[];

export type EventListener = (e: Event) => void;

export type KeyMap = {
  handler: (e: KeyboardEvent) => void;
  key: Key;
  target: KeyMapTarget;
};

export type KeyMapResult = {
  addKeyMap: (keyMap: KeyMap) => void;
  removeKeyMap: (keyMap: KeyMap) => void;
};

export enum EventActionType {
  Add,
  Remove
}
