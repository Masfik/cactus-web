import { InvitationType } from "@/models/invitation-type";
import { User } from "@/models/user";

export interface Invitation {
  from: User;
  type: InvitationType;
  when: Date;
  dismissed: boolean;
}
