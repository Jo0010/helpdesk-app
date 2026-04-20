import TicketItem from "./TicketItem";
import { safeArray } from "../utils/safe";

function TicketList({ tickets, onUpdate, onDelete }) {
  return (
    <ul>
      {safeArray(tickets).map((ticket) => (
        <TicketItem
          key={ticket.id}
          ticket={ticket}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}

export default TicketList;