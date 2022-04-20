/// <reference types="react-scripts" />

interface Event {
  code: string;
  target: EventTarget | null;
  preventDefault(): void;
  stopPropagation(): void;
}
