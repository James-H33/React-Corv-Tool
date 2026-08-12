import Button from '@common/components/button/Button';
import { AddCarActionType, type AddCar } from '@common/types/add-car.interface';
import { useState } from 'react';
import './NewCarForm.scss';
import TextField from '@common/components/text-field/TextField';

const newCarYearOptions = [
  { label: '1963', value: '1963' },
  { label: '1964', value: '1964' },
  { label: '1965', value: '1965' },
  { label: '1966', value: '1966' },
  { label: '1967', value: '1967' },
];

interface NewCarFormProps {
  create: (newCar: AddCar) => void;
  cancel: () => void;
}

function NewCarForm({ create, cancel }: NewCarFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    year: '',
    type: AddCarActionType.ManualEntry,
  });

  const selectYear = (year: string) => {
    setFormData((prev) => ({ ...prev, year }));
  };

  const onCancel = () => {
    setFormData({
      name: '',
      year: '',
      type: AddCarActionType.ManualEntry,
    });

    cancel();
  };

  const useManualEntry = (): void => {
    const newCar = {
      name: formData.name,
      year: formData.year,
      type: AddCarActionType.ManualEntry,
    };

    create(newCar);
  };

  return (
    <div className="ct-new-car-form">
      <div className="ct-new-car-form__title">Add New Car</div>

      <div className="ct-new-car-form__content">
        <div className="ct-new-car-form__group">
          <label htmlFor="name">Name:</label>

          <TextField
            id="name"
            type="text"
            placeholder="Defaults to: Date/Time - Selected Year"
            value={formData.name}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
            }
          />
        </div>

        <div className="ct-new-car-form__group">
          <label htmlFor="year">Select Year:</label>
          <div className="ct-new-car-form__year-options">
            {newCarYearOptions.map((option) => (
              <Button
                key={option.value}
                variant={formData.year === option.value ? 'primary' : 'outline'}
                onClick={() => selectYear(option.value)}
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="ct-new-car-form__actions">
        <Button onClick={onCancel} variant="outline" size="medium">
          Cancel
        </Button>

        <Button
          variant="primary"
          size="medium"
          disabled={!formData.year}
          onClick={useManualEntry}
        >
          Create
        </Button>
      </div>
    </div>
  );
}

export default NewCarForm;
