import Nav from "../components/Nav";
import {Outlet} from 'react-router-dom';

const Layout = () => {    
    return (
        <>
            <div className="container-fluid root">
                <div className="row">
                    <div className="col-4 p-0">
                        <Nav />
                    </div>
                    <div className="col-8 p-5" style={{
                        height: "96vh"
                    }} >
                      <Outlet />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Layout;