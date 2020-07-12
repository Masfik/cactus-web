import { InvitationCategory } from "@/models/invitation-category";
import { User } from "@/models/user";

export interface Invitation {
  id: string;
  from: User;
  category: InvitationCategory;
  when: Date;
  dismissed: boolean;
}
