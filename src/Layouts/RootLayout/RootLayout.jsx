import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Container from "../../Shared/Container/Container";

const RootLayout = () => {
  return (
    <div>
      <header>
        <Navbar></Navbar>
      </header>
      <Container>
        <main className="min-h-[calc(100vh-285px)]">
          <Outlet></Outlet>
        </main>
      </Container>
      <footer>
        <Footer></Footer>
      </footer>
    </div>
  );
};

export default RootLayout;
