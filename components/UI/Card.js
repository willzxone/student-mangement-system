import Card from "@mui/material/Card";

const style = {
  display: "flex",
  border: "none",
  boxShadow: "none",
  backgroundColor: "#2A284B",
  alignItems: "center",
};

function CardComponent(props) {
  return <Card style={style}>{props.children}</Card>;
}

export default CardComponent;
