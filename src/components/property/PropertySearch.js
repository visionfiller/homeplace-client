export const PropertySearch = ({ setterFunction }) => {
    return (
        <div className="form-control">

            <input 
            className="input input-bordered"
            onChange={
                (changeEvent) => {
                    setterFunction(changeEvent.target.value)
                }
            }
            type="text" placeholder="1234 Sesame Way"/>
        </div>
    )
    
    }