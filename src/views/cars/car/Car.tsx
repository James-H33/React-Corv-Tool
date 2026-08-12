import * as CarActions from '@store/car/car.actions';
import { selectCarById } from '@store/car/car.selectors';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

function Car() {
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();

  console.log(id);

  const car = useSelector(selectCarById(id ?? ''));

  useEffect(() => {
    if (id) {
      dispatch(CarActions.loadCarById({ id: id ?? '' }));
    }
  }, [dispatch, id]);

  return (
    <div className="ct-car">
      <div>Car ID from URL: {id ?? 'missing'}</div>
      <div>Car ID from Loaded Car: {car && car.name}</div>
    </div>
  );
}

export default Car;
