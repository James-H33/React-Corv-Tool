import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../store';

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
