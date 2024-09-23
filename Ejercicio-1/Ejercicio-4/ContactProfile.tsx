import React from 'react';

interface Contact {
  avatar: string;
  first_name: string;
  last_name: string;
  company: string;
  details: string;
  email: string;
  phone_number: string;
  address: Address;
}

interface Address {
  line_1: string;
  line_2: string | null;
  zip_code: string;
  city: string;
  state: string;
}

const ContactProfile: React.FC<{ contact: Contact }> = ({ contact }) => {

  const fullName:string = `${contact.first_name} ${contact.last_name}`;

  return(
    <div>
      <div>
        <img src={contact.avatar} alt={`Avatar de ${fullName}`} />
        <h3>{fullName}</h3> - <h4>{contact.company}</h4>
      </div>
      <p>{contact.details}</p>
      <ul>
        <li>email: {contact.email}</li>
        <li>phone: {contact.phone_number}</li>
        <li>
          <AddressList addresses={contact.address} />
        </li>
      </ul>
    </div>
  )
};