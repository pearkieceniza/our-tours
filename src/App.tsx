import { useEffect, useState } from 'react';
import Tours from './components/Tours';
import Loading from './components/Loading';
import { Tour } from './types';

const url = 'https://course-api.com/react-tours-project';


function App() {
  const [tours, setTours] = useState<Tour[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchTours = async () => {
    setIsLoading(true);
    
    // Fetch the tours info from the server
    try {
      const response = await fetch(url);
      const toursData = await response.json();
      setIsLoading(false);
      setTours(toursData);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTours();
  }, []);

  if (isLoading) {
    return (
      <main>
        <Loading />
      </main>
    )
  }

  return (<main>
    <Tours tours={tours} />
  </main>
  );
}

export default App;
