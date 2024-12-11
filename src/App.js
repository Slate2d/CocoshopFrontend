import React, {useEffect} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

import MainPage from "./components/MainPage";
import ShoppingCart from "./components/ShoppingCart";
import LikedPage from "./components/LikedPage";
import LoginPage from "./components/LoginPage";
import i18next from './i18n';

const App = () => {
 
  useEffect(() => {
    const language = localStorage.getItem("language");
    const systemLanguage = localStorage.getItem("i18nextLng")
    if(language){
      i18next.changeLanguage(language);
    }
    if(systemLanguage){
      i18next.changeLanguage(systemLanguage.slice(0,2));
    }
    localStorage.setItem("language", i18next.language);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/cart" element={<ShoppingCart />} />
        <Route path="/liked" element={<LikedPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;



// import React from "react"
// import Header from "./components/Header";
// import Footer from "./components/Footer";
 
// class App extends React.Component{
//   constructor(props){
//     super(props)
//     this.state={
//       items:[
//         {
//           imgSrc: "5.jpg",
//           altText: "Apple BYZ S852I",
//           name: "Apple BYZ S852I",
//           rating: "4.7",
//           price: 52,
//           oldPrice: 60,
//         },
//         {
//           imgSrc: "6.jpg",
//           altText: "Apple EarPods",
//           name: "Apple EarPods",
//           rating: "4.5",
//           price: 50,
//         },
//         {
//           imgSrc: "7.jpg",
//           altText: "Apple EarPods Box",
//           name: "Apple EarPods",
//           rating: "4.5",
//           price: 30,
//         },
//       ],
//       wirelessHeadphones: [
//         {
//           imgSrc: "8.jpg",
//           altText: "Apple BYZ S852I",
//           name: "Apple BYZ S852I",
//           rating: "4.7",
//           price: 52,
//           oldPrice: 60,
//         },
//         {
//           imgSrc: "9.jpg",
//           altText: "Apple EarPods",
//           name: "Apple EarPods",
//           rating: "4.5",
//           price: 50,
//         },
//         {
//           imgSrc: "4.jpg",
//           altText: "Apple EarPods Box",
//           name: "Apple EarPods",
//           rating: "4.5",
//           price: 30,
//         },
//       ]
//     }
//   }
//   render (){
//     return (
//       <div className="wrapper">
//         <Header/>
        
//         <Footer/>

//       </div>



//     )


//   }
// }
// export default App;
