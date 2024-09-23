import { useAuth } from '../../context/AuthContext';

import './Home.css';

const Home: React.FC = () => {
  const { logout } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    logout();
  };

  return (
    <div>
      <div className="home-card">
        <h2 >Esto es una ruta protegida</h2>
        <img src="https://media1.tenor.com/m/-JIgHIMq1u8AAAAC/cool.gif" />
        <button onClick={handleSubmit} className="logout-btn">
          Log out
        </button>
      </div>
    </div>
  );
};

export default Home;
