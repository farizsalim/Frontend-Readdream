import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import moment from 'moment';
import NavbarAdmin from '../../component/NavbarAdmin';

const DetailKomik = () => {
  const { id } = useParams();
  const [komik, setKomik] = useState(null);
  const [formData, setFormData] = useState({
    judul: '',
    author: '',
    genre: '',
    deskripsi: '',
    jenis_komik: '',
    status: '',
    uploader: '',
  });
  const apiURL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchKomikDetail = async () => {
      try {
        const response = await axios.get(`${apiURL}/komik/${id}`);
        setKomik(response.data);
        setFormData(response.data);
      } catch (error) {
        console.error('Error fetching komik detail:', error);
      }
    };

    fetchKomikDetail();
  }, [id,apiURL]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`${apiURL}/komik/${id}`, formData);
      console.log('Komik updated successfully:', response.data);
      const updatedKomik = await axios.get(`${apiURL}/komik/${id}`);
      setKomik(updatedKomik.data);
    } catch (error) {
      console.error('Error updating komik:', error);
    }
  };

  const handleDeleteChapter = async (chapterId) => {
    try {
      const response = await axios.delete(`${apiURL}/komik/${id}/chapter/${chapterId}`);
      console.log('Chapter deleted successfully:', response.data);
      const updatedKomik = await axios.get(`${apiURL}/komik/${id}`);
      setKomik(updatedKomik.data);
    } catch (error) {
      console.error('Error deleting chapter:', error);
    }
  };

  return (
    <div>
      <NavbarAdmin/>
      <div className="container mt-3">
        <h2>Detail Komik</h2>
        {komik ? (
          <>
          <form onSubmit={handleSubmit}>
              <div className="mb-3">
                  <label className="form-label">Judul</label>
                  <input type="text" className="form-control" name="judul" value={formData.judul} onChange={handleInputChange} />
              </div>

              <div className="mb-3">
                  <label className="form-label">Penulis</label>
                  <input type="text" className="form-control" name="author" value={formData.author} onChange={handleInputChange} />
              </div>

              <div className="mb-3">
                  <label className="form-label">Genre</label>
                  <input type="text" className="form-control" name="genre" value={formData.genre} onChange={handleInputChange} />
              </div>

              <div className="mb-3">
                  <label className="form-label">Deskripsi</label>
                  <textarea className="form-control" name="deskripsi" value={formData.deskripsi} onChange={handleInputChange} />
              </div>

              <div className="mb-3">
                  <label className="form-label">Jenis Komik</label>
                  <input type="text" className="form-control" name="jenis_komik" value={formData.jenis_komik} onChange={handleInputChange} />
              </div>

              <div className="mb-3">
                  <label className="form-label">Status</label>
                  <input type="text" className="form-control" name="status" value={formData.status} onChange={handleInputChange} />
              </div>

              <div className="mb-3">
                  <label className="form-label">Uploader</label>
                  <input type="text" className="form-control" name="uploader" value={formData.uploader} onChange={handleInputChange} />
              </div>
              <button type="submit" className="btn btn-primary">
                  Update Komik
              </button>
            </form>
            <div className="mt-4">
              <h3>Daftar Chapter</h3>
              <div className="my-4">
                <Link to={`/admin/tambahchapter/${id}`} className="btn btn-primary">
                  Tambah Chapter Baru
                </Link>
              </div>
              {komik.chapter ? (
                <table className="table">
                  <thead>
                    <tr>
                      <th>Judul Chapter</th>
                      <th>Upload</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {komik.chapter.map((chapter) => (
                      <tr key={chapter._id}>
                        <td>{chapter.judulChapter}</td>
                        <td>{moment(chapter.created_at).fromNow()}</td>
                        <td>
                          <Link to={`/admin/detailchapter/${id}/chapter/${chapter._id}`} className="btn btn-info me-2">
                            Detail
                          </Link>
                          <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => handleDeleteChapter(chapter._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>Tidak ada chapter saat ini.</p>
              )}
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default DetailKomik;
