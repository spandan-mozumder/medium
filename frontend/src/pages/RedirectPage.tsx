import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RedirectPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/signup");
  }, [navigate]);

  return null;
};

export default RedirectPage;
