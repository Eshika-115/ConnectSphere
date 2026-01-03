import React, { useEffect, useState } from 'react';
import './InfoCard.css';
import EditIcon from '@mui/icons-material/Edit';
import ProfileModal from '../ProfileModal/ProfileModal';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import * as UserApi from '../../api/UserRequest.js';
import { logOut } from '../../actions/AuthAction';



const InfoCard = () => {

  const [modalOpened, setModalOpened] = useState(false);
  const dispatch = useDispatch();
  const params = useParams();
  const profileUserId = params.id;

  const [profileUser, setProfileUser] = useState({});

  const { user } = useSelector((state) => state.authReducer.authData);


  useEffect(() => {
    const fetchProfileUser = async () => {
      if (profileUserId === user._id) {
        setProfileUser(user);

      } else {
        const profileUser = await UserApi.getUser(profileUserId)
        setProfileUser(profileUser);
      }

    }

    fetchProfileUser();
  }, [user]);



  const handleLogOut = () => {
    dispatch(logOut());
  }


  return (
    <div className='InfoCard'>

      <div className="infoHead">
        <h4>Profile Info</h4>

        {user._id === profileUserId ?

          (<div>
            <EditIcon width='2rem' height='1.2rem'
              onClick={() => setModalOpened(true)} />

            <ProfileModal modalOpened={modalOpened} setModalOpened={setModalOpened}
              data={user}
            />
          </div>)
          : (" ")
        }

      </div>

      <div className="info">
        <span>
          <b>Status </b>
        </span>
        <span>{profileUser.relationship}</span>
      </div>

      <div className="info">
        <span>
          <b>Lives in </b>
        </span>
        <span>{profileUser.livesin}</span>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2.5rem', gap: '0.5rem' }}>
        <Link to='/home' style={{ textDecoration: 'none' }}>
          <button className='button' style={{ padding: '0.4rem 0.9rem', height: '2rem', display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            ← Home
          </button>
        </Link>
        <button className='button logout-button' style={{ margin: 0 }} onClick={handleLogOut}>Log Out</button>
      </div>
    </div>
  )
}

export default InfoCard
