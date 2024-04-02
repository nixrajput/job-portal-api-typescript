import type { IJobModel } from "../entities/job";

export interface IListResponse {
  currentPage: number;
  hasNextPage: boolean;
  totalPages: number;
  totalItems: number;
  results: any[];
}

export interface IJobListResponse {
  currentPage: number;
  hasNextPage: boolean;
  totalPages: number;
  totalItems: number;
  results: IJobModel[];
}
