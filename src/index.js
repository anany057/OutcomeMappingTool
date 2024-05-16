import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css';
import './footer.css';
import './App.css';
import './contactUsform';
import App from './App';
import LoginForm from "./LoginPage";

import ContactUsForm from './contactUsform';




const useFontAwesomeScript = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://kit.fontawesome.com/cc33f4e9f6.js';
    script.crossOrigin = 'anonymous';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);
};

// Define Navbar component
const Navbar = ({ onSelectData,onSelectData2 }) => {
  useFontAwesomeScript();
  const [selectedNavItem, setSelectedNavItem] = useState('');


  const handleNavItemClicked = (data) => {
    setSelectedNavItem(data);
    onSelectData(data); // Pass selected data to parent component
    onSelectData2(false);

  };

  useEffect(() => {
    const elems = document.querySelectorAll('.sidenav');
    M.Sidenav.init(elems, {});
  }, []);

  return (
  
    <>
   
      {/* Navbar-mobile/desktop view */}
      
      {/* <nav style={{ backgroundColor: 'black', color: 'white', height: '95px'}}> */}
        <div className="nav-wrapper">
          <a href="#!" data-target="mobile-demo" className="sidenav-trigger" style={{zIndex:'10'}}><i className="material-icons">Expand</i></a>
          {/* Remove the logo and desktop navbar elements */}
        </div>
      {/* </nav> */} 

      {/* Side Navbar for Desktop and Mobile */}
      <ul className="sidenav sidenav-fixed" style={{ backgroundColor: '#007bff' }} id="mobile-demo">
        <div style={{ overflow: 'contain' }}>
          <li>
            <a href="http://localhost:3000/#!" style={{ overflow: 'contain', marginBottom: '14px', display: 'flex', alignItems: 'center',height:'100px', backgroundColor:'#121212' }}>
              <img src="https://gyaanarth.com/wp-content/uploads/2022/07/logo-1-1.png" alt="Logo" style={{ height: '45px', width: 'auto', borderRadius: '50%', marginLeft: '-12px', marginTop: '15px', overflow: 'hidden', padding: '5px' }} />
              <label style={{ color: 'white', marginTop: '15px', marginLeft: '5px',fontSize:'15px',fontWeight:'600' }}>Outcome Mapping Tool</label>
              <hr style={{ color: 'white', width: 'auto', marginTop: '0px', marginLeft: '5px', marginBottom: '5px' }}></hr>
            </a>
          </li>
        </div>
<div className='testdiv'>
        <li className='testdivchild'><a href="#!" onClick={() => handleNavItemClicked('data3')}>End Term Marks<i class="fa-solid fa-book" style={{marginRight:'-1px'}}></i></a></li>
        </div> 
        <div>
        <li className='testdivchild'><a href="#!" onClick={() => handleNavItemClicked('data2')}>Day to Day Marks<i class="fa-solid fa-book" style={{marginRight:'-1px'}}></i></a></li>
        </div>
        <div>
        <li className='testdivchild'><a href="#!" onClick={() => handleNavItemClicked('data8')}>Evaluation Marks<i class="fa-solid fa-book" style={{marginRight:'-1px'}}></i></a></li>
       </div> {/* <li><a href="#!" onClick={() => handleNavItemClicked('data9')}>Evaluation Marks<i class="fa-solid fa-book" style={{marginRight:'-1px'}}></i></a></li> */}
       <div>
        <li className='testdivchild'><a href="#!" onClick={() => handleNavItemClicked('data1')}>Mid Term Marks<i class="fa-solid fa-book" style={{marginRight:'-1px'}}></i></a></li>
        </div><div><li className='testdivchild'><a href="#!" onClick={() => handleNavItemClicked('data4')}>Sub Exit Feedback<i class="fa-solid fa-comment" style={{marginRight:'-1px'}}></i></a></li>
       
       </div>
       <div>
        <li className='testdivchild'><a href="#!" onClick={() => handleNavItemClicked('data')}>Assessment Tools<i class="fa-solid fa-screwdriver-wrench" style={{marginRight:'-1px'}}></i></a></li>
        </div>  </ul>
    </>
  );
};







const Index = () => {
  const [selectedData, setSelectedData] = useState('');
  const [chartFalse,setChartFalse]=useState('true');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSelectChart=(data)=>{
    setChartFalse(data);
  }

  const handleSelectData = (data) => {
    setSelectedData(data);
  };
  const handleLogin = () => {
    // Perform your login authentication logic here
    // For example, set isLoggedIn to true when login is successful
    setIsLoggedIn(true);
  };

  useEffect(() => {
    const elems = document.querySelectorAll('.sidenav');
    M.Sidenav.init(elems, {});
  }, []);

   useEffect(() => {
    if (!isLoggedIn) {
      // Apply CSS classes to the body when logged in
      document.body.classList.add('logged-in');
    } else {
      // Remove CSS classes when not logged in
      document.body.classList.remove('logged-in');
    }
  }, [isLoggedIn]);

  return (
    <React.StrictMode>
      {!isLoggedIn ? (
        <LoginForm onLogin={handleLogin} />
      ) : (
        <>
           <div style={{width:'100%',backgroundColor:'grey',position:'fixed',height:'100px',opacity:'20px'}}>
      <div id="Meta-details" style={{marginLeft:'320px' ,marginTop:'40px'}}>
      <div className="header-arrows">
        <span id="arrow-1" style={{ marginRight: '2px' }}>
          <a href="#"><i className="fa-solid fa-circle-chevron-left fa-rotate-(-10) fa-2x" style={{ color: '#000000' }}></i></a>
        </span>
        <span id="arrow-2">
          <a href="#"><i className="fa-solid fa-circle-chevron-left fa-rotate-180 fa-2x" style={{ color: '#000000' }}></i></a>
        </span>
      </div>

      
    </div>
      </div>
      <Navbar onSelectData={handleSelectData} onSelectData2={handleSelectChart}/>
      
      <div className="whole">
      {/* Render the App component with selected data */}

      <div style={{ marginLeft: '25%',marginTop:'10%' }}>
        <App selectedData={selectedData} chartFalse={chartFalse} />
      </div>
      </div>
     
          <footer>
            <div id="communities" style={{ height: 'inherit' }}>
              <ContactUsForm />
            </div>
            <div id="communities" style={{ marginTop: '4rem' }}>
              <h5>Useful Links</h5>
              <ul>
                <li><a href="https://webportal.jiit.ac.in:6010/employeeportal/">Jiit employee portal</a></li>
                <li><a href="https://www.jiit.ac.in/academic-calendars-0">Academic Calender</a></li>
              </ul>
            </div>
            <div id="communities" style={{ marginTop: '4rem' }}>
              <h5>Mentors</h5>
              <ul>
                <li><a href="https://webportal.jiit.ac.in:6010/employeeportal/">Mr Vivek Kumar Singh</a></li>
              </ul>
            </div>
            <div id="socials" style={{ marginTop: '4rem' }}>
              <div className="social">
                <i className="fa-brands fa-linkedin"></i>
              </div>
              <div className="social">
                <i className="fa-brands fa-github"></i>
              </div>
              <div className="social">
                <i className="fab fa-facebook"></i>
              </div>
            </div>
          </footer>
        </>
      )}
    </React.StrictMode>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Index />);

export default Index;
