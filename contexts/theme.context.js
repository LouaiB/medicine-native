import React, { Component } from 'react';

// Context
export const ThemeContext = React.createContext();

export class ThemeProvider extends Component {
  
  light = {
    id: 0,
    colors: {
        backgroundColor: "#ffffff",
        foregroundColor: "#111111",
        primaryColor: "#2233ee",
        activeColor: "#2288ee",
        successColor: "#22ee33",
        activeTabBg: "#ee2277",
        inactiveTabBg: "#aaa",
    }
  }

  dark = {
    id: 1,
    colors: {
        backgroundColor: "#333",
        foregroundColor: "#ffffff",
        primaryColor: "#2233ee",
        activeColor: "#2288ee",
        successColor: "#22ee33",
        activeTabBg: "#ee2277",
        inactiveTabBg: "#555",
    }
  }

  state = {
    theme: this.dark
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