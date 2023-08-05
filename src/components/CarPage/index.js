import { useEffect, useState } from 'react'
import API from '../api'

import CarList from '../CarList'

const CarPage = () => {
    const initialState = {
        id: '',
        make: '',
        model: '',
        type: ''
    }
    const [carData, setCarData] = useState(initialState)
    const [cars, setCars] = useState([])
    const [isCreate, setEntryMode] = useState(true)
    const [isDisabled, setIsDisabled] = useState(true);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setCarData({ ...carData, [name]: value });
    };

    const onSelectEdit = (id, make, model, type) => {
        setCarData({...carData, id, make, model, type });
        setEntryMode(false)
        setIsDisabled(false)
    }

    const onSubmit = (e) => {
        e.preventDefault()

        if (!carData.make && !carData.model) return;

        API.post(`api/car`, carData, {
            headers: {
                'content-type': 'text/json'
            }
        })
        .then(result => {
            if (result) {
                getCars()
                setIsDisabled(true)
                setCarData(initialState)
            }
        })
      
    }

    const onUpdate = () => {
        API.put(`api/car/${carData.id}`, carData, {
            headers: {
                'content-type': 'text/json'
            }
        })
        .then(result => {
            if (result) {
                getCars()
                setIsDisabled(true)
                setCarData(initialState)
            }
        })
    }

    const getCars = () => {
        API.get(`api/cars`)
            .then((response) => {
                const { data } = response;
                setCars(data);
            });
    }

    const onDelete = id => {
        API.delete(`api/car/${id}`).then(result => {
            if (result) getCars()
        })
    }

    useEffect(() => getCars(), []);

    return (
        <div>
            <div className='row'>
                <div className='col-md-6'>
                    <form>
                        <div className="form-group input-group-sm col-md-7">
                            <label for="formGroupExampleInput"></label>
                            <input type="text"
                                className="form-control"
                                name="make"
                                value={carData.make}
                                onChange={handleInputChange}
                                placeholder="Enter car make..."
                                disabled={isDisabled} />
                        </div>
                        <div className="form-group input-group-sm col-md-7">
                            <label for="formGroupExampleInput2"></label>
                            <input type="text" className="form-control" name="model" value={carData.model}
                                onChange={handleInputChange} placeholder="Enter car model..."
                                disabled={isDisabled} />
                        </div>
                        <div className="form-group input-group-sm col-md-7">
                            <label for="inputState"></label>

                            <select id="inputState" className="form-control" name="type" value={carData.type}
                                onChange={handleInputChange} disabled={isDisabled}>
                                <option>Choose...</option>
                                <option>SUV</option>
                                <option>Sedan</option>
                                <option>Crossover</option>
                                <option>Hatchback</option>
                                <option>Pickup Truck</option>
                                <option>MPV</option>
                                <option>Van</option>
                                <option>Sports Car</option>
                            </select>

                        </div>
                    </form>
                    <button className='btn btn-success float-left mt-3' type='button' onClick={() => {setIsDisabled(false); setEntryMode(false);}}>New</button> <span> </span>
                    <button className='btn btn-primary float-right mt-3 ml-3' type='button' onClick={isCreate ? onSubmit : onUpdate}>Save</button>
                </div>
            </div>

            < hr />

            <CarList cars={cars} onDelete={onDelete} onSelectEdit={onSelectEdit} />
        </div>
    )
}

export default CarPage