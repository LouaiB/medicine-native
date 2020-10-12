import React, { Component } from 'react';

// Context
export const ThemeContext = React.createContext();

export class ThemeProvider extends Component {
  state = {
    theme: this.light
  }

  light = {
    id: 0,
    colors: {
        backgroundColor: "#ffffff",
        foregroundColor: "#111111",
        primaryColor: "#2233ee",
        successColor: "#22ee33",
    }
  }

  dark = {
    id: 1,
    colors: {
        backgroundColor: "#111111",
        foregroundColor: "#ffffff",
        primaryColor: "#2233ee",
        successColor: "#22ee33",
    }
  }

  toggle = () => {
    if(this.state.theme.id == 0) this.setState({ theme: this.dark });
    else this.setState({ theme: this.light });
  }

  render() {
    return (
        <ThemeContext.Provider value={{
            state: this.state,
            toggle: this.toggle
        }}>
            {this.props.children}
        </ThemeContext.Provider>
    )
  }
}