import { Error } from "../app/types";

export interface Token {
  token: number;
}

export type AuthType = {
  token: Token | null;
  error: Error | null;
};
