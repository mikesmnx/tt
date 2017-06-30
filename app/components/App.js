import React from 'react';
import { Link } from 'react-router-dom';
import Routes from '../routes';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar';

const App = () =>
    <MuiThemeProvider>
        <div>
            <Toolbar>
                <ToolbarGroup>
                    <Link className="toolbar-menu-link" to="/">Списки</Link>
                    <Link className="toolbar-menu-link" to="/about">About</Link>
                </ToolbarGroup>
            </Toolbar>

            { Routes }

        </div>
    </MuiThemeProvider>;

export default App;
