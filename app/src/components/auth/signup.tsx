import { useState } from 'react';
import FormAction from './form-action';
import Input from '@/components/auth/input';
import useMutationUser from '@/hooks/use-mutations-users';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { registerUser } = useMutationUser();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    if (id === 'username') {
        setUsername(value);
    } else if (id === 'password') {
        setPassword(value);
    }
  };

  const handleSubmit = async (e: any) => {
    if (!username || !password) {
      return;
    }
    e.preventDefault();
    await registerUser(username, password);
    navigate('/login-page');
  };

    return(
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <Input
            handleChange={handleChange}
            value={username}
            labelText="Username"
            labelFor="username"
            id="username"
            name="username"
            type="text"
            isRequired={true}
            placeholder="Enter your username"
          />
          <Input
            handleChange={handleChange}
            value={password}
            labelText="Password"
            labelFor="password"
            id="password"
            name="password"
            type="password"
            isRequired={true}
            placeholder="Enter your password"
          />
          <FormAction handleSubmit={handleSubmit} text="Signup" />
      </form>
    )
}

export default SignUp