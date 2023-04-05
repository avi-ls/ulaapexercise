import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

// Creating a grid component that fetches the Star Wars API and displays the data within an AG Grid
const Grid = () => {
  const [rowData, setRowData] = useState([]); //save data from API into rowData state
  const url = "https://swapi.dev/api/people/" // URL for the API

  // Use Effect is used to fetch the data from the Star Wars API
  useEffect(() => {
    //Fetches Data from API
    fetch(url)
      .then(response => response.json())
      .then(data => {
        // Maps over the Homeworld API within the Star Wars People API and fetchs the name
        const homeworldName = data.results.map(person =>
          fetch(person.homeworld)
            .then(response => response.json())
            .then(homeworld => ({ ...person, homeworld: homeworld.name })),
        );
        
        Promise.all(homeworldName).then(updatedData => setRowData(updatedData));
      })
      .catch(error => console.error(error));

  }, []);
  // Defines column names and parameters within an array
  const columnDefs = [
    { headerName: 'Name', field: "name", sortable: true, filter: true },
    { headerName: 'Height', field: "height", sortable: true, filter: true },
    { headerName: 'Mass', field: "mass", sortable: true, filter: true },
    { headerName: 'Hair Colour', field: "hair_color", sortable: true, filter: true },
    { headerName: "Eye Colour", field: "eye_color", sortable: true, filter: true },
    { headerName: 'Birth Year', field: "birth_year", sortable: true, filter: true },
    { headerName: 'Gender', field: "gender", sortable: true, filter: true },
    { headerName: 'Home World', field: "homeworld", sortable: true, filter: true },
  ];

  return (
    <div className="ag-theme-alpine" style={{ height: "300px", width: "100%" }}>
      <AgGridReact columnDefs={columnDefs} rowData={rowData} pagination={true} paginationPageSize={5}></AgGridReact>
    </div>
  );
};


function App() {
  return (
    <div>
      <Grid />
    </div>
  )
}

export default App;
