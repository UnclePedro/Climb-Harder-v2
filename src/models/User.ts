export interface User {
  id: number;
  apiKey: string;
}

export const emptyUser: User = {
  id: 0,
  apiKey: "",
};
