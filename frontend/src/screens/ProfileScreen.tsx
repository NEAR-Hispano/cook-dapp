import { FC } from "react";
import { Link, Outlet } from "react-router-dom";
import useUser from "../hooks/useUser";
import profileTabs from "../assets/data/profileTabs";
import NEARCurrencyIcon from "../assets/svg/NEARCurrencyIcon";

const ProfileScreen: FC = () => {
  const [user] = useUser();

  return (
    <div className="profile-container">
      <div className="header">
        <div className="avatar-container">
          <div className="avatar">
            <small>{user && user.accountID.split("")[0]}</small>
          </div>
          <div className="accountID-container">
            <small className="accountID">{user && user.accountID}</small>
          </div>
          <div className="totalTipped-container" title="Total amount of tips given.">
            <NEARCurrencyIcon size={20} fillCircle="#000" fillLetter="#FFF" />
            <small>{user && user.totalTipped}</small>
          </div>
          <div className="tipsReceived-container" title="Total amount of tips received.">
            <NEARCurrencyIcon size={20} fillCircle="#000" fillLetter="#FFF" />
            <small>{user && user.tipsReceived}</small>
          </div>
        </div>

        <div className="tabs-container">
          {profileTabs.map(({ label }) => (
            <div className="tab">
              <Link to={`/profile/${label}`}>
                <small>{label}</small>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className="profile-content-container">
        <Outlet />
      </div>
    </div>
  );
};

export default ProfileScreen;
