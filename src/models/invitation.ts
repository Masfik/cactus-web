interface Invitation {
  from: User;
  type: InvitationType;
  when: Date;
  dismissed: boolean;
}
