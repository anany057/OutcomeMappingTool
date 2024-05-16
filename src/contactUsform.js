import React, { useState } from 'react';
import M from 'materialize-css';
import { db } from './firebase1'; // Import the Firestore reference from firebase1.js

const ContactUsForm = () => {
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Add email and feedback to the Firestore database
    db.collection("feedback").add({
      email: email,
      feedback: feedback
    })
    .then(() => {
      alert("Feedback has been stored to the database 👍");
    })
    .catch(() => {
      alert("Error");
    });

    // Reset form fields
    setEmail('');
    setFeedback('');

    // Display a toast message
    M.toast({ html: 'Feedback submitted!', classes: 'green darken-1' });
  };

  return (
    <div className="container" style={{height:'1rem',backgroundColor:'inherit'}}>
      <h2 className="center-align white-text">Contact Us</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-field" style={{backgroundColor:'inherit'}}>
          <input
            id="email"
            type="email"
            className="validate white-text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="email">Email Address</label>
        </div>
        <div className="input-field">
          <textarea
            id="feedback"
            className="materialize-textarea white-text"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            required
          ></textarea>
          <label htmlFor="feedback">Feedback</label>
        </div>
        <button className="btn waves-effect waves-light" type="submit">
          Submit
          
        </button>
      </form>
    </div>
  );
};

export default ContactUsForm;
