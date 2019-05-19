import * as React from 'react';

export interface IAppProps {
}

export default class App extends React.Component<IAppProps, any> {
  public render() {
    return (
      <form onSubmit={(e) => {e.preventDefault(); console.log("submitted")}}>
        <input type="text" name="username" placeholder="username" required/>
        <input type="password" name="password" placeholder="password" required/>
        <button type="submit">submit</button>
      </form>
    );
  }
}
