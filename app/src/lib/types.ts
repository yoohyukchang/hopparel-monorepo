export type User = {
  id: number;
  username: string;
};

export type Design = {
  id: string;
  productType: string;
  createdAt: string;
  updatedAt: string;
  image: string;
}

export type DesignWithUserData = Design & { user?: User };