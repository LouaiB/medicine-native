import React, { Component } from 'react';

// Context
export const ThemeContext = React.createContext();

export class ThemeProvider extends Component {
  
  light = {
    id: 0,
    colors: {
        backgroundColor: "#ffffff",
        foregroundColor: "#111111",
        primaryColor: "#3ad5ff",
        activeColor: "#2288ee",
        successColor: "#22ee33",
        activeTabBg: "#3ad5ff",
        inactiveTabBg: "#ddd",
        sectionBg: "#f1f1f1",
        stackHeaderBg: "#cacaca",
        faded: "#888",
    }
  }

  dark = {
    id: 1,
    colors: {
        backgroundColor: "#333",
        foregroundColor: "#ffffff",
        primaryColor: "#3ad5ff",
        activeColor: "#2288ee",
        successColor: "#22ee33",
        activeTabBg: "#3ad5ff",
        inactiveTabBg: "#555",
        sectionBg: "#424242",
        stackHeaderBg: "#424242",
        faded: "#888",
    }
  }

  state = {
    theme: this.dark
  }

  toggle = () => {
    if(this.state.theme.id == 0) this.setState({ theme: this.dark });
    else this.setState({ theme: this.light });
  }

  setDark = () => {
    this.setState({ theme: this.dark });
  }
  setLight = () => {
    this.setState({ theme: this.light });
  }

  render() {
    return (
        <ThemeContext.Provider value={{
            state: this.state,
            toggle: this.toggle,
            setDark: this.setDark,
            setLight: this.setLight,
        }}>
            {this.props.children}
        </ThemeContext.Provider>
    )
  }
}