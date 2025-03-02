import "./stylesheets/LoginSignUp.css";
import { useState, useEffect } from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { Link, useSearchParams } from "react-router-dom";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import FaceIcon from "@material-ui/icons/Face";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../layout/Loader";
import { useSelector, useDispatch } from "react-redux";
import { clearUserState, login } from "../../redux-toolkit/slices/user.slice";
import PageTitle from "../layout/PageTitle";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const redirect = searchParams.get("redirect");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading, loginSuccess, user, loginError } = useSelector(
    (state) => state.userSlice
  );
  console.log(loading);

  const loginSubmit = async (e) => {
    e.preventDefault();

    dispatch(login({ email, password }));
  };

  useEffect(() => {
    if (loginSuccess) {
      toast.success("Login successfull.Welcome!");
      dispatch(clearUserState());
    }

    if (loginSuccess && redirect) {
      navigate("/user/shipping");
    }

    if (!redirect && user && user.role == "admin") {
      navigate("/admin/dashboard");
    }

    if (!redirect && user && user.role == "user") {
      navigate("/user/profile");
    }

    if (loginError) {
      toast.error(loginError);
      dispatch(clearUserState());
    }
  }, [loginSuccess, dispatch, user, loginError]);

  return (
    <>
      <PageTitle title={"Ecommerce- login"} />
      <Header />

      {loading ? (
        <Loader />
      ) : (
        <main>
          <div className="form">
            <form onSubmit={loginSubmit}>
              <h2 style={{ marginBottom: "10px" }}>Login</h2>
              <div className="input-group">
                <span className="icon-wrapper">
                  <MailOutlineIcon />
                </span>
                <input
                  type="email"
                  placeholder="Email"
                  required
                  id="loginEmail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="input-group">
                <span className="icon-wrapper">
                  <LockOpenIcon />
                </span>
                <input
                  type="password"
                  placeholder="Password"
                  required
                  id="loginPassword"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <Link
                style={{ color: "red", textDecoration: "none" }}
                to="/password/forgot"
              >
                Forgot Password?
              </Link>

              <input className="form-btn" type="submit" value="Login" />

              <button
                style={{
                  backgroundColor: "#131921",
                  marginTop: "1rem",
                }}
                className="form-btn"
              >
                Login with Google
              </button>
            </form>
          </div>
        </main>
      )}

      <Footer />
    </>
  );
};

export default Login;
