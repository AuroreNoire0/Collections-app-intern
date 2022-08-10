import Container from "react-bootstrap/esm/Container";
import Navigation from "./Navigation";
import Search from "./Search";

function Header() {
  return (
    <Container fluid className="p-0 bg-light">
      <Navigation />
      <Search />
    </Container>
  );
}

export default Header;
