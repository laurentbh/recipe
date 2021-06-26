import {ChangeEvent, MouseEvent, useState} from 'react'

import {BrowserRouter as Router, Link, Route, Switch, useHistory,} from 'react-router-dom'
import {Button, Form, FormControl, Nav, Navbar} from 'react-bootstrap'
import Home from './Home';
import ParsingView from './ParsingView';
import ContainerSse from './sse/ContainerSse';
import Ingredient from './recipe/Ingredient';
import SearchResult from './recipe/SearchResult';
import RecipeLoad from './recipe/RecipeLoad';
import RecipeNew from './recipe/RecipeNew';
import Recipe from './recipe/Recipe'
import Parent from "./TestState";
import Editor from "./editor/Editor";

interface SearchNavI {
    cb: (data: string) => void
}

const SearchNav = (arg: SearchNavI) => {
    const [searchText, setSearch] = useState('')

    const history = useHistory();
    const handleSearchSubmit = (btn: MouseEvent<HTMLElement>) => {
        if (searchText) {
            arg.cb(searchText)
            history.push('/search')
        } else {
            alert("Please enter some search text!");
        }
    };
    const handleSearchInput = (event: ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    };
    return (
        <div className="my-nav-bar">
            <Form inline className="my-nav-bar">
                <FormControl type="text" placeholder="Search" className="mr-sm-2"
                             onChange={handleSearchInput}
                             value={searchText}
                />
                <Button id="search" onClick={handleSearchSubmit} variant="outline-success">Search</Button>
                {/*<Button id="searchInstr" onClick={handleSearchSubmit} variant="outline-success">Search Instruction</Button>*/}
            </Form>
        </div>
    )

}
const BootstrapNavbar = () => {
    const textCb = (data: string) => {
        setSearchText(data)
    }
    const [searchText, setSearchText] = useState('')
    return (
        <div>
            <Router>
                <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
                    <Navbar.Brand href="#home">Recipe</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
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
                        <SearchNav cb={textCb}/>
                    </Navbar.Collapse>
                </Navbar>
                <br/>
                <Switch>
                    <Route path="/recipeAll">
                        <SearchResult searchItems={""}/>
                    </Route>
                    <Route exact path="/testState">
                        <Parent/>
                    </Route>
                    <Route exact path="/ingredient">
                        <Ingredient/>
                    </Route>
                    <Route exact path="/">
                        <Home/>
                    </Route>

                    <Route path="/parsing">
                        <ParsingView/>
                    </Route>
                    <Route path="/recipe">
                        <RecipeNew/>
                    </Route>
                    <Route path="/sse">
                        <ContainerSse/>
                    </Route>
                    <Route path="/editor">
                        <Editor data={""} id={"dummy"} dataCB={(id: string, data: string) => {
                        }}/>
                    </Route>
                    <Route path="/search">
                        <SearchResult searchItems={searchText}/>
                    </Route>
                    <Route path="/recipeLoad">
                        <RecipeLoad/>
                    </Route>
                    <Route path="/recipeEdit">
                        <Recipe editable={true}
                                recipe={JSON.parse('{"title":""}')}/>
                    </Route>
                </Switch>
            </Router>
        </div>
    )
}

export default BootstrapNavbar;