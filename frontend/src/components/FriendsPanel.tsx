import AddFriend from "./AddFriend";
import FriendsList from "./FriendsList";
import FriendsRequests from "./FriendsRequests";
import { useState } from "react";
const FriendsPanel = () => {
  const [showAddFriend, setShowAddFriend] = useState(true);
  const [showFriendRequests, setShowFriendRequests] = useState(false);
  const [showFriendsList, setShowFriendsList] = useState(false);
  const handleAddFriend = () => {
    setShowAddFriend(true);
    setShowFriendRequests(false);
    setShowFriendsList(false);
  };
  const handleFriendRequests = () => {
    setShowAddFriend(false);
    setShowFriendRequests(true);
    setShowFriendsList(false);
  };
  const handleFriendsList = () => {
    setShowAddFriend(false);
    setShowFriendRequests(false);
    setShowFriendsList(true);
  };
  return (
    <section className="friends-panel">
      <div className="friends-tabs">
        <button
          className="friends-tab"
          type="button"
          aria-selected={showAddFriend}
          onClick={handleAddFriend}
        >
          Add Friend
        </button>
        <button
          className="friends-tab"
          type="button"
          aria-selected={showFriendRequests}
          onClick={handleFriendRequests}
        >
          Friend Requests
        </button>
        <button
          className="friends-tab"
          type="button"
          aria-selected={showFriendsList}
          onClick={handleFriendsList}
        >
          Friendslist
        </button>
      </div>
      <div className="friends-panel-body">
        {showAddFriend && <AddFriend />}
        {showFriendRequests && <FriendsRequests />}
        {showFriendsList && <FriendsList />}
      </div>
    </section>
  );
};

export default FriendsPanel;
