import { useState, useRef, useEffect } from "react";
import CommentList from "./CommentList";

function TicketItem({ ticket, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState("");

  const inputRef = useRef(null);

  // 🎯 Auto focus propre
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select(); // bonus UX pro
    }
  }, [isEditing]);

  const startEdit = () => {
    setIsEditing(true);
    setEditText(ticket.text);
  };

  const saveEdit = () => {
    onUpdate(ticket.id, {
      ...ticket,
      text: editText,
    });

    setIsEditing(false);
  };

  const toggleStatus = () => {
    onUpdate(ticket.id, {
      ...ticket,
      status: ticket.status === "open" ? "closed" : "open",
    });
  };

  return (
    <li style={{ marginBottom: "15px" }}>
      {/* 🎯 EDIT MODE */}
      {isEditing ? (
        <div>
          <input
            ref={inputRef}
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") saveEdit();
              if (e.key === "Escape") setIsEditing(false);
            }}
          />

          <button onClick={saveEdit}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <div>
          <p>{ticket.text}</p>

          <button onClick={startEdit}>Edit</button>
        </div>
      )}

      {/* 🗑️ DELETE */}
      <button onClick={() => onDelete(ticket.id)}>Delete</button>

      {/* 💬 COMMENTS */}
      <CommentList ticket={ticket} onUpdate={onUpdate} />

      {/* 🔄 STATUS */}
      <p>
        Status: {ticket.status}
        <button onClick={toggleStatus} style={{ marginLeft: "10px" }}>
          Toggle Status
        </button>
      </p>
    </li>
  );
}

export default TicketItem;