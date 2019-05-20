import * as React from 'react';

interface IAppProps {
    onSubmit: (x:string, y:string) => void
}

const App: React.FunctionComponent<IAppProps> = (props) => {
    const [username, setUsername] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");

    return (
        <form onSubmit={(e) => {e.preventDefault(); props.onSubmit(username, password)}}>
            <input 
                type="text" 
                name="username" 
                placeholder="username" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
            <input 
                type="password" 
                name="password" 
                placeholder="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type="submit">submit</button>
        </form>
    );
};

export default App;