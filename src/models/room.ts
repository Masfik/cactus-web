interface Room {
  name: string;
  type: RoomType;
  description: string;
  photo: String;
  members: Member[];
  viewers: User[];
  remote: User;
  messages: Message[];
}

enum RoomType {
  PRIVATE,
  GROUP
}

interface Member extends User {
  title?: MemberTitle;
}
