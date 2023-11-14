import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import RegisterPage from "./pages/RegisterPage";
import "./App.scss"
import ListKomik from './pages/Admin/ListKomik';
import DetailKomik from './pages/Admin/DetailKomik';
import AddChapter from './pages/Admin/AddChapter';
import DetailChapter from './pages/Admin/DetailChapter';
import Modal from 'react-modal';
import AddKomik from './pages/Admin/AddKomik';
import Footer from './component/Footer';
import Home from './pages/Home';
import Komik from './pages/Komik';
import Chapter from './pages/Chapter';

Modal.setAppElement('#root');
const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/komik/:id" element={<Komik/>}/>
          <Route path="/komik/:id/chapter/:nomorChapter" element={<Chapter/>}/>
          <Route path="/registrasi" element={<RegisterPage/>}/>
          <Route path="/admin/listKomik" element={<ListKomik/>}/>
          <Route path="/admin/tambahKomik" element={<AddKomik/>}/>
          <Route path="/admin/DetailKomik/:id" element={<DetailKomik/>}/>
          <Route path="/admin/tambahchapter/:id" element={<AddChapter/>}/>
          <Route path="/admin/detailchapter/:id/chapter/:chapterId" element={<DetailChapter/>}/>
        </Routes>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
