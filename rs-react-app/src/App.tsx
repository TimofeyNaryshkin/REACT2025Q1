import Navigation from '@components/Navigation/Navigation';
import './App.css';
import { useAppSelector } from '@hooks/redux';
import DataCard from '@components/DataCard/DataCard';

function App() {
  const formData = useAppSelector((state) => state.form.data);

  return (
    <>
      <Navigation />
      <section className="cards-container">
        {formData.map((data, i) => {
          return (
            <DataCard
              key={i}
              data={data}
              className={i === formData.length - 1 ? 'card_new card' : 'card'}
            />
          );
        })}
      </section>
    </>
  );
}

export default App;
