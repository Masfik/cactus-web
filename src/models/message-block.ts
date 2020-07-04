import { Message } from "@/models/message";
import { User } from "@/models/user";

/**
 * A series of consecutive messages by the same sender.
 * This model will be used to display a group of multiple message bubbles.
 */
export interface MessageBlock {
  id: string;

  from: User;

  /**
   * List of messages within the current MessageGroup.
   * Note that the {@link Message#from} field is omitted as it is not needed:
   * a MessageGroup must always contain a <b>single sender</b>.
   *
   * @see MessageBlock#from
   */
  messages: Omit<Message, "from">[];
}
