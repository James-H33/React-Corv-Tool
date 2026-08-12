import Button from '@common/components/button/Button';
import Input from '@common/components/input/Input';
import SkeletonLoader from '@common/components/skeleton/Skeleton';
import {
  selectCars,
  selectIsLoadingCars,
} from '@store/car/car.selectors';
import * as CarActions from '@store/car/car.actions';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CarCard from '../components/car-card/CarCard';
import NewCarDialog from '../components/new-car-dialog/NewCarDialog';
import NewCarForm from '../components/new-car-form/NewCarForm';
import './CarsList.scss';
import type { AddCar } from '@common/types/add-car.interface';

function CarsList() {
  const dispatch = useDispatch();
  const cars = useSelector(selectCars);
  const [newCarFormOpen, setNewCarFormOpen] = useState(false);
  const isLoadingCars = useSelector(selectIsLoadingCars);

  useEffect(() => {
    dispatch(CarActions.loadCars());
  }, [dispatch]);

  const onDeleteCar = useCallback(
    (id: string) => {
      dispatch(CarActions.deleteCar({ id }));
    },
    [dispatch]
  );

  const onCreateCar = useCallback(
    (newCar: AddCar) => {
      dispatch(CarActions.createCar({ car: newCar }));
      setNewCarFormOpen(false);
    },
    [dispatch]
  );

  return (
    <div className="ct-car-list">
      <div className="ct-car-list-header">
        <div className="ct-car-list-header__title">Your Cars</div>
        <div className="ct-car-list-header__filters">
          <Input
            type="text"
            placeholder="Search cars..."
            value={''} // Replace with your state variable for search text
            onChange={(e) => {}} // Replace with your handler to update search text
          />
        </div>
      </div>

      <div className="ct-car-list-body">
        <div className="ct-car-list__add-new">
          <Button
            data-ctbuttonvariant="primary"
            onClick={() => setNewCarFormOpen(true)}
          >
            Add New Car
          </Button>
        </div>

        {isLoadingCars && (
          <>
            <SkeletonLoader height={74} borderRadius={8} />
            <SkeletonLoader height={74} borderRadius={8} />
            <SkeletonLoader height={74} borderRadius={8} />
          </>
        )}

        {!isLoadingCars && cars.length === 0 && (
          <>
            <div>No cars available.</div>
          </>
        )}

        {!isLoadingCars && cars.length > 0 && (
          <>
            {cars.map((car) => (
              <CarCard key={car.id} car={car} onDeleteCar={onDeleteCar} />
            ))}
          </>
        )}
      </div>

      <NewCarDialog
        isOpen={newCarFormOpen}
        onClose={() => setNewCarFormOpen(false)}
        onOpen={() => setNewCarFormOpen(true)}
      >
        <NewCarForm
          create={onCreateCar}
          cancel={() => setNewCarFormOpen(false)}
        />
      </NewCarDialog>
    </div>
  );
}

export default CarsList;
