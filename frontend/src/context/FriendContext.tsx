import { createContext, useCallback, useContext, useState, type ReactNode } from 'react'
import { userAPI, type FriendRequest, type Friendship } from "../services/api";



type Status = 'pending' | 'accepted' | 'rejected'
type FriendshipValue = {
    firstUsername: string | null,
    secondUsername: string | null
} 
type FriendRequestValue = {
    friendship: FriendshipValue,
    friends: Friendship[],
    friendRequests: FriendRequest[],
    senderUsername: string | null
    recieverUsername: string | null
    status: Status | null
    createFriendRequest: (recievername: string) => Promise<void>
    acceptFriendRequest: (sendername: string) => Promise<void>
    rejectFriendRequest: (sendername: string) => Promise<void>
    getFriendRequests: () => Promise<{ message: string; data: FriendRequest[] }>
    getFriends: () => Promise<Friendship[]>
    removeFriend: (friendUsername: string) => Promise<void>
}
const FriendRequestContext = createContext<FriendRequestValue>({
    senderUsername: null,
    recieverUsername: null,
    status: null,
    friends: [],
    friendRequests: [],
    friendship: {
        firstUsername: null,
        secondUsername: null,
    },
    createFriendRequest: async () => { },
    acceptFriendRequest: async () => { },
    rejectFriendRequest: async () => { },
    getFriendRequests: async () => ({ message: "", data: [] }),
    getFriends: async () => [],
    removeFriend: async () => { },
});



export default function FriendContextProvider({ children }: { children: ReactNode }) {
    const [friendRequests, setFriendRequests] = useState<FriendRequest[]>([])
    const [friends, setFriends] = useState<Friendship[]>([])

    const createFriendRequest = useCallback(async (recieverUsername: string) => {
        try {
            await userAPI.createFriendRequest(recieverUsername)
        } catch (error) {
            console.log(error);
            throw error
        }
    }, [])

    const getFriendRequests = useCallback(async () => {
        const res = await userAPI.getFriendRequests()
        setFriendRequests(res.data)
        return res
    }, [])

    const acceptFriendRequest = useCallback(async (senderUsername: string) => {
        await userAPI.acceptFriendRequest(senderUsername)
        setFriendRequests(currentRequests =>
            currentRequests.filter(request => request.senderUsername !== senderUsername)
        )
    }, [])

    const rejectFriendRequest = useCallback(async (senderUsername: string) => {
        await userAPI.rejectFriendRequest(senderUsername)
        setFriendRequests(currentRequests =>
            currentRequests.filter(request => request.senderUsername !== senderUsername)
        )
    }, [])

    const getFriends = useCallback(async () => {
        const res = await userAPI.getFriends()
        setFriends(res)
        return res
    }, [])

    const removeFriend = useCallback(async (friendUsername: string) => {
        await userAPI.removeFriend(friendUsername)
        setFriends(currentFriends =>
            currentFriends.filter(friend =>
                friend.firstUsername !== friendUsername && friend.secondUsername !== friendUsername
            )
        )
    }, [])


    return <FriendRequestContext.Provider
        value={{
            acceptFriendRequest, createFriendRequest, getFriendRequests, rejectFriendRequest, getFriends, removeFriend,
            friends,
            friendRequests,
            senderUsername: null,
            recieverUsername: null,
            status: null,
            friendship: {
                firstUsername: null,
                secondUsername: null,
            },
        }}
    >
        {children}
    </FriendRequestContext.Provider>
}

// Keeping the context hook in this file to match the current project structure.
// eslint-disable-next-line react-refresh/only-export-components
export function useUser() {
    const ctx = useContext(FriendRequestContext)
    if (!ctx) throw new Error("useUser must be used inside <AuthProvider>")
    return ctx
}
