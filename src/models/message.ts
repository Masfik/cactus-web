import { User } from "@/models/user";

export interface Message {
  id: string;
  from: User;
  data: any;
  when: Date;
}
