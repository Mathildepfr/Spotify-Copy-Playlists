export enum RequestStatus {
  IDLE = "idle",
  PENDING = "pending",
  SUCCESS = "success",
  ERROR = "error",
}

export type ErrorPayload = {
  message: string
}

export interface AxiosOptions {
  accessToken?: string;
  baseURL?: string;
}
