import React from 'react';
import Navbar from './Navbar';
import Home from './Home';
import Roadmap from './Roadmap';
import RoadmapItems from './RoadmapItems';
import Footer from './Footer';

const HomeLayout = () => {
    return (
        <div>
            
            <Navbar></Navbar>
            <Home></Home>
            <RoadmapItems></RoadmapItems>
            <Footer></Footer>
        </div>
    );
};

export default HomeLayout;