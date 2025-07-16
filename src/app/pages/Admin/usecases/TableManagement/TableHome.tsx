import { Outlet, useLocation } from 'react-router-dom'

const TableHome = () => {
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

export default TableHome
