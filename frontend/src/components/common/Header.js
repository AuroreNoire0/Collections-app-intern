import Container from "react-bootstrap/esm/Container";
import Navigation from "./Navigation";
import Search from "./Search";

function Header(props) {
  return (
    <Container fluid className="p-0 sticky-top">
      <Navigation setLocale={props.setLocale} />
      <Search />
    </Container>
  );
}

export default Header;
