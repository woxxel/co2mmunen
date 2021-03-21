
import { BrowserRouter } from 'react-router-dom';

import Calculator from './containers/Calculator/Calculator'
import Layout from './hoc/Layout/Layout'

import './App.css';

function App() {
  return (
    <div className="App">
    <BrowserRouter>
        <Layout>
            <Calculator />
        </Layout>
    </BrowserRouter>
    </div>
  );
}

export default App;
