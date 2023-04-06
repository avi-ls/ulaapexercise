import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

// Creating a grid component that fetches the Star Wars API and displays the data within an AG Grid
const Grid = () => {
  const [character, setCharacter] = useState([]); //save data from API into character state
  const url = "https://swapi.dev/api/people/" // URL for the API

  // Use Effect is used to fetch the data from the Star Wars API
  useEffect(() => {
    //Fetches Data from API
    fetch(url)
      .then(response => response.json())
      .then(data => {
        // Maps over the Homeworld API within the Star Wars People API and fetchs the name and updates the homeworld key
        const homeworldName = data.results.map(ch =>
          fetch(ch.homeworld)
            .then(response => response.json())
            .then(homeworld => ({ ...ch, homeworld: homeworld.name })),
        );
        
        //waits for all promises in homeworldName and updates character state 
        Promise.all(homeworldName).then(update => setCharacter(update));
      })
      .catch(error => console.error(error));

  }, []);
  // Defines column names and parameters within an array for AG GRID
  const columnDefs = [
    { headerName: 'Name', field: "name", sortable: true, filter: true },
    { headerName: 'Height', field: "height", sortable: true, filter: 'true' },
    { headerName: 'Mass', field: "mass", sortable: true, filter: 'true' },
    { headerName: 'Hair Colour', field: "hair_color", sortable: true, filter: true },
    { headerName: "Eye Colour", field: "eye_color", sortable: true, filter: true },
    { headerName: 'Birth Year', field: "birth_year", sortable: true, filter: true },
    { headerName: 'Gender', field: "gender", sortable: true, filter: true },
    { headerName: 'Home World', field: "homeworld", sortable: true, filter: true },
  ];

  //returns the AG Grid Component with the paramaters for columns and row data (API) also sets sorting and filters
  return (
    <div className="ag-theme-alpine" style={{ height: "300px", width: "100%" }}>
      <AgGridReact columnDefs={columnDefs} rowData={character} pagination={true} paginationPageSize={5}></AgGridReact>
    </div>
  );
};

// App functions renders Grid Function
function App() {
  return (
    <div>
      <Grid />
    </div>
  ) 
}

export default App;
