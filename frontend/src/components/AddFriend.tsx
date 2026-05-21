import { useState } from "react";
import { useUser } from "../context/FriendContext";

const AddFriend = () => {
  const { createFriendRequest } = useUser();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [showemptyFieldMessage, setShowEmptyFieldMessage] = useState(false);
  const [receiverUsername, setReceiverUsername] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!receiverUsername.trim()) {
      setShowEmptyFieldMessage(true);
      setShowSuccessMessage(false);
      setShowErrorMessage(false);
      return;
    }
    handleCreateRequest();
  };

  const handleCreateRequest = async () => {
    try {
      await createFriendRequest(receiverUsername.trim());

      setShowErrorMessage(false);
      setShowEmptyFieldMessage(false);
      setShowSuccessMessage(true);
    } catch {
      setShowSuccessMessage(false);
      setShowEmptyFieldMessage(false);
      setShowErrorMessage(true);
    }
  };

  const message = showSuccessMessage
    ? "Friend request sent successfully!"
    : showErrorMessage
      ? "Failed to send friend request. Please try again."
      : showemptyFieldMessage
        ? "Please enter a username."
        : "";

  const messageClassName = showSuccessMessage
    ? "friend-message success"
    : "friend-message error";

  return (
    <section className="friend-section">
      <form onSubmit={handleSubmit} className="friend-form">
        <div className="friend-form-field">
          <input
            className="inputField"
            type="text"
            value={receiverUsername}
            onChange={(event) => setReceiverUsername(event.target.value)}
            placeholder="username"
          />

          <p className={messageClassName}>{message}</p>
        </div>
        <button className="friend-action-button w-fit" type="submit">
          add friend
        </button>
      </form>
    </section>
  );
};

export default AddFriend;
