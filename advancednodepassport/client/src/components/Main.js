import React from "react";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import "../App.css";

export default function Main() {

  const { pages } = useSelector((store) => store.app);
  
  return (
    <div id="Main">
      <Routes>
        {pages.map((page, y) => (
          Array.isArray(page["subContent"])
            ? <Route key={page.url} path={page.url} element={page.content}>
              {page["subContent"].map((subPage, z) => (
                z === 0
                  ? <Route key={page.url} index element={subPage.content}/>
                  : <Route key={page.url} path={page.url + subPage.url} element={subPage.content}/>
              ))}
              </Route>
            : <Route key={page.url} path={page.url} element={page.content}/>
        ))}
      </Routes>
    </div>
  );
}