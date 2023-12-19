import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getLoggedInUser } from "../../api";
import RegisterForm from "../../components/RegisterForm/RegisterForm";

function Register() {
  const [showPage, setShowPage] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchLoggedInUser = async () => {
      try {
        const response = await getLoggedInUser();

        // user is logged in
        if (response && response.status === 200) {
          navigate("/");
        } else {
          setShowPage(true);
        }
      } catch (error) {
        // error fetching logged in user
        setShowPage(true);
      }
    };

    fetchLoggedInUser();
  }, []);

  if (showPage) {
    return (
      <div>
        <h3>Register Page</h3>
        <RegisterForm />
      </div>
    );
  }

  return <></>;
}

export default Register;
