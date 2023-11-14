import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import NavbarAdmin from '../../component/NavbarAdmin';

const AddChapter = () => {
  const { id } = useParams();
  const [chapterData, setChapterData] = useState({
    judulChapter: '',
    nomorChapter: '',
  });

  const apiURL = process.env.REACT_APP_API_URL

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setChapterData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddChapter = async () => {
    try {
      const response = await axios.post(`${apiURL}/komik/${id}/chapter`, chapterData);
      console.log('Chapter added successfully:', response.data);
    } catch (error) {
      console.error('Error adding chapter:', error);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0); 
  }, []);

  return (
    <div>
      <NavbarAdmin/>
      <div className="container mt-3">
        <h2>Tambah Chapter Baru</h2>
        <form>
          <div className="mb-3">
            <label className="form-label">Judul Chapter</label>
            <input
              type="text"
              className="form-control"
              name="judulChapter"
              value={chapterData.judulChapter}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Nomor Chapter</label>
            <input
              type="number"
              className="form-control"
              name="nomorChapter"
              value={chapterData.nomorChapter}
              onChange={handleInputChange}
            />
          </div>

          <button type="button" className="btn btn-primary" onClick={handleAddChapter}>
            Tambah Chapter
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddChapter;
