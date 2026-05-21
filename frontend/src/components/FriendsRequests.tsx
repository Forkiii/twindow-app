import { useEffect, useState } from "react";
import { useUser } from "../context/FriendContext";
import { format } from 'date-fns';
import type { FriendRequest } from "../services/api";

const formatDateTime = (dateTime?: string) => {
    if (!dateTime) return '';

    const date = new Date(dateTime);
    if (Number.isNaN(date.getTime())) return dateTime;

    return format(date, 'dd/MM/yyyy HH:mm');
};


const FriendsRequests = () => {
    const { friendRequests, getFriendRequests, acceptFriendRequest, rejectFriendRequest } = useUser()
    const [loading, setLoading] = useState(true)
    const [errorMessage, setErrorMessage] = useState("")
    const [actionMessage, setActionMessage] = useState("")
    const pendingRequests = friendRequests.filter(request => request.status === 'pending')

    useEffect(() => {
        let isMounted = true

        const loadRequests = async () => {
            try {
                setLoading(true)
                setErrorMessage("")
                await getFriendRequests()
            } catch {
                if (isMounted) setErrorMessage("Failed to load friend requests.")
            } finally {
                if (isMounted) setLoading(false)
            }
        }

        loadRequests()

        return () => {
            isMounted = false
        }
    }, [getFriendRequests])

    const handleAccept = async (senderUsername: string) => {
        try {
            await acceptFriendRequest(senderUsername)
            setActionMessage(`Accepted ${senderUsername}`)
        } catch {
            setActionMessage(`Could not accept ${senderUsername}`)
        }
    }

    const handleReject = async (senderUsername: string) => {
        try {
            await rejectFriendRequest(senderUsername)
            setActionMessage(`Rejected ${senderUsername}`)
        } catch {
            setActionMessage(`Could not reject ${senderUsername}`)
        }
    }


    return (
        <section className="friend-section">
            {loading && <p className="friend-state-text">Loading friend requests...</p>}
            {!loading && errorMessage && <p className="friend-state-text error">Failed to load friend requests.</p>}
            {!loading && !errorMessage && actionMessage && <p className="friend-state-text">{actionMessage}</p>}
            {!loading && !errorMessage && (
                <ul className="friend-list">
                    {pendingRequests.length > 0 ? (
                        pendingRequests.map((request: FriendRequest) => (
                            <li className="friend-list-item" key={request._id}>
                                <span className="friend-list-main">
                                    <span>{request.senderUsername}</span>
                                    <span className="friend-list-meta">{formatDateTime(request.createdAt)}</span>
                                </span>
                                <div className="friend-list-actions">
                                    <button className="friend-action-button-accept"  type="button" onClick={() => handleAccept(request.senderUsername)}>
                                        accept
                                    </button>
                                    <button className="friend-action-button-reject" type="button" onClick={() => handleReject(request.senderUsername)}>
                                        reject
                                    </button>
                                </div>
                            </li>
                        ))
                    ) : (
                        <li className="friend-empty-state">No friend requests found</li>
                    )}
                </ul>
            )}
        </section>
    )
}
export default FriendsRequests;
