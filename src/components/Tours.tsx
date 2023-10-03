import { useState, useEffect } from 'react';
import { Tour as TourType } from '../types';
import Tour from './Tour';
import Loading from './Loading';

type ToursProps = {
  tours: TourType[];
};

export default function Tours({ tours }: ToursProps) {
  const [tourList, setTourList] = useState(tours);
  const [showRefreshButton, setShowRefreshButton] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (tourList.length === 0) {
      setShowRefreshButton(true);
    } else {
      setShowRefreshButton(false);
    }
  }, [tourList]);

  const handleDeleteTour = (tourId: string) => {
    const updatedTours = tourList.filter((tour) => tour.id !== tourId);
    setTourList(updatedTours);
  };

  const handleRefresh = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('https://course-api.com/react-tours-project');
      const refreshedToursData = await response.json();
      setTourList(refreshedToursData);
      setShowRefreshButton(false);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  return (
    <section>
      {isLoading ? (
        <Loading />
      ) : showRefreshButton ? (
        <div className='title'>
            <h2>No Tours Left</h2>
            <br />
            <br />
            <button className='btn' onClick={handleRefresh}>Refresh</button>
        </div>
      ) : (
        <div className='title'>
          <h2>Our Tours</h2>
          <div className='title-underline' />
        </div>
      )}

      <div className='tours'>
        {tourList.map((tour) => {
          return <Tour key={tour.id} tour={tour} onDeleteTour={handleDeleteTour} />;
        })}
      </div>
    </section>
  );
}
