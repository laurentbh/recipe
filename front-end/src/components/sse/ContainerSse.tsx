import React, { useContext, useEffect }  from 'react';
import sseContext from '../context/sse-context';
import ListEntity from './ListEntity';


const ContainerSse = () => {

    const  ctx  = useContext(sseContext);
    console.log(">>>> ContainerSse")

    useEffect( () => {
        console.log(">>>> ContainerSse.UseEffect")

    }, [ctx.data])
    return (
    <div className="flex-container"> 
        <ListEntity type="Ingredient" data={ctx.data} />
        <ListEntity type="Category" data={ctx.data}/>
        <ListEntity type="Ustensil" data={ctx.data} />
    </div>
    )
}

export default ContainerSse
