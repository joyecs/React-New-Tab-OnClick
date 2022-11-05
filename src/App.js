import logo from './logo.jpeg';
import './App.css';
import Row from 'react-bootstrap/Row';

import { Component } from 'react';
import Navbar from "react-bootstrap/Navbar";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';
import CloseButton from "react-bootstrap/esm/CloseButton";
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tabs: [
        {
          'name': 'Home',
          'rendercomp': 'HomeTab'
        }
      ],
      navitems: [
        {
          "nav": "Home",
          "comp": "HomeTab",
        },
        {
          "nav": "List",
          "comp": "PollList",
        },
        {
          "nav": "Modal List",
          "comp": "Pagination",
        },
        {
          "nav": "Charts",
          "comp": "Charts",
        },
        {
          "nav": "Table",
          "comp": "PollTable"
        }
      ],
      activekey: 'Home'
    }
    this.handleNavClick = this.handleNavClick.bind(this);
    this.handleTabClick = this.handleTabClick.bind(this);
    this.handleCloseClick = this.handleCloseClick.bind(this);
  }
  handleNavClick(arg, content, comp) {
    // append tab 
    // loop tabs => found: update activekey, not found: add tab
    var i = 0;
    for (; i < this.state.tabs.length; i++) {
      var thistab = this.state.tabs[i];
      var tabname = thistab.name;
      // update activekey
      var newTabs = [...this.state.tabs];
      if (arg === tabname) {
        this.setState({
          tabs: newTabs,
          activekey: arg
        });
        return;
      }
    }
    // not found
    if (i == this.state.tabs.length) {
      var newTabs = this.state.tabs.concat({
        'name': arg,
        'content': content,
        'rendercomp': comp,
      });
      this.setState({
        tabs: newTabs,
        activekey: arg
      });
    }
  }

  handleTabClick(arg) {
    var i = 0;
    console.log("triger tab click");
    console.log(this.state.tabs);
    for (; i < this.state.tabs.length; i++) {
      var thistab = this.state.tabs[i];
      if (thistab.name == arg) {
        this.setState({
          activekey: arg
        })
      }
    }
  }
  handleCloseClick = (arg) => {
    var i = 0;
    var newTabs = [...this.state.tabs];
    console.log("trigger close");
    for (; i < this.state.tabs.length; i++) {
      var thistab = this.state.tabs[i];
      if (thistab.name == arg) {
        newTabs.splice(i, 1);
        this.setState({
          tabs: newTabs
        });
        return;
      }
    }
  }
  render() {
    return (
      <Container>
        <Row>
          <Navbar bg="dark" variant="dark" expand="lg" fixed="top" className="flex-md-nowrap p-0 shadow">
            <Container fluid>
              <Navbar.Brand >
                <img
                  alt=""
                  src={logo}
                  width="30"
                  height="30"
                  className="d-inline-block align-top pk-round-img"
                /> {' '}
                Company Name
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="navbarScroll" />
              <Navbar.Collapse id="navbarScroll">
                <Nav className="me-auto">
                  {this.state.navitems.map((key, idx) => (
                    <Nav.Link
                      // href={"/index/"+key.replaceAll(" ","").toLowerCase()}
                      href=""
                      key={idx} onClick={() => this.handleNavClick(key.nav, key.nav, key.comp)}>
                      {key.nav}
                    </Nav.Link>
                  ))
                  }
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>

          <Tab.Container id="pktabs-example" activeKey={this.state.activekey}
            onSelect={(k) => this.handleTabClick(k)} className="pk-t-b"
          >
            <Nav className="pk-nav-tabs pk-mt-3">
              {this.state.tabs.map((props, idx) => (
                <Nav.Item key={idx}>
                  <Nav.Link eventKey={props.name} >
                    {props.name}
                    <CloseButton onClick={() => this.handleCloseClick(props.name)} />
                  </Nav.Link>
                </Nav.Item>
              ))}
            </Nav>
            <Tab.Content>
              {this.state.tabs.map((props, idx) => (
                <Tab.Pane eventKey={props.name} key={idx}>
                  {props.name}
                </Tab.Pane>
              ))}
            </Tab.Content>
          </Tab.Container>
        </Row>
      </Container>
    );
  }

}

export default App;
