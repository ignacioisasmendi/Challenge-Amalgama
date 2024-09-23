import React, { useMemo } from 'react';
import { Contact, Address, ContactsScreenProps } from './models';


const AddressList: React.FC<{ addresses: Address[] }> = ({ addresses }) => (
  <div>
    <h4>{addresses.length > 1 ? 'Addresses:' : 'Address:'}</h4>
    {addresses.map((address:Address, index:number) => (
      <ul key={index}>
        <li>{address.line_1}</li>
        {address.line_2 && <li>{address.line_2}</li>}
        <li>{address.zip_code}</li>
        <li>{address.city}</li>
        <li>{address.state}</li>
      </ul>
    ))}
  </div>
);

const ContactCard: React.FC<{ contact: Contact }> = ({ contact }) => (
  <div>
    <div>
      <img src={contact.avatar_url} alt={`Avatar de ${contact.full_name}`} />
      <h3>{contact.full_name}</h3> - <h4>{contact.company}</h4>
    </div>
    <p>{contact.details}</p>
    <ul>
      <li>email: {contact.email}</li>
      <li>phone: {contact.phone_number}</li>
      <li>
        <AddressList addresses={contact.addresses} />
      </li>
    </ul>
  </div>
);

const NavBar: React.FC = () => (
  <nav aria-label="Navegación principal">
    <ul role="menubar">
      <li role="menuitem"><a href="/home">Home</a></li>
      <li role="menuitem"><a href="/contacts">My Contacts</a></li>
    </ul>
  </nav>
);

export const ContactsScreen: React.FC<ContactsScreenProps> = ({ contacts, cities, states }) => {
  const processedContacts = useMemo(() => 
    contacts.map(contact => ({
      id: contact.id,
      avatar_url: contact.avatar_url,
      full_name: `${contact.first_name} ${contact.last_name}`,
      company: contact.company,
      details: truncate(contact.details, 100),
      email: contact.email,
      phone_number: `(${contact.phone.area_code}) ${contact.phone.number}`,
      addresses: contact.addresses.map(address => ({
        line_1: address.line_1,
        line_2: address.line_2,
        zip_code: address.zip_code,
        city: findById(cities, address.city_id),
        state: findById(states, address.state_id),
      }))
    })),
    [contacts, cities, states]
  );

  return (
    <>
      <NavBar />
      <h1>Contacts 👥</h1>
      {processedContacts.map(contact => (
        <ContactCard key={contact.id} contact={contact} />
      ))}
    </>
  );
};


