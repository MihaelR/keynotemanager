import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { uuid } from "uuidv4";
import api from "../api/keynotes";
import "./App.css";
import Header from "./Header";
import AddKeynote from "./AddKeynote";
import KeynoteList from "./KeynoteList";
import EditKeynote from "./EditKeynote";

function App() {
  const [keynotes, setKeynotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // retrieveKeynotes -> get data method.
  const retrieveKeynotes = async () => {
    const response = await api.get("/keynotes");
    return response.data;
  };

  // Add keynote method.
  const addKeynoteHandler = async (keynote) => {
    const request = {
      id: uuid(),
      ...keynote,
    };
    // When we get data, add them to setKeynotes.
    const response = await api.post("/keynotes", request);
    setKeynotes([...keynotes, response.data]);
  };

  // Update data/keynotes method.
  const updateKeynoteHandler = async (keynote) => {
    const response = await api.put(`/keynotes/${keynote.id}`, keynote);
    const { id } = response.data;
    setKeynotes(
      keynotes.map((keynote) => {
        return keynote.id === id ? { ...response.data } : keynote;
      })
    );
  };

  // Delete data/keynote by id method.
  const removeKeynoteHandler = async (id) => {
    await api.delete(`/keynotes/${id}`);
    const newKeynoteList = keynotes.filter((keynote) => {
      return keynote.id !== id;
    });

    setKeynotes(newKeynoteList);
  };

  //Search method.
  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm);
    if (searchTerm !== "") {
      const newKeynoteList = keynotes.filter((keynote) => {
        return Object.values(keynote)
          .join("")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
      setSearchResults(newKeynoteList);
    }
    // If we have emptry input, dont change keynotes.
    else {
      setSearchResults(keynotes);
    }
  };

  useEffect(() => {
    const getAllKeynotes = async () => {
      const allKeynotes = await retrieveKeynotes();
      if (allKeynotes) setKeynotes(allKeynotes);
    };
    getAllKeynotes();
  }, []);

  useEffect(() => {
    //localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(keynotes));
  }, [keynotes]);

  return (
    <div className="ui container">
      <Router>
        <Header />
        {/* Routes home,edit,add*/}

        <Switch>
          <Route
            path="/"
            exact
            render={(props) => (
              <KeynoteList
                {...props}
                keynotes={searchTerm.length < 1 ? keynotes : searchResults}
                getKeynoteId={removeKeynoteHandler}
                term={searchTerm}
                searchKeyword={searchHandler}
              />
            )}
          />
          <Route
            path="/add"
            render={(props) => (
              <AddKeynote {...props} addKeynoteHandler={addKeynoteHandler} />
            )}
          />

          <Route
            path="/edit"
            render={(props) => (
              <EditKeynote
                {...props}
                updateKeynoteHandler={updateKeynoteHandler}
              />
            )}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
