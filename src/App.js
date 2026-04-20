// import { useState,useEffect } from "react";

// function App() {
//   const [tickets, setTickets] = useState([]);
//   const [input, setInput] = useState("");
//   const [editingId, setEditingId] = useState(null);
//   const [editText, setEditText] = useState("");
//   const [commentInput, setCommentInput] = useState("");
//   const [filter, setFilter] = useState("all");
//   const [editingComment, setEditingComment] = useState(null);
//   const [editCommentText, setEditCommentText] = useState("");
  
//   useEffect(() => {
//   fetch("http://localhost:3001/tickets")
//     .then((res) => res.json())
//     .then((data) => setTickets(data));
//   }, []);

//   useEffect(() => {
//   const savedTickets = localStorage.getItem("tickets");
//   if (savedTickets) {
//     setTickets(JSON.parse(savedTickets));
//   }
//   }, []);

//   useEffect(() => {
//     localStorage.setItem("tickets", JSON.stringify(tickets));
//   }, [tickets]);

//   const addTicket = () => {
//   if (input.trim() === "") return;

//   const newTicket = {
//     text: input,
//     status: "open",
//   };

//   fetch("http://localhost:3001/tickets", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(newTicket),
//   })
//     .then((res) => res.json())
//     .then((data) => {
//       setTickets([...tickets, data]);
//       setInput("");
//     });
//   };
//   const deleteTicket = (id) => {
//   fetch(`http://localhost:3001/tickets/${id}`, {
//     method: "DELETE",
//   }).then(() => {
//     setTickets(tickets.filter((ticket) => ticket.id !== id));
//   });
//   };

//   const updateTicket = (id) => {
//   fetch(`http://localhost:3001/tickets/${id}`, {
//     method: "PATCH",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ text: editText }),
//   })
//     .then((res) => res.json())
//     .then((updated) => {
//       setTickets(
//         tickets.map((t) => (t.id === id ? updated : t))
//       );
//       setEditingId(null);
//       setEditText("");
//     });
// };

// const addComment = (ticket) => {
//   const updatedTicket = {
//     ...ticket,
//     comments: [...ticket.comments, commentInput],
//   };

//   fetch(`http://localhost:3001/tickets/${ticket.id}`, {
//     method: "PATCH",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(updatedTicket),
//   })
//     .then((res) => res.json())
//     .then((data) => {
//       setTickets(
//         tickets.map((t) => (t.id === ticket.id ? data : t))
//       );
//       setCommentInput("");
//     });
// };

// const deleteComment = (ticket, indexToDelete) => {
//   const updatedTicket = {
//     ...ticket,
//     comments: ticket.comments.filter((_, i) => i !== indexToDelete),
//   };

//   fetch(`http://localhost:3001/tickets/${ticket.id}`, {
//     method: "PATCH",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(updatedTicket),
//   })
//     .then((res) => res.json())
//     .then((data) => {
//       setTickets(
//         tickets.map((t) => (t.id === ticket.id ? data : t))
//       );
//     });
// };
//   const toggleStatus = (ticket) => {
//   const updatedTicket = {
//     ...ticket,
//     status: ticket.status === "open" ? "closed" : "open",
//   };

//   fetch(`http://localhost:3001/tickets/${ticket.id}`, {
//     method: "PATCH",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(updatedTicket),
//     })
//     .then((res) => res.json())
//     .then((data) => {
//       setTickets(
//         tickets.map((t) => (t.id === data.id ? data : t))
//       );
//     });
//   };

  
//   const filteredTickets = tickets.filter((ticket) => {
//   if (filter === "open") return ticket.status === "open";
//   if (filter === "closed") return ticket.status === "closed";
//   return true;
//   });

//   const updateComment = (ticket, index) => {
//   const updatedComments = ticket.comments.map((c, i) =>
//     i === index ? editCommentText : c
//   );

//   const updatedTicket = {
//     ...ticket,
//     comments: updatedComments,
//   };

//   fetch(`http://localhost:3001/tickets/${ticket.id}`, {
//     method: "PATCH",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(updatedTicket),
//     })
//     .then((res) => res.json())
//     .then((data) => {
//       setTickets(
//         tickets.map((t) => (t.id === ticket.id ? data : t))
//       );
//       setEditingComment(null);
//       setEditCommentText("");
//     });
//   };

//   return (
//     <div>
//       <h1>Helpdesk App</h1>

//       <input
//         type="text"
//         value={input}
//         onChange={(e) => setInput(e.target.value)}
//         placeholder="Enter a ticket..."
//       />
//       <button onClick={addTicket}>Add</button>
//       <div>
//         <button onClick={() => setFilter("all")}>All</button>
//         <button onClick={() => setFilter("open")}>Open</button>
//         <button onClick={() => setFilter("closed")}>Closed</button>
//       </div>
//       {tickets.length === 0 ? (
//         <p>No tickets yet</p>
//       ) : (
        
//         <ul>
//           {filteredTickets.map((ticket) => (
//             <li key={ticket.id}>
//               {ticket.text} - {ticket.status}
//               {editingId === ticket.id ? (
//                 <>
//                   <input
//                     value={editText}
//                     onChange={(e) => setEditText(e.target.value)}
//                   />
//                   <button onClick={() => updateTicket(ticket.id)}>
//                     Save
//                   </button>
//                 </>
//               ) : (
//                 <>
//                   {ticket.text}

//                   <button onClick={() => {
//                     setEditingId(ticket.id);
//                     setEditText(ticket.text);
//                   }}>
//                     Edit
//                   </button>
//                 </>
//               )}
//                     <ul>
//                       {ticket.comments.map((c, i) => (
//                         <li key={i}>
//                           {editingComment === i ? (
//                             <>
//                               <input
//                                 value={editCommentText}
//                                 onChange={(e) => setEditCommentText(e.target.value)}
//                               />
//                               <button onClick={() => updateComment(ticket, i)}>
//                                 Save
//                               </button>
//                             </>
//                           ) : (
//                             <>
//                               {c}

//                               <button onClick={() => {
//                                 setEditingComment(i);
//                                 setEditCommentText(c);
//                               }}>
//                                 Edit
//                               </button>

//                               <button onClick={() => deleteComment(ticket, i)}>
//                                 Delete
//                               </button>
//                             </>
//                           )}
//                         </li>
//                       ))}
//                     </ul>
//                                 <button onClick={() => toggleStatus(ticket)}>
//                 Toggle Status
//               </button>
//               <button onClick={() => deleteTicket(ticket.id)}>Delete</button>
//             </li>
//           ))}
//         </ul>
//       )}
      
//     </div>
//   );
// }

// export default App;


import { useEffect, useState } from "react";
import TicketList from "./components/TicketList";
import {
  getTickets,
  createTicket,
  updateTicket,
  deleteTicket,
} from "./api/ticketsApi";

function App() {
  const [tickets, setTickets] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    getTickets().then(setTickets);
  }, []);

  const addTicket = async () => {
    if (!input.trim()) return;

    const newTicket = await createTicket({
      text: input,
      status: "open",
      comments: [],
    });

    setTickets([...tickets, newTicket]);
    setInput("");
  };

  const handleUpdate = async (id, data) => {
    const updated = await updateTicket(id, data);
    setTickets(tickets.map((t) => (t.id === id ? updated : t)));
  };

  const handleDelete = async (id) => {
    await deleteTicket(id);
    setTickets(tickets.filter((t) => t.id !== id));
  };

  return (
    <div>
      <h1>Helpdesk App</h1>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={addTicket}>Add</button>

      <TicketList
        tickets={tickets}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default App;