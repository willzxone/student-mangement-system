import Typography from "@mui/material/Typography";
const typoStyle = {
  fontSize: "1.2rem",
};

const TypoComponent = (props) => {
  return (
    <Typography style={typoStyle} variant="p" noWrap component="div">
      {props.text}
    </Typography>
  );
};

export default TypoComponent;
