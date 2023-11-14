import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import './Home.css'; // Sesuaikan dengan path file CSS yang Anda buat
import Navbar from '../component/Navbar';
import { Link } from 'react-router-dom';
import NoRightClick from '../NoRightClick';

const Home = () => {
  const [latestKomik, setLatestKomik] = useState([]);
  const apiURL = process.env.REACT_APP_API_URL;
  const apiPORT = process.env.REACT_APP_API_PORT;


  useEffect(() => {
    fetchLatestKomik();
  });

  const fetchLatestKomik = async () => {
    try {
      const response = await axios.get(`${apiURL}/komik`);
      
      const sortedKomik = response.data.sort((a, b) => {
        const chapterA = a.chapter[0]?.created_at || 0;
        const chapterB = b.chapter[0]?.created_at || 0;
        return new Date(chapterB) - new Date(chapterA);
      });

      const latestKomikSlice = sortedKomik.slice(0, 12);

      setLatestKomik(latestKomikSlice);
    } catch (error) {
      console.error('Error fetching latest komik:', error);
    }
  };

  const truncateTitle = (title, maxChars) => {
    if (title.length > maxChars) {
      return title.slice(0, maxChars) + '...';
    }
    return title;
  };

  return (
    <div className='home'>
      <Navbar/>
      <NoRightClick/>
      <div className="container mt-3 homeContainer">
        <h2 className="text-center">Komik Terbaru</h2>
        <div className="komikGrid">
          {latestKomik.map((komik) => (
            <div key={komik._id} className="komikCard">
              {Array.isArray(komik.chapter) && komik.chapter.length > 0 && (
                <div className="card komiklist">
                  <div className="position-relative cardPosition">
                    <img
                      src={`${apiPORT}/thumbnail/${komik.thumbnail}`}
                      alt={komik.judul}
                      className="card-img-top cardImgTop"
                    />
                    {/* Perubahan di bawah ini: menambahkan Link ke halaman komik */}
                    <Link to={`/komik/${komik._id}`} className="card-title px-2 cardTitle">
                      <b className="text-center">{truncateTitle(komik.judul, 30)}</b>
                    </Link>
                  </div>
                  <div className="card-body cardBody">
                    {komik.chapter
                      .slice(0, 2)
                      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                      .map((chapter) => (
                        <div key={chapter._id} className="d-flex">
                          {/* Perubahan di bawah ini: menambahkan Link ke halaman chapter */}
                          <Link to={`/komik/${komik._id}/chapter/${chapter.nomorChapter}`} className='chapterInfo'>
                            {chapter.judulChapter}
                          </Link>
                          <p className='chapterRelease' style={{ textDecoration: 'none' }}>
                            {moment(chapter.created_at).fromNow()}
                          </p>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
