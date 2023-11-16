import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "./ListKomik.scss"
import NavbarAdmin from '../../component/NavbarAdmin';

const ListKomik = () => {
  const [komikList, setKomikList] = useState([]);
  const [originalKomikList, setOriginalKomikList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const apiURL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchKomikList = async () => {
      try {
        const response = await axios.get(`${apiURL}/komik`);
        setKomikList(response.data);
        setOriginalKomikList(response.data);
      } catch (error) {
        console.error('Error fetching komik list:', error);
      }
    };

    fetchKomikList();
  }, [apiURL]);

  useEffect(() => {
    const filteredByGenre = selectedGenre
      ? originalKomikList.filter(komik => komik.genre.includes(selectedGenre))
      : originalKomikList;

    const filteredKomikList = filteredByGenre.filter((komik) =>
      komik.judul.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setKomikList(filteredKomikList);
  }, [searchTerm, selectedGenre, originalKomikList]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${apiURL}/komik/${id}`);
      
      setKomikList((prevKomikList) => prevKomikList.filter((komik) => komik._id !== id));
      
      console.log(`Komik with id ${id} deleted successfully.`);
    } catch (error) {
      console.error(`Error deleting komik with id ${id}:`, error);
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim() === '') {
      setKomikList(originalKomikList);
    }
  };

  return (
    <div>
      <NavbarAdmin/>
      <div className="container mt-3">
        <div className="custom-card">
          <h2 className='text-center'>Daftar Komik</h2>
          <div className="mb-3 mx-2">
            <input
              type="text"
              className="form-control searching"
              placeholder="Cari Judul"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <div className="mb-3 mx-2">
            <label htmlFor="genreFilter" className="form-label">Filter by Genre:</label>
            <select
              id="genreFilter"
              className="form-select"
              onChange={(e) => setSelectedGenre(e.target.value)}
              value={selectedGenre}
            >
              <option value="">All Genres</option>
              {[...new Set(originalKomikList.flatMap(komik => komik.genre))].map((genre) => (
                <option key={genre} value={genre}>{genre}</option>
              ))}
            </select>
          </div>
          <div className="mb-3 mx-2">
            <Link to="/admin/tambahKomik" className="btn btn-success">
              Tambah Komik
            </Link>
          </div>
          <div className="table-responsive mx-2">
            <table className="table table-dark table-hover">
              <thead>
                <tr>
                  <th className='col-1'>No</th>
                  <th className='col-1'>Thumbnail</th>
                  <th className='col-4'>Judul</th>
                  <th className='col-4'>Action</th>
                </tr>
              </thead>
              <tbody>
                {komikList.map((komik, index) => (
                  <tr key={komik._id}>
                    <td>{index + 1}</td>
                    <td>
                      <img
                        src={komik.thumbnail}
                        alt={`Thumbnail for ${komik.judul}`}
                        className="img-fluid"
                      />
                    </td>
                    <td>{komik.judul}</td>
                    <td>
                      <Link to={`/admin/DetailKomik/${komik._id}`} className='btn btn-primary mx-2'>Detail</Link>
                      <button onClick={() => handleDelete(komik._id)} className='btn btn-danger mx-2'>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListKomik;
