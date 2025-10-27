// src/components/UserCard.jsx
const UserCard = ({ user }) => {
    return (
      <div className="card p-3 shadow-sm">
        <h5>{user.name}</h5>
        <p>{user.email}</p>
        <p>
          Status:{" "}
          {user.isVerified ? (
            <span className="text-success">Verified ✅</span>
          ) : (
            <span className="text-danger">Not Verified ❌</span>
          )}
        </p>
  
        {user.isVerified && user.qrCode && (
          <img src={user.qrCode} alt="QR Code" className="img-fluid" />
        )}
      </div>
    );
  };
  
  export default UserCard;
  