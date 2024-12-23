import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import axios from 'axios';
import Homepage from './Homepage';
import CategoryPage from './CategoryPage';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import AccountPage from './AccountPage';
import FavoritesPage from './FavoritesPage';
import Header from './Header';
import AttributePage from './AttributePage';
import ProductPage from './ProductPage';
import AdminHome from './AdminHome';
import AdminPage from './AdminPage';
import Layout from './Layout';
import LogoutPage from './LogoutPage';
import Sidebar from './Sidebar';
import Footer from './Footer';
import SearchResultsPage from './SearchResultsPage';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null); // Store user ID
  const [categories, setCategories] = useState([]);
  const [users, setUsers] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setIsLoggedIn(true);
      setUserId(user.user_id);
    }
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/categories');
        setCategories(response.data.map((item) => item.category_name));
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users');
        setUsers(response.data.map((item) => item.user));
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (query) {
        try {
          const response = await axios.get(`http://localhost:5000/api/search?query=${query}`);
          setSearchResults(response.data.products);
        } catch (error) {
          console.error('Error fetching search results:', error);
        }
      }
    };
    fetchSearchResults();
  }, [query]); // Depend on query so it runs when the query changes

  return (
    <Router>
      <HeaderWrapper isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setSearchResults={setSearchResults} searchResults={searchResults} setQuery={setQuery} />
      <Routes>
        <Route
          path="/"
          element={
            <Layout sidebarContent={<SidebarContent categories={categories} />}>
              <Homepage
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
                categories={categories}
                searchResults={searchResults}
                setSearchResults={setSearchResults}
              />
            </Layout>
          }
        />
        <Route
          path="/login"
          element={<LoginPage setIsLoggedIn={setIsLoggedIn} setUserId={setUserId} />}
        />
        <Route
          path="/signup"
          element={<SignupPage setIsLoggedIn={setIsLoggedIn} setUserId={setUserId} />}
        />
        <Route
          path="/logout"
          element={<LogoutPage setIsLoggedIn={setIsLoggedIn} setUserId={setUserId} />}
        />
        <Route
          path="/account"
          element={
            <Layout sidebarContent={<SidebarContent categories={categories} />}>
              <AccountPage categories={categories} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            </Layout>
          }
        />
        <Route
          path="/favorites"
          element={
            <Layout sidebarContent={<SidebarContent categories={categories} />}>
              <FavoritesPage categories={categories} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            </Layout>
          }
        />
        <Route
          path="/admin"
          element={<AdminPage />}
        />
        <Route
          path="/admin/home"
          element={<AdminHome />}
        />
        <Route
          path="/category/:category_name"
          element={
            <Layout sidebarContent={<SidebarContent categories={categories} />}>
              <CategoryPage />
            </Layout>
          }
        />
        <Route
          path="/attribute/:attribute_id"
          element={
            <Layout sidebarContent={<SidebarContent categories={categories} />}>
              <AttributePage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            </Layout>
          }
        />
        <Route
          path="/products/:productId"
          element={
            <Layout>
              <ProductPage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} userId={userId} />
            </Layout>
          }
        />
        <Route
          path="/search"
          element={
            <Layout sidebarContent={<SidebarContent categories={categories} />}>
              <SearchResultsPage categories={categories} />
            </Layout>
          }
        />
      </Routes>
      <FooterWrapper />
    </Router>
  );
};

const HeaderWrapper = ({ isLoggedIn, setIsLoggedIn, setSearchResults, searchResults, setQuery }) => {
  const location = useLocation();
  const hideHeaderPaths = ['/login', '/signup', '/admin', '/admin/home'];

  const shouldHideHeader = hideHeaderPaths.some(path => location.pathname.startsWith(path));

  if (shouldHideHeader) {
    return null;
  }

  return <Header isLoggedIn={isLoggedIn}
    setIsLoggedIn={setIsLoggedIn}
    setSearchResults={setSearchResults}
    searchResults={searchResults}
    setQuery={setQuery}
  />;
};

const FooterWrapper = () => {
  const location = useLocation();
  const hideFooterPaths = ['/admin', '/admin/home'];

  const shouldHideFooter = hideFooterPaths.some(path => location.pathname.startsWith(path));

  if (shouldHideFooter) {
    return null;
  }
  return <Footer />
}

const SidebarContent = ({ categories }) => (
  <div>
    <h3>Kategoriler</h3>
    <ul>
      {categories.map((category, index) => (
        <li key={index}>{category}</li>
      ))}
    </ul>
  </div>
);

export default App;