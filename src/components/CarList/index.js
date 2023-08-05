const CarList = ({ cars, onDelete, onSelectEdit }) => {

    return (

        <div className='row'>
            <div className='col-md-8'>
                
                <div className="table-responsive-md mt-3">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Make</th>
                                <th scope="col">Model</th>
                                <th scope="col">Type</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                cars.map(car => {
                                    const { id, make, model, type} = car
                                    return (
                                        <tr>
                                            <th scope="row" key={id}>{car.id}</th>
                                            <td>{make}</td>
                                            <td>{model}</td>
                                            <td>{type}</td>
                                            <td>
                                                <button className='btn btn-outline btn-warning btn-sm' onClick={() => onSelectEdit(id, make, model, type)}>edit</button>  <span> </span>
                                                <button className='btn btn-outline btn-danger btn-sm' onClick={() => onDelete(id)} >delete</button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    )
}

export default CarList