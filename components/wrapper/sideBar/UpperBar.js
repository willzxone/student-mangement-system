import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import LockOpenSharpIcon from "@mui/icons-material/LockOpenSharp";
import Toolbar from "@mui/material/Toolbar";
import Card from "../../UI/Card";
import Typography from "@mui/material/Typography";

const style = {
  display: "flex",
  justifyContent: "space-between",
  backgroundColor: "#2A284B",
};

const btnStyle = {
  color: "white",
  fontWeight: "100",
  borderColor: "grey",
};

const pStyle = { color: "white", fontSize: "1.3rem", fontWeight: "100" };

const iconStyle = { color: "white" };

const UpperBar = () => {
  return (
    <Toolbar style={style}>
      <Card>
        <IconButton>
          <LockOpenSharpIcon style={iconStyle} />
        </IconButton>
        <Typography style={pStyle} variant="p" noWrap component="div">
          F21-9075
        </Typography>
      </Card>
      <Card>
        <Button size="small" style={btnStyle} variant="outlined">
          LOGOUT
        </Button>
      </Card>
    </Toolbar>
  );
};

export default UpperBar;
