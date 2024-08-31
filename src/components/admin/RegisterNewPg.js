import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/RegisterPG.css'

export default function RegisterPG() {
  const [pgName, setPgName] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [address, setAddress] = useState('');
  const [images, setImages] = useState([]); // State to hold selected image files
  const [message, setMessage] = useState('');
  const [contactNoError, setContactNoError] = useState('');
  const navigate = useNavigate();

  const validateContactNo = (number) => {
    return /^\d{1,10}$/.test(number);
  };

  const handleImageChange = (e) => {
    setImages([...e.target.files]); // Update images state with all selected files
  };

  const handleRegister = async () => {
    if (!validateContactNo(contactNo)) {
      setContactNoError('Contact number must be no more than 10 digits.');
      return;
    }

    try {
      const pg = { pgName, contactNo, address };
      const response = await fetch('http://localhost:7117/pg_api/pg/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionStorage.getItem('authToken')}`,
        },
        body: JSON.stringify(pg),
      });

      if (response.ok) {
        const pgData = await response.json();
        const pgId = pgData.pgId; // Assuming the backend returns the PG ID
        setMessage('PG registered successfully');

        // Upload the images
        if (images.length > 0) {
          for (const image of images) {
            const formData = new FormData();
            formData.append('image', image);

            try {
              const imageResponse = await fetch(`http://localhost:7117/pg_api/image/uploadImagePg/${pgId}`, {
                method: 'POST',
                headers: {
                  'Authorization': `Bearer ${sessionStorage.getItem('authToken')}`
                },
                body: formData
              });

              if (!imageResponse.ok) {
                throw new Error(`Failed to upload image: ${image.name}`);
              }
            } catch (error) {
              console.error('Image upload error:', error);
              setMessage('Failed to upload one or more images. Please try again.');
              return;
            }
          }
        }

        navigate('/admin/pgmanage');
      } else {
        setMessage('Failed to register PG');
      }
    } catch (error) {
      console.error('Error registering PG:', error);
      setMessage('Error registering PG');
    }
  };

  return (
    <div className="pg-form">
      <h1>Register PG</h1>
      {message && <p>{message}</p>}
      {contactNoError && <p style={{ color: 'red' }}>{contactNoError}</p>}
      <input
        type="text"
        placeholder="PG Name"
        value={pgName}
        onChange={(e) => setPgName(e.target.value)}
      />
      
      <input
        type="text"
        placeholder="Contact No"
        value={contactNo}
        onChange={(e) => {
          setContactNo(e.target.value);
          if (contactNoError) setContactNoError('');
        }}
      />
      <input
        type="text"
        placeholder="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <div className="form-group">
        <label htmlFor="images">Upload Images:</label>
        <input
          type="file"
          id="images"
          name="images"
          accept="image/*"
          multiple
          onChange={handleImageChange}
        />
      </div>
      <button onClick={handleRegister}>Register PG</button>
    </div>
  );
}
