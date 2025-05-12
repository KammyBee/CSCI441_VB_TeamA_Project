//written by: Kamdon Basinger & Simin Krug
import React, { useState } from 'react';

const rewards = [
  { id: 1, name: "Coca-Cola", cost: 30, description: "Coke" },
  { id: 2, name: "Sprite", cost: 30, description: "Sprite" },
  { id: 3, name: "Juice", cost: 30, description: "Experience the vibrant zest of sunshine in a glass with orange juice or apple juice, a pure burst of citrus joy that refreshes with every sip."},
  { id: 4, name: "Lemonade", cost: 30, description: "Sip on classic lemonade or strawberry lemonade, a timeless refreshment blending freshly squeezed lemons and pure sweetness in every gulp."},
  { id: 5, name: "Cheesy Galaxy Rockets", cost: 40, description: "Crispy mozzarella sticks served with a side of \"cosmic\" marinara dipping sauce. These cheesy delights are perfect for little ones with big imaginations."},
  { id: 6, name: "Dino-nugget Delight", cost: 40, description: "Crunchy dinosaur-shaped chicken nuggets accompanied by \"prehistoric\" sweet potato fries and a side of veggie sticks. A playful and tasty trip back in time." },
  { id: 7, name: "Rainbow Unicorn Pasta", cost: 40, description: "Colorful pasta twists, adorned with star-shaped mini meatballs and a sprinkle of edible glitter. A magical and delightful dish for the young ones."},
  { id: 8, name: "Fries", cost: 50, description: "French Fries"},
  { id: 9, name: "Vegetable Soup", cost: 80, description: "A hearty blend of seasonal vegetables, simmered in a rich vegetable broth, served with a side of artisan bread."},
  { id: 9, name: "Pasta", cost: 90, description: "Spaghetti with marinara sauce" },
  { id: 10, name: "Burger", cost: 100, description: "Delicious beef burger with lettuce and tomato" },
  { id: 11, name: "Seasonal Salad", cost: 130, description: "Fresh greens, heirloom tomatoes, and house-made vinaigrette."},
  { id: 12, name: "Artisan Cheese Board", cost: 130, description: "A selection of local cheeses, served with fresh fruit, nuts, and honeycomb." },
  { id: 13, name: "Pizza", cost: 140, description: "Cheese and tomato pizza" },
  { id: 14, name: "Rustic Beet Salad", cost: 140, description: "Roasted beets, goat cheese, walnuts, and arugula, drizzled with a balsamic reduction."},
  { id: 15, name: "Roasted Vegetable Bowl", cost: 150, description: "A nutritious blend of quinoa, roasted seasonal vegetables, and a light lemon dressing." },
  { id: 16, name: "Farmhouse Burger", cost: 160, description: "Grass-fed beef patty, local cheddar, lettuce, tomato, and house sauce, served with hand-cut fries."},
  { id: 17, name: "Herb-Crusted Chicken", cost: 170, description: "Tender chicken breast with a savory herb crust, served with mashed potatoes."},
  { id: 18, name: "Wild Mushroom Risotto", cost: 200, description: "Creamy Arborio rice cooked with wild mushrooms, finished with Parmesan cheese and truffle oil."},
  { id: 19, name: "Braised Short Ribs", cost: 240, description: "Tender short ribs, braised in a red wine reduction, served with garlic mashed potatoes."},
  { id: 20, name: "Grilled Salmon", cost: 250, description: "Wild-caught salmon served with roasted vegetables and lemon butter sauce."}
];

