import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FeedbackPage = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  const fetchFeedbacks = async () => {
    try {
      const res = await axios.get('http://127.0.0.1:8000/api/public/feedbacks');
      setFeedbacks(res.data.data);
    } catch (err) {
      console.error('Failed to load feedbacks:', err);
      setError('Could not fetch feedbacks.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      alert('Please login first');
      return navigate('/login');
    }

    try {
      await axios.post(
        'http://127.0.0.1:8000/api/feedbacks',
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        }
      );

      setTitle('');
      setDescription('');
      fetchFeedbacks();
    } catch (err) {
      if (err.response && err.response.status === 401) {
        alert('Session expired. Please login again.');
        localStorage.removeItem('token');
        navigate('/login');
      } else {
        console.error('Submission failed:', err);
        setError('Could not submit feedback.');
      }
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center">Customer Feedback</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="my-4">
        <h4>Leave your feedback</h4>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-2">
            <label>Title</label>
            <input
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group mb-2">
            <label>Description</label>
            <textarea
              className="form-control"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <button className="btn btn-primary mt-2" type="submit">
            Submit
          </button>
        </form>
      </div>

      <hr />

      <div>
        <h4>All Feedbacks</h4>
        {feedbacks.map((f) => (
          <div key={f.id} className="card my-2">
            <div className="card-body">
              <h5>{f.title}</h5>
              <p>{f.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeedbackPage;
