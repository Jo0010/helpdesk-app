import { useState } from "react";

function CommentList({ ticket, onUpdate }) {
  const [input, setInput] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editText, setEditText] = useState("");

  const comments = ticket.comments || [];

  const addComment = () => {
    if (!input.trim()) return;

    onUpdate(ticket.id, {
      ...ticket,
      comments: [...comments, input],
    });

    setInput("");
  };

  const deleteComment = (index) => {
    onUpdate(ticket.id, {
      ...ticket,
      comments: comments.filter((_, i) => i !== index),
    });
  };

  const updateComment = (index) => {
    const updated = comments.map((c, i) =>
      i === index ? editText : c
    );

    onUpdate(ticket.id, {
      ...ticket,
      comments: updated,
    });

    setEditingIndex(null);
    setEditText("");
  };

  const cancelEdit = () => {
  setEditingIndex(null);
  setEditText("");
  };

  return (
    <div style={styles.container}>
      <div style={styles.chatBox}>
        {comments.map((c, i) => (
          <div key={i} style={styles.messageBubble}>
            {editingIndex === i ? (
              <div style={styles.editRow}>
                <input
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  style={styles.input}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") updateComment(i);
                    if (e.key === "Escape") cancelEdit();
                    }}
                />
                <button onClick={() => updateComment(i)}>
                  Save
                </button>
              </div>
            ) : (
              <>
                <span style={styles.text}>{c}</span>
                <div style={styles.actions}>
                  <button onClick={() => {
                    setEditingIndex(i);
                    setEditText(c);
                  }}>
                    ✏️
                  </button>

                  <button onClick={() => deleteComment(i)}>
                    🗑️
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      <div style={styles.inputRow}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Write a comment..."
          style={styles.input}
        />
        <button onClick={addComment}>Send</button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    marginTop: "10px",
    borderTop: "1px solid #ddd",
    paddingTop: "10px",
  },

  chatBox: {
    maxHeight: "200px",
    overflowY: "auto",
    padding: "5px",
  },

  messageBubble: {
    background: "#f1f5f9",
    padding: "8px 10px",
    borderRadius: "12px",
    marginBottom: "8px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  text: {
    flex: 1,
  },

  actions: {
    display: "flex",
    gap: "5px",
  },

  inputRow: {
    display: "flex",
    gap: "5px",
    marginTop: "10px",
  },

  input: {
    flex: 1,
    padding: "6px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },

  editRow: {
    display: "flex",
    gap: "5px",
    width: "100%",
  },
};

export default CommentList;