import Spinner from "react-bootstrap/Spinner";

const Loader = () => {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Spinner size="lg" animation="border" variant="dark" />
      </div>
    </>
  );
};

export default Loader;
