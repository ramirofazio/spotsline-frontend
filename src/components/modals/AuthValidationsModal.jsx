import { useDisclosure } from "@nextui-org/react";
import { Fragment, lazy, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addAuthWithToken } from "src/api";
const ChangePasswordModal = lazy(() => import("pages/signIn/ChangePasswordModal"));
const FirstSignInModal = lazy(() => import("pages/signIn/FirstSignInModal"));

export default function AuthValidationModal({ reset, access_token, query_email }) {
  const navigate = useNavigate();

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
