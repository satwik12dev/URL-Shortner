import React from "react";
import Modal from "../ui/Modal";
import CreateNewShorten from "./CreateNewShorten";

const ShortenPopUp = ({ open, setOpen, refetch }) => {
  return (
    <Modal
      isOpen={open}
      onClose={() => setOpen(false)}
      title="Create New Short Link"
      description="Enter a long destination URL to generate a fast, trackable short link."
      maxWidth="max-w-md"
    >
      <CreateNewShorten setOpen={setOpen} refetch={refetch} />
    </Modal>
  );
};

export default ShortenPopUp;