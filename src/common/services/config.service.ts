function getBaseApiUrl(): string {
  return import.meta.env.VITE_BASE_API_URL ?? '';
}

export const configService = {
  getBaseApiUrl,
}
