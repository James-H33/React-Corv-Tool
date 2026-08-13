import type { AddCar } from '@common/types/add-car.interface';
import type { Car } from '@common/types/car.interface';
import type { ExtractedCarImageData } from '@common/types/extracted-car-image-data.interface';
import type { FormTypes } from '@common/types/form-types.enum';
import { createAction } from '@reduxjs/toolkit';

export const createCar = createAction<{ car: AddCar }>('car/createCar');
export const createCarSuccess = createAction<{ cars: Car[] }>(
  'car/createCarSuccess'
);

export const loadCars = createAction('car/loadCars');
export const loadCarsSuccess = createAction<{ cars: Car[] }>(
  'car/loadCarsSuccess'
);

export const loadCarById = createAction<{ id: string }>('car/loadCarById');
export const loadCarByIdSuccess = createAction<{ cars: Car[] }>(
  'car/loadCarByIdSuccess'
);

export const updateCar = createAction<{ id: string; data: Partial<Car> }>(
  'car/updateCar'
);
export const updateCarSuccess = createAction<{ cars: Car[] }>('car/updateCarSuccess');

export const setSearchText = createAction<{ text: string }>(
  'car/setSearchText'
);

export const deleteCar = createAction<{ id: string }>('car/deleteCar');
export const deleteCarSuccess = createAction<{ cars: Car[] }>(
  'car/deleteCarSuccess'
);

export const uploadCarImageForAIDataExtraction = createAction<{
  id: string;
  file: File;
  for: FormTypes;
  retryCount?: number;
}>('car/uploadCarImageForAIDataExtraction');

export const uploadCarImageForAIDataExtractionSuccess = createAction<{
  id: string;
  data: ExtractedCarImageData;
  for: FormTypes;
}>('car/uploadCarImageForAIDataExtractionSuccess');

export const uploadCarImageForAIDataExtractionFailure = createAction<{
  error: unknown;
  for?: FormTypes | null;
}>('car/uploadCarImageForAIDataExtractionFailure');

export const setActiveForm = createAction<{ formType: FormTypes | null }>(
  'car/setActiveForm'
);

export const clearFormState = createAction('car/clearFormState');
