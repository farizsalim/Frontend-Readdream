import React, { useState } from 'react';
import axios from 'axios';
import NavbarAdmin from '../../component/NavbarAdmin';

const AddKomik = () => {
  const apiURL = process.env.REACT_APP_API_URL;
  const [formData, setFormData] = useState({
    judul: '',
    author: '',
    deskripsi: '',
    jenis_komik: '',
    genre: '',
    status: '',
    uploader: '',
    thumbnail: null, // Menggunakan null untuk menunjukkan bahwa belum ada file yang dipilih
  });

  const handleFileChange = (e, fieldName) => {
    const file = e.target.files[0];

    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: file,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();

      // Memasukkan data teks ke dalam FormData
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });

      // Kirim permintaan POST untuk menambahkan komik baru
      await axios.post(`${apiURL}/komik`, formDataToSend);

      // Redirect ke halaman Daftar Komik setelah berhasil menambahkan komik
      // Anda dapat menyesuaikan rute berikut sesuai dengan konfigurasi rute Anda
      window.location.href = '/admin/ListKomik';
    } catch (error) {
      console.error('Error adding komik:', error);
      // Handle error (tampilkan pesan kesalahan, jika perlu)
    }
  };

  return (
    <div>
        <NavbarAdmin/>
        <div className="container mt-3">
        <h2>Tambah Komik</h2>
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
            <label htmlFor="judul" className="form-label">Judul</label>
            <input
                type="text"
                className="form-control"
                id="judul"
                name="judul"
                value={formData.judul}
                onChange={handleChange}
                required
            />
            </div>
            <div className="mb-3">
            <label htmlFor="author" className="form-label">Author</label>
            <input
                type="text"
                className="form-control"
                id="author"
                name="author"
                value={formData.author}
                onChange={handleChange}
                required
            />
            </div>
            <div className="mb-3">
            <label htmlFor="deskripsi" className="form-label">Deskripsi</label>
            <textarea
                className="form-control"
                id="deskripsi"
                name="deskripsi"
                value={formData.deskripsi}
                onChange={handleChange}
                required
            />
            </div>
            <div className="mb-3">
            <label htmlFor="jenis_komik" className="form-label">Jenis Komik</label>
            <input
                type="text"
                className="form-control"
                id="jenis_komik"
                name="jenis_komik"
                value={formData.jenis_komik}
                onChange={handleChange}
                required
            />
            </div>
            <div className="mb-3">
                <label htmlFor="genre" className="form-label">Genre</label>
                <input
                    type="text"
                    className="form-control"
                    id="genre"
                    name="genre"
                    value={formData.genre}
                    onChange={handleChange}
                    required
                />
                <small className="form-text text-muted">Pisahkan genre dengan koma (contoh: Action, Adventure, Fantasy).</small>
            </div>
            <div className="mb-3">
            <label htmlFor="status" className="form-label">Status</label>
            <input
                type="text"
                className="form-control"
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
            />
            </div>
            <div className="mb-3">
            <label htmlFor="uploader" className="form-label">Uploader</label>
            <input
                type="text"
                className="form-control"
                id="uploader"
                name="uploader"
                value={formData.uploader}
                onChange={handleChange}
                required
            />
            </div>
            <div className="mb-3">
            <label htmlFor="thumbnail" className="form-label">Thumbnail</label>
            <input
                type="file"
                className="form-control"
                id="thumbnail"
                name="thumbnail"
                onChange={(e) => handleFileChange(e, 'thumbnail')}
                accept="image/*"
                required
            />
            </div>

            <button type="submit" className="btn btn-primary">Tambah Komik</button>
        </form>
        </div>
    </div>
  );
};

export default AddKomik;
