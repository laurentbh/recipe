import React, { FunctionComponent, useContext } from 'react';
import sseContext from "./context/sse-context"
import SearchTest from "./searches/SearchTest";
import ImagesUpload from "./images/ImagesUpload";
import ImageOverlay from "../ImageOverlay";

type HomeProps = {

}
const Home:FunctionComponent<HomeProps> = (props) => {
    const ctx  = useContext(sseContext);
    const {isLoading} = useContext(sseContext)
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-7 mrgnbtm">
                    <SearchTest />
                    <p>SSE isLoading: [{isLoading?"true":"false"}]</p>
                    <p>SSE data: {ctx.data.size}</p>
                    {/*<TimeInput editable={false} />*/}

                    <ImageOverlay />
                    <ImagesUpload />

                </div>
            </div>
        </div>
  );
}

export default Home
