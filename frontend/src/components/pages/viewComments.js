import React, { useState, useEffect } from "react";

const CommentList = () => {
  const [comments, setComments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);



  useEffect(() => {
    fetch("http://localhost:8081/com/getAllComment")
      .then((response) => response.json())
      .then((data) => {
        const sortedComments = data.sort((a, b) => {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          return dateB - dateA;
        });
        setComments(sortedComments);
        const uniqueStops = [...new Set(data.map((comment) => comment.stopName))];
        setSuggestions(uniqueStops);
      });
  }, []);
  

  const handleSearch = (event) => {
    event.preventDefault();
    if (searchTerm.trim() !== "") {
      const filteredComments = comments.filter(
        (comment) =>
          comment.stopName.toLowerCase().indexOf(searchTerm.toLowerCase()) !==
          -1
      );
      setComments(filteredComments);
    } else {
      fetch("http://localhost:8081/com/getAllComment")
        .then((response) => response.json())
        .then((data) => {
          const sortedComments = data.sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return dateB - dateA;
          });
          setComments(sortedComments);
        });
    }
  
    const filteredSuggestions = suggestions.filter(
      (stop) => stop.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
    );
    setSuggestions(filteredSuggestions);
  };
  

  const handleReset = () => {
    fetch("http://localhost:8081/com/getAllComment")
      .then((response) => response.json())
      .then((data) => {
        const sortedComments = data.sort((a, b) => {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          return dateB - dateA;
        });
        setComments(sortedComments);
        setSearchTerm("");
      });
  };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px", padding: "20px" }}>
      <div style={{ gridColumn: "1 / -1", marginBottom: "20px" }}>
        <form onSubmit={handleSearch} style={{ display: "flex" }}>
        <input
  type="text"
  placeholder="Search by stop name"
  value={searchTerm}
  onChange={(event) => setSearchTerm(event.target.value)}
  style={{ flex: "1", marginRight: "10px", padding: "5px" }}
  list="stops"
/>
<datalist id="stops">
  {suggestions.map((stop, index) => (
    <option key={index} value={stop} />
  ))}
</datalist>
          <button type="submit" style={{ padding: "5px" }}>Search</button>
          <button type="button" onClick={handleReset} style={{ marginLeft: "10px", padding: "5px" }}>Reset</button>
        </form>
      </div>
      {comments.map((comment) => (
        <div key={comment.id} style={{ border: "1px solid gray", padding: "10px" }}>
          <h2 style={{ backgroundColor: "white", padding: "5px" }}>{comment.username}</h2>
          <h3>at {comment.stopName}</h3>
          <p>{comment.comment}</p>
          <p style={{ fontSize: "12px" }}>Posted: {new Date(comment.date).toLocaleString()}</p>
        </div>
      ))}
      <a href="/comment" style={{ gridColumn: "3 / 4", justifySelf: "end", position: "fixed", bottom: "20px", right: "20px", display: "flex", justifyContent: "center", alignItems: "center", width: "50px", height: "50px", borderRadius: "50%", border: "none", backgroundColor: "blue", color: "white", fontSize: "24px", textDecoration: "none" }}>
        <span>+</span>
      </a>
    </div>
  );
};

export default CommentList;
