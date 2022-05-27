import { Entity } from "../app/types";

export interface User extends Entity {
  createdAt: Date;
  name: string;
  email: string;
  avatar: string;
}

export type UserState = {
  isFetching: boolean;
  error: Error | null;
  user: User | null;
};
