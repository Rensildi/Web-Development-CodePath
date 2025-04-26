import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { supabase } from './supabase';  // Update this import
import HomePage from './pages/HomePage';
import CreatePost from './components/CreatePost';
import PostPage from './pages/PostPage';
import NavBar from './components/NavBar';
import './App.css';

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');


  useEffect(() => {
    fetchPosts();
  }, [sortBy, searchTerm]);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: sortBy === 'oldest' })
        .neq('id', '00000000-0000-0000-0000-000000000000'); // Dummy condition
  
      if (searchTerm) {
        query = query.ilike('title', `%${searchTerm}%`);
      }
  
      if (sortBy === 'popular') {
        query = query.order('upvotes', { ascending: false });
      }
  
      // Add cache busting
      const { data, error } = await query;
      
      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error('Error fetching posts:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleSortChange = (sortOption) => {
    setSortBy(sortOption);
  };

  return (
    <Router>
      <div className="app">
        <NavBar 
          onSearch={handleSearch} 
          onSortChange={handleSortChange} 
          sortBy={sortBy}
        />
        <main>
          <Routes>
            <Route 
              path="/" 
              element={
                <HomePage 
                  posts={posts} 
                  loading={loading} 
                  fetchPosts={fetchPosts} 
                />
              } 
            />
            <Route path="/create" element={<CreatePost fetchPosts={fetchPosts} />} />
            <Route path="/post/:id" element={<PostPage fetchPosts={fetchPosts} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;