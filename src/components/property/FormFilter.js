export const FormFilter = ({square_footage, pool, yard, HandleFilter}) => {
    return <>
 

           
        
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
                    <input className="w-3/4 range-primary" type="range" min="1000" max="10000" id="tempB" onChange={HandleFilter} name="square_footage"  />
                    <div>{square_footage}</div><label>Square Feet</label>
                </fieldset>
              
           
        
    </>
}