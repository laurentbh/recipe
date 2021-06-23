import React, {FunctionComponent, useEffect, useState} from "react";
import appContext from "./app-context";
import sseContext from "./sse-context";
import {Entity} from "../../data/entity"
import initData from './loader'


type AppStateProps = {}
const AppState: FunctionComponent<AppStateProps> = (props) => {

  const ctx = React.useContext(appContext);
  const sCtx = React.useContext(sseContext);

  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(new Map<string, Entity>())
  const [dataSize, setDataSize] = useState(0)

  const serverUrl = ctx.serverURL

  useEffect(() => {
    const loadCB = () => {
      console.log("loadCB() sCtx " + sCtx.data.size)
      setLoading(false)
      setData(sCtx.data)
    }

    console.log("AppState.useEffect ...");
    initData(serverUrl, loadCB, sCtx.data)
    setData(sCtx.data)
    // console.log("right after initData " + sseCtx.data.size)
    // ctx.entities.loadAll2(serverUrl, loadCB);
    console.log("... AppState.useEffect");
  }, [sCtx, serverUrl]);
  return (
      <appContext.Provider
          value={ctx}
      >
        <sseContext.Provider
            value={{isLoading: loading, data, size: dataSize, setSize: setDataSize}}
        >
          {props.children}
        </sseContext.Provider>
      </appContext.Provider>
  );
};

export default AppState;