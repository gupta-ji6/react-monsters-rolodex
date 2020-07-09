import React from "react";
import ReactDOM from "react-dom";

import { CardList } from "./components/card-list/card-list.component";
import { SearchBox } from "./components/search-box/search-box.component";

import "./styles.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      monsters: [],
      seachQuery: ""
    };

    // No need to bind functions since arrow functions do that explicitly.
    // this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users").then(response =>
      response.json().then(users => this.setState({ monsters: users }))
    );
  }

  handleChange = e => {
    this.setState({ seachQuery: e.target.value });
  };

  render() {
    const { monsters, seachQuery } = this.state;
    const filteredMonsters = monsters.filter(monster =>
      monster.name.toLowerCase().includes(seachQuery.toLowerCase())
    );

    return (
      <div className="App">
        <h1>Monsters Rolodex</h1>
        <SearchBox
          handleChange={this.handleChange}
          placeholder="Search Monsters..."
        />
        <CardList monsters={filteredMonsters} />
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
