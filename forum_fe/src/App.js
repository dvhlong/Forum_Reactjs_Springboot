// import logo from './logo.svg';
import './App.css';
import Login from './Page/Login';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import Register from './Page/Register';
import Topic from './Page/Topic';
import Posts from './Page/Posts';
import ApprovePosts from './Page/ApprovePosts';
import ChangeInfo from './Page/ChangeInfo';
import HeaderComponent from './Component/HeaderComponent';
function App() {
  return (
    
    <Router>
        <Routes>
          <Route path="/" element={<Login/>}></Route>
          <Route path="/" element={<HeaderComponent/>}>
            <Route path="/posts" element={<Posts/>}></Route>
            <Route path="/topic" element={<Topic/>}></Route>
            <Route path="/changeInfo" element={<ChangeInfo/>}></Route>
            <Route path="/approve" element={<ApprovePosts/>}></Route>
          </Route>
          <Route path="/register" element={<Register/>}></Route>
          <Route path="/pinfo"></Route>
          <Route paht="/main/post/"></Route>
          <Route paht="/manageacc"></Route>
          <Route paht="/notify"></Route>
        </Routes>
    </Router>
  );
}

export default App;