export default function RewardView({ user, onUpdate }) {
  const [popupMessage, setPopupMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [expanded, setExpanded] = useState({});
  const [redeemHistory, setRedeemHistory] = useState([]);

  const generateOrderCode = () => {
    const timestamp = Date.now().toString(36);
    const randomPart = Math.random().toString(36).substring(2, 7);
    return `ORD-${timestamp}-${randomPart}`.toUpperCase();
  };

  const handleRedeem = async (reward) => {
    if (user.points >= reward.cost) {
      const newPoints = user.points - reward.cost;
      const orderCode = generateOrderCode();
      const redemptionRecord = {
        customerID: user.customerID,
        name: reward.name,
        date: new Date().toLocaleString(),
        cost: reward.cost,
        code: orderCode
      };
      setRedeemHistory(prev => [...prev, redemptionRecord]);


      try {
        const response = await fetch(`http://localhost:3100/customer/${user.customerID}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ points: newPoints }),
        });

        if (!response.ok) throw new Error('Failed to update points');

        const updatedUser = await response.json();
        onUpdate(updatedUser);
        setPopupMessage([
          `You redeemed: ${reward.name}`,
          `Order Code: ${orderCode}`
        ]);
        setShowModal(true);
      } catch (error) {
        console.error('Redeem failed:', error.message);
      }
    }
  };

  const closeModal = () => setShowModal(false);

  const toggleExpand = (id) => {
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div style={{ color: 'black', padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <h2 style={{ color: 'black' }}>Hi {user.firstName}, you have</h2>
          <h2 style={{ color: 'black', fontWeight: 'bold' }}>{user.points}</h2>
          <h2 style={{ color: 'black' }}>points</h2>
        </div>
      </div>
      <br /><br />
      <h3 style={{ color: 'black' }}>Redeemable Rewards</h3>
      <br />
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        {rewards.map((reward) => {
          const isExpanded = expanded[reward.id];
          const needsTruncation = reward.description.length > 60;
          const displayDesc = needsTruncation && !isExpanded
            ? reward.description.slice(0, 60) + '...'
            : reward.description;

          return (
            <div
              key={reward.id}
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: '15px',
                width: '220px',
                textAlign: 'center',
                color: 'black',
                background: '#f9f9f9',
              }}
            >
              <p style={{ fontWeight: 'bold', color: 'black' }}>{reward.name}</p>

              <p style={{ fontStyle: 'italic', fontSize: '0.9em', color: 'black'  }}>
                {displayDesc}
                {needsTruncation && (
                  <button
                    onClick={() => toggleExpand(reward.id)}
                    style={{
                      fontSize: '0.8em',
                      color: '#007bff',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      paddingLeft: '4px'
                    }}
                  >
                    {isExpanded ? "Less" : "More"}
                  </button>
                )}
              </p>

              <p style={{ fontSize: '0.9em', fontWeight: 'bold', color: 'black' }}>
                ({reward.cost} points)
              </p>

              {/* This marginTop pushes it down */}
              <button
                className="btn btn-success w-100"
                onClick={() => handleRedeem(reward)}
                disabled={user.points < reward.cost}
                style={{ marginTop: 'auto' }}
              >
                {user.points >= reward.cost ? "Redeem" : "Not enough points"}
              </button>

            </div>
          );
        })}
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
            {Array.isArray(popupMessage) && (
              popupMessage.map((line, index) => (
                <p key={index} style={{ color: 'black', fontWeight: 'bold' }}>
                  {line}
                </p>
              ))
            ) }
            <button className="btn btn-success w-100" onClick={closeModal} style={{ marginTop: '15px' }}>
              Close
            </button>
          </div>
        </div>
      )}
      {redeemHistory.length > 0 && (
  <>
    <br /><br />
    <h3 style={{ color: 'black' }}>Redeem History</h3>
    <br></br>
    <table style={{ width: '100%', color: 'black', borderCollapse: 'collapse' }}>
      <thead>
        <tr style={{ backgroundColor: '#f9f9f9' }}>
          <th style={{ textAlign: 'center', border: '1px solid #ccc', padding: '10px' }}>Reward</th>
          <th style={{ textAlign: 'center', border: '1px solid #ccc', padding: '10px' }}>Points</th>
          <th style={{ textAlign: 'center', border: '1px solid #ccc', padding: '10px' }}>Code</th>
          <th style={{ textAlign: 'center', border: '1px solid #ccc', padding: '10px' }}>Date</th>
        </tr>
      </thead>
      <tbody>
        {redeemHistory.map((item, index) => (
          <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#fff' : '#f1f1f1' }}>
            <td style={{ textAlign: 'center', border: '1px solid #ccc', padding: '10px' }}>{item.name}</td>
            <td style={{ textAlign: 'center', border: '1px solid #ccc', padding: '10px' }}>{item.cost}</td>
            <td style={{ textAlign: 'center', border: '1px solid #ccc', padding: '10px' }}>{item.code}</td>
            <td style={{ textAlign: 'center', border: '1px solid #ccc', padding: '10px' }}>{item.date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </>
)}
    </div>
  );
}
