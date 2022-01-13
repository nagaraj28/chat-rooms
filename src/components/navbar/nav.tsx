import "../chatwindow/chatwindow.css";
import "../chatMessages/chatMessages.css";
import "./nav.css";
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';
import FindInPageTwoToneIcon from '@mui/icons-material/FindInPageTwoTone';



function NavBar() {
  return (
   <div className='room-ctnr'>
     <div className="room-title nav-header">
    
     <p > <span className='img-ctnr'>
                <img width="40" height="40" src={`https://avatars.dicebear.com/api/bottts/admin.svg`} alt="profile-picture" />
            </span>  Hi, user!</p>  
    <div className="nav-icons">
    <FindInPageTwoToneIcon sx={{ fontSize: 28}}/>
    <AddCircleTwoToneIcon className="add-icon" sx={{ fontSize: 28}}/>
    </div>

     </div>
   </div>
  );
}

export default NavBar;
