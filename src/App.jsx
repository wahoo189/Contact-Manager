import InlineEdit from 'react-edit-inline';
import React, { Component } from 'react';
import api from './api';
import './styles.css';

class App extends Component {
  state = {
    cats: [],
  };

  componentDidMount() {
    api.getCats().then(cats => this.setState({ cats }));
  }

  handleSubmit = (cat) => {

    cat.preventDefault();

    const clickToEdit = "CLICK TO EDIT";

    // cat.target.location.value = (cat.target.location.value !== "") ? cat.target.location.value : clickToEdit;

    const { firstName, lastName, location, company, title, email, phone, notes, img } = cat.target;

    // First name and Last name are required
    api.addCat({
      firstName: firstName.value,
      lastName: lastName.value,
      location: (location.value !== "") ? location.value :  clickToEdit,
      company: (company.value !== "") ? company.value :  clickToEdit,
      title: (title.value !== "") ? title.value :  clickToEdit,
      email: (email.value !== "") ? email.value :  clickToEdit,
      phone: (phone.value !== "") ? phone.value :  clickToEdit,
      notes: (notes.value !== "") ? notes.value :  clickToEdit,
      img: (img.value !== "") ? img.value :  clickToEdit,
    })
      .then(cats => this.setState({ cats }));

    cat.target.reset();
  };

  // Delete button click handler
  handleDeleteClick = (cat) => {
    let cats = this.state.cats;

    for (var i = 0; i < cats.length; i++) {
      if (cats[i].id === cat.id) {
        cats.splice(i, 1);
        break;
      }
    }
    this.setState({ cats });
  }

  // Inline edit handler
  handleUpdateClick = (cat) => {
    // console.log(cat);
    let cats = this.state.cats;

    for (var i = 0; i < cats.length; i++) {
      if (cats[i].id === cat.id) {
        cats[i] = cat;
        break;
      }
    }

    this.setState({ cats });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Contact Manager</h2>
        </div>
        {
          this.state.cats &&
          <ul>
            {this.state.cats.map(cat => (
              <Contact
                key={cat.id}
                cat={cat}
                deleteCat={this.handleDeleteClick.bind(null, cat)}
                updateCat={this.handleUpdateClick}
              />
            ))}
          </ul>
        }
        <form onSubmit={this.handleSubmit}>
          <fieldset>
            <legend>Add a Cat</legend>
            <table>
              <tbody>
                <tr>
                  <td><label for="firstName">First Name</label></td>
                  <td>
                    <input required name="firstName" id="firstName" />
                  </td>
                </tr>
                <tr>
                  <td>Last Name</td>
                  <td>
                    <input required name="lastName" id="lastName" />
                  </td>
                </tr>
                <tr>
                  <td>Location</td>
                  <td>
                    <input name="location" id="location" />
                  </td>
                </tr>
                <tr>
                  <td>Company</td>
                  <td>
                    <input name="company" id="company" />
                  </td>
                </tr>
                <tr>
                  <td>Title</td>
                  <td>
                    <input name="title" id="title" />
                  </td>
                </tr>
                <tr>
                  <td>Email</td>
                  <td>
                    <input type="email" name="email" id="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$" title="alias@domain.ext" />
                  </td>
                </tr>
                <tr>
                  <td>Phone</td>
                  <td>
                    <input pattern="(999) 999-9999" name="phone" id="phone" title="(999) 999-9999" />
                  </td>
                </tr>
                <tr>
                  <td>Notes</td>
                  <td>
                    <textarea name="notes" id="notes" cols="50" rows="6"></textarea>
                  </td>
                </tr>
                <tr>
                  <td>Image</td>
                  <td>
                    <input name="img" id="img" type="url" pattern="https?://.+" title="Include http://" />
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td>
                    <button>Add Cat</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </fieldset>
        </form>
      </div>
    );
  }
}

class Contact extends Component {

  dataChanged = (data) => {
    switch (true) {
      case data.newFirstName !== undefined:
        this.props.cat.firstName = data.newFirstName;
        break;
      case data.newLastName !== undefined:
        this.props.cat.lastName = data.newLastName;
        break;
      case data.newLocation !== undefined:
        this.props.cat.location = data.newLocation;
        break;
      case data.newCompany !== undefined:
        this.props.cat.company = data.newCompany;
        break;
      case data.newTitle !== undefined:
        this.props.cat.title = data.newTitle;
        break;
      case data.newEmail !== undefined:
        this.props.cat.email = data.newEmail;
        break;
      case data.newPhone !== undefined:
        this.props.cat.phone = data.newPhone;
        break;
      case data.newNote !== undefined:
        this.props.cat.notes = data.newNote;
        break;
      default:
        console.log(data);
        break;
    }

    this.props.updateCat(this.props.cat);
  }

  render() {
    const cat = this.props.cat;
    let map = null;

    if (cat.location && cat.location !== "CLICK TO EDIT") {
      map = <iframe title={cat.id} width="300" height="250" src={"https://www.google.com/maps/embed/v1/place?key=AIzaSyC3qSOy_aiK0oO3zLwRu1U0muJ2sXnPioQ&q=" + cat.location}>
      </iframe>
    }
    else {
      map = <p className="iframeAlt">Please update <br/>{cat.firstName} {cat.lastName}'s <br/>location to see a map</p>
    }

    return (
      <div>
        <li key={cat.id}>
          <div className="avatar">
            <img src={cat.img} alt={"image of " + cat.firstName + " " + cat.lastName} />
            <h3><InlineEdit
              text={cat.firstName}
              paramName="newFirstName"
              change={this.dataChanged}
            />&nbsp;
              <InlineEdit
                text={cat.lastName}
                paramName="newLastName"
                change={this.dataChanged}
              />
            </h3>
            <button onClick={() => this.props.deleteCat()}>Delete</button>
          </div>
          <div className="detail">
            <table>
              <tbody>
                <tr>
                  <td>Name:</td>
                  <td>
                    <InlineEdit
                      text={cat.firstName}
                      paramName="newFirstName"
                      change={this.dataChanged}
                    />
                    <InlineEdit
                      text={cat.lastName}
                      paramName="newLastName"
                      change={this.dataChanged}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Location:</td>
                  <td>
                    <InlineEdit
                      text={cat.location}
                      paramName="newLocation"
                      change={this.dataChanged}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Company:</td>
                  <td>
                    <InlineEdit
                      text={cat.company}
                      paramName="newCompany"
                      change={this.dataChanged}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Title:</td>
                  <td>
                    <InlineEdit
                      text={cat.title}
                      paramName="newTitle"
                      change={this.dataChanged}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Email:</td>
                  <td>
                    <InlineEdit
                      text={cat.email}
                      paramName="newEmail"
                      change={this.dataChanged}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Phone:</td>
                  <td>
                    <InlineEdit
                      text={cat.phone}
                      paramName="newPhone"
                      change={this.dataChanged}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Notes:</td>
                  <td>
                    <InlineEdit
                      text={cat.notes}
                      paramName="newNote"
                      change={this.dataChanged}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="gutter">
            {map}
          </div>
        </li>
      </div>
    );
  }
}

export default App;
