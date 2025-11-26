
import AdminRouters from '../../../routers/AdminRouters';
import Header from '../../../components/admin/Header';


function Main() {

  return (
    <div className='flex-1 md:overflow-y-auto md:h-[100vh]'>
      <Header />
      <div className='p-3 md:p-5 xl:p-10'>
        <AdminRouters />
      </div>
    </div>
  );
}

export default Main;