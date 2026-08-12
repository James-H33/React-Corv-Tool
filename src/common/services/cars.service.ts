// import { HttpClient } from '@angular/common/http';
// import { inject, Injectable } from '@angular/core';
// import { ApplicationService } from '@common/services/application.service';
// import { Car } from '@common/types/car.interface';
// import { CreateCarDto } from '@common/types/dto/create-car.dto';
// import { map, Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root',
// })
// export class CarService {
//   http = inject(HttpClient);
//   appService = inject(ApplicationService);
//   baseUrl = this.appService.getBaseApiUrl();
//   apiUrl = `${this.baseUrl}/cars`;

//   geAllCars(): Observable<Car[]> {
//     return this.http.get<Car[]>(`${this.apiUrl}/all`).pipe(
//       map((response) => response),
//     );
//   }

//   getCarById(id: string): Observable<Car> {
//     return this.http.get<Car>(`${this.apiUrl}/${id}`).pipe(
//       map((response) => response),
//     );
//   }

//   createCar(car: CreateCarDto): Observable<Car> {
//     return this.http.post<Car>(`${this.apiUrl}/create`, car).pipe(
//       map((response) => response),
//     );
//   }

//   updateCar(id: string, data: Partial<Car>): Observable<Car> {
//     return this.http.put<Car>(`${this.apiUrl}/update/${id}`, data).pipe(
//       map((response) => response),
//     );
  //   }

//   deleteCar(id: string): Observable<void> {
//     return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
//   }
// }

import type { Car } from '@common/types/car.interface';
import apiClient from './api-client';
import { configService } from './config.service';

async function getAllCars(): Promise<Car[]> {
  try {
    const baseUrl = configService.getBaseApiUrl();
    const result = await apiClient.get<Car[]>(`${baseUrl}/cars/all`);

    return result.data;
  } catch {
    throw new Error('Failed to fetch cars');
  }
}

async function getCarById(id: string): Promise<Car> {
  try {
    const baseUrl = configService.getBaseApiUrl();
    const result = await apiClient.get<Car>(`${baseUrl}/cars/${id}`);

    return result.data;
  } catch {
    throw new Error(`Failed to fetch car with id: ${id}`);
  }
}

async function createCar(car: Partial<Car>): Promise<Car> {
  try {
    const baseUrl = configService.getBaseApiUrl();
    const result = await apiClient.post<Car>(`${baseUrl}/cars/create`, car);

    return result.data;
  } catch {
    throw new Error('Failed to create car');
  }
}

async function deleteCar(id: string): Promise<void> {
  try {
    const baseUrl = configService.getBaseApiUrl();
    await apiClient.delete<void>(`${baseUrl}/cars/delete/${id}`);
  } catch {
    throw new Error(`Failed to delete car with id: ${id}`);
  }
}

async function updateCar(id: string, data: Partial<Car>): Promise<Car> {
  try {
    const baseUrl = configService.getBaseApiUrl();
    const result = await apiClient.put<Car>(`${baseUrl}/cars/update/${id}`, data);

    return result.data;
  } catch {
    throw new Error(`Failed to update car with id: ${id}`);
  }
}

export const carService = {
  getAllCars,
  getCarById,
  createCar,
  deleteCar,
  updateCar,
};
