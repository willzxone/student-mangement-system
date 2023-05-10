import Divider from "@mui/material/Divider";

const style = {
  borderColor: "grey",
  display: "block",
};

const DividerComponent = (props) => {
  return <Divider style={style}>{props.children}</Divider>;
};

export default DividerComponent;
