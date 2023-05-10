import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Button from "../../UI/Button";
const style = {
  display: "flex",
  backgroundColor: "#090622",
  color: "#FFFFFF",
  height: "100%",
  alignItems: "center",
  flexDirection: "column",
  justifyContent: "center",
};

const itemStyle = {
  justifyContent: "center",
};

const btnStyle = {
  backgroundColor: "red",
  marginBottom: "0.2rem",
  width: "90%",
  fontSize: "0.8rem",
  textTransform: "none",
  fontWeight: "100",
  boxShadow: "none",
  border: "1px solid grey",
};

const LowerBar = (prop) => {
  return (
    <List style={style}>
      {prop.buttons.map((text, index) => (
        <ListItem style={itemStyle} key={text}>
          <Button style={btnStyle}>{text}</Button>
        </ListItem>
      ))}
    </List>
  );
};

export default LowerBar;
