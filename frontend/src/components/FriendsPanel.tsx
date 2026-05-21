import { useState } from "react";
import AddFriend from "./AddFriend";
import FriendsList from "./FriendsList";
import FriendsRequests from "./FriendsRequests";

type FriendsTab = 'add' | 'requests' | 'friends';

const tabs: { id: FriendsTab; label: string }[] = [
    { id: 'add', label: 'Add friend' },
    { id: 'requests', label: 'Requests' },
    { id: 'friends', label: 'Friends' },
];

const FriendsPanel = () => {
    const [activeTab, setActiveTab] = useState<FriendsTab>('add')

    return (
        <section className="friends-panel">
            <div className="friends-tabs" role="tablist" aria-label="Friends">
                {tabs.map(tab => (
                    <button
                        type="button"
                        className="friends-tab"
                        key={tab.id}
                        role="tab"
                        aria-selected={activeTab === tab.id}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className="friends-panel-body" role="tabpanel">
                {activeTab === 'add' && <AddFriend />}
                {activeTab === 'requests' && <FriendsRequests />}
                {activeTab === 'friends' && <FriendsList />}
            </div>
        </section>
    )
}

export default FriendsPanel;
