import type { DropdownRef } from '@common/components/dropdown/Dropdown';
import Dropdown from '@common/components/dropdown/Dropdown';
import Icon from '@common/components/icon/Icon';
import type { Car } from '@common/types/car.interface';
import { IconTypes } from '@common/types/icon';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import './CarCard.scss';

interface CarCardProps {
  car: Car;
  onDeleteCar: (carId: string) => void;
}

function CarCard({ car, onDeleteCar }: CarCardProps) {
  const dropdownRef = useRef<DropdownRef>(null);

  const onDeleteClick = (carId: string) => {
    dropdownRef.current?.close();
    onDeleteCar(carId);
  }

  return (
    <div className="ct-car-card" key={car.id}>
      <Link to={`/v/cars/${car.id}`} className="ct-car-card__link" key={car.id}>
        <div className="ct-car-card__left">
          <div className="ct-car-card__title">{car.name}</div>
          <div className="ct-car-card__subtitle">vin: {car.vin}</div>
        </div>
      </Link>

      <div className="ct-car-card__right">
        <Dropdown
          ref={dropdownRef}
          trigger={<Icon icon={IconTypes.EllipsesMenu} size={16} />}
          menu={
            <div className="ct-car-list-options-menu">
              <div
                className="ct-car-list-options-menu__item ct-car-list-options-menu__item--danger"
                onClick={() => onDeleteClick(car.id)}
                role="button"
                tabIndex={0}
              >
                Delete
              </div>
            </div>
          }
        />
      </div>
    </div>
  );
}

export default CarCard;
