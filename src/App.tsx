import React, { FC, useState } from 'react';
import Header from './components/header';
import Body from './components/body';
import { GlobalStyle } from './globalStyle';
import { ActionModel, StateModel } from './models';
import { reduce } from './reducer';

const App: FC<{initialState: StateModel}> = ({initialState}) => {
  const [state, setState] = useState(initialState);

  const handleDispatch = (action: ActionModel) => {
    setState(state => reduce(state, action))
  }

  return (
    <div id="App">
      <GlobalStyle/>
      <Header state={state} dispatch={handleDispatch}/>
      <Body state={state} dispatch={handleDispatch}/>
    </div>
  );
}

export default App;