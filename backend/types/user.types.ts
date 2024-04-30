export interface UserTypes {
  _id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  token: string;
  confirm: boolean;
  checkPassword: (password: string) => Promise<boolean>;
}