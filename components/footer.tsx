import Container from "./container";

const Footer = () => {
  return (
    <footer className="py-28">
      <Container>
        <div className="flex flex-col items-center">
          <p className="font-bold">Designed by Dylan Myers with {'\u2764'}</p>
          <p>This website conforms to <abbr title="Web Content Accessibility Guidelines">WCAG</abbr> 2.1 at Level AAA.</p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
