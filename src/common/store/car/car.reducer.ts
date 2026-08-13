import { createSlice } from '@reduxjs/toolkit';
import * as CarActions from './car.actions';
import type { Car, CarTagData } from '@common/types/car.interface';
import type { FormTypes } from '@common/types/form-types.enum';

export interface ExtractedData {
  data: CarTagData | string;
  imageId: string;
}

interface CarState {
  cars: Car[];
  extractedData: ExtractedData | null;
  activeForm: FormTypes | null;
  extractingDataFor: FormTypes | null;
  isLoadingCars: boolean;
  searchText: string;
}

const initialState: CarState = {
  cars: [],
  extractedData: null,
  activeForm: null,
  extractingDataFor: null,
  isLoadingCars: false,
  searchText: '',
};

const carSlice = createSlice({
  name: 'car',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(CarActions.loadCars, (state) => {
      return {
        ...state,
        isLoadingCars: true,
      }
    });

    builder.addCase(CarActions.loadCarsSuccess, (state, { payload }) => {
      return {
        ...state,
        cars: payload.cars,
        isLoadingCars: false,
      };
    });

    builder.addCase(CarActions.loadCarByIdSuccess, (state, { payload }) => {
      return {
        ...state,
        cars: payload.cars,
      };
    });

    builder.addCase(CarActions.createCarSuccess, (state, { payload }) => {
      return {
        ...state,
        cars: payload.cars,
      }
    });

    builder.addCase(CarActions.setActiveForm, (state, { payload }) => {
      return {
        ...state,
        activeForm: payload.formType,
      }
    });

    builder.addCase(CarActions.updateCarSuccess, (state, { payload }) => {
      return {
        ...state,
        cars: payload.cars,
        activeForm: null,
      }
    })
  },
});

export default carSlice.reducer;
