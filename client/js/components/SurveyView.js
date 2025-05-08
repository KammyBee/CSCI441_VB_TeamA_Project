import React, { useState, useEffect } from 'react';

// Animated star overlay for different feedback types
function AnimatedStar({ type, onAnimationEnd }) {
  const icon =
    type === 'happy' ? '😊★' :
    type === 'sad'   ? '😢★' :
    type === 'neutral'? '😐★' :
    type === 'cry'   ? '😭★' : '★';
  return (
    <div className={`animated-star ${type}`} onAnimationEnd={onAnimationEnd}>
      {icon}
    </div>
  );
}

// StarRating component with overlay animation
function StarRating({ value, onChange }) {
  const [animType, setAnimType] = useState(null);

  const handleClick = (val) => {
    onChange(val);
    if (val === 1) setAnimType('cry');
    else if (val > 4) setAnimType('happy');
    else if (val === 4) setAnimType('neutral');
    else if (val > 1 && val < 4) setAnimType('sad');
  };

  const handleAnimEnd = () => setAnimType(null);

  return (
    <>
      <div className="d-flex justify-content-center mb-3">
        {[...Array(7)].map((_, idx) => {
          const starVal = idx + 1;
          return (
            <span
              key={idx}
              onClick={() => handleClick(starVal)}
              style={{
                cursor: 'pointer',
                fontSize: '2.5rem',
                color: starVal <= value ? '#FFD700' : '#e4e5e9',
                margin: '0 0.25rem'
              }}
            >
              ★
            </span>
          );
        })}
      </div>
      {animType && <AnimatedStar type={animType} onAnimationEnd={handleAnimEnd} />}
    </>
  );
}

export default function SurveyView({ user }) {
  const [form, setForm] = useState({
    food_score: 0,
    service_score: 0,
    atmosphere_score: 0,
    value_score: 0,
    cleanliness_score: 0,
    efficiency_score: 0,
    overall_score: 0,
    feedback: ''
  });
  const [saved, setSaved] = useState(null);

  // Load last survey
  useEffect(() => {
    fetch(`http://localhost:3100/customer/survey?customerID=${user.customerID}`)
      .then(res => res.json())
      .then(data => {
        if (data) {
          setSaved(data);
          setForm({
            food_score: data.food_score || 0,
            service_score: data.service_score || 0,
            atmosphere_score: data.atmosphere_score || 0,
            value_score: data.value_score || 0,
            cleanliness_score: data.cleanliness_score || 0,
            efficiency_score: data.efficiency_score || 0,
            overall_score: data.overall_score || 0,
            feedback: data.feedback || ''
          });
        }
      })
      .catch(console.error);
  }, [user.customerID]);

  // Form handlers
  const handleStarChange = (field) => (val) => setForm(f => ({ ...f, [field]: val }));
  const handleFeedbackChange = (e) => setForm(f => ({ ...f, feedback: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...form, customerID: user.customerID };
    const res = await fetch('http://localhost:3100/customer/survey', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (res.ok) {
      const data = await res.json();
      setSaved(data);
      alert('Survey submitted!');
    } else {
      const err = await res.json();
      alert('Error: ' + (err.error || 'Unknown'));
    }
  };

  const categories = [
    { key: 'food_score', label: 'Food' },
    { key: 'service_score', label: 'Service' },
    { key: 'atmosphere_score', label: 'Atmosphere' },
    { key: 'value_score', label: 'Value' },
    { key: 'cleanliness_score', label: 'Cleanliness' },
    { key: 'efficiency_score', label: 'Efficiency' },
    { key: 'overall_score', label: 'Overall' }
  ];

  return (
    <>
      {/* CSS Animations */}
      <style>{`
        .animated-star {
          position: fixed;
          left: 50%;
          font-size: 3rem;
          pointer-events: none;
          transform: translateX(-50%);
        }
        @keyframes riseAnim {
          0% { top: 100%; opacity: 1; }
          100% { top: 0%; opacity: 0; }
        }
        @keyframes fallAnim {
          0% { top: 0%; opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes rollAnim {
          0% { top: 50%; transform: translate(-50%, -50%) rotate(0deg); opacity:1; }
          100% { top: 50%; transform: translate(150%, -50%) rotate(360deg); opacity:0; }
        }
        @keyframes cryFallAnim {
          0% { top: 0%; opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        .animated-star.happy {
          top: 100%;
          color: #FFD700;
          text-shadow: 0 0 8px #fff, 0 0 16px #FFD700;
          animation: riseAnim 2s ease-out forwards;
        }
        .animated-star.sad {
          top: 50%;
          color: #555;
          animation: fallAnim 2s ease-in forwards;
        }
        .animated-star.neutral {
          top: 50%;
          color: #999;
          animation: rollAnim 2s ease-out forwards;
        }
        .animated-star.cry {
          top: 0%;
          color: #555;
          animation: cryFallAnim 4s ease-in forwards;
        }
      `}</style>

      <div className="container mt-5 text-dark">
        <h3 className="text-center text-dark">Customer Survey</h3>
        {/* {saved && (
          <div className="mb-4 text-center text-dark">
            <strong>Last submitted:</strong> Overall {saved.overall_score}, feedback “{saved.feedback}”
          </div>
        )} */}
        <form onSubmit={handleSubmit}>
          {categories.map(cat => (
            <div className="mb-4 text-center text-dark" key={cat.key}>
              <label className="form-label d-block text-dark">{cat.label} Score</label>
              <StarRating value={form[cat.key]} onChange={handleStarChange(cat.key)} />
            </div>
          ))}
          <div className="mb-3 text-dark">
            <label className="form-label text-dark">Feedback</label>
            <textarea className="form-control" rows="3" value={form.feedback} onChange={handleFeedbackChange} />
          </div>
          <div className="text-center">
            <button type="submit" className="btn btn-primary">Submit Survey</button>
          </div>
        </form>
      </div>
    </>
  );
}
