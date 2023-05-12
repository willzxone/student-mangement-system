import Button from "@mui/material/Button";

const style = {
  backgroundColor: "#2A284B",
  marginBottom: "0.2rem",
  width: "90%",
  fontSize: "0.9rem",
  textTransform: "none",
  fontWeight: "100",
  boxShadow: "none",
  border: "none",
};

const ButtonComponent = (props) => {
  return (
    <Button fullWidth={true} size="small" style={style} variant="contained">
      {props.children}
    </Button>
  );
};

export default ButtonComponent;
