import { createListenerMiddleware } from '@reduxjs/toolkit';
import * as CarActions from './car.actions';
import { carService } from '@common/services/cars.service';
import { selectCars } from './car.selectors';
import type { RootState } from '../store';
import type { Car } from '@common/types/car.interface';

export const CarMiddlewareEffects = createListenerMiddleware();

CarMiddlewareEffects.startListening({
  actionCreator: CarActions.loadCars,
  effect: async (_, listenerApi) => {
    try {
      const cars = await carService.getAllCars();

      listenerApi.dispatch(CarActions.loadCarsSuccess({ cars }));
    } catch (error) {
      console.error('Load cars failed:', error);
    }
  },
});

CarMiddlewareEffects.startListening({
  actionCreator: CarActions.loadCarById,
  effect: async (action, listenerApi) => {
    try {
      const state = listenerApi.getState() as RootState;
      const existingCars = selectCars(state);
      const car = await carService.getCarById(action.payload.id);
      const allCars = [...existingCars, car];
      const carsMap = Object.fromEntries(allCars.map((car) => [car.id, car]));
      const updatedCars: Car[] = Object.values(carsMap);

      listenerApi.dispatch(
        CarActions.loadCarByIdSuccess({ cars: updatedCars })
      );
    } catch (error) {
      console.error(
        `Load car by id failed for id ${action.payload.id}:`,
        error
      );
    }
  },
});

CarMiddlewareEffects.startListening({
  actionCreator: CarActions.createCar,
  effect: async (action, listenerApi) => {
    try {
      const state = listenerApi.getState() as RootState;
      const cars = selectCars(state);
      const car = action.payload.car;
      const date = new Date();

      const newCar = {
        name: car.name || `${date.toISOString().split('T')[0]} - ${car.year}`,
        year: car.year,
      };

      const carFromApi = await carService.createCar(newCar);
      const updatedCars = [...cars, carFromApi];

      listenerApi.dispatch(
        CarActions.createCarSuccess({
          cars: updatedCars,
        })
      );
    } catch {
      console.error('Create car failed:', action.payload.car);
    }
  },
});
