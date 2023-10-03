import { useState } from 'react';
import { Tour as TourType } from '../types';

type TourProps = {
    tour: TourType;
    onDeleteTour: (tourId: string) => void;
}

const Tour = ({ tour, onDeleteTour }: TourProps) => {
    const { id, image, name, price, info } = tour;
    const [readMore, setReadMore] = useState(false);

    const handleDelete = () => {
        onDeleteTour(id);
    }

    return (
        <article className='single-tour'>
            <img className='img' src={image} alt={name} />
            <span className='tour-price'>${price}</span>
            <div className='tour-info'>
                <h5>{name}</h5>
                <p>
                    {readMore ? info : info.substring(0, 100) + '...'}
                    <button className='info-btn' onClick={() => setReadMore(!readMore)}>
                        {readMore ? 'Show Less' : 'Read More'}
                    </button>
                </p>
                <button className='delete-btn btn-block btn' onClick={handleDelete}>Not Interested</button>
            </div>
        </article>
    )
}

export default Tour;
