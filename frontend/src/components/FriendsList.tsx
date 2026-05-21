import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useUser } from "../context/FriendContext";
import { format } from "date-fns";
import type { Friendship } from "../services/api";

const FriendsList = () => {
  const { user } = useAuth();
  const { friends, getFriends, removeFriend } = useUser();
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [actionMessage, setActionMessage] = useState("");
  const formatDateTime = (dateTime?: string) => {
    if (!dateTime) return "";

    const date = new Date(dateTime);
    if (Number.isNaN(date.getTime())) return dateTime;

    return format(date, "dd/MM/yyyy HH:mm");
  };

  useEffect(() => {
    let isMounted = true;

    const loadFriends = async () => {
      try {
        setLoading(true);
        setErrorMessage("");
        await getFriends();
      } catch {
        if (isMounted) setErrorMessage("Failed to load friends list.");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadFriends();

    return () => {
      isMounted = false;
    };
  }, [getFriends]);

  const getFriendUsername = (friend: Friendship) => {
    if (friend.firstUsername === user?.username) return friend.secondUsername;
    return friend.firstUsername;
  };

  const handleRemoveFriend = async (friendUsername: string) => {
    try {
      await removeFriend(friendUsername);
      setActionMessage(`Removed ${friendUsername}`);
    } catch {
      setActionMessage(`Could not remove ${friendUsername}`);
    }
  };

  return (
    <section className="friend-section">
      {loading && <p className="friend-state-text">Loading friendslist...</p>}
      {!loading && errorMessage && (
        <p className="friend-state-text error">Failed to load friendlist.</p>
      )}
      {!loading && !errorMessage && actionMessage && (
        <p className="friend-state-text">{actionMessage}</p>
      )}
      {!loading && !errorMessage && (
        <ul className="friend-list">
          {friends.length > 0 ? (
            friends.map((friend: Friendship) => {
              const friendUsername = getFriendUsername(friend);
              const friendshipDate = formatDateTime(friend.createdAt);

              return (
                <li className="friend-list-item" key={friend._id}>
                  <span className="friend-list-main">
                    <span>{friendUsername}</span>
                  </span>
                  <div className="friend-list-actions friend-list-actions-stacked">
                    <button
                      className="friend-action-button-reject"
                      type="button"
                      onClick={() => handleRemoveFriend(friendUsername)}
                    >
                      Remove
                    </button>
                    <span className="friend-list-meta friend-list-date">
                      <span>friends since</span>
                      <span>{friendshipDate}</span>
                    </span>
                  </div>
                </li>
              );
            })
          ) : (
            <li className="friend-empty-state">No friends found</li>
          )}
        </ul>
      )}
    </section>
  );
};
export default FriendsList;
