import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import '../../css/Support.css'
import UserHeader from './UserHeader';

export default function Support() {
  const [complaint, setComplaint] = useState({ subject: '', message: '' });
  const [feedback, setFeedback] = useState({ comment: '', rating: 0 });

  const handleComplaintChange = (e) => {
    setComplaint({ ...complaint, [e.target.name]: e.target.value });
  };

  const handleFeedbackChange = (name, value) => {
    setFeedback({ ...feedback, [name]: value });
  };

  const submitComplaint = async () => {
    try {
      const response = await fetch('http://localhost:7117/pg_api/complaint/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(complaint),
      });
      if (response.ok) {
        alert('Complaint submitted successfully');
      }
    } catch (error) {
      console.error('Error submitting complaint:', error);
    }
  };

  const submitFeedback = async () => {
    try {
      const response = await fetch('http://localhost:7117/pg_api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(feedback),
      });
      if (response.ok) {
        alert('Feedback submitted successfully');
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FontAwesomeIcon
          key={i}
          icon={faStar}
          style={{ cursor: 'pointer', color: i <= feedback.rating ? 'gold' : 'gray' }}
          onClick={() => handleFeedbackChange('rating', i)}
        />
      );
    }
    return stars;
  };

  return (
    <>
    <div className='#'>
    <UserHeader/>
    <div>
        All pg
        <br />
        pg
        <br />
        pg
      </div>
    </div>
    <div className='container'>
      <h2>Support</h2>

      <h3>Complaint</h3>
      <input
        type="text"
        name="subject"
        placeholder="Subject"
        value={complaint.subject}
        onChange={handleComplaintChange}
      />
      <textarea
        name="message"
        placeholder="Your complaint"
        value={complaint.message}
        onChange={handleComplaintChange}
      />
      <button onClick={submitComplaint}>Submit Complaint</button>

      <h3>Feedback</h3>
      <textarea
        name="comment"
        placeholder="Your feedback"
        value={feedback.comment}
        onChange={(e) => handleFeedbackChange('comment', e.target.value)}
      />
      <div>
        {renderStars()}
      </div>
      <button onClick={submitFeedback}>Submit Feedback</button>
    </div>
    </>
  );
}

