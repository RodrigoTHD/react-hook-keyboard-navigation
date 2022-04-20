import './App.css';

import { useEffect, useRef, useState } from 'react';

import { AppBar, List, ListItem, ListItemButton, ListItemText, TextField } from '@mui/material';
import { Box } from '@mui/system';

import { KeyMap, useKeyMap } from './hooks/useKeyMap';

const createItemsLabel = (total: number): string[] => {
  const items: string[] = [];
  for (let i = 1; i <= total; i++) {
    items.push(`Item ${i}`)
  }
  return items;
}

function App() {
  const items: string[] = createItemsLabel(10);
  const searchRef = useRef<HTMLInputElement>(null);
  const { addKeyMap, removeKeyMap } = useKeyMap();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let keyMap: KeyMap;

    if (searchRef.current) {
      keyMap = {
        target: searchRef,
        key: 'keydown',
        handler: (e: Event) => {
          console.log(e);
          let newIndex: number = index;
          const lastItemIndex = items.length - 1;

          if (e.code === "ArrowUp") {
            newIndex--;
          } else if(e.code === "ArrowDown") {
            newIndex++;            
          }   
          
          newIndex = newIndex < 0 
            ? 0 
            : newIndex > lastItemIndex 
              ? lastItemIndex 
              :  newIndex;

          setIndex(newIndex);
        }
      };
      addKeyMap(keyMap);
    }
    return () => {
      removeKeyMap(keyMap);
    }
  }, [addKeyMap, removeKeyMap, setIndex, index, items.length])  

  return (
    <Box display={'flex'} flexDirection={'column'} height="100vh">
      <Box flex={0}>
        <AppBar position='relative'>
          <TextField ref={searchRef} id="outlined-basic" label="Use ArrowUp or ArrowDown" variant="outlined" />
        </AppBar>
      </Box>
      <Box flex={1}>
        <List disablePadding>
          {items.map((itemLabel: string, i: number) => {
            return (
              <ListItem 
                disablePadding
                selected={index === i}>
                <ListItemButton>
                  <ListItemText primary={itemLabel} />
                </ListItemButton>
              </ListItem>
              )
          })}
        </List>      
      </Box>      
    </Box>
  );
}

export default App;
