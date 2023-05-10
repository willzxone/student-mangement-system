import Button from "@mui/material/Button";

const style = {
  backgroundColor: "#2A284B",
  marginBottom: "0.2rem",
  width: "90%",
  fontSize: "0.8rem",
  textTransform: "none",
  fontWeight: "100",
  boxShadow: "none",
  border: "1px solid grey",
};

const ButtonComponent = (props) => {
  return (
    <Button fullWidth={true} size="small" style={style} variant="contained">
      {props.children}
    </Button>
  );
};

export default ButtonComponent;
