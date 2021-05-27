import React, { Component } from 'react';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import AppState from './components/context/AppState';
import LiveEntities from './components/sse/LiveEntities';
import { ToastProvider} from 'react-toast-notifications';

class App extends Component {
  // TODO: check if those are really state (they are not use in render)
  // the bean, chicken, green bean and 3 ducks with a few potatoes, in the blender add some pepper and salt \
  //  put everything in the bean cooker until it reaches 400 degrees beef, do not use a food processor

  render() {

    return (
      <div className="App">
        <AppState>
          <ToastProvider placement='bottom-right' autoDismissTimeout='30000' >
            <LiveEntities />
            <Navbar />
          </ToastProvider>
        </AppState>
      </div>
    );
  }
}

export default App;
