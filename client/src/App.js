import "./App.css";
import { useState } from "react";
import Axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [skills, setSkills] = useState("");
  const [date, setDate] = useState(new Date());
  const [source, setSource] = useState("");

  const [tutorialList, setTutorialList] = useState([]);

  const addTutorial = () => {
    Axios.post("http://localhost:3001/create", {
      name: name,
      skills: skills,
      date: date,
      source: source,
    }).then(() => {
      setTutorialList([
        ...tutorialList,
        {
          name: name,
          skills: skills,
          date: date,
          source: source,
        },
      ]);
    });
  };

  const getTutorials = () => {
    Axios.get("http://localhost:3001/tutorials").then((response) => {
      setTutorialList(response.data);
    });
  };

  const deleteTutorial = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
      setTutorialList(
        tutorialList.filter((val) => {
          return val.id != id;
        })
      );
    });
  };

  return (
    <div className="App">
      <div className="information">
        <label>Name:</label>
        <input
          type="text"
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <label>Skills:</label>
        <input
          type="text"
          onChange={(event) => {
            setSkills(event.target.value);
          }}
        />
        <label>Date:</label>
        <input
          type="date"
          onChange={(event) => {
            setDate(event.target.value);
          }}
        />
        <label>Source</label>
        <input
          type="text"
          onChange={(event) => {
            setSource(event.target.value);
          }}
        />
        <button onClick={addTutorial}>Add Tutorial</button>
      </div>
      <hr />
      <div className="tutorials">
        <button onClick={getTutorials}>Show/Update Tutorials</button>

        {tutorialList.map((val, key) => {
          return (
            <div className="tutorial">
              <div>
                <h3>Name: {val.name}</h3>
                <h3>Skills: {val.skills}</h3>
                <h3>Date: {val.date}</h3>
                <h3>Source: {val.source}</h3>
              </div>
              <div>
                <button
                  onClick={() => {
                    deleteTutorial(val.id);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
