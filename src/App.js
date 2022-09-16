import React,{useState,useEffect} from 'react';      //To use the useState Hook, we first need to import it into our component.
import Posts from './Posts';
import Pagination from './Pagination';
import axios from 'axios';  //Axios Component for React with child function callback. This is intended to allow in render async requests.
import "./App.css";



  const App = () => {
  const[posts,setPosts] = useState([]);      //The React useState Hook allows us to track state in a function component.
  const[loading,setLoading] = useState(false);
  const [currentPage,setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);




  useEffect(() => {           //The useEffect Hook allows you to perform side effects in your components. Such as fetching data,directly updating the DOM, and timers.
      const fetchPosts = async () =>{
      setLoading(true);
      const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
      setPosts(res.data);
      setLoading(false);
    };

    fetchPosts();
  },[]);

  //Get current posts

  const indexOfLastPost = currentPage*postsPerPage;
  const indexOfFirstPost = indexOfLastPost-postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost,indexOfLastPost);


  //Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return(
    <div className='container mt-5'>
    <h1 className="text-primary mb-3">My Blog</h1>
    <Posts posts={currentPosts} loading={loading}/>
    <Pagination 
      postsPerPage={postsPerPage} //props of component
      totalPosts={posts.length} 
      paginate={paginate}
      />
    </div>
  );
}; 

export default App;
