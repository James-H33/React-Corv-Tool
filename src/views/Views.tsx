import { Outlet } from 'react-router-dom';
import './Views.scss';

function Views() {
  return (
    <div className="views">
      <Outlet />
    </div>
  );
}

export default Views;
