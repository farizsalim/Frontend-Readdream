import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import { useParams } from 'react-router-dom';
import NavbarAdmin from '../../component/NavbarAdmin';

const DetailChapter = () => {
  const { id, chapterId } = useParams();
  const [chapter, setChapter] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [nomorGambar, setNomorGambar] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [ascendingOrder, setAscendingOrder] = useState(true);
  const [editGambarId, setEditGambarId] = useState(null);

  const apiURL = process.env.REACT_APP_API_URL
  const apiPORT = process.env.REACT_APP_API_PORT

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchChapterDetail = async () => {
      try {
        const response = await axios.get(`${apiURL}/komik/${id}/chapter/${chapterId}`);
        setChapter(response.data);
      } catch (error) {
        console.error('Error fetching chapter detail:', error);
      }
    };

    fetchChapterDetail();
  }, [id, chapterId, apiURL]);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleNomorGambarChange = (e) => {
    setNomorGambar(e.target.value);
  };

  const handleUpload = async () => {
    if (!selectedFile || !nomorGambar) {
        setIsValid(false);
        return;
    }

    try {
        const formData = new FormData();
        formData.append('gambar', selectedFile);
        formData.append('nomorGambar', nomorGambar);

        await axios.post(`${apiURL}/komik/${id}/chapter/${chapterId}/addGambar`, formData, {
            withCredentials: true, // Menambahkan opsi withCredentials
        });

        setIsValid(true); // Reset isValid setelah berhasil mengunggah
        window.location.reload();
    } catch (error) {
        console.error('Error uploading image:', error);
        setIsValid(false);
    }
};

  const handleDeleteGambar = async (gambarId) => {
    try {
      await axios.delete(`${apiURL}/komik/${id}/chapter/${chapterId}/gambar/${gambarId}`);
      window.location.reload();
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };

  const openModal = (imageUrl) => {
    setSelectedImage(imageUrl);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedImage('');
    setModalIsOpen(false);
  };

  const handleEditGambar = (gambarId, nomorGambar) => {
    setEditGambarId(gambarId);
    setNomorGambar(nomorGambar);
  };

  const handleCancelEdit = () => {
    setEditGambarId(null);
    setNomorGambar('');
  };

  const handleConfirmEdit = async (gambarId) => {
    try {
      await axios.put(`${apiURL}/komik/${id}/chapter/${chapterId}/gambar/${gambarId}`, { nomorGambar });
      window.location.reload();
    } catch (error) {
      console.error('Error updating image:', error);
    }
  };

  const sortedGambar = [...(chapter?.daftarGambar || [])].sort((a, b) => {
    if (ascendingOrder) {
      return a.nomorGambar - b.nomorGambar;
    } else {
      return b.nomorGambar - a.nomorGambar;
    }
  });

  return (
    <div>
      <NavbarAdmin/>
      <div className="container mt-3">
        <h2>Detail Chapter</h2>
        {chapter ? (
          <>
            <div>
              <h4>Judul Chapter: {chapter.judulChapter}</h4>
              <p>Nomor Chapter: {chapter.nomorChapter}</p>
            </div>
            <div className={`my-4 ${isValid ? '' : 'has-danger'}`}>
              <label htmlFor="nomorGambar" className="form-label">
                Nomor Gambar:
              </label>
              <input
                type="text"
                id="nomorGambar"
                className={`form-control ${isValid ? '' : 'is-invalid'}`}
                value={nomorGambar}
                onChange={handleNomorGambarChange}
                required
              />
              <div className="invalid-feedback">Nomor Gambar tidak boleh kosong</div>
            </div>
            <div className={`my-4 ${isValid ? '' : 'has-danger'}`}>
              <label htmlFor="gambar" className="form-label">
                Pilih Gambar:
              </label>
              <input
                type="file"
                id="gambar"
                className={`form-control ${isValid ? '' : 'is-invalid'}`}
                onChange={handleFileChange}
                required
              />
              <div className="invalid-feedback">Pilih gambar untuk diupload</div>
            </div>
            <div className="my-4">
              <button className="btn btn-primary" onClick={handleUpload}>
                Tambah Gambar
              </button>
            </div>
            <div>
              <h4>Daftar Gambar</h4>
              {sortedGambar.length > 0 ? (
                <table className="table">
                  <thead>
                    <tr>
                      <th>
                        Nomor Gambar{' '}
                        <button className="btn btn-link" onClick={() => setAscendingOrder(!ascendingOrder)}>
                          {ascendingOrder ? '↑' : '↓'}
                        </button>
                      </th>
                      <th>Gambar</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedGambar.map((gambar, index) => (
                      <tr key={index}>
                        <td>
                          {editGambarId === gambar._id ? (
                            <input
                              type="text"
                              value={nomorGambar}
                              onChange={handleNomorGambarChange}
                              className="form-control"
                            />
                          ) : (
                            gambar.nomorGambar
                          )}
                        </td>
                        <td>
                          <img
                            src={`${apiPORT}/public/thumbnail/${gambar.nama}`}
                            alt={`Gambar ${index + 1}`}
                            style={{ maxWidth: '100px', maxHeight: '100px', cursor: 'pointer' }}
                            onClick={() => openModal(`${apiPORT}public/thumbnail/${gambar.nama}`)}
                          />
                        </td>
                        <td>
                          {editGambarId === gambar._id ? (
                            <>
                              <button
                                className="btn btn-success me-2"
                                onClick={() => handleConfirmEdit(gambar._id)}
                              >
                                Confirm
                              </button>
                              <button className="btn btn-secondary" onClick={handleCancelEdit}>
                                Cancel
                              </button>
                            </>
                          ) : (
                            <button
                              className="btn btn-warning me-2"
                              onClick={() => handleEditGambar(gambar._id, gambar.nomorGambar)}
                            >
                              Edit
                            </button>
                          )}
                          <button
                            className="btn btn-danger"
                            onClick={() => handleDeleteGambar(gambar._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>Tidak ada gambar saat ini.</p>
              )}
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}

        <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
          <div className="d-flex justify-content-center">
            <button onClick={closeModal} className="btn btn-danger">
              Close
            </button>
          </div>
          <div className="d-flex justify-content-center">
            <img src={selectedImage} alt="Pratinjau" style={{ maxWidth: '100%' }} className="text-center" />
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default DetailChapter;
