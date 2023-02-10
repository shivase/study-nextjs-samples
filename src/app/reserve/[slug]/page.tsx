import Form from './components/Form';
import Header from './components/Header';

const Reservation = () => {
  return (
    <div className="h-screen border-t">
      <div className="m-auto w-3/5 py-9">
        <Header />
        <Form />
      </div>
    </div>
  );
};

export default Reservation;
