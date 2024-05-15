import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router";
import Logo from "../Log in/Logo";
import Img from "../Log in/Img";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import app from "../../firebaseconfig";


function RegisterForm() {
  const navigate = useNavigate();
  const auth = getAuth(app);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [role, setRole] = useState("");

  const db = getDatabase(app);

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await set(ref(db, 'registration/' + user.uid), {
        name,
        email,
        role: "admin",
      });

      console.log("User registered successfully:", user);

      if (user) {
        // Redirect to the home page ("/") after registration
        navigate("/");
      }
    } catch (error) {
      console.error("Error registering user:", error.message);
      // Handle error here
    }
  }

  return (
    <div style={style.container}>
      <Logo />
      <Img />
      <h1 style={style.signIn}>Hello!</h1>
      <div style={style.text}>Join to get started with us!</div>
      <Form style={style.form} onSubmit={handleSubmit}>
        <Form.Group controlId="name">
          <Form.Label style={style.label}>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Name"
            style={style.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label style={style.label}>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="username@gmail.com"
            style={style.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formGroupPassword">
          <Form.Label style={style.label}>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="password"
            style={style.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        
        <div style={style.buttonContainer}>
          <Button
            variant="primary"
            type="submit"
            style={style.button}
          >
            Register
          </Button>
        </div>
      </Form>
    </div>
  );
}

const style = {
  container: {
    width: "500px",
    margin: "auto",
    marginTop: "150px",
    marginLeft: "650px",
  },
  form: {
    padding: "20px",
  },
  signIn: {
    color: "#005211",
    fontWeight: "bold",
    fontSize: "32px",
    marginBottom: "16px",
  },
  text: {
    color: "#4f9e5f",
    marginBottom: "32px",
  },
  label: {
    fontWeight: "bold",
    marginBottom: "10px",
    display: "block",
    borderRadius: "0px",
    color: "#005211",
  },
  input: {
    width: "100%",
    padding: "8px",
    marginBottom: "16px",
    boxSizing: "border-box",
    borderRadius: "20px",
    borderColor: "#005211",
  },
  buttonContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  button: {
    width: "40%",
    backgroundColor: "#4f9e5f",
    borderColor: "#005211",
    marginTop: "20px",
    padding: "10px",
    borderRadius: "100px",
    display: "grid",
    placeItem: "center",
  },
};

export default RegisterForm;
