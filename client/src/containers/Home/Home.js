import React, { Component } from 'react';

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = { items: [], searchText: '' };
    this.handleChange = this.handleChange.bind(this);
  }

  render () {
    return (
      <>
        <header>
          <div className="navbar navbar-dark bg-dark shadow-sm">
            <div className="container d-flex justify-content-between">
              <a href="/" className="navbar-brand d-flex align-items-center">
                <strong>City Finder</strong>
              </a>
            </div>
          </div>
        </header>
        <main role="main">

          <section className="jumbotron text-center">
            <div className="container">
              <input type="text" className="form-control" placeholder="City name" value={this.state.searchText} onChange={this.handleChange} />
            </div>

          </section>

          <div className="container">
            <div className="row">
              {this.state.items}
            </div>
          </div>

        </main>
      </>
    );
  }

  async handleChange (e) {
    await this.setState({ searchText: e.target.value });

    const text = this.state.searchText;
    console.log(text)
    if (text.length > 2) {
      await this.search(text)
    }

    if (text.length === 0) {
      await this.setState({ items: [] });
    }
  }

  async search (text) {
    await fetch(`http://localhost:4000/api/search/cities?searchText=${text}`)
      .then(results => {
        return results.json();
      }).then(data => {
        const items = data.map((item, key) => {
          return (
            <div className="col-md-4" key={key}>
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  <h1>{item.name}, {item.country}</h1>
                </div>
              </div>
            </div>
          )
        });

        this.setState({ items: items });
      });
  }
}

export default Home;
