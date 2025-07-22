import { Outlet, useLocation } from 'react-router-dom'

const StoreHome = () => {
  const loc = useLocation();
  const path = loc.pathname;
  return (
    <>
        <div>
          <Outlet key={path}/> 
        </div>
    </>
  )
}

export default StoreHome