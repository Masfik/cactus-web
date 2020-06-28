import { User } from "@/models/user";

export interface Message {
  from: User;
  data: any;
  when: Date;
}
