import React, {Component} from 'react';
import axios from "axios";
import {toast} from "react-toastify";

class CrudAxios extends Component {


    state = {
        country: [],
        place: {},
        placeId:null
    };

    componentDidMount() {
        this.getCountryList()
    }

    getCountryList = () => {
        axios.get('https://63d1825ad5f0fa7fbdccc2d2.mockapi.io/country')
            .then((response) => {
                this.setState({
                    country: response.data
                })
            }).catch((e) => {
            toast.error(e.message)
        })
    };

    submitForm = (e) => {
        e.preventDefault();
        axios.post('https://63d1825ad5f0fa7fbdccc2d2.mockapi.io/country', {
            country: e.target.country.value,
            capital: e.target.capital.value,
            language: e.target.language.value,
            independent: e.target.independent.value,
        },).then((response) => {
            toast.success('Successful');
            this.getCountryList()
        }).catch((e) => {
            toast.error(e.message)
        })
    };

    deleteCountryLine = (id) => {
        axios.delete(`https://63d1825ad5f0fa7fbdccc2d2.mockapi.io/country/${id}`)
            .then((response) => {
                toast.success(`Delete ${id}`);

                this.getCountryList()
            }).catch((e) => {
            toast.error(e.message)
        })
    };

    editCountryLine = (id) => {
        this.setState({
            placeId:id
        });
        axios.get(`https://63d1825ad5f0fa7fbdccc2d2.mockapi.io/country/${id}`)
            .then((response) => {
                this.setState({
                    place: response.data
                });
                console.log(response.data)
            }).catch((e) => {
            toast.error(e.message)
        })

    };

    render() {
        return (
            <div>
                <div className="row my-5">
                    <div className="col-xl-4">
                        <div className="card bg-dark text-white fontstyle">
                            <div className="card-header text-center">
                                <h4 style={{fontSize:"30px"}}>Add Country List</h4>
                            </div>
                            <div className="card-body">
                                <form onSubmit={this.submitForm}>
                                    <label htmlFor="country">Country Name</label>
                                    <input type="text" id="country" name="country" className="form-control"/>

                                    <label htmlFor="capital" className="mt-3 text-capitalize">The name of the Capital</label>
                                    <input type="text" id="capital" name="capital" className="form-control"/>

                                    <label htmlFor="language" className="mt-3">State Language</label>
                                    <input type="text" id="language" name="language" className="form-control"/>

                                    <label htmlFor="independent" className="mt-3 text-capitalize">Is your country Independent ?</label>
                                    <input type="boolean" id="independent" name="independent" className="form-control"/>

                                    <button type="submit" className="btn btn-outline-light mt-4 w-100" style={{fontSize:"25px"}}>S U B M I T</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-8">
                        <table className="table table-bordered table-dark table-hover">
                            <thead>
                            <tr>
                                <th>№</th>
                                <th>Country</th>
                                <th>Capital</th>
                                <th>Language</th>
                                <th>Independent</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.state.country?.map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.country}</td>
                                    <td>{item.capital}</td>
                                    <td>{item.language}</td>
                                    <td>{item.independent}</td>
                                    <td>
                                        <button onClick={() => this.deleteCountryLine(item.id)}
                                                className="btn btn-danger btn-sm">Delete
                                        </button>
                                        <button data-bs-toggle="modal" data-bs-target="#myModal"
                                                onClick={() => this.editCountryLine(item.id)}
                                                className="btn btn-warning ms-2 btn-sm">Edit
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="modal fade" id="myModal">
                        <div className="modal-dialog">
                            <div className="modal-content">

                                <div className="modal-header">
                                    <h4 className="modal-title">Edit student</h4>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal"/>
                                </div>

                                <div className="modal-body">
                                    <form>
                                        <label htmlFor="country">Country Name</label>
                                        <input type="text" id="country" name="country" className="form-control"/>

                                        <label htmlFor="capital" className="mt-3 text-capitalize">The name of the Capital</label>
                                        <input type="text" id="capital" name="capital" className="form-control"/>

                                        <label htmlFor="language" className="mt-3">State Language</label>
                                        <input type="text" id="language" name="language" className="form-control"/>

                                        <label htmlFor="independent" className="mt-3 text-capitalize">Is your country Independent ?</label>
                                        <input type="boolean" id="independent" name="independent" className="form-control"/>

                                        <button type="submit" className="btn btn-outline-light mt-4 w-100" style={{fontSize:"25px"}}>S U B M I T</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CrudAxios;