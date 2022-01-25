import { FC, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import profileTabs from "../assets/data/profileTabs";
import NEARCurrencyIcon from "../assets/svg/NEARCurrencyIcon";
import useCopyToClipboard from "../hooks/useCopyToClipboard";
import { userInterface } from "../types";
import useContract from "../hooks/useContract";
import useUser from "../hooks/useUser";

const ProfileScreen: FC = () => {
  const [user] = useUser();
  const [profile, setProfile] = useState<userInterface | null>(null);
  const [_, copy] = useCopyToClipboard();
  const { username, section } = useParams();
  const contract = useContract();

  function copyAccountID() {
    if (profile) copy(profile.accountID);
  }

  useEffect(() => {
    if (!profile && contract && username) {
      contract
        .getUser({ accountID: username || null })
        .then((res: userInterface) => setProfile(res));
    } else if (contract && !username && user) {
      setProfile(user);
    }
  }, [profile, username, contract, user]);

  return (
    <div className="profile-container">
      <div className="header">
        <div className="avatar-container">
          <div className="avatar">
            <small>{profile && profile.accountID.split("")[0]}</small>
          </div>
          <div className="accountID-container">
            <small onClick={() => copyAccountID()} className="accountID">
              {profile && profile.accountID}
            </small>
          </div>
          <div
            className="totalTipped-container"
            title="Total amount of tips given."
          >
            <NEARCurrencyIcon size={20} fillCircle="#000" fillLetter="#FFF" />
            <small>{profile && profile.totalTipped}</small>
          </div>
          <div
            className="tipsReceived-container"
            title="Total amount of tips received."
          >
            <NEARCurrencyIcon size={20} fillCircle="#000" fillLetter="#FFF" />
            <small>{profile && profile.tipsReceived}</small>
          </div>
        </div>

        <div className="tabs-container">
          {profileTabs.map(({ label }) => (
            <div className="tab">
              <Link to={`/profile/${label}${username? "/" + username : ""}`}>
                <small>{label}</small>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className="profile-content-container">
        {profileTabs &&
          profileTabs.map(({ Component, label }) => (
            <div style={{ display: section === label ? "flex" : "none" }}>
              <Component profile={profile} />
            </div>
          ))}
        {username}
      </div>
    </div>
  );
};

export default ProfileScreen;
