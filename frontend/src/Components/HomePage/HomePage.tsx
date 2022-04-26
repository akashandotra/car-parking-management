import React from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import HomeSection from "../HomeSection/HomeSection";
class HomePage extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <HomeSection />
        <Footer />
      </div>
    );
  }
}

export default HomePage;
