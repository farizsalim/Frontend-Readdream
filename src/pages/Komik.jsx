import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../component/Navbar';
import "./Komik.css"
import moment from 'moment';
import LoadingSpinner from '../component/LoadingSpinner'; // Import LoadingSpinner component

const Komik = () => {
  const { id } = useParams();
  const [komik, setKomik] = useState(null);
  const [ascending, setAscending] = useState(true);
  const [loading, setLoading] = useState(true); // State untuk loading
  const apiURL = process.env.REACT_APP_API_URL;
  const apiPORT = process.env.REACT_APP_API_PORT;

  useEffect(() => {
    const fetchKomik = async () => {
      try {
        const response = await axios.get(`${apiURL}/komik/${id}`);
        setKomik(response.data);
      } catch (error) {
        console.error('Error fetching komik detail:', error);
      } finally {
        setLoading(false); // Set loading ke false setelah data selesai dimuat
      }
    };

    fetchKomik();
  }, [id, apiURL]);

  const handleSort = () => {
    const sortedChapter = [...komik.chapter];
    sortedChapter.sort((a, b) => {
      const dateA = new Date(a.created_at);
      const dateB = new Date(b.created_at);
      return ascending ? dateA - dateB : dateB - dateA;
    });

    setKomik({ ...komik, chapter: sortedChapter });
    setAscending(!ascending);
  };

  if (loading) {
    return (
      <div>
        {/* Navbar tetap ditampilkan */}
        <Navbar />
        {/* Loading spinner */}
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="container mt-3">
        <div>
          <div className='deskripsikomik card mb-3'>
            <h2 className='judulkomik'>{komik.judul}</h2>
            <div className="row">
              <div className="col-md-2">
                <img
                  src={`${apiPORT}/thumbnail/${komik.thumbnail}`}
                  alt={komik.judul}
                  className="thumbnail img-fluid rounded"
                />
              </div>
              <div className="col-md-8">
                <p className="mt-3"><b>Author: </b>{komik.author}</p>
                <div className="my-3">
                  <p><b>Deskripsi:</b></p>
                  <p>{komik.deskripsi}</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h4>Daftar Chapter:</h4>
            <div className="card daftarchapter p-4">
              <button onClick={handleSort} className="btn urutkan mb-3">
                {ascending ? 'Urutkan Chapter Terlama' : 'Urutkan Chapter Terbaru'}
              </button>
              {komik.chapter.map((chapter) => (
                <Link
                  to={`/komik/${id}/chapter/${chapter.nomorChapter}`}  // Menggunakan nomorChapter
                  key={chapter._id}
                  className="d-flex link"
                >
                  <p className='chapter'>{chapter.judulChapter}</p>
                  <p className="createatkomik">{moment(chapter.created_at).fromNow()}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Komik;
