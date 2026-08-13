import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import type { ExtractedData } from './car.reducer';

export const selectCarState = (s: RootState) => s.car;

export const selectCars = createSelector(selectCarState, (s) => s.cars);

export const selectIsLoadingCars = createSelector(
  selectCarState,
  (s) => s.isLoadingCars
);

export const selectCarById = (id: string) =>
  createSelector(selectCars, (cars) => {
    return cars.find((car) => car.id === id);
  });

export const selectActiveForm = createSelector(
  selectCarState,
  (s) => s.activeForm
);

export const selectExtractedData = createSelector(
  selectCarState,
  (s) => s.extractedData
);

export const selectExtractingDataFor = createSelector(
  selectCarState,
  (s) => s.extractingDataFor
);

export const selectSearchText = createSelector(
  selectCarState,
  (s) => s.searchText
);

export const selectExtractedDataByType = (type: 'vin' | 'tag') =>
  createSelector(
    selectExtractedData,
    selectActiveForm,
    (extractedData: ExtractedData | null, activeForm: string | null) => {
      if (!activeForm) {
        return null;
      }

      if (type === 'vin' && activeForm === 'vin') {
        return extractedData;
      }

      if (type === 'tag' && activeForm === 'tag') {
        return extractedData;
      }

      return null;
    }
  );
