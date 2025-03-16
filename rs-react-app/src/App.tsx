import Navigation from '@components/Navigation/Navigation';
import './App.css';
import { useAppSelector } from '@hooks/redux';

function App() {
  const formData = useAppSelector(state => state.form.data)
  return (
    <>
      <Navigation />
      <div className='cards-container'>
        {formData.map(data => {
          return (
            <div className='card'>
              <p>Name: {data.name}</p>
              <p>Age: {data.age}</p>
              <p>Email: {data.email}</p>
              <p>Passord: {data.password}</p>
              <p>Repeat password: {data.repeatPassword}</p>
              <p>Gender: {data.gender}</p>
              <p>Accept T&C: {data.acceptTermsConditions}</p>
              <p>Base64 encoded picture: {data.picture}</p>
              <p>Country: {data.country}</p>
            </div>
          )
        })}
      </div>
    </>
  );
}

export default App;
