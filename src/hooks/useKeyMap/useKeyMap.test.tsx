import { fireEvent } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';

import { useKeyMap } from './useKeyMap';

describe('useKeyMap', () => {
  const handlerMock = jest.fn();
  const docBodyRef = {
    current: document.body
  };

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should add KeyMap', () => {
    const { result } = renderHook(() => useKeyMap());
    result.current.addKeyMap({
      target: docBodyRef,
      key: 'keypress',
      handler: handlerMock
    });
    fireEvent.keyPress(docBodyRef.current, { key: 'ArrowDown' });
    expect(handlerMock).toHaveBeenCalledTimes(1);
  });

  it('should add KeyMap using multiple keys', () => {
    const { result } = renderHook(() => useKeyMap());
    result.current.addKeyMap({
      target: docBodyRef,
      key: ['keydown', 'keyup'],
      handler: handlerMock
    });
    fireEvent.keyDown(docBodyRef.current, { key: 'ArrowDown' });
    expect(handlerMock).toHaveBeenCalledTimes(1);
    fireEvent.keyUp(docBodyRef.current, { key: 'ArrowDown' });
    expect(handlerMock).toHaveBeenCalledTimes(2);
  });

  it('should remove KeyMap', () => {
    const { result } = renderHook(() => useKeyMap());
    const { addKeyMap, removeKeyMap } = result.current;
    const keyMap = {
      target: docBodyRef,
      key: 'keypress',
      handler: handlerMock
    };
    addKeyMap(keyMap);
    fireEvent.keyPress(docBodyRef.current, { key: 'ArrowDown' });
    expect(handlerMock).toHaveBeenCalledTimes(1);

    handlerMock.mockReset();
    removeKeyMap(keyMap);
    fireEvent.keyPress(docBodyRef.current, { key: 'ArrowDown' });
    expect(handlerMock).toHaveBeenCalledTimes(0);
  });
});
