import './App.css';
import Login from './Page/Login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './Page/Register';
import Topic from './Page/Topic';
import Posts from './Page/Posts';
import ApprovePosts from './Page/ApprovePosts';
import ChangeInfo from './Page/ChangeInfo';
import HeaderComponent from './Component/HeaderComponent';
import ManageAcc from './Page/ManageAcc';
import PostDetail from './Page/PostDetail';
import Notification from './Page/Notification';
import CreatePost from './Page/CreatePost';
import EditPost from './Page/EditPost';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/" element={<HeaderComponent />}>
          <Route path="/posts/all" element={<Posts />}></Route>
          <Route path="/posts/key=:key" element={<Posts />}></Route>
          <Route path="/posts/topic=:topicid" element={<Posts />}></Route>
          <Route path="/topic" element={<Topic />}></Route>
          <Route path="/changeInfo" element={<ChangeInfo />}></Route>
          <Route path="/approve" element={<ApprovePosts />}></Route>
          <Route path="/manageacc" element={<ManageAcc />}></Route>
          <Route path="/postDetail/:id" element={<PostDetail />}></Route>
          <Route path="/notifications" element={<Notification />}></Route>
          <Route path="/createpost" element={<CreatePost />}></Route>
          <Route path="/editpost/:id" element={<EditPost />}></Route>
        </Route>
        <Route path="/register" element={<Register />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
