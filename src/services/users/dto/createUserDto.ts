export interface CreateUserDto {
  firstName: string;
  secondName?: string;
  lastName?: string;
  email: string;
  password: string;
  profilePictureUrl?: string;
  lastLogin?: Date;
  isActive: boolean;
}
