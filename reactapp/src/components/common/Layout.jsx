import Navbar from './Navbar/Navbar.jsx';

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className="pt-12 ">{children}</main>
    </>
  );
};

export default Layout;
