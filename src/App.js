import React from 'react';
import Home from './pages/Home/Home';
import AddStudent from './pages/AddStudent/AddStudent';
import EditStudent from './pages/EditStudent/EditStudent';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

const App = ()=>{
    return(
        <>
            <BrowserRouter>
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route path='/add' component={AddStudent} />
                    <Route exact path='/edit/:id' component={EditStudent} />
                </Switch>
            </BrowserRouter>
           
        </>
    );
}

export default App;