import React, {Component} from 'react';
import CrudAxios from "./component/CrudAxios";
import { ToastContainer, toast } from 'react-toastify';

class App extends Component {
    render() {
        return (
            <div className="container">
                <CrudAxios/>

                <ToastContainer />
            </div>
        );
    }
}

export default App;