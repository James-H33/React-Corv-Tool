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
