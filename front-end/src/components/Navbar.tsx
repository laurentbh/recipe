import { MouseEvent, useContext, useState, ChangeEvent } from 'react'

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
} from 'react-router-dom'
import { useHistory } from 'react-router-dom';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap'
import Home from './Home';
import ParsingView from './ParsingView';
import ContainerSse from './sse/ContainerSse';
import Ingredient from './recipe/Ingredient';
import SearchResult from './recipe/SearchResult';
import RecipeLoad from './recipe/RecipeLoad';
import RecipeNew from './recipe/RecipeNew';
import appContext from './context/app-context';
import Recipe from './recipe/Recipe'
import Parent from "./TestState";


const SearchNav = () => {
    const ctx = useContext(appContext)
    const [searchText, setSearch] = useState('')

    const history = useHistory();
    const handleSearchSubmit = (btn : MouseEvent<HTMLElement>) => {
        if (searchText) {
            console.log("pushing to ctx " + searchText)
            history.push('/search')
            ctx.recipeSearch = searchText
        } else {
            alert("Please enter some search text!");
        }
    };
    const handleSearchInput = (event : ChangeEvent<HTMLInputElement> ) => {
        setSearch(event.target.value);
    };
    return (
        <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2"
                onChange={handleSearchInput}
                value={searchText}
            />
            <Button id="searchIngr" onClick={handleSearchSubmit} variant="outline-success">Search Ingredients</Button>
            <Button id="searchInstr" onClick={handleSearchSubmit} variant="outline-success">Search Instruction</Button>
        </Form>
    )

}
const BootstrapNavbar = () => {
    return (
        <div>
            <div className="row">
                <div className="col-md-12">
                    <Router>
                        <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
                            <Navbar.Brand href="#home">Recipe</Navbar.Brand>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="mr-auto">
                                    <Nav.Link as={Link} to="/">Home</Nav.Link>
                                    <Nav.Link as={Link} to="/recipeAll">All Recipes</Nav.Link>
                                    <Nav.Link as={Link} to="/testState">TestState</Nav.Link>
                                    <Nav.Link as={Link} to="/parsing">Parse</Nav.Link>
                                    <Nav.Link as={Link} to="/recipe">Recipe</Nav.Link>
                                    <Nav.Link as={Link} to="/sse">SSE</Nav.Link>
                                    <Nav.Link as={Link} to="/ingredient">Ingredient</Nav.Link>
                                    <Nav.Link as={Link} to="/editor">Editor</Nav.Link>
                                    {/* <Nav.Link as={Link} to="/search">Search</Nav.Link> */}
                                </Nav>
                                <SearchNav />
                            </Navbar.Collapse>
                        </Navbar>
                        <br />
                        <Switch>
                            <Route  path="/recipeAll">
                                <SearchResult />
                            </Route>
                            <Route exact path="/testState">
                                <Parent />
                            </Route>
                            <Route exact path="/ingredient">
                                <Ingredient />
                            </Route>
                            <Route exact path="/">
                                <Home />
                            </Route>

                            <Route path="/parsing">
                                <ParsingView />
                            </Route>
                            <Route path="/recipe">
                                {/* <ContainerRecipe /> */}
                                <RecipeNew /> 
                            </Route>
                            <Route path="/sse">
                                <ContainerSse />
                            </Route>
                            {/*<Route path="/editor">*/}
                            {/*    <RecipeEditor />*/}
                            {/*</Route>*/}
                            <Route  path="/search">
                             {/* render={() => <SearchResult data={data} />}> */}
                                <SearchResult />
                            </Route>
                            <Route path="/recipeLoad">
                                <RecipeLoad />
                            </Route>
                            <Route path="/recipeEdit">
                                <Recipe editable={true} 
                                recipe={JSON.parse('{"title":""}')}/>
                            </Route>
                        </Switch>
                    </Router>
                </div>
            </div>
        </div>
    )
}

export default BootstrapNavbar;