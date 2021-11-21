import { FC } from 'react';

const Home: FC = () => {
  return (
    <>
      <h5 className='text-3xl text-blue-800 text-center font-semibold m-2'>
        Home Page
      </h5>
      <h5 className='text-center'>
        Home component is always available. Login to see the Customers
        component.
      </h5>
    </>
  );
};

export default Home;
