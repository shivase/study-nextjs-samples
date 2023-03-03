import { User } from 'database';
import { FC } from 'react';

type AuthModalInputProps = {
  inputs: Pick<User, 'first_name' | 'last_name' | 'password' | 'city' | 'email' | 'phone'>;
  handleChangeInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isSignIn: boolean;
};

const AuthModalInput: FC<AuthModalInputProps> = ({ inputs, handleChangeInput, isSignIn }) => {
  return (
    <div>
      {isSignIn ? null : (
        <div className="my-3 flex justify-between text-sm">
          <input
            type="text"
            className="w-[49%] rounded border p-2 py-3"
            name="first_name"
            placeholder="First name"
            value={inputs.first_name}
            onChange={handleChangeInput}
          />
          <input
            type="text"
            className="w-[49%] rounded border p-2 py-3"
            placeholder="Last name"
            name="last_name"
            value={inputs.last_name}
            onChange={handleChangeInput}
          />
        </div>
      )}
      <div className="my-3 flex justify-between text-sm">
        <input
          type="text"
          className="w-full rounded border p-2 py-3"
          placeholder="Email"
          name="email"
          value={inputs.email}
          onChange={handleChangeInput}
        />
      </div>
      {isSignIn ? null : (
        <div className="my-3 flex justify-between text-sm">
          <input
            type="text"
            className="w-[49%] rounded border p-2 py-3"
            placeholder="Phone"
            name="phone"
            value={inputs.phone}
            onChange={handleChangeInput}
          />
          <input
            type="text"
            className="w-[49%] rounded border p-2 py-3"
            placeholder="City"
            name="city"
            value={inputs.city}
            onChange={handleChangeInput}
          />
        </div>
      )}
      <div className="my-3 flex justify-between text-sm">
        <input
          type="password"
          className="w-full rounded border p-2 py-3"
          placeholder="Password"
          name="password"
          value={inputs.password}
          onChange={handleChangeInput}
        />
      </div>
    </div>
  );
};

export default AuthModalInput;
