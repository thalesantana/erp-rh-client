import { Link, Outlet } from 'react-router-dom';

export function AppLayout() {
  return (
    <div>
      
      <div className='nav-bar'>
        <Link to="/">
            <img id="image-8-9332" alt="nerus" src="https://nerus.com.br/wp-content/uploads/2020/01/nerus.png" className="ct-image"/>
        </Link>
      </div>
      
      <div className="w-100 m-auto form-container text-center" style={{height:'70vh'}}>
        <Outlet />
      </div>

      <div>
        <footer >
          © Todos Direitos Reservados- {new Date().getFullYear()}
        </footer>
      </div>
    </div>
  )
}