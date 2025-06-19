import React from 'react';
import Navbar from './Navbar';
import Home from './Home';
import Roadmap from './Roadmap';
import RoadmapItems from './RoadmapItems';

const HomeLayout = () => {
    return (
        <div>
            
            <Navbar></Navbar>
            <Home></Home>
            <RoadmapItems></RoadmapItems>
        </div>
    );
};

export default HomeLayout;