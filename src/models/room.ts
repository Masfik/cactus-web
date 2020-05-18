interface Room {
  name: string;
  description: string;
  photo: String;
  members: Member[];
  viewers: User[];
  remote: User;
  messages: Message[];
}

interface Member extends User {
  title?: MemberTitle;
}
