import React, { FC, useEffect, useState } from 'react';
import Header from './components/header';
import Body from './components/body';
import { GlobalStyle } from './globalStyle';
import { ACTION_NAME, ActionModel, createTask, StateModel } from './models';
import { reduce } from './reducer';
import axios from 'axios';

const App: FC<{initialState: StateModel}> = ({initialState}) => {
  const [state, setState] = useState(initialState);

  const year = new Date(state.selectedMonth).getFullYear()

  const handleDispatch = (action: ActionModel) => {
    setState(state => reduce(state, action))
  }

  useEffect(() => {
    axios(`https://date.nager.at/api/v3/publicholidays/${year}/UA`).then((result) => {
      if(result.status === 200){
        type ItemType = {
          date: string
          localName: string
          name: string
          global: boolean
        };
        const holidaysList = result.data.filter((item: ItemType) => item.global).map((item: ItemType) => {
          const date = new Date(item.date).getTime()
          return createTask({
            plannedDate: date,
            labelText: item.name,
            isEditable: false,
          })
        })
        handleDispatch({
          name: ACTION_NAME.SET_HOLIDAYS_LIST,
          payload: holidaysList
        })
      }else{
        console.error("Error fetching public holidays", result)

      }

    }).catch((e) => {
      console.error("Error fetching public holidays", e)
    })
  },[year])



  return (
    <div id="App">
      <GlobalStyle/>
      <Header state={state} dispatch={handleDispatch}/>
      <Body state={state} dispatch={handleDispatch}/>
    </div>
  );
}

export default App;