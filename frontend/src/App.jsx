// import React, { useState, useEffect } from "react";
// import Menu from "./components/Menu";
// import PlaceOrder from "./components/PlaceOrder";
// import Login from "./components/Login";

// const App = () => {
//   const [cart, setCart] = useState([]);
//   const [user, setUser] = useState(null);

//   // 🔁 Load user from localStorage on refresh
//   useEffect(() => {
//     const savedUser = localStorage.getItem("user");
//     if (savedUser) {
//       setUser(JSON.parse(savedUser));
//     }
//   }, []);

//   // 🚪 Logout handler
//   const handleLogout = () => {
//     localStorage.removeItem("user");
//     setUser(null);
//     setCart([]);
//   };

//   return (
//     <div className="app-container">
//       <h1 className="title">🍽 Restaurant Menu</h1>

//       {!user ? (
//         <Login setUser={setUser} />
//       ) : (
//         <>
//           {/* 🔝 Top Bar */}
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               marginBottom: "20px",
//             }}
//           >
//             <p>
//               👋 Welcome, <b>{user.name}</b> ({user.role})
//             </p>

//             <button
//               onClick={handleLogout}
//               style={{
//                 padding: "8px 14px",
//                 background: "#ff4d6d",
//                 color: "white",
//                 border: "none",
//                 borderRadius: "6px",
//                 cursor: "pointer",
//               }}
//             >
//               Logout
//             </button>
//           </div>

//           {/* 🧾 Main Layout */}
//           <div className="layout">
//             <Menu cart={cart} setCart={setCart} />
//             <PlaceOrder cart={cart} user={user} />
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default App;



import React, { useState } from "react";
import Menu from "./components/Menu";
import PlaceOrder from "./components/PlaceOrder";
import OwnerDashboard from "./components/OwnerDashboard";
import Login from "./components/Login";

const App = () => {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);

  const handleLogout = () => {
    setUser(null);
    setCart([]);
  };

  if (!user) {
    return <Login setUser={setUser} />;
  }

  return (
    <div className="app-container">
      <header className="top-bar">
        <h1>🍽 Restaurant Menu</h1>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </header>

      <p>👋 Welcome, <b>{user.name}</b> ({user.role})</p>

      {/* 👑 OWNER VIEW */}
      {user.role === "owner" && <OwnerDashboard />}

      {/* 👤 CUSTOMER VIEW */}
      {user.role === "customer" && (
        <div className="layout">
          <Menu cart={cart} setCart={setCart} />
          <PlaceOrder cart={cart} user={user} />
        </div>
      )}
    </div>
  );
};

export default App;
