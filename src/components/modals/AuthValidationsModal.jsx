import { useDisclosure } from "@nextui-org/react";
import { Fragment, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addAuthWithToken } from "src/api";
import { FirstSignInModal } from "src/pages/signIn";
import { ChangePasswordModal } from "src/pages/signIn/ChangePasswordModal";

export default function AuthValidationModal() {
  const navigate = useNavigate();

  const params = new URLSearchParams(window.location.search);
  const reset = Boolean(params.get("reset"));
  const access_token = params.get("access_token");
  const query_email = params.get("email");

  const { onOpen, onOpenChange, isOpen, onClose } = useDisclosure();

  useEffect(() => {
    //? change password logic
    if (reset && access_token && query_email) {
      addAuthWithToken(access_token);
      onOpen();
    }
  }, []);

  return (
    <Fragment>
      <ChangePasswordModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        navigate={navigate}
        email={query_email}
        onClose={onClose}
      />
      <FirstSignInModal navigate={navigate} />
    </Fragment>
  );
}
