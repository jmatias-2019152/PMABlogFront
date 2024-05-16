import axios from "axios";
import Footer from "../../components/Footer";
import HomePosts from "../../components/HomePosts";
import Navbar from "../../components/Navbar";
import { IF, URL } from "../../url";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Loader from '../../components/Loader';
import { UserContext } from "../../context/UserContext";
import "../home/home.css"; 

const Home = () => {
  const { search } = useLocation();
  const [posts, setPosts] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [loader, setLoader] = useState(false);
  const { user } = useContext(UserContext);

  const fetchPosts = async () => {
    setLoader(true);
    try {
      const res = await axios.get(URL + "/blog/v1/post/" + search);
      setPosts(res.data);
      setNoResults(res.data.length === 0);
    } catch (err) {
      console.log(err);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [search]);

  return (
    <>
      <Navbar />
      <div className="home-posts-container">
        {loader ? (
          <div className="loader-container">
            <Loader />
          </div>
        ) : !noResults ? (
          posts.map((post) => (
            <Link key={post._id} to={user ? `/posts/post/${post._id}` : "/login"}>
              <HomePosts post={post} />
            </Link>
          ))
        ) : (
          <h3 className="no-posts-message">No posts available</h3>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Home;