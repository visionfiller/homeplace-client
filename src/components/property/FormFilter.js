export const FormFilter = ({ HandleFilterSubmit,square_footage, pool, yard, HandleFilter, HandleFilterFormClose }) => {
    return <>
        <div className="fixed inset-0 z-20 w-full backdrop-blur-sm ">

            <form className="bg-white w-4/5 h-1/2 md:w-1/2 md:h-1/2 mx-auto my-10 rounded-lg border-secondary border-2 p-2">
                <button className=" font-semibold" onClick={HandleFilterFormClose}>X</button>
                <fieldset>
                    <label>Has Pool</label>
                    <input name="pool" type="checkbox" checked={pool} onChange={HandleFilter}></input>
                </fieldset>
                <fieldset>
                    <label>Has Yard</label>
                    <input name="yard" type="checkbox" checked={yard} onChange={HandleFilter}></input>
                </fieldset>
                <fieldset>
                    <label>Home Size</label>
                    <input className="w-3/4" type="range" min="1000" max="10000" id="tempB" onChange={HandleFilter} name="square_footage"  />
                    <div>{square_footage}</div><label>Square Feet</label>
                </fieldset>
                <button onClick={(event)=> HandleFilterSubmit(event, pool, yard, square_footage)} className="btn">See Results</button>
            </form>
        </div>
    </>
}