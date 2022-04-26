import { useCallback, useEffect, useRef, useState } from 'react';

import {
  AppBar,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  TextField
} from '@mui/material';
import { Box } from '@mui/system';

import { KeyMap, useKeyMap } from './hooks/useKeyMap';

const createItemsLabel = (total: number): string[] => {
  const items: string[] = [];
  for (let i = 1; i <= total; i++) {
    items.push(`Item ${i}`);
  }
  return items;
};

function App() {
  const items: string[] = createItemsLabel(10);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { addKeyMap, removeKeyMap } = useKeyMap();
  const [index, setIndex] = useState(0);

  const setInputFocus = useCallback(() => {
    searchInputRef.current?.focus();
  }, []);

  const onItemClick = useCallback(
    (itemIndex: number) => {
      setIndex(itemIndex);
      setInputFocus();
    },
    [setIndex, setInputFocus]
  );

  useEffect(() => {
    let keyMap: KeyMap;

    if (searchInputRef.current) {
      keyMap = {
        target: searchInputRef,
        key: 'keydown',
        handler: (e: KeyboardEvent) => {
          console.log(e);
          let newIndex: number = index;
          const lastItemIndex = items.length - 1;

          if (e.code === 'ArrowUp') {
            newIndex--;
          } else if (e.code === 'ArrowDown') {
            newIndex++;
          }

          newIndex = Math.min(Math.max(newIndex, 0), lastItemIndex);

          setIndex(newIndex);
        }
      };
      addKeyMap(keyMap);
    }
    return () => {
      removeKeyMap(keyMap);
    };
  }, [addKeyMap, removeKeyMap, setIndex, index, items.length]);

  return (
    <Box display={'flex'} flexDirection={'column'} height='100vh'>
      <Box flex={0}>
        <AppBar position='relative'>
          <TextField
            inputRef={searchInputRef}
            autoFocus
            placeholder='Use ArrowUp or ArrowDown'
            variant='outlined'
          />
        </AppBar>
      </Box>
      <Box flex={1}>
        <List disablePadding>
          {items.map((itemLabel: string, itemIndex: number) => {
            return (
              <ListItem
                onClick={() => onItemClick(itemIndex)}
                disablePadding
                selected={index === itemIndex}>
                <ListItemButton>
                  <ListItemText primary={itemLabel} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>
    </Box>
  );
}

export default App;
