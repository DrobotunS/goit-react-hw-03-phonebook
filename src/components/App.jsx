import { Component } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';
import css from './App.module.css';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  addContact = ({ name, number }) => {
    const { contacts } = this.state;
    const newContact = { id: nanoid(), name, number };
 
    if (contacts.some(contact => contact.name === name)) {
      alert(`${name} is already in contacts.`,)
    } else { this.setState(({ contacts }) => ({
      contacts: [newContact, ...contacts],
    }));}
      
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  changeFilter = evt => {
    this.setState({ filter: evt.currentTarget.value });
  };

  filtredContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter)
    );
  };

  render() {
    const { filter } = this.state;
    const addContact = this.addContact;
    const changeFilter = this.changeFilter;
    const filtredContacts = this.filtredContacts();
    const deleteContact = this.deleteContact;
    const length = this.state.contacts.length;

    return (
      <div className={css.container}>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={addContact} />
        <h2 className={css.title}>Contacts</h2>
        <Filter filter={filter} changeFilter={changeFilter} />
        {length > 0 ? (
          <ContactList
            contacts={filtredContacts}
            onDeleteContact={deleteContact}
          />
        ) : (
          <p className={css.text}>Contact list is empty.</p>
        )}
      </div>
    );
  }
}

export default App;
