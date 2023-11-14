import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Navbar from '../component/Navbar';
import "./Chapter.css";
import NoRightClick from '../NoRightClick';

const Chapter = () => {
  const { id, nomorChapter } = useParams();
  const [chapter, setChapter] = useState(null);
  const [currentChapterNumber, setCurrentChapterNumber] = useState(null);
  const [chapterCount, setChapterCount] = useState(null);
  const [komikTitle, setKomikTitle] = useState(null);
  const navigate = useNavigate();
  const apiURL = process.env.REACT_APP_API_URL;
  const apiPORT = process.env.REACT_APP_API_PORT;
  
  useEffect(() => {
    const fetchChapter = async () => {
      try {
        const response = await axios.get(`${apiURL}/komik/${id}/chapter/nomor/${nomorChapter}`);
        setChapter(response.data);
        setCurrentChapterNumber(response.data.nomorChapter);

        // Fetch total chapter count
        const komikResponse = await axios.get(`${apiURL}/komik/${id}`);
        setChapterCount(komikResponse.data.chapter.length);
        setKomikTitle(komikResponse.data.judul); // Menambah judul komik
      } catch (error) {
        console.error('Error fetching chapter detail:', error);
      }
    };

    fetchChapter();
  }, [id, nomorChapter, apiURL]);

  const handleNextChapter = () => {
    const nextChapterNumber = parseInt(currentChapterNumber, 10) + 1;
    const isLastChapter = nextChapterNumber > chapterCount;
    if (!isLastChapter) {
      navigate(`/komik/${id}/chapter/${nextChapterNumber}`);
    }
  };

  const handlePreviousChapter = () => {
    const previousChapterNumber = parseInt(currentChapterNumber, 10) - 1;
    const isFirstChapter = previousChapterNumber < 1;
    if (!isFirstChapter) {
      navigate(`/komik/${id}/chapter/${previousChapterNumber}`);
    }
  };

  if (!chapter) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar />
      <NoRightClick />
      <div className="mt-3">
        <Link to={`/komik/${id}`} className="judulkomik">
            <h1 className="text-center mb-4">{komikTitle}</h1> {/* Judul Komik */}
        </Link>
        <h2 className='chapterTitle'>{chapter.judulChapter}</h2>
        <div className="d-flex justify-content-center mb-3">
          <button onClick={handlePreviousChapter} disabled={parseInt(currentChapterNumber, 10) === 1} className="btn btn-primary mr-2">
            Previous Chapter
          </button>
          <button onClick={handleNextChapter} disabled={parseInt(currentChapterNumber, 10) === chapterCount} className="btn btn-primary">
            Next Chapter
          </button>
        </div>
        <div className='chapterContent'>
          {chapter.daftarGambar && chapter.daftarGambar.map((gambar) => (
            <img
              key={gambar.nomorGambar}
              src={`${apiPORT}/thumbnail/${gambar.nama}`}
              alt={`Chapter ${chapter.nomorChapter} - ${gambar.nomorGambar}`}
              className="no-right-click img-fluid"
            />
          ))}
        </div>
        <div className="d-flex justify-content-center mt-3">
          <button onClick={handlePreviousChapter} disabled={parseInt(currentChapterNumber, 10) === 1} className="btn btn-primary mr-2">
            Previous Chapter
          </button>
          <button onClick={handleNextChapter} disabled={parseInt(currentChapterNumber, 10) === chapterCount} className="btn btn-primary">
            Next Chapter
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chapter;
