export interface IUser {
    email: string;
    password: string;
  }
  
export interface IUserModel extends IUser {
	_id: string;
	createdAt?: Date;
  comparePassword: Function 
	updatedAt?: Date;
}
  