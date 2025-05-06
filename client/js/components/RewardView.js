import React, { useState } from 'react';

const rewards = [
  { id: 1, name: "Coca-Cola", cost: 30 },
  { id: 2, name: "Sprite", cost: 30 },
  { id: 3, name: "Juice", cost: 30 },
  { id: 4, name: "Lemonade", cost: 30 },
  { id: 5, name: "Cheesy Galaxy Rockets", cost: 40 },
  { id: 6, name: "Dino-nugget Delight", cost: 40 },
  { id: 7, name: "Rainbow Unicorn Pasta", cost: 40 },
  { id: 8, name: "Fries", cost: 50 },
  { id: 9, name: "Vegetable Soup", cost: 80 },
  { id: 9, name: "Pasta", cost: 90 },
  { id: 10, name: "Burger", cost: 100 },
  { id: 11, name: "Seasonal Salad", cost: 130 },
  { id: 12, name: "Artisan Cheese Board", cost: 130 },
  { id: 13, name: "Pizza", cost: 140 },
  { id: 14, name: "Rustic Beet Salad", cost: 140 },
  { id: 15, name: "Roasted Vegetable Bowl", cost: 150 },
  { id: 16, name: "Farmhouse Burger", cost: 160 },
  { id: 17, name: "Herb-Crusted Chicken", cost: 170 },
  { id: 18, name: "Wild Mushroom Risotto", cost: 200 },
  { id: 19, name: "Braised Short Ribs", cost: 240 },
  { id: 20, name: "Grilled Salmon", cost: 250 },
];

export default function RewardView({ user, onUpdate }) {
  const [popupMessage, setPopupMessage] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleRedeem = async (reward) => {
    if (user.points >= reward.cost) {
      const newPoints = user.points - reward.cost;

      try {
        const response = await fetch(`http://localhost:3100/customer/${user.customerID}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ points: newPoints }),
        });

        if (!response.ok) {
          throw new Error('Failed to update points');
        }

        const updatedUser = await response.json();
        onUpdate(updatedUser); // update parent with new user data
        setPopupMessage(`You redeemed: ${reward.name}`);
        setShowModal(true);
      } catch (error) {
        console.error('Redeem failed:', error.message);
      }
    }
  };


  const closeModal = () => setShowModal(false);

  return (
    <div style={{ color: 'black', padding: '20px' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <h2 style={{ color: 'black' }}>Hi {user.firstName}, you have</h2>
          <h2 style={{ color: 'black', fontWeight: 'bold' }}>{user.points}</h2>
          <h2 style={{ color: 'black' }}>points</h2>
        </div>
      </div>
      <br/>
      <br/>
      <h3 style={{ color: 'black' }}>Redeemable Rewards:</h3>
      <br/>
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        {rewards.map((reward) => (
          <div
            key={reward.id}
            style={{
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '15px',
              width: '200px',
              textAlign: 'center',
              color: 'black',
              background: '#f9f9f9',
            }}
          >
            <p style={{ margin: '0 0 10px', color: 'black', fontWeight: 'bold' }}>{reward.name}</p>
            <p style={{ color: 'black' }}>{reward.cost} points</p>
            <button
              className="btn btn-success w-100"
              onClick={() => handleRedeem(reward)}
              disabled={user.points < reward.cost}
            >
              {user.points >= reward.cost ? "Redeem" : "Not enough points"}
            </button>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 999
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '30px',
            borderRadius: '10px',
            textAlign: 'center',
            minWidth: '300px',
            color: 'black',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
          }}>
            <p style={{ color: 'black', fontWeight: 'bold'}}>{popupMessage}</p>
            <button className="btn btn-success w-100" onClick={closeModal} style={{ marginTop: '15px' }}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
