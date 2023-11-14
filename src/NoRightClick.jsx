import { useEffect } from 'react';

const NoRightClick = () => {
  useEffect(() => {
    const handleContextMenu = (e) => {
      // Hentikan tindakan bawaan dari konteks menu kanan
      e.preventDefault();
    };

    // Tambahkan event listener pada komponen yang terpasang
    document.addEventListener('contextmenu', handleContextMenu);

    // Membersihkan event listener setelah komponen di-unmount
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
    };
  }, []);

  return null; // Tidak ada yang perlu dirender
};

export default NoRightClick;
