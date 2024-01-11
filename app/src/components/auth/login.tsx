import { useState } from 'react';
import Input from "@/components/auth/input";
import FormExtra from './form-extra';
import FormAction from './form-action';
import useMutationUser from '@/hooks/use-mutations-users';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { loginUser } = useMutationUser(); 
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
        e.preventDefault();
        try {
            await loginUser(username, password);
            navigate('/');
        } catch (error) {
            // Handle login error (like showing a notification)
        }
    };

    return(
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="-space-y-px">
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
            </div>
            <FormExtra/>
            <FormAction handleSubmit={handleSubmit} text="Login"/>
        </form>
    )
}

export default Login;