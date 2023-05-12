import BackGroundVideo from "./Background";
import SignInForm from "./SignInForm";
import Heading from "./Heading";

const divStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  marginLeft: "5%",
  gap: "10%",
  width: "20%",
};

const Auth = () => {
  return (
    <div style={divStyle}>
      <Heading />
      <SignInForm />
      <BackGroundVideo />
    </div>
  );
};

export default Auth;
