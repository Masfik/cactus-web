interface User {
  id: string;
  name: string;
  surname: string;
  username: string;
  avatar: string;
  status: UserStatus;
  watching: string;
  friends: User[];
}
