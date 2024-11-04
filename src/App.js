import { Provider } from 'react-redux';
import store from './redux/store';
import './App.css';
import StepperForm from './components/StepperForm';
import StepperSteps from './components/StepperSteps';

function App() {
  return (
    <Provider store={store}>
      <StepperSteps />
      <StepperForm />
    </Provider>
  );
}

export default App;
